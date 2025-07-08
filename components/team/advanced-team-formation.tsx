"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Users, AlertTriangle, CheckCircle, Brain, FileText, Zap } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  role: string
  skills: string[]
  availability: number
  performance: number
  workload: number
  diversity: {
    gender: string
    ethnicity: string
    age: number
  }
  skillProficiency: Record<string, number>
}

interface ProjectBrief {
  title: string
  description: string
  requiredSkills: string[]
  timeline: string
  complexity: number
  estimatedTeamSize: number
}

export function AdvancedTeamFormation() {
  const [projectBrief, setProjectBrief] = useState<ProjectBrief>({
    title: "",
    description: "",
    requiredSkills: [],
    timeline: "",
    complexity: 0,
    estimatedTeamSize: 0,
  })
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [recommendedTeams, setRecommendedTeams] = useState<any[]>([])

  const availableMembers: TeamMember[] = [
    {
      id: "1",
      name: "Sarah Chen",
      role: "Senior Frontend Developer",
      skills: ["React", "TypeScript", "UI/UX", "Mobile Development"],
      availability: 80,
      performance: 95,
      workload: 60,
      diversity: { gender: "Female", ethnicity: "Asian", age: 28 },
      skillProficiency: { React: 95, TypeScript: 90, "UI/UX": 85, "Mobile Development": 80 },
    },
    {
      id: "2",
      name: "Mike Johnson",
      role: "Backend Engineer",
      skills: ["Node.js", "Python", "Database Design", "API Development"],
      availability: 90,
      performance: 88,
      workload: 45,
      diversity: { gender: "Male", ethnicity: "Caucasian", age: 32 },
      skillProficiency: { "Node.js": 92, Python: 88, "Database Design": 90, "API Development": 85 },
    },
    {
      id: "3",
      name: "Alex Rodriguez",
      role: "DevOps Engineer",
      skills: ["Kubernetes", "AWS", "CI/CD", "Monitoring"],
      availability: 70,
      performance: 92,
      workload: 75,
      diversity: { gender: "Male", ethnicity: "Hispanic", age: 29 },
      skillProficiency: { Kubernetes: 90, AWS: 95, "CI/CD": 88, Monitoring: 85 },
    },
    {
      id: "4",
      name: "Lisa Park",
      role: "Product Manager",
      skills: ["Product Strategy", "User Research", "Analytics", "Stakeholder Management"],
      availability: 85,
      performance: 90,
      workload: 55,
      diversity: { gender: "Female", ethnicity: "Asian", age: 35 },
      skillProficiency: { "Product Strategy": 92, "User Research": 88, Analytics: 85, "Stakeholder Management": 90 },
    },
    {
      id: "5",
      name: "David Kim",
      role: "Data Scientist",
      skills: ["Machine Learning", "Python", "Data Analysis", "Statistics"],
      availability: 95,
      performance: 87,
      workload: 40,
      diversity: { gender: "Male", ethnicity: "Asian", age: 26 },
      skillProficiency: { "Machine Learning": 90, Python: 85, "Data Analysis": 92, Statistics: 88 },
    },
    {
      id: "6",
      name: "Maria Garcia",
      role: "UX Designer",
      skills: ["UI/UX", "Design Systems", "User Research", "Prototyping"],
      availability: 75,
      performance: 93,
      workload: 65,
      diversity: { gender: "Female", ethnicity: "Hispanic", age: 30 },
      skillProficiency: { "UI/UX": 95, "Design Systems": 90, "User Research": 85, Prototyping: 88 },
    },
  ]

  const diversityTargets = {
    gender: { target: 50, current: 0 },
    ethnicity: { target: 40, current: 0 },
    age: { target: 70, current: 0 },
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Simulate file analysis
      setIsAnalyzing(true)
      setTimeout(() => {
        const mockAnalysis = {
          skillsDetected: ["React", "Node.js", "UI/UX", "API Development"],
          timeline: "8 weeks",
          complexity: 7,
          estimatedTeamSize: 4,
          confidence: 0.92,
        }
        setAnalysisResults(mockAnalysis)
        setProjectBrief({
          ...projectBrief,
          requiredSkills: mockAnalysis.skillsDetected,
          timeline: mockAnalysis.timeline,
          complexity: mockAnalysis.complexity,
          estimatedTeamSize: mockAnalysis.estimatedTeamSize,
        })
        setIsAnalyzing(false)
      }, 2000)
    }
  }

  const generateTeamRecommendations = () => {
    // Simulate AI team formation with D&I considerations
    const recommendations = [
      {
        id: "team_1",
        members: ["1", "2", "4", "6"], // Sarah, Mike, Lisa, Maria
        matchScore: 94,
        diversityScore: 85,
        skillsCoverage: 92,
        estimatedDelivery: "On time",
        strengths: ["Strong technical skills", "Excellent design capability", "Good product oversight"],
        risks: ["High workload for Maria", "Limited backend depth"],
        diversityBreakdown: {
          gender: { female: 75, male: 25 },
          ethnicity: { asian: 50, caucasian: 25, hispanic: 25 },
          ageRange: "26-35",
        },
      },
      {
        id: "team_2",
        members: ["1", "3", "4", "5"], // Sarah, Alex, Lisa, David
        matchScore: 89,
        diversityScore: 78,
        skillsCoverage: 88,
        estimatedDelivery: "1 week delay",
        strengths: ["Strong data capabilities", "Excellent DevOps", "Good leadership"],
        risks: ["Limited design resources", "Alex at capacity"],
        diversityBreakdown: {
          gender: { female: 50, male: 50 },
          ethnicity: { asian: 75, hispanic: 25 },
          ageRange: "26-35",
        },
      },
    ]
    setRecommendedTeams(recommendations)
  }

  const calculateDiversityScore = (team: any) => {
    const members = availableMembers.filter((m) => team.members.includes(m.id))
    const genderDiversity = (new Set(members.map((m) => m.diversity.gender)).size / 2) * 100
    const ethnicityDiversity = (new Set(members.map((m) => m.diversity.ethnicity)).size / 3) * 100
    const ageSpread =
      Math.max(...members.map((m) => m.diversity.age)) - Math.min(...members.map((m) => m.diversity.age))
    const ageScore = Math.min((ageSpread / 10) * 100, 100)

    return Math.round((genderDiversity + ethnicityDiversity + ageScore) / 3)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>Advanced Team Formation</span>
          </CardTitle>
          <CardDescription>AI-powered team assembly with diversity & inclusion compliance</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="brief" className="space-y-4">
            <TabsList>
              <TabsTrigger value="brief">Project Brief</TabsTrigger>
              <TabsTrigger value="analysis">Skills Analysis</TabsTrigger>
              <TabsTrigger value="recommendations">Team Recommendations</TabsTrigger>
              <TabsTrigger value="diversity">D&I Compliance</TabsTrigger>
            </TabsList>

            <TabsContent value="brief" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Project Brief Input */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Project Brief</h3>

                  {/* File Upload */}
                  <Card className="border-dashed border-2 border-gray-300">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Upload project brief</p>
                          <p className="text-xs text-gray-500">PDF, DOC, or TXT files up to 10MB</p>
                        </div>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.txt"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                        />
                        <label htmlFor="file-upload">
                          <Button variant="outline" className="mt-4 bg-transparent" asChild>
                            <span>Browse Files</span>
                          </Button>
                        </label>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Manual Input */}
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
                  </div>
                </div>

                {/* Analysis Results */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">AI Analysis</h3>

                  {isAnalyzing ? (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <Zap className="h-12 w-12 mx-auto mb-4 text-blue-500 animate-pulse" />
                        <p className="font-medium">Analyzing project brief...</p>
                        <p className="text-sm text-gray-600">Extracting skills, timeline, and complexity</p>
                      </CardContent>
                    </Card>
                  ) : analysisResults ? (
                    <div className="space-y-4">
                      <Card className="border-green-200 bg-green-50">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="font-medium text-green-800">Analysis Complete</span>
                          </div>
                          <p className="text-sm text-green-700">
                            Confidence: {Math.round(analysisResults.confidence * 100)}%
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Skills Detected</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {analysisResults.skillsDetected.map((skill: string, index: number) => (
                              <Badge key={index} className="bg-blue-100 text-blue-800" variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-blue-600">{analysisResults.complexity}/10</div>
                            <div className="text-sm text-gray-600">Complexity Score</div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-green-600">{analysisResults.estimatedTeamSize}</div>
                            <div className="text-sm text-gray-600">Recommended Team Size</div>
                          </CardContent>
                        </Card>
                      </div>

                      <Button onClick={generateTeamRecommendations} className="w-full">
                        <Zap className="mr-2 h-4 w-4" />
                        Generate Team Recommendations
                      </Button>
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-8 text-center text-gray-500">
                        <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>Upload a project brief or fill in the details manually</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              {/* Skills Matrix */}
              <Card>
                <CardHeader>
                  <CardTitle>Skills Coverage Matrix</CardTitle>
                  <CardDescription>Required skills vs available team member proficiency</CardDescription>
                </CardHeader>
                <CardContent>
                  {projectBrief.requiredSkills.length > 0 ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        {projectBrief.requiredSkills.map((skill) => (
                          <div key={skill} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="font-medium">{skill}</span>
                              <span className="text-sm text-gray-600">
                                {availableMembers.filter((m) => m.skills.includes(skill)).length} members
                              </span>
                            </div>
                            <div className="flex space-x-1">
                              {availableMembers.map((member) => {
                                const proficiency = member.skillProficiency[skill] || 0
                                return (
                                  <div
                                    key={member.id}
                                    className={`flex-1 h-8 rounded flex items-center justify-center text-xs text-white font-medium ${
                                      proficiency >= 90
                                        ? "bg-green-500"
                                        : proficiency >= 70
                                          ? "bg-yellow-500"
                                          : proficiency >= 50
                                            ? "bg-orange-500"
                                            : proficiency > 0
                                              ? "bg-red-500"
                                              : "bg-gray-300"
                                    }`}
                                    title={`${member.name}: ${proficiency}%`}
                                  >
                                    {proficiency > 0 ? proficiency : "-"}
                                  </div>
                                )
                              })}
                            </div>
                            <div className="flex justify-between text-xs text-gray-500">
                              {availableMembers.map((member) => (
                                <span key={member.id} className="flex-1 text-center truncate">
                                  {member.name.split(" ")[0]}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center space-x-4 text-xs">
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-green-500 rounded"></div>
                          <span>Expert (90%+)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                          <span>Proficient (70-89%)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-orange-500 rounded"></div>
                          <span>Intermediate (50-69%)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-red-500 rounded"></div>
                          <span>Beginner (1-49%)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-gray-300 rounded"></div>
                          <span>No experience</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <p>No skills detected yet. Upload a project brief or add skills manually.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              {recommendedTeams.length > 0 ? (
                <div className="space-y-6">
                  {recommendedTeams.map((team, index) => (
                    <Card key={team.id} className="border-l-4 border-l-blue-500">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center space-x-2">
                            <span>Team Option {index + 1}</span>
                            <Badge className="bg-blue-100 text-blue-800" variant="secondary">
                              {team.matchScore}% match
                            </Badge>
                          </CardTitle>
                          <div className="flex space-x-2">
                            <Button size="sm">Form This Team</Button>
                            <Button size="sm" variant="outline">
                              Customize
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Team Members */}
                        <div>
                          <h4 className="font-medium mb-3">Team Members</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {team.members.map((memberId: string) => {
                              const member = availableMembers.find((m) => m.id === memberId)!
                              return (
                                <div key={memberId} className="flex items-center space-x-3 p-3 border rounded-lg">
                                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-medium">{member.name.charAt(0)}</span>
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium">{member.name}</p>
                                    <p className="text-sm text-gray-600">{member.role}</p>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-sm font-medium">{member.availability}%</div>
                                    <div className="text-xs text-gray-500">available</div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{team.matchScore}%</div>
                            <div className="text-sm text-gray-600">Skills Match</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{team.diversityScore}%</div>
                            <div className="text-sm text-gray-600">Diversity Score</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">{team.skillsCoverage}%</div>
                            <div className="text-sm text-gray-600">Skills Coverage</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">{team.estimatedDelivery}</div>
                            <div className="text-sm text-gray-600">Delivery</div>
                          </div>
                        </div>

                        {/* Strengths and Risks */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium mb-2 flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span>Strengths</span>
                            </h4>
                            <ul className="space-y-1">
                              {team.strengths.map((strength: string, idx: number) => (
                                <li key={idx} className="text-sm text-green-700 flex items-start space-x-2">
                                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <span>{strength}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2 flex items-center space-x-2">
                              <AlertTriangle className="h-4 w-4 text-yellow-500" />
                              <span>Potential Risks</span>
                            </h4>
                            <ul className="space-y-1">
                              {team.risks.map((risk: string, idx: number) => (
                                <li key={idx} className="text-sm text-yellow-700 flex items-start space-x-2">
                                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <span>{risk}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No team recommendations yet</p>
                    <p className="text-sm">Complete the project brief analysis to see recommendations</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="diversity" className="space-y-6">
              {/* D&I Targets */}
              <Card>
                <CardHeader>
                  <CardTitle>Diversity & Inclusion Targets</CardTitle>
                  <CardDescription>Organizational diversity goals for team formation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Object.entries(diversityTargets).map(([category, data]) => (
                      <div key={category} className="space-y-3">
                        <h4 className="font-medium capitalize">{category} Diversity</h4>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600">{data.target}%</div>
                          <div className="text-sm text-gray-600">Target</div>
                        </div>
                        <Progress value={data.target} className="h-3" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Team Diversity Analysis */}
              {recommendedTeams.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Team Diversity Analysis</CardTitle>
                    <CardDescription>How recommended teams perform against D&I targets</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {recommendedTeams.map((team, index) => (
                        <div key={team.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium">Team Option {index + 1}</h4>
                            <Badge
                              className={
                                team.diversityScore >= 80
                                  ? "bg-green-100 text-green-800"
                                  : team.diversityScore >= 60
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }
                              variant="secondary"
                            >
                              {team.diversityScore}% D&I Score
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <h5 className="text-sm font-medium mb-2">Gender Distribution</h5>
                              <div className="space-y-1">
                                {Object.entries(team.diversityBreakdown.gender).map(([gender, percentage]) => (
                                  <div key={gender} className="flex justify-between text-sm">
                                    <span className="capitalize">{gender}</span>
                                    <span>{percentage}%</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h5 className="text-sm font-medium mb-2">Ethnicity Distribution</h5>
                              <div className="space-y-1">
                                {Object.entries(team.diversityBreakdown.ethnicity).map(([ethnicity, percentage]) => (
                                  <div key={ethnicity} className="flex justify-between text-sm">
                                    <span className="capitalize">{ethnicity}</span>
                                    <span>{percentage}%</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h5 className="text-sm font-medium mb-2">Age Range</h5>
                              <div className="text-sm">
                                <span>{team.diversityBreakdown.ageRange}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
