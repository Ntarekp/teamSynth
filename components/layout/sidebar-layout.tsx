"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  MessageCircle,
  Brain,
  Users,
  Settings,
  Bell,
  User,
  Menu,
  X,
  BarChart3,
  CheckCircle,
  Shield,
  LinkIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarLayoutProps {
  children: React.ReactNode
  userRole: "admin" | "hr_manager" | "manager" | "employee"
}

export function SidebarLayout({ children, userRole }: SidebarLayoutProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Don't show navigation on landing, login, signup, or forgot password pages
  const hideNavigation = ["/landing", "/login", "/signup", "/forgot-password"].includes(pathname)

  if (hideNavigation) {
    return <>{children}</>
  }

  // Role-based navigation items
  const getNavigationItems = () => {
    const baseItems = [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: BarChart3,
        roles: ["admin", "hr_manager", "manager", "employee"],
      },
      {
        name: "Wellness Chat",
        href: "/wellness-chat",
        icon: MessageCircle,
        badge: "2",
        roles: ["admin", "hr_manager", "manager", "employee"],
      },
      {
        name: "Memory Graph",
        href: "/memory-graph",
        icon: Brain,
        roles: ["admin", "hr_manager", "manager", "employee"],
      },
      {
        name: "ProjectPilot",
        href: "/project-pilot",
        icon: CheckCircle,
        roles: ["admin", "hr_manager", "manager", "employee"],
      },
      {
        name: "Teams",
        href: "/teams",
        icon: Users,
        roles: ["admin", "hr_manager", "manager", "employee"],
      },
      {
        name: "Tasks",
        href: "/tasks",
        icon: CheckCircle,
        roles: ["admin", "hr_manager", "manager", "employee"],
      },
    ]

    const adminItems = [
      {
        name: "Admin Analytics",
        href: "/admin",
        icon: Shield,
        roles: ["admin", "hr_manager"],
      },
      {
        name: "Integrations",
        href: "/integrations",
        icon: LinkIcon,
        roles: ["admin", "hr_manager", "manager"],
      },
    ]

    const settingsItems = [
      {
        name: "Settings",
        href: "/settings",
        icon: Settings,
        roles: ["admin", "hr_manager", "manager", "employee"],
      },
    ]

    return [
      ...baseItems.filter((item) => item.roles.includes(userRole)),
      ...adminItems.filter((item) => item.roles.includes(userRole)),
      ...settingsItems.filter((item) => item.roles.includes(userRole)),
    ]
  }

  const navigationItems = getNavigationItems()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col transition-all duration-300",
          isCollapsed ? "lg:w-16" : "lg:w-64",
        )}
      >
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 shadow-sm">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-4 py-6 border-b border-gray-200">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            {!isCollapsed && (
              <div className="ml-3">
                <h1 className="text-lg font-semibold text-gray-900">TeamWell Bridge</h1>
                <p className="text-xs text-gray-500">Enterprise AI</p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="mt-5 flex-1 px-2 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-blue-50 border-r-2 border-blue-600 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    isCollapsed && "justify-center",
                  )}
                  title={isCollapsed ? item.name : undefined}
                >
                  <item.icon
                    className={cn(
                      "flex-shrink-0 h-5 w-5",
                      isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-500",
                      isCollapsed ? "mr-0" : "mr-3",
                    )}
                  />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <Badge className="ml-auto bg-red-100 text-red-800" variant="secondary">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Collapse Toggle */}
          <div className="flex-shrink-0 border-t border-gray-200 p-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-full justify-center"
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>

          {/* User Profile */}
          {!isCollapsed && (
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex items-center w-full">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-700">Sarah Chen</p>
                  <p className="text-xs text-gray-500 capitalize">{userRole.replace("_", " ")}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">TeamWell Bridge</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-gray-600 bg-opacity-75">
          <div className="fixed inset-y-0 left-0 flex flex-col w-64 bg-white shadow-xl">
            <div className="flex items-center flex-shrink-0 px-4 py-6 border-b border-gray-200">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-lg font-semibold text-gray-900">TeamWell Bridge</h1>
                <p className="text-xs text-gray-500">Enterprise AI</p>
              </div>
            </div>

            <nav className="mt-5 flex-1 px-2 space-y-1 overflow-y-auto">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive
                        ? "bg-blue-50 border-r-2 border-blue-600 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    )}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 flex-shrink-0 h-5 w-5",
                        isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-500",
                      )}
                    />
                    {item.name}
                    {item.badge && (
                      <Badge className="ml-auto bg-red-100 text-red-800" variant="secondary">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                )
              })}
            </nav>

            <div className="flex-shrink-0 border-t border-gray-200 p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">Sarah Chen</p>
                  <p className="text-xs text-gray-500 capitalize">{userRole.replace("_", " ")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className={cn("transition-all duration-300", isCollapsed ? "lg:pl-16" : "lg:pl-64")}>
        {/* Top bar for desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0 sticky top-0 z-40">
          <div className="flex items-center justify-between w-full bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
            <div className="flex-1"></div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-700">Sarah Chen</p>
                  <p className="text-xs text-gray-500 capitalize">{userRole.replace("_", " ")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 min-h-screen">
          <div className="p-6 pt-20 lg:pt-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
