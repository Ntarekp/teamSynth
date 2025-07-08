import { NextResponse } from "next/server"

const integrations = [
  {
    id: "slack",
    name: "Slack",
    description: "Team communication and notifications",
    logo: "/logos/slack.svg",
    status: "connected",
    lastSync: "2024-01-16T10:30:00Z",
    permissions: ["channels:read", "chat:write", "users:read"],
    webhookUrl: "https://api.teamwell.com/webhooks/slack",
  },
  {
    id: "zoom",
    name: "Zoom",
    description: "Video meetings and transcription",
    logo: "/logos/zoom.svg",
    status: "connected",
    lastSync: "2024-01-16T10:25:00Z",
    permissions: ["meeting:read", "recording:read"],
    webhookUrl: "https://api.teamwell.com/webhooks/zoom",
  },
  {
    id: "jira",
    name: "Jira",
    description: "Project management and task tracking",
    logo: "/logos/jira.svg",
    status: "error",
    lastSync: "2024-01-16T08:15:00Z",
    permissions: ["project:read", "issue:write"],
    webhookUrl: "https://api.teamwell.com/webhooks/jira",
    error: "Authentication token expired",
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Meeting scheduling and calendar sync",
    logo: "/logos/google-calendar.svg",
    status: "not_connected",
    permissions: ["calendar:read", "events:write"],
  },
]

export async function GET() {
  return NextResponse.json({ integrations })
}

export async function POST(request: Request) {
  const { integrationId, action } = await request.json()

  if (action === "connect") {
    // Simulate OAuth flow
    return NextResponse.json({
      success: true,
      redirectUrl: `https://oauth.${integrationId}.com/authorize?client_id=teamwell&redirect_uri=https://app.teamwell.com/integrations/callback`,
    })
  }

  if (action === "disconnect") {
    return NextResponse.json({ success: true, message: "Integration disconnected" })
  }

  if (action === "test") {
    return NextResponse.json({ success: true, message: "Connection test successful" })
  }

  return NextResponse.json({ success: false, message: "Unknown action" })
}
