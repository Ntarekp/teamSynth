"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Users,
  Calendar,
  Plus,
  ExternalLink,
  FolderSyncIcon as Sync,
  Filter,
} from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  assignee: string
  status: "todo" | "in_progress" | "review" | "completed"
  priority: "high" | "medium" | "low"
  dueDate: string
  project: string
  source: "meeting" | "manual" | "jira" | "asana"
  externalId?: string
  estimatedHours?: number
  actualHours?: number
}

export default function TaskManagementPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignee: "",
    priority: "medium" as const,
    dueDate: "",
    project: "",
  })

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks")
      const data = await response.json()
      setTasks(data.tasks)
    } catch (error) {
      console.error("Failed to fetch tasks:", error)
    } finally {
      setLoading(false)
    }
  }

  const createTask = async () => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create", data: newTask }),
      })
      const data = await response.json()
      if (data.success) {
        setTasks([...tasks, data.task])
        setNewTask({
          title: "",
          description: "",
          assignee: "",
          priority: "medium",
          dueDate: "",
          project: "",
        })
        setShowCreateForm(false)
      }
    } catch (error) {
      console.error("Failed to create task:", error)
    }
  }

  const syncWithJira = async (taskId: string) => {
    setSyncing(true)
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sync_jira", taskId }),
      })
      const data = await response.json()
      if (data.success) {
        // Update task with external ID
        setTasks(
          tasks.map((task) => (task.id === taskId ? { ...task, externalId: data.externalId, source: "jira" } : task)),
        )
      }
    } catch (error) {
      console.error("Failed to sync with Jira:", error)
    } finally {
      setSyncing(false)
    }
  }

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

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "meeting":
        return "🎥"
      case "jira":
        return "🔗"
      case "asana":
        return "📋"
      default:
        return "✏️"
    }
  }

  const tasksByStatus = {
    todo: tasks.filter((t) => t.status === "todo"),
    in_progress: tasks.filter((t) => t.status === "in_progress"),
    review: tasks.filter((t) => t.status === "review"),
    completed: tasks.filter((t) => t.status === "completed"),
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
          <p className="text-gray-600">Integrated task tracking with external tools</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Sync className="mr-2 h-4 w-4" />
            Sync All
          </Button>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      {/* Create Task Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Task</CardTitle>
            <CardDescription>Add a new task to the project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Task title..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Assignee</label>
                <Input
                  value={newTask.assignee}
                  onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                  placeholder="Assign to..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Due Date</label>
                <Input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Task description..."
                rows={3}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={createTask}>Create Task</Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="kanban" className="space-y-4">
        <TabsList>
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="kanban" className="space-y-4">
          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
              <Card key={status}>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold">{statusTasks.length}</div>
                  <div className="text-sm text-gray-600 capitalize">{status.replace("_", " ")}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Kanban Board */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
              <div key={status} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold capitalize">{status.replace("_", " ")}</h3>
                  <Badge variant="outline">{statusTasks.length}</Badge>
                </div>
                <div className="space-y-3">
                  {statusTasks.map((task) => (
                    <Card key={task.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium text-sm leading-tight">{task.title}</h4>
                            <div className="flex items-center space-x-1">
                              <span className="text-xs">{getSourceIcon(task.source)}</span>
                              {task.externalId && <ExternalLink className="h-3 w-3 text-gray-400" />}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Badge className={getPriorityColor(task.priority)} variant="secondary">
                              {task.priority}
                            </Badge>
                            <Badge className={getStatusColor(task.status)} variant="secondary">
                              {task.status.replace("_", " ")}
                            </Badge>
                          </div>

                          <div className="text-xs text-gray-600">
                            <div className="flex items-center space-x-1 mb-1">
                              <Users className="h-3 w-3" />
                              <span>{task.assignee}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                            </div>
                          </div>

                          {task.estimatedHours && (
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span>Progress</span>
                                <span>
                                  {task.actualHours || 0}h / {task.estimatedHours}h
                                </span>
                              </div>
                              <Progress value={((task.actualHours || 0) / task.estimatedHours) * 100} className="h-1" />
                            </div>
                          )}

                          <div className="flex space-x-2">
                            {!task.externalId && task.source !== "jira" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs h-6 bg-transparent"
                                onClick={() => syncWithJira(task.id)}
                                disabled={syncing}
                              >
                                <Sync className="h-3 w-3 mr-1" />
                                Sync to Jira
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Tasks</CardTitle>
              <CardDescription>Complete list of tasks across all projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getSourceIcon(task.source)}</span>
                        {task.status === "completed" ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : task.status === "in_progress" ? (
                          <Clock className="h-5 w-5 text-blue-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-gray-600">{task.description}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500">{task.assignee}</span>
                          <span className="text-xs text-gray-500">{task.project}</span>
                          <span className="text-xs text-gray-500">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(task.priority)} variant="secondary">
                        {task.priority}
                      </Badge>
                      <Badge className={getStatusColor(task.status)} variant="secondary">
                        {task.status.replace("_", " ")}
                      </Badge>
                      {task.externalId && (
                        <Button size="sm" variant="outline">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>🔗</span>
                  <span>Jira Integration</span>
                </CardTitle>
                <CardDescription>Sync tasks with Atlassian Jira</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Status</p>
                    <p className="text-sm text-gray-600">Connected to project TEAM-123</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800" variant="secondary">
                    Connected
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tasks synced</span>
                    <span>{tasks.filter((t) => t.source === "jira").length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Last sync</span>
                    <span>2 minutes ago</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    Configure
                  </Button>
                  <Button size="sm" variant="outline">
                    Sync Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>📋</span>
                  <span>Asana Integration</span>
                </CardTitle>
                <CardDescription>Sync tasks with Asana projects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Status</p>
                    <p className="text-sm text-gray-600">Not connected</p>
                  </div>
                  <Badge className="bg-gray-100 text-gray-800" variant="secondary">
                    Disconnected
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Connect your Asana workspace to sync tasks and projects automatically.
                </p>
                <Button size="sm">Connect Asana</Button>
              </CardContent>
            </Card>
          </div>

          {/* Sync Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Sync Settings</CardTitle>
              <CardDescription>Configure how tasks are synchronized</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Auto-sync Options</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Sync new tasks from meetings</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Update task status changes</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Sync comments and attachments</span>
                    </label>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Sync Frequency</h4>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value="realtime">Real-time</option>
                    <option value="5min">Every 5 minutes</option>
                    <option value="15min">Every 15 minutes</option>
                    <option value="hourly">Hourly</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
