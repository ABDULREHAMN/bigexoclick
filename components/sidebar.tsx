"use client"

import { LayoutDashboard, BarChart2, Globe, CreditCard, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "reports", icon: BarChart2, label: "Reports" },
    { id: "campaigns", icon: BarChart2, label: "Campaigns" },
    { id: "sites", icon: Globe, label: "Sites & Zones" },
    { id: "payments", icon: CreditCard, label: "Payments" },
    { id: "settings", icon: Settings, label: "Settings" },
  ]

  return (
    <div className="w-48 bg-[#1e2a38] text-white flex flex-col">
      <div className="p-4 flex items-center">
        <span className="text-xl font-bold">
          <span className="text-white">EXO</span>
          <span className="text-green-500">Click</span>
        </span>
      </div>
      <div className="flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex items-center w-full px-4 py-3 text-sm hover:bg-[#2a3a4d] transition-colors",
              activeSection === item.id && "bg-green-500",
            )}
            onClick={() => setActiveSection(item.id)}
          >
            <div
              className={cn(
                "w-8 h-8 rounded flex items-center justify-center mr-3",
                activeSection === item.id ? "bg-white text-green-500" : "bg-[#2a3a4d]",
              )}
            >
              <item.icon size={18} />
            </div>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}
