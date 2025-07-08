import { NextResponse } from "next/server"

const liveMeetingData = {
  id: "meeting_123",
  title: "Product Strategy Sync",
  participants: [
    { id: "1", name: "Sarah Chen", avatar: "/avatars/sarah.jpg" },
    { id: "2", name: "Mike Johnson", avatar: "/avatars/mike.jpg" },
    { id: "3", name: "Lisa Park", avatar: "/avatars/lisa.jpg" },
    { id: "4", name: "David Kim", avatar: "/avatars/david.jpg" },
  ],
  duration: 35,
  status: "live",
  transcription: {
    isActive: true,
    progress: 78,
    recentText: [
      { speaker: "Sarah", text: "I think we should prioritize the mobile app development for Q2", timestamp: "10:32" },
      {
        speaker: "Mike",
        text: "That makes sense. We'll need to allocate additional resources to API optimization",
        timestamp: "10:33",
      },
      { speaker: "Lisa", text: "What about the timeline for the user research phase?", timestamp: "10:34" },
    ],
  },
  decisionsDetected: [
    {
      id: "d1",
      text: "Prioritize mobile app development for Q2",
      confidence: 0.92,
      timestamp: "10:32",
      participants: ["Sarah Chen", "Mike Johnson"],
    },
    {
      id: "d2",
      text: "Allocate additional resources to API optimization",
      confidence: 0.88,
      timestamp: "10:33",
      participants: ["Mike Johnson"],
    },
  ],
  actionItems: [
    {
      id: "a1",
      text: "Sarah to create mobile app wireframes by Friday",
      assignee: "Sarah Chen",
      dueDate: "2024-01-19",
      confidence: 0.95,
    },
    {
      id: "a2",
      text: "Mike to audit current API performance metrics",
      assignee: "Mike Johnson",
      dueDate: "2024-01-18",
      confidence: 0.89,
    },
  ],
}

export async function GET() {
  return NextResponse.json(liveMeetingData)
}

export async function POST(request: Request) {
  const { action, itemId, data } = await request.json()

  if (action === "add_to_memory") {
    // Simulate adding decision to memory graph
    return NextResponse.json({ success: true, message: "Decision added to memory graph" })
  }

  if (action === "create_task") {
    // Simulate creating task in external system
    return NextResponse.json({ success: true, taskId: `task_${Date.now()}` })
  }

  return NextResponse.json({ success: false, message: "Unknown action" })
}
