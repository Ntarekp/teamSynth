import { NextResponse } from "next/server"

const users = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah@company.com",
    role: "Senior Developer",
    department: "Engineering",
    lastActive: "2024-01-16T10:30:00Z",
    wellbeingScore: 85,
    status: "active",
  },
  {
    id: "2",
    name: "Mike Johnson",
    email: "mike@company.com",
    role: "Backend Engineer",
    department: "Engineering",
    lastActive: "2024-01-16T09:45:00Z",
    wellbeingScore: 72,
    status: "active",
  },
  {
    id: "3",
    name: "Alex Rodriguez",
    email: "alex@company.com",
    role: "DevOps Engineer",
    department: "Engineering",
    lastActive: "2024-01-16T08:20:00Z",
    wellbeingScore: 58,
    status: "at_risk",
  },
]

export async function GET() {
  return NextResponse.json({ users })
}
