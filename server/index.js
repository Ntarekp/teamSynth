const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")
const { createServer } = require("http")
const { Server } = require("socket.io")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { Pool } = require("pg")
const Redis = require("redis")
const multer = require("multer")
const path = require("path")

// Import route handlers
const authRoutes = require("./routes/auth")
const adminRoutes = require("./routes/admin")
const meetingRoutes = require("./routes/meetings")
const taskRoutes = require("./routes/tasks")
const integrationRoutes = require("./routes/integrations")
const aiRoutes = require("./routes/ai")
const agentRoutes = require("./routes/agents")

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

// Redis connection for caching and real-time features
const redis = Redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
})

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})
app.use("/api/", limiter)

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname))
  },
})
const upload = multer({ storage })

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: "Access token required" })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" })
    }
    req.user = user
    next()
  })
}

// Role-based access control middleware
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Insufficient permissions" })
    }
    next()
  }
}

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/admin", authenticateToken, requireRole(["admin", "hr_manager"]), adminRoutes)
app.use("/api/meetings", authenticateToken, meetingRoutes)
app.use("/api/tasks", authenticateToken, taskRoutes)
app.use("/api/integrations", authenticateToken, integrationRoutes)
app.use("/api/ai", authenticateToken, aiRoutes)
app.use("/api/agents", authenticateToken, agentRoutes)

// WebSocket connection handling
io.use((socket, next) => {
  const token = socket.handshake.auth.token
  if (!token) {
    return next(new Error("Authentication error"))
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(new Error("Authentication error"))
    }
    socket.user = user
    next()
  })
})

io.on("connection", (socket) => {
  console.log(`User ${socket.user.id} connected`)

  // Join user to their organization room
  socket.join(`org_${socket.user.organizationId}`)

  // Handle real-time meeting events
  socket.on("join_meeting", (meetingId) => {
    socket.join(`meeting_${meetingId}`)
  })

  socket.on("meeting_transcription", (data) => {
    socket.to(`meeting_${data.meetingId}`).emit("transcription_update", data)
  })

  socket.on("disconnect", () => {
    console.log(`User ${socket.user.id} disconnected`)
  })
})

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: "Something went wrong!" })
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, io, pool, redis }
