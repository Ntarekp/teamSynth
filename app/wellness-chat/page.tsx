"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, Heart, Shield, TrendingUp, Smile, Meh, Frown, BarChart3 } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  mood?: "positive" | "neutral" | "negative"
}

export default function WellnessChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your wellness companion. I'm here to provide anonymous, confidential support whenever you need it. How are you feeling today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [currentMood, setCurrentMood] = useState<"positive" | "neutral" | "negative" | null>(null)
  const [isPrivateMode, setIsPrivateMode] = useState(true)

  const conversationHistory = [
    { date: "Today", active: true },
    { date: "Yesterday", active: false },
    { date: "Jan 15", active: false },
    { date: "Jan 12", active: false },
    { date: "Jan 10", active: false },
  ]

  const quickActions = [
    { text: "I'm feeling stressed", mood: "negative" as const },
    { text: "I need to talk about work", mood: "neutral" as const },
    { text: "I want to journal", mood: "neutral" as const },
    { text: "I'm having a great day", mood: "positive" as const },
  ]

  const moodData = [
    { date: "Mon", score: 7 },
    { date: "Tue", score: 6 },
    { date: "Wed", score: 8 },
    { date: "Thu", score: 5 },
    { date: "Fri", score: 7 },
    { date: "Sat", score: 9 },
    { date: "Sun", score: 8 },
  ]

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
      mood: currentMood || undefined,
    }

    setMessages([...messages, newMessage])
    setInputMessage("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Thank you for sharing that with me. I understand this can be challenging. Would you like to explore some coping strategies, or would you prefer to talk more about what's on your mind?",
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const handleQuickAction = (action: (typeof quickActions)[0]) => {
    setInputMessage(action.text)
    setCurrentMood(action.mood)
  }

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case "positive":
        return <Smile className="h-4 w-4 text-green-500" />
      case "negative":
        return <Frown className="h-4 w-4 text-red-500" />
      default:
        return <Meh className="h-4 w-4 text-yellow-500" />
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Wellness Chat</h1>
              <p className="text-sm text-gray-600">24/7 Anonymous Support</p>
            </div>
          </div>

          {/* Privacy Toggle */}
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Private Mode</span>
            </div>
            <Badge className="bg-green-100 text-green-800" variant="secondary">
              {isPrivateMode ? "ON" : "OFF"}
            </Badge>
          </div>
        </div>

        {/* Mood Tracker */}
        <div className="p-6 border-b">
          <h3 className="font-medium text-gray-900 mb-4 flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Weekly Mood</span>
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">This week average</span>
              <span className="font-medium text-blue-600">7.1/10</span>
            </div>
            <div className="flex items-center space-x-1">
              {moodData.map((day, index) => (
                <div key={index} className="flex-1 text-center">
                  <div className="w-full bg-blue-200 rounded-sm mb-1" style={{ height: `${day.score * 4}px` }}></div>
                  <span className="text-xs text-gray-500">{day.date}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span>+0.8 improvement from last week</span>
            </div>
          </div>
        </div>

        {/* Conversation History */}
        <div className="flex-1 p-6">
          <h3 className="font-medium text-gray-900 mb-4 flex items-center space-x-2">
            <MessageCircle className="h-4 w-4" />
            <span>Recent Conversations</span>
          </h3>
          <div className="space-y-2">
            {conversationHistory.map((conversation, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  conversation.active ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{conversation.date}</span>
                  {conversation.active && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                </div>
                <p className="text-xs text-gray-600 mt-1">Wellness check-in</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Anonymous Wellness Support</h2>
              <p className="text-sm text-gray-600">Your conversations are private and confidential</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">AI Assistant Online</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.sender === "user" ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-900"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-xs ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  {message.mood && <div className="ml-2">{getMoodIcon(message.mood)}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-50 border-t border-gray-200 p-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action)}
                className="text-xs"
              >
                {getMoodIcon(action.mood)}
                <span className="ml-1">{action.text}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Input
                placeholder="Share what's on your mind... (completely anonymous)"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="pr-12"
              />
              {currentMood && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">{getMoodIcon(currentMood)}</div>
              )}
            </div>
            <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Mood Selector */}
          <div className="flex items-center space-x-4 mt-3">
            <span className="text-sm text-gray-600">Current mood:</span>
            <div className="flex space-x-2">
              <Button
                variant={currentMood === "positive" ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentMood("positive")}
              >
                <Smile className="h-3 w-3" />
              </Button>
              <Button
                variant={currentMood === "neutral" ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentMood("neutral")}
              >
                <Meh className="h-3 w-3" />
              </Button>
              <Button
                variant={currentMood === "negative" ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentMood("negative")}
              >
                <Frown className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
