import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SidebarLayout } from "@/components/layout/sidebar-layout"
import { AuthProvider } from "@/components/providers/auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TeamWell Bridge - Empathic Enterprise AI",
  description: "Unifying AI-powered wellness support, intelligent knowledge management, and autonomous team formation",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <SidebarLayout userRole="employee">{children}</SidebarLayout>
        </AuthProvider>
      </body>
    </html>
  )
}
