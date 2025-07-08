import { NextResponse } from "next/server"

const userProfile = {
  id: "user_123",
  name: "Sarah Chen",
  email: "sarah@company.com",
  role: "Senior Frontend Developer",
  department: "Engineering",
  timezone: "America/Los_Angeles",
  language: "en",
  theme: "light",
  avatar: "/avatars/sarah.jpg",
  preferences: {
    notifications: {
      wellnessCheckins: true,
      memoryGraphAlerts: true,
      meetingReminders: true,
      taskAssignments: true,
    },
    frequency: {
      wellnessCheckins: "daily",
      reports: "weekly",
    },
  },
  security: {
    mfaEnabled: true,
    lastPasswordChange: "2024-01-01T00:00:00Z",
    activeSessions: [
      {
        id: "session_1",
        device: "MacBook Pro",
        location: "San Francisco, CA",
        lastActive: "2024-01-16T10:30:00Z",
        current: true,
      },
      {
        id: "session_2",
        device: "iPhone 15",
        location: "San Francisco, CA",
        lastActive: "2024-01-16T08:15:00Z",
        current: false,
      },
    ],
  },
}

export async function GET() {
  return NextResponse.json(userProfile)
}

export async function PUT(request: Request) {
  const updates = await request.json()

  // Simulate updating user profile
  return NextResponse.json({
    success: true,
    message: "Profile updated successfully",
    profile: { ...userProfile, ...updates },
  })
}
