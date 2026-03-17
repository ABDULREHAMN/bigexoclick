"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, Globe, Search, User, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { NotificationDropdown } from "./notification-dropdown"
import { clearLoginSession, getUsername } from "@/lib/auth"

interface TopNavbarProps {
  onNavigate?: (page: string) => void
}

export function TopNavbar({ onNavigate }: TopNavbarProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("dashboard")
  const username = getUsername()

  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "statistics", label: "Statistics" },
    { id: "sites", label: "Sites & Zones" },
    { id: "payments", label: "Payments" },
    { id: "referral", label: "Referral Program" },
    { id: "neverblock", label: "NeverBlock" },
  ]

  const handleLogout = () => {
    // Clear session using auth utility
    clearLoginSession()
    // Redirect to login page
    router.push("/login")
  }

  const handleViewProfile = () => {
    if (onNavigate) {
      onNavigate("profile-modal")
    }
  }

  const handleSettings = () => {
    if (onNavigate) {
      onNavigate("settings-modal")
    }
  }

  return (
    <div className="bg-white border-b">
      <div className="flex items-center justify-between px-4 h-16">
        <div className="flex items-center">
          <div className="relative mr-4">
            <button className="flex items-center px-3 py-1.5 text-sm bg-gray-200 rounded text-gray-700 hover:bg-gray-300 transition-colors">
              Publisher
              <ChevronDown size={16} className="ml-2" />
            </button>
          </div>
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input className="pl-10 w-64" placeholder="Search..." />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <Globe size={20} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Change language</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Notification Dropdown */}
          <NotificationDropdown />

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 hover:bg-gray-100 transition-colors p-2">
                <span className="text-sm mr-2 text-gray-700 hidden md:inline">{username || "a_rehmanexo"}</span>
                <span className="text-xs text-gray-500 mr-2 hidden md:inline">Publisher</span>
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User size={16} className="text-gray-600" />
                </div>
                <ChevronDown size={16} className="ml-2 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-white border border-gray-200 shadow-lg rounded-md"
              sideOffset={5}
            >
              <div className="px-3 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{username || "a_rehmanexo"}</p>
                <p className="text-xs text-gray-500">Publisher Account</p>
              </div>

              <DropdownMenuItem
                onClick={handleViewProfile}
                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <User size={16} className="mr-3 text-gray-500" />
                View Profile
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleSettings}
                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <Settings size={16} className="mr-3 text-gray-500" />
                Settings
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-1 border-gray-100" />

              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
              >
                <LogOut size={16} className="mr-3 text-red-500" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex border-b overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              "px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap hover:text-gray-900",
              activeTab === tab.id ? "border-green-500 text-green-500" : "border-transparent text-gray-600",
            )}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
