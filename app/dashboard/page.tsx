import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  MessageCircle,
  Calendar,
  Users,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle,
  Brain,
  Plus,
} from "lucide-react"

export default function DashboardPage() {
  const upcomingMeetings = [
    {
      title: "Product Strategy Sync",
      time: "2:00 PM",
      participants: 4,
      status: "starting_soon",
    },
    {
      title: "Engineering Standup",
      time: "3:30 PM",
      participants: 6,
      status: "scheduled",
    },
    {
      title: "Client Feedback Review",
      time: "4:00 PM",
      participants: 3,
      status: "scheduled",
    },
  ]

  const activeProjects = [
    {
      name: "Mobile App Development",
      progress: 68,
      status: "on_track",
      dueDate: "Jan 25",
      teamSize: 4,
    },
    {
      name: "API Security Enhancement",
      progress: 85,
      status: "ahead",
      dueDate: "Jan 20",
      teamSize: 3,
    },
    {
      name: "Performance Optimization",
      progress: 42,
      status: "at_risk",
      dueDate: "Jan 22",
      teamSize: 2,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on_track":
        return "text-green-600 bg-green-100"
      case "ahead":
        return "text-blue-600 bg-blue-100"
      case "at_risk":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getMeetingStatusColor = (status: string) => {
    switch (status) {
      case "starting_soon":
        return "text-orange-600 bg-orange-100"
      case "scheduled":
        return "text-blue-600 bg-blue-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Good afternoon, Sarah!</h1>
          <p className="text-gray-600">Here's what's happening with your team today</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
          <MessageCircle className="mr-2 h-4 w-4" />
          Quick Wellness Chat
        </Button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Current Mood</p>
                <p className="text-2xl font-bold text-gray-900">Great</p>
                <p className="text-xs text-green-600">+2 from yesterday</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Team Health</p>
                <p className="text-2xl font-bold text-gray-900">87%</p>
                <p className="text-xs text-blue-600">Above average</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Memory Nodes</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
                <p className="text-xs text-purple-600">+12 today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Productivity</p>
                <p className="text-2xl font-bold text-gray-900">92%</p>
                <p className="text-xs text-orange-600">+5% this week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Meetings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Upcoming Meetings</span>
            </CardTitle>
            <CardDescription>Your schedule for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingMeetings.map((meeting, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-900">{meeting.title}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{meeting.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{meeting.participants} people</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Badge className={getMeetingStatusColor(meeting.status)} variant="secondary">
                    {meeting.status === "starting_soon" ? "Starting Soon" : "Scheduled"}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full bg-transparent">
                <Plus className="mr-2 h-4 w-4" />
                Schedule Meeting
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Active Projects */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Active Projects</span>
            </CardTitle>
            <CardDescription>Projects you're currently working on</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeProjects.map((project, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{project.name}</h4>
                    <Badge className={getStatusColor(project.status)} variant="secondary">
                      {project.status.replace("_", " ")}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{project.teamSize} team members</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>Due {project.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full bg-transparent">
                <Plus className="mr-2 h-4 w-4" />
                Create Project
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Wellness Check */}
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-700">
              <Heart className="h-5 w-5" />
              <span>Daily Wellness Check</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-700 mb-4">
              How are you feeling today? Your input helps us support the team better.
            </p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <Button variant="outline" size="sm" className="text-xs bg-transparent">
                😊 Great
              </Button>
              <Button variant="outline" size="sm" className="text-xs bg-transparent">
                😐 Okay
              </Button>
              <Button variant="outline" size="sm" className="text-xs bg-transparent">
                😔 Struggling
              </Button>
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700">Submit Check-in</Button>
          </CardContent>
        </Card>

        {/* Memory Graph Insights */}
        <Card className="border-purple-200 bg-purple-50/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-purple-700">
              <Brain className="h-5 w-5" />
              <span>Memory Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <p className="text-sm text-purple-700">3 decisions need follow-up from yesterday's meeting</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <p className="text-sm text-purple-700">New connection detected between API and mobile projects</p>
              </div>
            </div>
            <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">View Memory Graph</Button>
          </CardContent>
        </Card>

        {/* Team Alerts */}
        <Card className="border-orange-200 bg-orange-50/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-orange-700">
              <AlertCircle className="h-5 w-5" />
              <span>Team Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <p className="text-sm text-orange-700">Mike's workload increased 30% this week</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <p className="text-sm text-red-700">Alex showing signs of burnout risk</p>
              </div>
            </div>
            <Button className="w-full mt-4 bg-orange-600 hover:bg-orange-700">Review Alerts</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
