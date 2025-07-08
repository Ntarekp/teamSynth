"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Users, Zap, Target, Star, Plus } from "lucide-react"
import { useState } from "react"

interface TeamMember {
  id: string
  name: string
  role: string
  skills: string[]
  availability: number
  performance: number
  workload: number
  preferredCollaborators: string[]
}

interface ProjectBrief {
  title: string
  description: string
  requiredSkills: string[]
  timeline: string
  priority: "high" | "medium" | "low"
}

export function TeamFormation() {
  const [projectBrief, setProjectBrief] = useState<ProjectBrief>({
    title: "",
    description: "",
    requiredSkills: [],
    timeline: "",
    priority: "medium",
  })
  const [isFormingTeam, setIsFormingTeam] = useState(false)
  const [recommendedTeam, setRecommendedTeam] = useState<TeamMember[]>([])

  const availableMembers: TeamMember[] = [
    {
      id: "1",
      name: "Sarah Chen",
      role: "Senior Frontend Developer",
      skills: ["React", "TypeScript", "UI/UX", "Mobile Development"],
      availability: 80,
      performance: 95,
      workload: 60,
      preferredCollaborators: ["Mike Johnson", "Alex Rodriguez"],
    },
    {
      id: "2",
      name: "Mike Johnson",
      role: "Backend Engineer",
      skills: ["Node.js", "Python", "Database Design", "API Development"],
      availability: 90,
      performance: 88,
      workload: 45,
      preferredCollaborators: ["Sarah Chen", "David Kim"],
    },
    {
      id: "3",
      name: "Alex Rodriguez",
      role: "DevOps Engineer",
      skills: ["Kubernetes", "AWS", "CI/CD", "Monitoring"],
      availability: 70,
      performance: 92,
      workload: 75,
      preferredCollaborators: ["Mike Johnson", "Lisa Park"],
    },
    {
      id: "4",
      name: "Lisa Park",
      role: "Product Manager",
      skills: ["Product Strategy", "User Research", "Analytics", "Stakeholder Management"],
      availability: 85,
      performance: 90,
      workload: 55,
      preferredCollaborators: ["Sarah Chen", "David Kim"],
    },
    {
      id: "5",
      name: "David Kim",
      role: "Data Scientist",
      skills: ["Machine Learning", "Python", "Data Analysis", "Statistics"],
      availability: 95,
      performance: 87,
      workload: 40,
      preferredCollaborators: ["Mike Johnson", "Lisa Park"],
    },
  ]

  const handleFormTeam = async () => {
    setIsFormingTeam(true)

    // Simulate AI team formation process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock team recommendation based on project requirements
    const recommended = availableMembers
      .filter((member) => member.availability > 70)
      .sort((a, b) => b.performance * (100 - b.workload) - a.performance * (100 - a.workload))
      .slice(0, 3)

    setRecommendedTeam(recommended)
    setIsFormingTeam(false)
  }

  const getAvailabilityColor = (availability: number) => {
    if (availability >= 80) return "text-green-600 bg-green-100"
    if (availability >= 60) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Autonomous Team Formation</span>
          </CardTitle>
          <CardDescription>
            AI-powered team assembly based on skills, availability, and collaboration patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Project Brief Input */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Project Brief</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Project Title</label>
                  <Input
                    placeholder="Enter project title..."
                    value={projectBrief.title}
                    onChange={(e) => setProjectBrief({ ...projectBrief, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    placeholder="Describe the project goals, requirements, and expected outcomes..."
                    value={projectBrief.description}
                    onChange={(e) => setProjectBrief({ ...projectBrief, description: e.target.value })}
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Timeline</label>
                  <Input
                    placeholder="e.g., 6 weeks, Q2 2024..."
                    value={projectBrief.timeline}
                    onChange={(e) => setProjectBrief({ ...projectBrief, timeline: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Priority Level</label>
                  <div className="flex space-x-2">
                    {["high", "medium", "low"].map((priority) => (
                      <Button
                        key={priority}
                        variant={projectBrief.priority === priority ? "default" : "outline"}
                        size="sm"
                        onClick={() => setProjectBrief({ ...projectBrief, priority: priority as any })}
                      >
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleFormTeam}
                  disabled={!projectBrief.title || !projectBrief.description || isFormingTeam}
                  className="w-full"
                >
                  {isFormingTeam ? (
                    <>
                      <Zap className="h-4 w-4 mr-2 animate-spin" />
                      Forming Optimal Team...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Form Team with AI
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Team Recommendation */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Recommended Team</h3>

              {recommendedTeam.length > 0 ? (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-800">Optimal Team Match Found</span>
                    </div>
                    <p className="text-sm text-green-700">
                      Team compatibility score: 94% • Estimated delivery: On time
                    </p>
                  </div>

                  <div className="space-y-3">
                    {recommendedTeam.map((member) => (
                      <Card key={member.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold">{member.name}</h4>
                              <p className="text-sm text-gray-600">{member.role}</p>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium">{member.performance}%</span>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Availability</span>
                                <Badge className={getAvailabilityColor(member.availability)} variant="secondary">
                                  {member.availability}%
                                </Badge>
                              </div>
                              <Progress value={member.availability} className="h-2" />
                            </div>

                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Current Workload</span>
                                <span>{member.workload}%</span>
                              </div>
                              <Progress value={member.workload} className="h-2" />
                            </div>

                            <div>
                              <h5 className="text-sm font-medium mb-2">Key Skills</h5>
                              <div className="flex flex-wrap gap-1">
                                {member.skills.slice(0, 3).map((skill, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                                {member.skills.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{member.skills.length - 3}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Team & Setup Workspace
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      View Alternative Team Compositions
                    </Button>
                  </div>
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Submit a project brief to get AI-powered team recommendations</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Team Members */}
      <Card>
        <CardHeader>
          <CardTitle>Available Team Members</CardTitle>
          <CardDescription>Current team capacity and skills overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableMembers.map((member) => (
              <Card key={member.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-xs text-gray-600">{member.role}</p>
                    </div>
                    <Badge className={getAvailabilityColor(member.availability)} variant="secondary">
                      {member.availability}%
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-xs">
                      <span>Performance</span>
                      <span>{member.performance}%</span>
                    </div>
                    <Progress value={member.performance} className="h-1" />

                    <div className="flex justify-between text-xs">
                      <span>Workload</span>
                      <span>{member.workload}%</span>
                    </div>
                    <Progress value={member.workload} className="h-1" />
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {member.skills.slice(0, 2).map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {member.skills.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{member.skills.length - 2}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
