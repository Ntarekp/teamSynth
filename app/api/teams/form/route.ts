import { NextResponse } from "next/server"

const availableMembers = [
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
]

export async function POST(request: Request) {
  const { projectBrief } = await request.json()

  // Simulate AI team formation algorithm
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock team recommendation based on availability and performance
  const recommendedTeam = availableMembers
    .filter((member) => member.availability > 70)
    .sort((a, b) => b.performance * (100 - b.workload) - a.performance * (100 - a.workload))
    .slice(0, 3)

  return NextResponse.json({
    recommendedTeam,
    compatibilityScore: 94,
    estimatedDelivery: "On time",
  })
}
