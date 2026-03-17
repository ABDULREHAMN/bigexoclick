"use client"

import React, { createContext, useContext, useState } from "react"
import { dashboardData, getChartData, getReportData } from "@/lib/dashboard-data"

interface DashboardDataContextType {
  chartPeriod: string
  setChartPeriod: (period: string) => void
  reportPeriod: string
  setReportPeriod: (period: string) => void
  reportCountry: string
  setReportCountry: (country: string) => void
  reportDevice: string
  setReportDevice: (device: string) => void
  metrics: typeof dashboardData.metrics
  recentActivity: typeof dashboardData.recentActivity
  chartData: any[]
  reportData: any[]
}

const DashboardDataContext = createContext<DashboardDataContextType | undefined>(undefined)

export function DashboardDataProvider({ children }: { children: React.ReactNode }) {
  const [chartPeriod, setChartPeriod] = useState("7")
  const [reportPeriod, setReportPeriod] = useState("Last 7 Days")
  const [reportCountry, setReportCountry] = useState("All Countries")
  const [reportDevice, setReportDevice] = useState("All Devices")

  const chartData = getChartData(chartPeriod)
  const reportDataArray = getReportData(reportPeriod, reportCountry, reportDevice)

  return (
    <DashboardDataContext.Provider
      value={{
        chartPeriod,
        setChartPeriod,
        reportPeriod,
        setReportPeriod,
        reportCountry,
        setReportCountry,
        reportDevice,
        setReportDevice,
        metrics: dashboardData.metrics,
        recentActivity: dashboardData.recentActivity,
        chartData,
        reportData: reportDataArray,
      }}
    >
      {children}
    </DashboardDataContext.Provider>
  )
}

export function useDashboardData() {
  const context = useContext(DashboardDataContext)
  if (context === undefined) {
    throw new Error("useDashboardData must be used within DashboardDataProvider")
  }
  return context
}
