import { NextResponse } from "next/server"

// Mock analytics data - in production this would come from your database
const analyticsData = {
  companyMoodHeatmap: {
    departments: ["Engineering", "Product", "Design", "Marketing", "Sales"],
    weeks: ["Week 1", "Week 2", "Week 3", "Week 4"],
    data: [
      [7.2, 6.8, 7.5, 8.1], // Engineering
      [6.9, 7.3, 7.1, 7.8], // Product
      [8.0, 7.9, 8.2, 8.5], // Design
      [6.5, 6.8, 7.0, 7.2], // Marketing
      [7.1, 6.9, 7.4, 7.6], // Sales
    ],
  },
  burnoutRisk: {
    overall: 23,
    byDepartment: {
      Engineering: 28,
      Product: 15,
      Design: 12,
      Marketing: 35,
      Sales: 22,
    },
  },
  diversityCompliance: {
    current: 78,
    target: 85,
    trend: +5,
    breakdown: {
      gender: { current: 45, target: 50 },
      ethnicity: { current: 32, target: 40 },
      age: { current: 68, target: 70 },
    },
  },
  teamFormationMetrics: {
    averageFormationTime: 2.3,
    successRate: 94,
    diversityScore: 78,
  },
  systemHealth: {
    apiUsage: {
      current: 1250,
      trend: +12,
      hourlyData: [980, 1100, 1250, 1180, 1350, 1420, 1250],
    },
    integrations: [
      { name: "Slack", status: "active", lastSync: "2024-01-16T10:30:00Z" },
      { name: "Zoom", status: "active", lastSync: "2024-01-16T10:25:00Z" },
      { name: "Jira", status: "error", lastSync: "2024-01-16T08:15:00Z" },
      { name: "Google Calendar", status: "active", lastSync: "2024-01-16T10:28:00Z" },
    ],
    userActivity: {
      dailyActiveUsers: 156,
      chatSessions: 89,
      graphViews: 234,
    },
  },
}

export async function GET() {
  return NextResponse.json(analyticsData)
}
