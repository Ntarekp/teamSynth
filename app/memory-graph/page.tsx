"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Brain, Search, Filter, Download, AlertTriangle, Users, Calendar, FileText, Lightbulb, X } from "lucide-react"

interface GraphNode {
  id: string
  label: string
  type: "topic" | "decision" | "person" | "project"
  x: number
  y: number
  connections: string[]
  metadata: {
    date?: string
    participants?: string[]
    project?: string
    priority?: "high" | "medium" | "low"
  }
}

export default function MemoryGraphPage() {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    topics: true,
    decisions: true,
    people: true,
    projects: true,
    dateRange: "all",
  })
  const [showAlert, setShowAlert] = useState(true)

  const graphNodes: GraphNode[] = [
    {
      id: "1",
      label: "API Rate Limiting",
      type: "topic",
      x: 300,
      y: 200,
      connections: ["2", "3", "7"],
      metadata: {
        date: "2024-01-15",
        participants: ["Sarah Chen", "Mike Johnson"],
        project: "API Security",
        priority: "high",
      },
    },
    {
      id: "2",
      label: "Database Migration",
      type: "decision",
      x: 500,
      y: 150,
      connections: ["1", "4", "5"],
      metadata: {
        date: "2024-01-14",
        participants: ["Mike Johnson", "Alex Rodriguez"],
        project: "Infrastructure",
        priority: "high",
      },
    },
    {
      id: "3",
      label: "Sarah Chen",
      type: "person",
      x: 200,
      y: 300,
      connections: ["1", "6", "8"],
      metadata: {
        project: "Multiple",
      },
    },
    {
      id: "4",
      label: "Mobile App Features",
      type: "project",
      x: 600,
      y: 250,
      connections: ["2", "5", "9"],
      metadata: {
        date: "2024-01-16",
        participants: ["Lisa Park", "David Kim"],
        priority: "medium",
      },
    },
    {
      id: "5",
      label: "Performance Optimization",
      type: "topic",
      x: 450,
      y: 350,
      connections: ["2", "4", "7"],
      metadata: {
        date: "2024-01-13",
        participants: ["Alex Rodriguez", "Mike Johnson"],
        project: "Performance",
        priority: "high",
      },
    },
    {
      id: "6",
      label: "User Feedback Analysis",
      type: "decision",
      x: 150,
      y: 400,
      connections: ["3", "8"],
      metadata: {
        date: "2024-01-12",
        participants: ["Sarah Chen", "Lisa Park"],
        project: "Product Strategy",
        priority: "medium",
      },
    },
    {
      id: "7",
      label: "Security Review",
      type: "topic",
      x: 350,
      y: 450,
      connections: ["1", "5"],
      metadata: {
        date: "2024-01-15",
        participants: ["Alex Rodriguez", "Mike Johnson"],
        project: "Security",
        priority: "high",
      },
    },
    {
      id: "8",
      label: "Lisa Park",
      type: "person",
      x: 100,
      y: 350,
      connections: ["3", "6"],
      metadata: {
        project: "Product Strategy",
      },
    },
    {
      id: "9",
      label: "Feature Prioritization",
      type: "decision",
      x: 650,
      y: 350,
      connections: ["4"],
      metadata: {
        date: "2024-01-16",
        participants: ["Lisa Park", "David Kim", "Sarah Chen"],
        project: "Mobile App",
        priority: "medium",
      },
    },
  ]

  const getNodeColor = (type: string) => {
    switch (type) {
      case "topic":
        return "#3B82F6" // blue
      case "decision":
        return "#10B981" // green
      case "person":
        return "#8B5CF6" // purple
      case "project":
        return "#F59E0B" // orange
      default:
        return "#6B7280" // gray
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "topic":
        return <Lightbulb className="h-4 w-4" />
      case "decision":
        return <FileText className="h-4 w-4" />
      case "person":
        return <Users className="h-4 w-4" />
      case "project":
        return <Brain className="h-4 w-4" />
      default:
        return <Brain className="h-4 w-4" />
    }
  }

  const filteredNodes = graphNodes.filter((node) => {
    if (!filters[`${node.type}s` as keyof typeof filters]) return false
    if (searchTerm && !node.label.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

  return (
    <div className="h-screen bg-gray-900 flex">
      {/* Left Sidebar - Filters */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-xl font-bold text-white mb-2">Memory Graph</h1>
          <p className="text-gray-400 text-sm">Interactive knowledge visualization</p>
        </div>

        {/* Search */}
        <div className="p-6 border-b border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search nodes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-white font-medium mb-4 flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </h3>

          <div className="space-y-4">
            <div>
              <h4 className="text-gray-300 text-sm font-medium mb-2">Node Types</h4>
              <div className="space-y-2">
                {[
                  { key: "topics", label: "Topics", color: "bg-blue-500" },
                  { key: "decisions", label: "Decisions", color: "bg-green-500" },
                  { key: "people", label: "People", color: "bg-purple-500" },
                  { key: "projects", label: "Projects", color: "bg-orange-500" },
                ].map((filter) => (
                  <div key={filter.key} className="flex items-center space-x-3">
                    <Checkbox
                      id={filter.key}
                      checked={filters[filter.key as keyof typeof filters] as boolean}
                      onCheckedChange={(checked) => setFilters({ ...filters, [filter.key]: checked })}
                    />
                    <div className={`w-3 h-3 rounded-full ${filter.color}`}></div>
                    <label htmlFor={filter.key} className="text-gray-300 text-sm">
                      {filter.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-gray-300 text-sm font-medium mb-2">Date Range</h4>
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-md px-3 py-2"
              >
                <option value="all">All time</option>
                <option value="week">This week</option>
                <option value="month">This month</option>
                <option value="quarter">This quarter</option>
              </select>
            </div>
          </div>
        </div>

        {/* Node Details */}
        <div className="flex-1 p-6">
          <h3 className="text-white font-medium mb-4">Node Details</h3>
          {selectedNode ? (
            <Card className="bg-gray-700 border-gray-600">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg flex items-center space-x-2">
                  {getTypeIcon(selectedNode.type)}
                  <span>{selectedNode.label}</span>
                </CardTitle>
                <Badge style={{ backgroundColor: getNodeColor(selectedNode.type) }} className="w-fit text-white">
                  {selectedNode.type}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedNode.metadata.date && (
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{selectedNode.metadata.date}</span>
                  </div>
                )}

                {selectedNode.metadata.participants && (
                  <div>
                    <h4 className="text-gray-300 text-sm font-medium mb-1">Participants</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedNode.metadata.participants.map((participant, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs text-gray-300 border-gray-500">
                          {participant}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedNode.metadata.project && (
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Brain className="h-4 w-4" />
                    <span className="text-sm">{selectedNode.metadata.project}</span>
                  </div>
                )}

                {selectedNode.metadata.priority && (
                  <div>
                    <Badge
                      className={`${
                        selectedNode.metadata.priority === "high"
                          ? "bg-red-600"
                          : selectedNode.metadata.priority === "medium"
                            ? "bg-yellow-600"
                            : "bg-green-600"
                      } text-white`}
                    >
                      {selectedNode.metadata.priority} priority
                    </Badge>
                  </div>
                )}

                <div>
                  <h4 className="text-gray-300 text-sm font-medium mb-1">Connections</h4>
                  <p className="text-gray-400 text-sm">{selectedNode.connections.length} connected nodes</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center text-gray-400">
              <Brain className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Click a node to view details</p>
            </div>
          )}
        </div>

        {/* Export Button */}
        <div className="p-6 border-t border-gray-700">
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            <Download className="mr-2 h-4 w-4" />
            Export Graph
          </Button>
        </div>
      </div>

      {/* Main Graph Area */}
      <div className="flex-1 relative">
        {/* Alert Banner */}
        {showAlert && (
          <div className="absolute top-4 left-4 right-4 z-10">
            <div className="bg-orange-600 text-white p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5" />
                <div>
                  <p className="font-medium">Cognitive Mismatch Detected</p>
                  <p className="text-sm opacity-90">
                    3 team members have different understanding of "API Rate Limiting" requirements
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAlert(false)}
                className="text-white hover:bg-orange-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Graph Canvas */}
        <div className="w-full h-full relative overflow-hidden">
          <svg className="w-full h-full">
            {/* Render connections */}
            {filteredNodes.map((node) =>
              node.connections
                .filter((connectionId) => filteredNodes.find((n) => n.id === connectionId))
                .map((connectionId) => {
                  const targetNode = filteredNodes.find((n) => n.id === connectionId)
                  if (!targetNode) return null

                  return (
                    <line
                      key={`${node.id}-${connectionId}`}
                      x1={node.x}
                      y1={node.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke="#374151"
                      strokeWidth="2"
                      opacity="0.6"
                    />
                  )
                }),
            )}

            {/* Render nodes */}
            {filteredNodes.map((node) => (
              <g key={node.id}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="20"
                  fill={getNodeColor(node.type)}
                  stroke={selectedNode?.id === node.id ? "#FFFFFF" : "transparent"}
                  strokeWidth="3"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setSelectedNode(node)}
                />
                <text
                  x={node.x}
                  y={node.y + 35}
                  textAnchor="middle"
                  className="fill-white text-xs font-medium pointer-events-none"
                  style={{ fontSize: "12px" }}
                >
                  {node.label.length > 15 ? `${node.label.substring(0, 15)}...` : node.label}
                </text>
              </g>
            ))}
          </svg>

          {/* Graph Controls */}
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <Button variant="outline" size="sm" className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700">
              Zoom In
            </Button>
            <Button variant="outline" size="sm" className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700">
              Zoom Out
            </Button>
            <Button variant="outline" size="sm" className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700">
              Reset View
            </Button>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-gray-800 border border-gray-600 rounded-lg p-4">
            <h4 className="text-white font-medium mb-3">Legend</h4>
            <div className="space-y-2">
              {[
                { type: "topic", label: "Topics", color: "#3B82F6" },
                { type: "decision", label: "Decisions", color: "#10B981" },
                { type: "person", label: "People", color: "#8B5CF6" },
                { type: "project", label: "Projects", color: "#F59E0B" },
              ].map((item) => (
                <div key={item.type} className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-300 text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
