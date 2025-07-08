import { NextResponse } from "next/server"

const wellbeingData = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Senior Frontend Developer",
    wellbeingScore: 85,
    burnoutRisk: "low",
    engagementLevel: 92,
    workloadTrend: "stable",
    lastCheckIn: "2024-01-16T09:00:00Z",
    recentSentiment: "positive",
    recommendedActions: ["Continue current pace", "Consider mentoring opportunities"],
  },
  {
    id: "3",
    name: "Alex Rodriguez",
    role: "DevOps Engineer",
    wellbeingScore: 58,
    burnoutRisk: "high",
    engagementLevel: 65,
    workloadTrend: "increasing",
    lastCheckIn: "2024-01-14T14:20:00Z",
    recentSentiment: "negative",
    recommendedActions: ["Immediate manager intervention", "Workload redistribution", "Mental health resources"],
  },
]

export async function GET() {
  return NextResponse.json({ wellbeingData })
}

export async function POST(request: Request) {
  const { memberId, intervention } = await request.json()

  // Simulate intervention tracking
  return NextResponse.json({
    success: true,
    message: `Intervention "${intervention}" scheduled for member ${memberId}`,
  })
}
