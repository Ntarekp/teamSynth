import { NextResponse } from "next/server"

// Mock meeting data
const meetings = [
  {
    id: "1",
    title: "Product Strategy Sync",
    participants: ["Sarah Chen", "Mike Johnson", "Alex Rodriguez", "Lisa Park"],
    duration: 45,
    status: "live",
    transcriptionProgress: 78,
    keyDecisions: ["Prioritize mobile app development for Q2", "Allocate additional resources to API optimization"],
    actionItems: ["Sarah to create mobile app wireframes by Friday", "Mike to audit current API performance metrics"],
    sentiment: "positive",
    timestamp: "2024-01-16T14:00:00Z",
  },
]

export async function GET() {
  return NextResponse.json({ meetings })
}

export async function POST(request: Request) {
  const body = await request.json()

  // Simulate meeting analysis
  const analyzedMeeting = {
    id: Date.now().toString(),
    ...body,
    status: "processing",
    transcriptionProgress: 0,
    keyDecisions: [],
    actionItems: [],
    sentiment: "neutral",
  }

  meetings.push(analyzedMeeting)

  return NextResponse.json({ meeting: analyzedMeeting })
}
