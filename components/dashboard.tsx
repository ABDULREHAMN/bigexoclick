"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Sidebar } from "./sidebar"
import { TopNavbar } from "./top-navbar"
import { DashboardContent } from "./dashboard-content"
import { PaymentContent } from "./payment-content"
import { ReportContent } from "./report-content"
import { SiteZoneContent } from "./site-zone-content"
import { SettingsModal } from "./settings-modal"
import { KycProvider } from "./kyc-context"
import { NotificationProvider } from "./notification-context"
import { NoCampaignsMessage } from "./no-campaigns-message"
import { KycModal } from "./kyc-modal"
import { SettingsContent } from "./settings-content"
import { ProfileModal } from "./profile-modal"
import LiveChatBotRedesigned from "./live-chat-bot-redesigned"
import { isLoggedIn } from "@/lib/auth"

type PageType = "dashboard" | "payments" | "reports" | "sites" | "campaigns" | "settings" | "profile"

function DashboardContentWrapper() {
  const [activeSection, setActiveSection] = useState<PageType>("dashboard")
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

  const handleNavigation = (page: string) => {
    if (page === "profile-modal") {
      setIsProfileModalOpen(true)
    } else if (page === "settings-modal") {
      setIsSettingsModalOpen(true)
    }
  }

  return (
    <div className="flex h-screen bg-[#f5f5f5]">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavbar onNavigate={handleNavigation} />
        <div className="flex-1 overflow-auto">
          {activeSection === "dashboard" && <DashboardContent />}
          {activeSection === "payments" && <PaymentContent />}
          {activeSection === "reports" && <ReportContent />}
          {activeSection === "sites" && <SiteZoneContent />}
          {activeSection === "campaigns" && <NoCampaignsMessage />}
          {activeSection === "settings" && <SettingsContent />}
        </div>
      </div>
      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
      <KycModal />
      <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} />
      <LiveChatBotRedesigned />
    </div>
  )
}

export function Dashboard() {
  const router = useRouter()

  useEffect(() => {
    // Protect dashboard - redirect to login if not authenticated
    if (!isLoggedIn()) {
      router.push("/login")
    }
  }, [router])

  return (
    <NotificationProvider>
      <KycProvider>
        <DashboardContentWrapper />
      </KycProvider>
    </NotificationProvider>
  )
}
