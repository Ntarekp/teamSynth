import { NextResponse } from "next/server"

const tasks = [
  {
    id: "task_1",
    title: "Implement API Rate Limiting",
    description: "Add rate limiting middleware to prevent API abuse",
    assignee: "Mike Johnson",
    status: "in_progress",
    priority: "high",
    dueDate: "2024-01-20",
    project: "API Security",
    source: "meeting",
    externalId: "JIRA-123",
    estimatedHours: 8,
    actualHours: 5,
  },
  {
    id: "task_2",
    title: "Mobile App Wireframes",
    description: "Create wireframes for new mobile application",
    assignee: "Sarah Chen",
    status: "todo",
    priority: "medium",
    dueDate: "2024-01-22",
    project: "Mobile App",
    source: "manual",
    estimatedHours: 12,
  },
]

export async function GET() {
  return NextResponse.json({ tasks })
}

export async function POST(request: Request) {
  const { action, taskId, data } = await request.json()

  if (action === "create") {
    const newTask = {
      id: `task_${Date.now()}`,
      ...data,
      status: "todo",
      createdAt: new Date().toISOString(),
    }
    return NextResponse.json({ success: true, task: newTask })
  }

  if (action === "update") {
    return NextResponse.json({ success: true, message: "Task updated" })
  }

  if (action === "sync_jira") {
    return NextResponse.json({ success: true, externalId: `JIRA-${Date.now()}` })
  }

  return NextResponse.json({ success: false, message: "Unknown action" })
}
