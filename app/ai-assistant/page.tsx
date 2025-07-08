"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Zap,
  Users,
  Calendar,
  BarChart3,
  Send,
  Mic,
  MicOff,
  Settings,
  Sparkles,
  BotIcon as Robot,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "ai" | "agent"
  timestamp: Date
  type?: "text" | "workflow" | "recommendation" | "analysis"
  metadata?: any
}

interface Agent {
  id: string
  name: string
  description: string
  capabilities: string[]
  status: "active" | "busy" | "offline"
  lastExecution?: string
}

interface WorkflowExecution {
  id: string
  agentType: string
  task: string
  status: "running" | "completed" | "failed"
  progress: number
  steps: Array<{
    step: number
    action: string
    status: "pending" | "in_progress" | "completed" | "failed"
    result?: any
  }>
  result?: any
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI assistant powered by open-source LLMs with RAG capabilities. I can help you with autonomous workflows, team optimization, and intelligent decision-making. What would you like to work on today?",
      sender: "ai",
      timestamp: new Date(),
      type: "text",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [agents, setAgents] = useState<Agent[]>([])
  const [activeWorkflows, setActiveWorkflows] = useState<WorkflowExecution[]>([])
  const [sessionId] = useState(`session_${Date.now()}`)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchAgents()
    scrollToBottom()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const fetchAgents = async () => {
    try {
      const response = await fetch("/api/agents/status")
      const data = await response.json()
      setAgents(
        Object.entries(data.agents).map(([id, agent]: [string, any]) => ({
          id,
          ...agent,
        })),
      )
    } catch (error) {
      console.error("Failed to fetch agents:", error)
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")

    // Check if message contains workflow keywords
    const workflowKeywords = ["optimize", "analyze", "schedule", "recommend", "automate", "plan"]
    const isWorkflowRequest = workflowKeywords.some((keyword) => inputMessage.toLowerCase().includes(keyword))

    if (isWorkflowRequest) {
      await handleWorkflowRequest(inputMessage)
    } else {
      await handleChatRequest(inputMessage)
    }
  }

  const handleChatRequest = async () => {
    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: inputMessage,
          context: messages
            .slice(-5)
            .map((m) => `${m.sender}: ${m.content}`)
            .join("\n"),
          userId: "current_user",
          sessionId,
        }),
      })

      const data = await response.json()

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: "ai",
        timestamp: new Date(),
        type: "text",
        metadata: { model: data.model, sessionId: data.sessionId },
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Chat request failed:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error. Please try again.",
        sender: "ai",
        timestamp: new Date(),
        type: "text",
      }
      setMessages((prev) => [...prev, errorMessage])
    }
  }

  const handleWorkflowRequest = async (request: string) => {
    // Determine which agent to use based on request content
    const agentType = determineAgentType(request)

    try {
      const response = await fetch(`/api/agents/execute/${agentType}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: request,
          context: {
            previousMessages: messages.slice(-3),
            userPreferences: {},
            currentTime: new Date().toISOString(),
          },
          parameters: {},
        }),
      })

      const data = await response.json()

      if (data.success) {
        const workflowMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: `I've initiated an autonomous workflow to handle your request. Execution ID: ${data.executionId}`,
          sender: "agent",
          timestamp: new Date(),
          type: "workflow",
          metadata: {
            executionId: data.executionId,
            agentType: data.agentType,
            steps: data.steps,
            recommendations: data.recommendations,
          },
        }

        setMessages((prev) => [...prev, workflowMessage])

        // Add to active workflows
        const workflow: WorkflowExecution = {
          id: data.executionId,
          agentType: data.agentType,
          task: request,
          status: "completed",
          progress: 100,
          steps: data.steps,
          result: data.result,
        }

        setActiveWorkflows((prev) => [...prev, workflow])

        // Add results message
        setTimeout(() => {
          const resultsMessage: Message = {
            id: (Date.now() + 2).toString(),
            content: formatWorkflowResults(data.result),
            sender: "agent",
            timestamp: new Date(),
            type: "analysis",
            metadata: { workflowId: data.executionId, results: data.result },
          }
          setMessages((prev) => [...prev, resultsMessage])
        }, 1000)
      }
    } catch (error) {
      console.error("Workflow execution failed:", error)
    }
  }

  const determineAgentType = (request: string): string => {
    const lowerRequest = request.toLowerCase()

    if (lowerRequest.includes("meeting") || lowerRequest.includes("schedule")) {
      return "meeting-optimizer"
    } else if (
      lowerRequest.includes("wellness") ||
      lowerRequest.includes("burnout") ||
      lowerRequest.includes("stress")
    ) {
      return "team-wellness"
    } else if (lowerRequest.includes("productivity") || lowerRequest.includes("efficiency")) {
      return "productivity-enhancer"
    } else if (lowerRequest.includes("decision") || lowerRequest.includes("choose")) {
      return "decision-facilitator"
    } else {
      return "knowledge-curator"
    }
  }

  const formatWorkflowResults = (results: any): string => {
    if (!results) return "Workflow completed successfully."

    if (typeof results === "string") return results

    if (results.summary) return results.summary

    return `Workflow completed with the following results:\n${JSON.stringify(results, null, 2)}`
  }

  const handleVoiceInput = () => {
    if (!isListening) {
      // Start voice recognition
      setIsListening(true)
      // Implementation would use Web Speech API
      setTimeout(() => {
        setIsListening(false)
        setInputMessage("Schedule a team meeting for next week")
      }, 3000)
    } else {
      setIsListening(false)
    }
  }

  const quickActions = [
    {
      icon: Calendar,
      label: "Optimize Meeting",
      prompt: "Help me optimize our upcoming team meeting for maximum productivity",
    },
    {
      icon: Users,
      label: "Team Wellness Check",
      prompt: "Analyze current team wellness and suggest interventions if needed",
    },
    {
      icon: BarChart3,
      label: "Performance Analysis",
      prompt: "Analyze team performance trends and suggest improvements",
    },
    {
      icon: Brain,
      label: "Decision Support",
      prompt: "Help me make a data-driven decision about our project priorities",
    },
  ]

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                <Brain className="h-6 w-6 text-blue-600" />
                <span>AI Assistant</span>
              </h1>
              <p className="text-gray-600">Autonomous workflows with open-source LLMs & RAG</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-100 text-green-800" variant="secondary">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                Llama 3.1 Active
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-3xl ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white"
                    : message.sender === "agent"
                      ? "bg-purple-100 border border-purple-200 text-purple-900"
                      : "bg-white border border-gray-200 text-gray-900"
                } rounded-2xl px-4 py-3 shadow-sm`}
              >
                {message.sender !== "user" && (
                  <div className="flex items-center space-x-2 mb-2">
                    {message.sender === "agent" ? <Robot className="h-4 w-4" /> : <Brain className="h-4 w-4" />}
                    <span className="text-xs font-medium">
                      {message.sender === "agent" ? "Autonomous Agent" : "AI Assistant"}
                    </span>
                    {message.type && message.type !== "text" && (
                      <Badge variant="outline" className="text-xs">
                        {message.type}
                      </Badge>
                    )}
                  </div>
                )}

                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>

                {message.metadata?.recommendations && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs font-medium opacity-75">Recommendations:</p>
                    {message.metadata.recommendations.map((rec: string, index: number) => (
                      <div key={index} className="text-xs opacity-75 flex items-start space-x-1">
                        <Sparkles className="h-3 w-3 mt-0.5 flex-shrink-0" />
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between mt-2">
                  <span className={`text-xs ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  {message.metadata?.model && <span className="text-xs opacity-75">{message.metadata.model}</span>}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-50 border-t border-gray-200 p-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setInputMessage(action.prompt)}
                className="text-xs bg-white"
              >
                <action.icon className="h-3 w-3 mr-1" />
                {action.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Input
                placeholder="Ask me anything or request an autonomous workflow..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="pr-12"
              />
              <Button
                size="sm"
                variant="ghost"
                onClick={handleVoiceInput}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                {isListening ? <MicOff className="h-4 w-4 text-red-500" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
            <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
        <Tabs defaultValue="agents" className="flex-1">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="workflows">Workflows</TabsTrigger>
          </TabsList>

          <TabsContent value="agents" className="flex-1 p-4 space-y-4">
            <div>
              <h3 className="font-semibold mb-3">Available Agents</h3>
              <div className="space-y-3">
                {agents.map((agent) => (
                  <Card key={agent.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{agent.name}</h4>
                        <Badge
                          className={
                            agent.status === "active"
                              ? "bg-green-100 text-green-800"
                              : agent.status === "busy"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                          }
                          variant="secondary"
                        >
                          {agent.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{agent.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {agent.capabilities.slice(0, 3).map((capability, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {capability.replace("_", " ")}
                          </Badge>
                        ))}
                        {agent.capabilities.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{agent.capabilities.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="workflows" className="flex-1 p-4 space-y-4">
            <div>
              <h3 className="font-semibold mb-3">Active Workflows</h3>
              <div className="space-y-3">
                {activeWorkflows.map((workflow) => (
                  <Card key={workflow.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{workflow.agentType.replace("-", " ")}</h4>
                        <Badge
                          className={
                            workflow.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : workflow.status === "running"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                          }
                          variant="secondary"
                        >
                          {workflow.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">{workflow.task}</p>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{workflow.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div
                            className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                            style={{ width: `${workflow.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="mt-3 space-y-1">
                        {workflow.steps.slice(0, 3).map((step, index) => (
                          <div key={index} className="flex items-center space-x-2 text-xs">
                            {step.status === "completed" ? (
                              <CheckCircle className="h-3 w-3 text-green-500" />
                            ) : step.status === "in_progress" ? (
                              <Clock className="h-3 w-3 text-blue-500" />
                            ) : step.status === "failed" ? (
                              <AlertCircle className="h-3 w-3 text-red-500" />
                            ) : (
                              <div className="h-3 w-3 rounded-full border border-gray-300" />
                            )}
                            <span className="text-gray-600">{step.action}</span>
                          </div>
                        ))}
                        {workflow.steps.length > 3 && (
                          <p className="text-xs text-gray-500">+{workflow.steps.length - 3} more steps</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {activeWorkflows.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <Zap className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No active workflows</p>
                    <p className="text-xs">Request an autonomous workflow to get started</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
