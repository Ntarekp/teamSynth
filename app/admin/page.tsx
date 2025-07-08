"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Users,
  AlertTriangle,
  TrendingUp,
  Shield,
  Activity,
  Brain,
  Heart,
  Zap,
  RefreshCw,
  Download,
  Settings,
} from "lucide-react"

interface AnalyticsData {
  companyMoodHeatmap: {
    departments: string[]
    weeks: string[]
    data: number[][]
  }
  burnoutRisk: {
    overall: number
    byDepartment: Record<string, number>
  }
  diversityCompliance: {
    current: number
    target: number
    trend: number
    breakdown: {
      gender: { current: number; target: number }
      ethnicity: { current: number; target: number }
      age: { current: number; target: number }
    }
  }
  teamFormationMetrics: {
    averageFormationTime: number
    successRate: number
    diversityScore: number
  }
  systemHealth: {
    apiUsage: {
      current: number
      trend: number
      hourlyData: number[]
    }
    integrations: Array<{
      name: string
      status: string
      lastSync: string
    }>
    userActivity: {
      dailyActiveUsers: number
      chatSessions: number
      graphViews: number
    }
  }
}

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/admin/analytics")
      const data = await response.json()
      setAnalytics(data)
    } catch (error) {
      console.error("Failed to fetch analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchAnalytics()
    setRefreshing(false)
  }

  const handleExportData = async (type: string) => {
    try {
      const response = await fetch(`/api/admin/export/${type}`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${type}_export_${new Date().toISOString().split("T")[0]}.csv`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Export failed:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Activity className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
          <p>Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (!analytics) {
    return <div>Failed to load analytics data</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Analytics</h1>
          <p className="text-gray-600">Company-wide insights and system health monitoring</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline" onClick={() => handleExportData("analytics")}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics.systemHealth.userActivity.dailyActiveUsers}
                </p>
                <p className="text-xs text-blue-600">+12% from last week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Wellness Score</p>
                <p className="text-2xl font-bold text-gray-900">87%</p>
                <p className="text-xs text-green-600">Above target</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Burnout Risk</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.burnoutRisk.overall}%</p>
                <p className="text-xs text-yellow-600">Needs attention</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">AI Interactions</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.systemHealth.userActivity.chatSessions}</p>
                <p className="text-xs text-purple-600">+25% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="wellness" className="space-y-4">
        <TabsList>
          <TabsTrigger value="wellness">Team Wellness</TabsTrigger>
          <TabsTrigger value="diversity">D&I Compliance</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
          <TabsTrigger value="interventions">Interventions</TabsTrigger>
        </TabsList>

        <TabsContent value="wellness" className="space-y-6">
          {/* Company Mood Heatmap */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5" />
                <span>Company Mood Heatmap</span>
              </CardTitle>
              <CardDescription>Weekly mood trends across departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.companyMoodHeatmap.departments.map((dept, deptIndex) => (
                  <div key={dept} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">{dept}</span>
                      <span className="text-xs text-gray-500">
                        Avg:{" "}
                        {(
                          analytics.companyMoodHeatmap.data[deptIndex].reduce((a, b) => a + b, 0) /
                          analytics.companyMoodHeatmap.data[deptIndex].length
                        ).toFixed(1)}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                      {analytics.companyMoodHeatmap.data[deptIndex].map((score, weekIndex) => (
                        <div
                          key={weekIndex}
                          className={`h-8 rounded flex items-center justify-center text-xs font-medium text-white ${
                            score >= 8
                              ? "bg-green-500"
                              : score >= 7
                                ? "bg-yellow-500"
                                : score >= 6
                                  ? "bg-orange-500"
                                  : "bg-red-500"
                          }`}
                          title={`${analytics.companyMoodHeatmap.weeks[weekIndex]}: ${score}`}
                        >
                          {score}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Burnout Risk by Department */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Burnout Risk Analysis</span>
              </CardTitle>
              <CardDescription>Department-wise burnout risk assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(analytics.burnoutRisk.byDepartment).map(([dept, risk]) => (
                  <div key={dept} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{dept}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{risk}%</span>
                        <Badge
                          className={
                            risk >= 30
                              ? "bg-red-100 text-red-800"
                              : risk >= 20
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }
                          variant="secondary"
                        >
                          {risk >= 30 ? "High" : risk >= 20 ? "Medium" : "Low"}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={risk} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diversity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Diversity & Inclusion Compliance</span>
              </CardTitle>
              <CardDescription>Progress towards organizational D&I targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium">Gender Diversity</h4>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {analytics.diversityCompliance.breakdown.gender.current}%
                    </div>
                    <div className="text-sm text-gray-600">
                      Target: {analytics.diversityCompliance.breakdown.gender.target}%
                    </div>
                  </div>
                  <Progress value={analytics.diversityCompliance.breakdown.gender.current} className="h-3" />
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Ethnicity Diversity</h4>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {analytics.diversityCompliance.breakdown.ethnicity.current}%
                    </div>
                    <div className="text-sm text-gray-600">
                      Target: {analytics.diversityCompliance.breakdown.ethnicity.target}%
                    </div>
                  </div>
                  <Progress value={analytics.diversityCompliance.breakdown.ethnicity.current} className="h-3" />
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Age Diversity</h4>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">
                      {analytics.diversityCompliance.breakdown.age.current}%
                    </div>
                    <div className="text-sm text-gray-600">
                      Target: {analytics.diversityCompliance.breakdown.age.target}%
                    </div>
                  </div>
                  <Progress value={analytics.diversityCompliance.breakdown.age.current} className="h-3" />
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-800">Overall D&I Progress</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-700">Current Score: {analytics.diversityCompliance.current}%</span>
                  <Badge className="bg-blue-100 text-blue-800" variant="secondary">
                    {analytics.diversityCompliance.trend > 0 ? "+" : ""}
                    {analytics.diversityCompliance.trend}% this quarter
                  </Badge>
                </div>
                <Progress value={analytics.diversityCompliance.current} className="h-2 mt-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Team Formation Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Average Formation Time</span>
                    <span className="text-lg font-bold">
                      {analytics.teamFormationMetrics.averageFormationTime} days
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Success Rate</span>
                    <span className="text-lg font-bold text-green-600">
                      {analytics.teamFormationMetrics.successRate}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Diversity Score</span>
                    <span className="text-lg font-bold text-blue-600">
                      {analytics.teamFormationMetrics.diversityScore}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>User Engagement</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Daily Active Users</span>
                    <span className="text-lg font-bold">{analytics.systemHealth.userActivity.dailyActiveUsers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Chat Sessions</span>
                    <span className="text-lg font-bold">{analytics.systemHealth.userActivity.chatSessions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Memory Graph Views</span>
                    <span className="text-lg font-bold">{analytics.systemHealth.userActivity.graphViews}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>API Usage</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Current Usage</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold">{analytics.systemHealth.apiUsage.current}</span>
                      <Badge className="bg-green-100 text-green-800" variant="secondary">
                        +{analytics.systemHealth.apiUsage.trend}%
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Hourly Usage Pattern</span>
                    <div className="flex items-end space-x-1 h-16">
                      {analytics.systemHealth.apiUsage.hourlyData.map((usage, index) => (
                        <div
                          key={index}
                          className="bg-blue-500 rounded-t"
                          style={{
                            height: `${(usage / Math.max(...analytics.systemHealth.apiUsage.hourlyData)) * 100}%`,
                            width: "14.28%",
                          }}
                          title={`Hour ${index}: ${usage} requests`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Integration Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.systemHealth.integrations.map((integration) => (
                    <div key={integration.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{integration.name}</p>
                        <p className="text-xs text-gray-500">
                          Last sync: {new Date(integration.lastSync).toLocaleString()}
                        </p>
                      </div>
                      <Badge
                        className={
                          integration.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }
                        variant="secondary"
                      >
                        {integration.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="interventions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Automated Interventions</span>
              </CardTitle>
              <CardDescription>AI-powered wellness interventions and their outcomes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">23</div>
                    <div className="text-sm text-blue-700">Active Interventions</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">89%</div>
                    <div className="text-sm text-green-700">Success Rate</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">156</div>
                    <div className="text-sm text-purple-700">Total This Month</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Recent Interventions</h4>
                  {[
                    {
                      type: "Workload Redistribution",
                      target: "Alex Rodriguez",
                      status: "completed",
                      outcome: "Stress levels reduced by 30%",
                      timestamp: "2 hours ago",
                    },
                    {
                      type: "Manager Check-in",
                      target: "Sarah Chen",
                      status: "in_progress",
                      outcome: "Meeting scheduled",
                      timestamp: "4 hours ago",
                    },
                    {
                      type: "Wellness Workshop",
                      target: "Engineering Team",
                      status: "scheduled",
                      outcome: "15 participants registered",
                      timestamp: "1 day ago",
                    },
                  ].map((intervention, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{intervention.type}</p>
                        <p className="text-sm text-gray-600">Target: {intervention.target}</p>
                        <p className="text-xs text-gray-500">{intervention.outcome}</p>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={
                            intervention.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : intervention.status === "in_progress"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }
                          variant="secondary"
                        >
                          {intervention.status.replace("_", " ")}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">{intervention.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
