"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, AlertCircle, Users, Calendar, ArrowRight, Plus } from "lucide-react"
import { useState } from "react"

interface Task {
  id: string
  title: string
  description: string
  assignee: string
  status: "todo" | "in_progress" | "review" | "completed"
  priority: "high" | "medium" | "low"
  dueDate: string
  project: string
  clarityScore: number
  estimatedHours: number
  actualHours?: number
  dependencies: string[]
}

export function TaskManagement() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const tasks: Task[] = [
    {
      id: "1",
      title: "Implement API Rate Limiting",
      description: "Add rate limiting middleware to prevent API abuse and ensure fair usage",
      assignee: "Mike Johnson",
      status: "in_progress",
      priority: "high",
      dueDate: "2024-01-20T17:00:00Z",
      project: "API Security Enhancement",
      clarityScore: 95,
      estimatedHours: 8,
      actualHours: 5,
      dependencies: ["2"],
    },
    {
      id: "2",
      title: "Database Schema Migration",
      description: "Update user table schema to support new authentication fields",
      assignee: "Alex Rodriguez",
      status: "completed",
      priority: "high",
      dueDate: "2024-01-18T17:00:00Z",
      project: "API Security Enhancement",
      clarityScore: 88,
      estimatedHours: 6,
      actualHours: 7,
      dependencies: [],
    },
    {
      id: "3",
      title: "Mobile App Wireframes",
      description: "Create wireframes for the new mobile application user interface",
      assignee: "Sarah Chen",
      status: "review",
      priority: "medium",
      dueDate: "2024-01-22T17:00:00Z",
      project: "Mobile App Development",
      clarityScore: 92,
      estimatedHours: 12,
      actualHours: 10,
      dependencies: [],
    },
    {
      id: "4",
      title: "User Feedback Analysis",
      description: "Analyze recent user feedback and create actionable insights report",
      assignee: "Lisa Park",
      status: "todo",
      priority: "medium",
      dueDate: "2024-01-25T17:00:00Z",
      project: "Product Strategy",
      clarityScore: 76,
      estimatedHours: 4,
      dependencies: [],
    },
    {
      id: "5",
      title: "Performance Optimization",
      description: "Optimize database queries and improve API response times",
      assignee: "David Kim",
      status: "in_progress",
      priority: "high",
      dueDate: "2024-01-19T17:00:00Z",
      project: "Performance Enhancement",
      clarityScore: 85,
      estimatedHours: 16,
      actualHours: 8,
      dependencies: ["2"],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100"
      case "in_progress":
        return "text-blue-600 bg-blue-100"
      case "review":
        return "text-purple-600 bg-purple-100"
      case "todo":
        return "text-gray-600 bg-gray-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100"
      case "medium":
        return "text-yellow-600 bg-yellow-100"
      case "low":
        return "text-green-600 bg-green-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getClarityColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  const tasksByStatus = {
    todo: tasks.filter((t) => t.status === "todo"),
    in_progress: tasks.filter((t) => t.status === "in_progress"),
    review: tasks.filter((t) => t.status === "review"),
    completed: tasks.filter((t) => t.status === "completed"),
  }

  const overallProgress = Math.round((tasks.filter((t) => t.status === "completed").length / tasks.length) * 100)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5" />
            <span>Autonomous Task Management</span>
          </CardTitle>
          <CardDescription>
            AI-powered task creation, assignment, and progress tracking with clarity feedback
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="kanban" className="space-y-4">
            <TabsList>
              <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="clarity">Clarity Feedback</TabsTrigger>
            </TabsList>

            <TabsContent value="kanban" className="space-y-4">
              {/* Progress Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">To Do</span>
                    </div>
                    <div className="text-2xl font-bold">{tasksByStatus.todo.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <ArrowRight className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">In Progress</span>
                    </div>
                    <div className="text-2xl font-bold">{tasksByStatus.in_progress.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertCircle className="h-4 w-4 text-purple-500" />
                      <span className="text-sm font-medium">Review</span>
                    </div>
                    <div className="text-2xl font-bold">{tasksByStatus.review.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Completed</span>
                    </div>
                    <div className="text-2xl font-bold">{tasksByStatus.completed.length}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Kanban Board */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
                  <div key={status} className="space-y-4">
                    <h3 className="font-semibold text-lg capitalize flex items-center space-x-2">
                      <span>{status.replace("_", " ")}</span>
                      <Badge variant="outline">{statusTasks.length}</Badge>
                    </h3>

                    <div className="space-y-3">
                      {statusTasks.map((task) => (
                        <Card
                          key={task.id}
                          className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => setSelectedTask(task)}
                        >
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div className="flex items-start justify-between">
                                <h4 className="font-medium text-sm leading-tight">{task.title}</h4>
                                <Badge className={getPriorityColor(task.priority)} variant="secondary">
                                  {task.priority}
                                </Badge>
                              </div>

                              <p className="text-xs text-gray-600 line-clamp-2">{task.description}</p>

                              <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center space-x-1">
                                  <Users className="h-3 w-3" />
                                  <span>{task.assignee}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                                </div>
                              </div>

                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>Clarity Score</span>
                                  <span className={getClarityColor(task.clarityScore)}>{task.clarityScore}%</span>
                                </div>
                                <Progress value={task.clarityScore} className="h-1" />
                              </div>

                              {task.actualHours && (
                                <div className="space-y-1">
                                  <div className="flex justify-between text-xs">
                                    <span>Progress</span>
                                    <span>
                                      {task.actualHours}h / {task.estimatedHours}h
                                    </span>
                                  </div>
                                  <Progress value={(task.actualHours / task.estimatedHours) * 100} className="h-1" />
                                </div>
                              )}

                              <div className="pt-2 border-t">
                                <Badge variant="outline" className="text-xs">
                                  {task.project}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      {status === "todo" && (
                        <Card className="border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors">
                          <CardContent className="p-4">
                            <Button
                              variant="ghost"
                              className="w-full h-full min-h-[100px] flex flex-col items-center justify-center space-y-2"
                            >
                              <Plus className="h-6 w-6 text-gray-400" />
                              <span className="text-sm text-gray-500">Add New Task</span>
                            </Button>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Overall Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{overallProgress}%</div>
                    <Progress value={overallProgress} className="mb-2 h-3" />
                    <p className="text-sm text-gray-600">
                      {tasks.filter((t) => t.status === "completed").length} of {tasks.length} tasks completed
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Average Clarity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {Math.round(tasks.reduce((sum, task) => sum + task.clarityScore, 0) / tasks.length)}%
                    </div>
                    <Progress
                      value={Math.round(tasks.reduce((sum, task) => sum + task.clarityScore, 0) / tasks.length)}
                      className="mb-2 h-3"
                    />
                    <p className="text-sm text-gray-600">Task clarity across all projects</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Time Accuracy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-600 mb-2">87%</div>
                    <Progress value={87} className="mb-2 h-3" />
                    <p className="text-sm text-gray-600">Estimation vs actual time</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Project Breakdown</CardTitle>
                  <CardDescription>Task distribution across active projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from(new Set(tasks.map((t) => t.project))).map((project) => {
                      const projectTasks = tasks.filter((t) => t.project === project)
                      const completedTasks = projectTasks.filter((t) => t.status === "completed")
                      const progress = Math.round((completedTasks.length / projectTasks.length) * 100)

                      return (
                        <div key={project} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">{project}</h4>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">
                                {completedTasks.length}/{projectTasks.length}
                              </span>
                              <Badge variant="outline">{progress}%</Badge>
                            </div>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="clarity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Task Clarity Feedback</CardTitle>
                  <CardDescription>
                    AI-powered analysis of task clarity and actionable improvement suggestions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tasks
                      .filter((task) => task.clarityScore < 90)
                      .sort((a, b) => a.clarityScore - b.clarityScore)
                      .map((task) => (
                        <Card key={task.id} className="border-l-4 border-l-yellow-500">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="font-medium">{task.title}</h4>
                                <p className="text-sm text-gray-600">Assigned to {task.assignee}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className={getClarityColor(task.clarityScore)} variant="outline">
                                  {task.clarityScore}% clarity
                                </Badge>
                                <Badge className={getPriorityColor(task.priority)} variant="secondary">
                                  {task.priority}
                                </Badge>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div>
                                <h5 className="font-medium text-sm mb-2">Clarity Issues Detected:</h5>
                                <ul className="text-sm text-gray-600 space-y-1">
                                  {task.clarityScore < 80 && (
                                    <li className="flex items-start space-x-2">
                                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                      <span>Acceptance criteria not clearly defined</span>
                                    </li>
                                  )}
                                  {task.clarityScore < 85 && (
                                    <li className="flex items-start space-x-2">
                                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                                      <span>Dependencies could be more explicit</span>
                                    </li>
                                  )}
                                  {task.clarityScore < 90 && (
                                    <li className="flex items-start space-x-2">
                                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                      <span>Technical requirements need more detail</span>
                                    </li>
                                  )}
                                </ul>
                              </div>

                              <div>
                                <h5 className="font-medium text-sm mb-2">AI Suggestions:</h5>
                                <ul className="text-sm text-green-700 space-y-1">
                                  <li className="flex items-start space-x-2">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Add specific success metrics and testing criteria</span>
                                  </li>
                                  <li className="flex items-start space-x-2">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Include mockups or wireframes for UI changes</span>
                                  </li>
                                  <li className="flex items-start space-x-2">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Schedule clarification meeting with stakeholders</span>
                                  </li>
                                </ul>
                              </div>

                              <div className="pt-3 border-t flex space-x-2">
                                <Button size="sm" variant="outline">
                                  Auto-Improve Task
                                </Button>
                                <Button size="sm" variant="outline">
                                  Schedule Clarification
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
