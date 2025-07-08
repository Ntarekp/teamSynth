import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Users, Brain, Calendar, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

export function DashboardOverview() {
  const stats = [
    {
      title: "Active Teams",
      value: "12",
      change: "+3 this week",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Memory Nodes",
      value: "2,847",
      change: "+156 today",
      icon: Brain,
      color: "text-purple-600",
    },
    {
      title: "Meetings Analyzed",
      value: "89",
      change: "+12 today",
      icon: Calendar,
      color: "text-green-600",
    },
    {
      title: "Well-being Score",
      value: "87%",
      change: "+2% this week",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ]

  const recentActivities = [
    {
      type: "team_formed",
      message: "New team formed for Project Alpha",
      time: "2 minutes ago",
      status: "success",
    },
    {
      type: "meeting_analyzed",
      message: "Marketing sync meeting processed",
      time: "15 minutes ago",
      status: "success",
    },
    {
      type: "wellbeing_alert",
      message: "Burnout risk detected for Sarah Chen",
      time: "1 hour ago",
      status: "warning",
    },
    {
      type: "task_completed",
      message: "API integration task completed",
      time: "2 hours ago",
      status: "success",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Real-time monitoring of core components</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Meeting Intelligence</span>
                <span className="text-green-600">98%</span>
              </div>
              <Progress value={98} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Memory Graph Sync</span>
                <span className="text-green-600">95%</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Team Formation Engine</span>
                <span className="text-yellow-600">87%</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Well-being Monitor</span>
                <span className="text-green-600">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest autonomous actions and insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {activity.status === "success" && <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />}
                    {activity.status === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
