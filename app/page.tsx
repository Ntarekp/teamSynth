import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardOverview } from "@/components/dashboard/overview"
import { TeamMemoryGraph } from "@/components/memory/team-memory-graph"
import { MeetingIntelligence } from "@/components/meeting/meeting-intelligence"
import { TeamFormation } from "@/components/team/team-formation"
import { WellbeingMonitor } from "@/components/wellbeing/wellbeing-monitor"
import { TaskManagement } from "@/components/tasks/task-management"
import { redirect } from "next/navigation"

export default function HomePage() {
  redirect("/landing")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TS</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">TeamSynth AI</h1>
                <p className="text-sm text-gray-500">Autonomous Enterprise Agent</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">System Active</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-fit">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="memory">Memory Graph</TabsTrigger>
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="wellbeing">Well-being</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Suspense fallback={<div>Loading overview...</div>}>
              <DashboardOverview />
            </Suspense>
          </TabsContent>

          <TabsContent value="memory">
            <Suspense fallback={<div>Loading memory graph...</div>}>
              <TeamMemoryGraph />
            </Suspense>
          </TabsContent>

          <TabsContent value="meetings">
            <Suspense fallback={<div>Loading meeting intelligence...</div>}>
              <MeetingIntelligence />
            </Suspense>
          </TabsContent>

          <TabsContent value="teams">
            <Suspense fallback={<div>Loading team formation...</div>}>
              <TeamFormation />
            </Suspense>
          </TabsContent>

          <TabsContent value="tasks">
            <Suspense fallback={<div>Loading task management...</div>}>
              <TaskManagement />
            </Suspense>
          </TabsContent>

          <TabsContent value="wellbeing">
            <Suspense fallback={<div>Loading well-being monitor...</div>}>
              <WellbeingMonitor />
            </Suspense>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
