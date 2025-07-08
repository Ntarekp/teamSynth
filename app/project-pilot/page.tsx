"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Video, Users, Clock, Brain, CheckCircle, Calendar, Plus, ExternalLink, Mic, MicOff } from "lucide-react"

interface LiveMeeting {
  id: string
  title: string
  participants: Array<{ id: string; name: string; avatar: string }>
  duration: number
  status: string
  transcription: {
    isActive: boolean
    progress: number
    recentText: Array<{ speaker: string; text: string; timestamp: string }>
  }
  decisionsDetected: Array<{
    id: string
    text: string
    confidence: number
    timestamp: string
    participants: string[]
  }>
  actionItems: Array<{
    id: string
    text: string
    assignee: string
    dueDate: string
    confidence: number
  }>
}

export default function ProjectPilotDashboard() {
  const [liveMeeting, setLiveMeeting] = useState<LiveMeeting | null>(null)
  const [isTranscribing, setIsTranscribing] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLiveMeeting()
    // Simulate real-time updates
    const interval = setInterval(fetchLiveMeeting, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchLiveMeeting = async () => {
    try {
      const response = await fetch("/api/meetings/live")
      const data = await response.json()
      setLiveMeeting(data)
    } catch (error) {
      console.error("Failed to fetch live meeting:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToMemory = async (decisionId: string) => {
    try {
      await fetch("/api/meetings/live", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add_to_memory", itemId: decisionId }),
      })
      // Show success feedback
    } catch (error) {
      console.error("Failed to add to memory:", error)
    }
  }

  const handleCreateTask = async (actionItem: any) => {
    try {
      await fetch("/api/meetings/live", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create_task", data: actionItem }),
      })
      // Show success feedback
    } catch (error) {
      console.error("Failed to create task:", error)
    }
  }

  const upcomingMeetings = [
    {
      id: "1",
      title: "Engineering Standup",
      time: "3:30 PM",
      participants: 6,
      hasPrep: true,
    },
    {
      id: "2",
      title: "Client Feedback Review",
      time: "4:00 PM",
      participants: 3,
      hasPrep: false,
    },
    {
      id: "3",
      title: "Sprint Planning",
      time: "Tomorrow 10:00 AM",
      participants: 8,
      hasPrep: true,
    },
  ]

  const projectDeadlines = [
    {
      id: "1",
      title: "Mobile App MVP",
      dueDate: "Jan 25",
      progress: 68,
      status: "on_track",
    },
    {
      id: "2",
      title: "API Security Audit",
      dueDate: "Jan 20",
      progress: 85,
      status: "ahead",
    },
    {
      id: "3",
      title: "Performance Optimization",
      dueDate: "Jan 22",
      progress: 42,
      status: "at_risk",
    },
  ]

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ProjectPilot Dashboard</h1>
          <p className="text-gray-600">Live meeting intelligence and project coordination</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Schedule Meeting
        </Button>
      </div>

      <Tabs defaultValue="live" className="space-y-4">
        <TabsList>
          <TabsTrigger value="live">Live Meeting</TabsTrigger>
          <TabsTrigger value="actions">Action Items</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-6">
          {liveMeeting ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Live Meeting Widget */}
              <Card className="border-red-200 bg-red-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-red-700">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <Video className="h-5 w-5" />
                    <span>Live Meeting</span>
                  </CardTitle>
                  <CardDescription>{liveMeeting.title}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Meeting Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{liveMeeting.duration} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{liveMeeting.participants.length} people</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => setIsTranscribing(!isTranscribing)}>
                        {isTranscribing ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </Button>
                      <Button size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Participants */}
                  <div>
                    <h4 className="font-medium mb-2">Participants</h4>
                    <div className="flex flex-wrap gap-2">
                      {liveMeeting.participants.map((participant) => (
                        <Badge key={participant.id} variant="outline" className="text-xs">
                          {participant.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Transcription Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Transcription Progress</span>
                      <span>{liveMeeting.transcription.progress}%</span>
                    </div>
                    <Progress value={liveMeeting.transcription.progress} className="h-2" />
                  </div>

                  {/* Recent Transcription */}
                  <div>
                    <h4 className="font-medium mb-2">Live Transcription</h4>
                    <div className="bg-white rounded-lg p-3 max-h-32 overflow-y-auto space-y-1">
                      {liveMeeting.transcription.recentText.map((item, index) => (
                        <div key={index} className="text-sm">
                          <span className="font-medium text-blue-600">{item.speaker}:</span>
                          <span className="ml-2 text-gray-700">{item.text}</span>
                          <span className="ml-2 text-xs text-gray-500">{item.timestamp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Decisions & Actions */}
              <div className="space-y-4">
                {/* Decisions Detected */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="h-5 w-5" />
                      <span>Decisions Detected</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {liveMeeting.decisionsDetected.map((decision) => (
                      <div key={decision.id} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-sm font-medium">{decision.text}</p>
                          <Badge variant="outline" className="text-xs">
                            {Math.round(decision.confidence * 100)}% confidence
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{decision.timestamp}</span>
                          <Button size="sm" onClick={() => handleAddToMemory(decision.id)}>
                            Add to Memory
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Action Items */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5" />
                      <span>Action Items</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {liveMeeting.actionItems.map((item) => (
                      <div key={item.id} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-sm font-medium">{item.text}</p>
                          <Badge variant="outline" className="text-xs">
                            {Math.round(item.confidence * 100)}% confidence
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">
                            <span>{item.assignee}</span> • <span>Due {item.dueDate}</span>
                          </div>
                          <Button size="sm" onClick={() => handleCreateTask(item)}>
                            Create Task
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-gray-500">
                <Video className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No active meetings</p>
                <p className="text-sm">Start a meeting to see live intelligence</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="actions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Action Items Management</CardTitle>
              <CardDescription>Track and manage action items from meetings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {liveMeeting?.actionItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium">{item.text}</p>
                        <p className="text-sm text-gray-600">
                          {item.assignee} • Due {item.dueDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Assign to Jira
                      </Button>
                      <Button size="sm" variant="outline">
                        Set Reminder
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Meetings</CardTitle>
              <CardDescription>Your schedule with AI preparation status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingMeetings.map((meeting) => (
                  <div key={meeting.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">{meeting.title}</p>
                        <p className="text-sm text-gray-600">
                          {meeting.time} • {meeting.participants} participants
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {meeting.hasPrep && (
                        <Badge className="bg-green-100 text-green-800" variant="secondary">
                          Memory briefing ready
                        </Badge>
                      )}
                      <Button size="sm">Join</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deadlines" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Deadlines</CardTitle>
              <CardDescription>Track progress on key project milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectDeadlines.map((project) => (
                  <div key={project.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{project.title}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={
                            project.status === "ahead"
                              ? "bg-blue-100 text-blue-800"
                              : project.status === "on_track"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                          }
                          variant="secondary"
                        >
                          {project.status.replace("_", " ")}
                        </Badge>
                        <span className="text-sm text-gray-600">Due {project.dueDate}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
