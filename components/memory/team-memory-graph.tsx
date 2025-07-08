"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Users, Brain, ArrowRight, Clock } from "lucide-react"
import { useState } from "react"

interface MemoryNode {
  id: string
  title: string
  type: "decision" | "action_item" | "insight" | "blocker"
  participants: string[]
  timestamp: string
  connections: string[]
  priority: "high" | "medium" | "low"
  status: "pending" | "in_progress" | "completed"
}

export function TeamMemoryGraph() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedNode, setSelectedNode] = useState<MemoryNode | null>(null)

  const memoryNodes: MemoryNode[] = [
    {
      id: "1",
      title: "API Rate Limiting Implementation",
      type: "decision",
      participants: ["Sarah Chen", "Mike Johnson", "Alex Rodriguez"],
      timestamp: "2024-01-15T10:30:00Z",
      connections: ["2", "3"],
      priority: "high",
      status: "in_progress",
    },
    {
      id: "2",
      title: "Database Migration Timeline",
      type: "action_item",
      participants: ["Mike Johnson", "Lisa Park"],
      timestamp: "2024-01-15T11:15:00Z",
      connections: ["1", "4"],
      priority: "high",
      status: "pending",
    },
    {
      id: "3",
      title: "User Feedback Analysis",
      type: "insight",
      participants: ["Sarah Chen", "David Kim"],
      timestamp: "2024-01-15T14:20:00Z",
      connections: ["1", "5"],
      priority: "medium",
      status: "completed",
    },
    {
      id: "4",
      title: "Performance Bottleneck in Auth Service",
      type: "blocker",
      participants: ["Alex Rodriguez", "Mike Johnson"],
      timestamp: "2024-01-15T16:45:00Z",
      connections: ["2"],
      priority: "high",
      status: "pending",
    },
    {
      id: "5",
      title: "Mobile App Feature Prioritization",
      type: "decision",
      participants: ["Lisa Park", "David Kim", "Sarah Chen"],
      timestamp: "2024-01-16T09:00:00Z",
      connections: ["3"],
      priority: "medium",
      status: "in_progress",
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "decision":
        return "bg-blue-100 text-blue-800"
      case "action_item":
        return "bg-green-100 text-green-800"
      case "insight":
        return "bg-purple-100 text-purple-800"
      case "blocker":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-500"
      case "medium":
        return "border-yellow-500"
      case "low":
        return "border-green-500"
      default:
        return "border-gray-300"
    }
  }

  const filteredNodes = memoryNodes.filter(
    (node) =>
      node.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.participants.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>Team Memory Graph</span>
          </CardTitle>
          <CardDescription>Interconnected knowledge from meetings, decisions, and team interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search memory nodes, participants, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Memory Nodes List */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Memory Nodes</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredNodes.map((node) => (
                  <Card
                    key={node.id}
                    className={`cursor-pointer transition-all hover:shadow-md border-l-4 ${getPriorityColor(node.priority)} ${
                      selectedNode?.id === node.id ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => setSelectedNode(node)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm">{node.title}</h4>
                        <Badge className={getTypeColor(node.type)} variant="secondary">
                          {node.type.replace("_", " ")}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{node.participants.length}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{new Date(node.timestamp).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex flex-wrap gap-1">
                          {node.participants.slice(0, 3).map((participant, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {participant}
                            </Badge>
                          ))}
                          {node.participants.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{node.participants.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Node Details */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Node Details</h3>
              {selectedNode ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{selectedNode.title}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge className={getTypeColor(selectedNode.type)} variant="secondary">
                        {selectedNode.type.replace("_", " ")}
                      </Badge>
                      <Badge variant="outline">{selectedNode.status}</Badge>
                      <Badge variant="outline">{selectedNode.priority} priority</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Participants</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedNode.participants.map((participant, idx) => (
                          <Badge key={idx} variant="outline">
                            {participant}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Connected Nodes</h4>
                      <div className="space-y-2">
                        {selectedNode.connections.map((connectionId) => {
                          const connectedNode = memoryNodes.find((n) => n.id === connectionId)
                          return connectedNode ? (
                            <div key={connectionId} className="flex items-center space-x-2 text-sm">
                              <ArrowRight className="h-3 w-3 text-gray-400" />
                              <span>{connectedNode.title}</span>
                            </div>
                          ) : null
                        })}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Timeline</h4>
                      <p className="text-sm text-gray-600">
                        Created: {new Date(selectedNode.timestamp).toLocaleString()}
                      </p>
                    </div>

                    <div className="pt-4 border-t">
                      <Button className="w-full">View Full Context</Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center text-gray-500">
                    <Brain className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Select a memory node to view details and connections</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
