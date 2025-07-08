"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Video, Mic, Users, Clock, Brain, FileText } from "lucide-react"
import { useState } from "react"

interface Meeting {
  id: string
  title: string
  participants: string[]
  duration: number
  status: "live" | "processing" | "completed"
  transcriptionProgress: number
  keyDecisions: string[]
  actionItems: string[]
  sentiment: "positive" | "neutral" | "negative"
  timestamp: string
}

export function MeetingIntelligence() {
  const [activeMeeting, setActiveMeeting] = useState<Meeting | null>(null)

  const meetings: Meeting[] = [
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
    {
      id: "2",
      title: "Engineering Standup",
      participants: ["Mike Johnson", "Alex Rodriguez", "David Kim"],
      duration: 30,
      status: "completed",
      transcriptionProgress: 100,
      keyDecisions: ["Deploy hotfix for authentication bug", "Postpone feature release until security review"],
      actionItems: ["Alex to deploy hotfix by EOD", "David to schedule security review meeting"],
      sentiment: "neutral",
      timestamp: "2024-01-16T09:00:00Z",
    },
    {
      id: "3",
      title: "Client Feedback Review",
      participants: ["Lisa Park", "Sarah Chen"],
      duration: 60,
      status: "processing",
      transcriptionProgress: 95,
      keyDecisions: ["Implement user-requested dashboard customization", "Create feedback loop for feature requests"],
      actionItems: ["Lisa to draft customization requirements", "Sarah to design feedback collection system"],
      sentiment: "positive",
      timestamp: "2024-01-15T16:00:00Z",
    },
  ]

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600 bg-green-100"
      case "negative":
        return "text-red-600 bg-red-100"
      default:
        return "text-yellow-600 bg-yellow-100"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "text-red-600 bg-red-100"
      case "processing":
        return "text-yellow-600 bg-yellow-100"
      case "completed":
        return "text-green-600 bg-green-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Video className="h-5 w-5" />
            <span>Meeting Intelligence</span>
          </CardTitle>
          <CardDescription>
            Real-time transcription, analysis, and knowledge extraction from team meetings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active" className="space-y-4">
            <TabsList>
              <TabsTrigger value="active">Active Meetings</TabsTrigger>
              <TabsTrigger value="recent">Recent Meetings</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Live Meeting Monitor */}
                <Card className="border-red-200 bg-red-50/50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-red-700">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span>Live Meeting</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {meetings.find((m) => m.status === "live") && (
                      <>
                        <div>
                          <h3 className="font-semibold">Product Strategy Sync</h3>
                          <p className="text-sm text-gray-600">Started 35 minutes ago</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Transcription Progress</span>
                            <span>78%</span>
                          </div>
                          <Progress value={78} className="h-2" />
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Participants (4)</h4>
                          <div className="flex flex-wrap gap-2">
                            {["Sarah Chen", "Mike Johnson", "Alex Rodriguez", "Lisa Park"].map((participant, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {participant}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Real-time Insights</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <Brain className="h-3 w-3 text-blue-500" />
                              <span>2 key decisions identified</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <FileText className="h-3 w-3 text-green-500" />
                              <span>3 action items extracted</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="h-3 w-3 text-purple-500" />
                              <span>Positive team sentiment</span>
                            </div>
                          </div>
                        </div>

                        <Button className="w-full bg-transparent" variant="outline">
                          <Mic className="h-4 w-4 mr-2" />
                          Join Meeting Analysis
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Processing Queue */}
                <Card>
                  <CardHeader>
                    <CardTitle>Processing Queue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {meetings
                        .filter((m) => m.status === "processing")
                        .map((meeting) => (
                          <div key={meeting.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{meeting.title}</h4>
                              <Badge className={getStatusColor(meeting.status)} variant="secondary">
                                {meeting.status}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Analysis Progress</span>
                                <span>{meeting.transcriptionProgress}%</span>
                              </div>
                              <Progress value={meeting.transcriptionProgress} className="h-2" />
                            </div>
                            <p className="text-xs text-gray-500 mt-2">ETA: 2 minutes remaining</p>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="recent" className="space-y-4">
              <div className="space-y-4">
                {meetings
                  .filter((m) => m.status === "completed")
                  .map((meeting) => (
                    <Card key={meeting.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{meeting.title}</h3>
                            <p className="text-sm text-gray-600">
                              {new Date(meeting.timestamp).toLocaleString()} • {meeting.duration} minutes
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getSentimentColor(meeting.sentiment)} variant="secondary">
                              {meeting.sentiment}
                            </Badge>
                            <Badge className={getStatusColor(meeting.status)} variant="secondary">
                              {meeting.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium mb-2 flex items-center space-x-2">
                              <Brain className="h-4 w-4" />
                              <span>Key Decisions</span>
                            </h4>
                            <ul className="space-y-1 text-sm">
                              {meeting.keyDecisions.map((decision, idx) => (
                                <li key={idx} className="flex items-start space-x-2">
                                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <span>{decision}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2 flex items-center space-x-2">
                              <FileText className="h-4 w-4" />
                              <span>Action Items</span>
                            </h4>
                            <ul className="space-y-1 text-sm">
                              {meeting.actionItems.map((item, idx) => (
                                <li key={idx} className="flex items-start space-x-2">
                                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <Users className="h-3 w-3" />
                                <span>{meeting.participants.length} participants</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{meeting.duration} minutes</span>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              View Full Analysis
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Meeting Efficiency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600 mb-2">87%</div>
                    <p className="text-sm text-gray-600">Average decision-to-action ratio</p>
                    <Progress value={87} className="mt-2 h-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Sentiment Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600 mb-2">+12%</div>
                    <p className="text-sm text-gray-600">Improvement this week</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Trending positive</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Knowledge Capture</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-600 mb-2">156</div>
                    <p className="text-sm text-gray-600">New insights this week</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Brain className="h-3 w-3 text-purple-500" />
                      <span className="text-sm">Auto-categorized</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
