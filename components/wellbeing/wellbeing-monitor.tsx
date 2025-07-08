"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, AlertTriangle, TrendingUp, TrendingDown, Users, Clock, Coffee } from "lucide-react"
import { useState } from "react"

interface TeamMemberWellbeing {
  id: string
  name: string
  role: string
  wellbeingScore: number
  burnoutRisk: "low" | "medium" | "high"
  engagementLevel: number
  workloadTrend: "increasing" | "stable" | "decreasing"
  lastCheckIn: string
  recentSentiment: "positive" | "neutral" | "negative"
  recommendedActions: string[]
}

export function WellbeingMonitor() {
  const [selectedMember, setSelectedMember] = useState<TeamMemberWellbeing | null>(null)

  const teamWellbeing: TeamMemberWellbeing[] = [
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
      id: "2",
      name: "Mike Johnson",
      role: "Backend Engineer",
      wellbeingScore: 72,
      burnoutRisk: "medium",
      engagementLevel: 78,
      workloadTrend: "increasing",
      lastCheckIn: "2024-01-15T16:30:00Z",
      recentSentiment: "neutral",
      recommendedActions: ["Schedule workload review", "Suggest micro-breaks", "Peer check-in recommended"],
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
    {
      id: "4",
      name: "Lisa Park",
      role: "Product Manager",
      wellbeingScore: 88,
      burnoutRisk: "low",
      engagementLevel: 89,
      workloadTrend: "stable",
      lastCheckIn: "2024-01-16T11:15:00Z",
      recentSentiment: "positive",
      recommendedActions: ["Maintain current balance", "Leadership development opportunity"],
    },
    {
      id: "5",
      name: "David Kim",
      role: "Data Scientist",
      wellbeingScore: 79,
      burnoutRisk: "low",
      engagementLevel: 83,
      workloadTrend: "decreasing",
      lastCheckIn: "2024-01-16T08:45:00Z",
      recentSentiment: "positive",
      recommendedActions: ["Consider additional challenges", "Cross-team collaboration"],
    },
  ]

  const getBurnoutRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "text-red-600 bg-red-100 border-red-200"
      case "medium":
        return "text-yellow-600 bg-yellow-100 border-yellow-200"
      case "low":
        return "text-green-600 bg-green-100 border-green-200"
      default:
        return "text-gray-600 bg-gray-100 border-gray-200"
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600"
      case "negative":
        return "text-red-600"
      default:
        return "text-yellow-600"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-red-500" />
      case "decreasing":
        return <TrendingDown className="h-4 w-4 text-green-500" />
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
    }
  }

  const teamAverageWellbeing = Math.round(
    teamWellbeing.reduce((sum, member) => sum + member.wellbeingScore, 0) / teamWellbeing.length,
  )

  const highRiskMembers = teamWellbeing.filter((member) => member.burnoutRisk === "high").length
  const mediumRiskMembers = teamWellbeing.filter((member) => member.burnoutRisk === "medium").length

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-red-500" />
            <span>Team Well-being Monitor</span>
          </CardTitle>
          <CardDescription>Proactive monitoring of team health, engagement, and burnout prevention</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="individuals">Individual Insights</TabsTrigger>
              <TabsTrigger value="interventions">Interventions</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Team Health Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Heart className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">Team Well-being</span>
                    </div>
                    <div className="text-2xl font-bold">{teamAverageWellbeing}%</div>
                    <Progress value={teamAverageWellbeing} className="mt-2 h-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium">High Risk</span>
                    </div>
                    <div className="text-2xl font-bold text-red-600">{highRiskMembers}</div>
                    <p className="text-xs text-gray-600">members need attention</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">Medium Risk</span>
                    </div>
                    <div className="text-2xl font-bold text-yellow-600">{mediumRiskMembers}</div>
                    <p className="text-xs text-gray-600">members to monitor</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Engagement</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">82%</div>
                    <p className="text-xs text-gray-600">average team score</p>
                  </CardContent>
                </Card>
              </div>

              {/* Alert Dashboard */}
              <Card className="border-red-200 bg-red-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-red-700">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Active Alerts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <div>
                          <p className="font-medium text-red-800">High burnout risk detected</p>
                          <p className="text-sm text-red-600">Alex Rodriguez - DevOps Engineer</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Take Action
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-yellow-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <div>
                          <p className="font-medium text-yellow-800">Workload increasing</p>
                          <p className="text-sm text-yellow-600">Mike Johnson - Backend Engineer</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="individuals" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Team Members List */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Team Members</h3>
                  <div className="space-y-3">
                    {teamWellbeing.map((member) => (
                      <Card
                        key={member.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedMember?.id === member.id ? "ring-2 ring-blue-500" : ""
                        }`}
                        onClick={() => setSelectedMember(member)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-medium">{member.name}</h4>
                              <p className="text-sm text-gray-600">{member.role}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={getBurnoutRiskColor(member.burnoutRisk)} variant="secondary">
                                {member.burnoutRisk} risk
                              </Badge>
                              {getTrendIcon(member.workloadTrend)}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Well-being Score</span>
                              <span
                                className={
                                  member.wellbeingScore >= 80
                                    ? "text-green-600"
                                    : member.wellbeingScore >= 60
                                      ? "text-yellow-600"
                                      : "text-red-600"
                                }
                              >
                                {member.wellbeingScore}%
                              </span>
                            </div>
                            <Progress value={member.wellbeingScore} className="h-2" />

                            <div className="flex justify-between text-sm">
                              <span>Engagement</span>
                              <span>{member.engagementLevel}%</span>
                            </div>
                            <Progress value={member.engagementLevel} className="h-2" />
                          </div>

                          <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <div
                                className={`w-2 h-2 rounded-full ${getSentimentColor(member.recentSentiment)}`}
                              ></div>
                              <span>{member.recentSentiment}</span>
                            </div>
                            <span>Last check-in: {new Date(member.lastCheckIn).toLocaleDateString()}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Individual Details */}
                <div>
                  <h3 className="font-semibold text-lg mb-4">Individual Insights</h3>
                  {selectedMember ? (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>{selectedMember.name}</span>
                          <Badge className={getBurnoutRiskColor(selectedMember.burnoutRisk)} variant="secondary">
                            {selectedMember.burnoutRisk} risk
                          </Badge>
                        </CardTitle>
                        <CardDescription>{selectedMember.role}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Well-being Score</h4>
                            <div className="text-3xl font-bold mb-2">{selectedMember.wellbeingScore}%</div>
                            <Progress value={selectedMember.wellbeingScore} className="h-3" />
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Engagement Level</h4>
                            <div className="text-3xl font-bold mb-2">{selectedMember.engagementLevel}%</div>
                            <Progress value={selectedMember.engagementLevel} className="h-3" />
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Recent Patterns</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Workload Trend</span>
                              <div className="flex items-center space-x-2">
                                {getTrendIcon(selectedMember.workloadTrend)}
                                <span className="text-sm capitalize">{selectedMember.workloadTrend}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Recent Sentiment</span>
                              <div className="flex items-center space-x-2">
                                <div
                                  className={`w-2 h-2 rounded-full ${getSentimentColor(selectedMember.recentSentiment)}`}
                                ></div>
                                <span className="text-sm capitalize">{selectedMember.recentSentiment}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Recommended Actions</h4>
                          <ul className="space-y-2">
                            {selectedMember.recommendedActions.map((action, idx) => (
                              <li key={idx} className="flex items-start space-x-2 text-sm">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-4 border-t">
                          <Button className="w-full">Schedule Check-in</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card>
                      <CardContent className="p-8 text-center text-gray-500">
                        <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>Select a team member to view detailed insights</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="interventions" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Coffee className="h-5 w-5" />
                      <span>Micro-Interventions</span>
                    </CardTitle>
                    <CardDescription>Automated well-being nudges and reminders</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-blue-800">Break Reminder</span>
                          <Badge variant="outline" className="text-xs">
                            Active
                          </Badge>
                        </div>
                        <p className="text-sm text-blue-700">Sent to Mike Johnson - 15 min break suggested</p>
                      </div>

                      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-green-800">Peer Check-in</span>
                          <Badge variant="outline" className="text-xs">
                            Scheduled
                          </Badge>
                        </div>
                        <p className="text-sm text-green-700">Sarah Chen → Alex Rodriguez coffee chat</p>
                      </div>

                      <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-purple-800">Mindfulness Prompt</span>
                          <Badge variant="outline" className="text-xs">
                            Delivered
                          </Badge>
                        </div>
                        <p className="text-sm text-purple-700">5-minute meditation sent to team</p>
                      </div>
                    </div>

                    <Button className="w-full bg-transparent" variant="outline">
                      Configure Interventions
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5" />
                      <span>Manager Alerts</span>
                    </CardTitle>
                    <CardDescription>Critical situations requiring immediate attention</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-red-800">Burnout Risk</span>
                          <Badge className="bg-red-100 text-red-800" variant="secondary">
                            High
                          </Badge>
                        </div>
                        <p className="text-sm text-red-700 mb-2">Alex Rodriguez showing signs of severe stress</p>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          Escalate to Manager
                        </Button>
                      </div>

                      <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-yellow-800">Workload Spike</span>
                          <Badge className="bg-yellow-100 text-yellow-800" variant="secondary">
                            Medium
                          </Badge>
                        </div>
                        <p className="text-sm text-yellow-700 mb-2">Mike Johnson workload increased 40% this week</p>
                        <Button size="sm" variant="outline">
                          Review Assignments
                        </Button>
                      </div>
                    </div>

                    <Button className="w-full bg-transparent" variant="outline">
                      View All Alerts
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Well-being Trends</CardTitle>
                    <CardDescription>Team health over the past 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Overall Trend</span>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-green-600">+5% this month</span>
                        </div>
                      </div>
                      <Progress value={75} className="h-2" />

                      <div className="text-xs text-gray-600 space-y-1">
                        <p>• Engagement scores improved across all teams</p>
                        <p>• Burnout incidents reduced by 30%</p>
                        <p>• Proactive interventions increased by 45%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Intervention Effectiveness</CardTitle>
                    <CardDescription>Success rate of well-being interventions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Micro-breaks</span>
                          <span className="text-green-600">87% effective</span>
                        </div>
                        <Progress value={87} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Peer check-ins</span>
                          <span className="text-green-600">92% effective</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Workload adjustments</span>
                          <span className="text-green-600">78% effective</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
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
