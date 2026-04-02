"use client"

import type React from "react"
import { useState } from "react"
import {
  Eye,
  MousePointer,
  DollarSign,
  BarChart2,
  Filter,
  Calendar,
  ChevronDown,
  Globe,
  Plus,
  Grid3X3,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart } from "./charts/bar-chart"
import { HourlyChart } from "./charts/hourly-chart"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { dashboardData, getChartData } from "@/lib/dashboard-data"

type DashboardView = "default" | "new"
type WidgetType = "default" | "today" | "hourly"

export function DashboardContent() {
  const [dashboardView, setDashboardView] = useState<DashboardView>("default")
  const [activeWidget, setActiveWidget] = useState<WidgetType>("default")
  const [groupBy, setGroupBy] = useState("Day")
  const [isLoading, setIsLoading] = useState(false)

  const handleDashboardChange = async (view: DashboardView) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setDashboardView(view)
    setIsLoading(false)
  }

  const handleWidgetChange = async (widget: WidgetType) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 600))
    setActiveWidget(widget)
    setIsLoading(false)
  }

  const handleGroupByChange = async (grouping: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setGroupBy(grouping)
    if (grouping === "Hour") {
      setActiveWidget("hourly")
    }
    setIsLoading(false)
  }

  const hourlyData = [
    { hour: "12 AM", impressions: 117, clicks: 38, revenue: 31.88, ctr: "32.48%", ecpm: "$2312.00" },
    { hour: "1 AM", impressions: 117, clicks: 38, revenue: 31.88, ctr: "32.48%", ecpm: "$2312.00" },
    { hour: "2 AM", impressions: 117, clicks: 38, revenue: 31.88, ctr: "32.48%", ecpm: "$2312.00" },
    { hour: "3 AM", impressions: 117, clicks: 38, revenue: 31.88, ctr: "32.48%", ecpm: "$2312.00" },
    { hour: "4 AM", impressions: 117, clicks: 38, revenue: 31.88, ctr: "32.48%", ecpm: "$2312.00" },
    { hour: "5 AM", impressions: 117, clicks: 38, revenue: 31.88, ctr: "32.48%", ecpm: "$2312.00" },
    { hour: "6 AM", impressions: 117, clicks: 38, revenue: 31.88, ctr: "32.48%", ecpm: "$2312.00" },
    { hour: "7 AM", impressions: 117, clicks: 38, revenue: 31.88, ctr: "32.48%", ecpm: "$2312.00" },
    { hour: "8 AM", impressions: 117, clicks: 38, revenue: 31.88, ctr: "32.48%", ecpm: "$2312.00" },
    { hour: "9 AM", impressions: 117, clicks: 38, revenue: 31.88, ctr: "32.48%", ecpm: "$2312.00" },
    { hour: "10 AM", impressions: 117, clicks: 38, revenue: 31.88, ctr: "32.48%", ecpm: "$2312.00" },
    { hour: "11 AM", impressions: 117, clicks: 38, revenue: 31.88, ctr: "32.48%", ecpm: "$2312.00" },
    { hour: "12 PM", impressions: 117, clicks: 38, revenue: 31.88, ctr: "32.48%", ecpm: "$2312.00" },
    { hour: "1 PM", impressions: 117, clicks: 38, revenue: 31.88, ctr: "32.48%", ecpm: "$2312.00" },
    { hour: "2 PM", impressions: 117, clicks: 38, revenue: 31.88, ctr: "32.48%", ecpm: "$2312.00" },
    { hour: "3 PM", impressions: 117, clicks: 38, revenue: 31.88, ctr: "32.48%", ecpm: "$2312.00" },
    { hour: "4 PM", impressions: 117, clicks: 38, revenue: 31.88, ctr: "32.48%", ecpm: "$2312.00" },
    { hour: "5 PM", impressions: 117, clicks: 38, revenue: 31.88, ctr: "32.48%", ecpm: "$2312.00" },
    { hour: "6 PM", impressions: 117, clicks: 38, revenue: 31.88, ctr: "32.48%", ecpm: "$2312.00" },
    { hour: "7 PM", impressions: 117, clicks: 38, revenue: 31.88, ctr: "32.48%", ecpm: "$2312.00" },
    { hour: "8 PM", impressions: 117, clicks: 38, revenue: 31.88, ctr: "32.48%", ecpm: "$2312.00" },
    { hour: "9 PM", impressions: 117, clicks: 38, revenue: 31.88, ctr: "32.48%", ecpm: "$2312.00" },
    { hour: "10 PM", impressions: 117, clicks: 38, revenue: 31.88, ctr: "32.48%", ecpm: "$2312.00" },
    { hour: "11 PM", impressions: 117, clicks: 38, revenue: 31.88, ctr: "32.48%", ecpm: "$2312.00" },
  ]

  const todayTotals = hourlyData.reduce(
    (acc, hour) => ({
      impressions: acc.impressions + hour.impressions,
      clicks: acc.clicks + hour.clicks,
      revenue: acc.revenue + hour.revenue,
    }),
    { impressions: 0, clicks: 0, revenue: 0 },
  )

  const todayCTR =
    todayTotals.impressions > 0 ? ((todayTotals.clicks / todayTotals.impressions) * 100).toFixed(2) : "0.00"
  const todayECPM =
    todayTotals.impressions > 0 ? ((todayTotals.revenue / todayTotals.impressions) * 1000).toFixed(2) : "0.00"

  const todayWidget = {
    impressions: {
      value: 3124,
      date: "2026-02-11",
    },
    clicks: {
      value: 74,
      date: "2026-02-11",
    },
    ecpm: {
      value: "$4.36",
      date: "2026-02-11",
    },
    ctr: {
      value: "2.37%",
      date: "2026-02-11",
    },
  }

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
            <div className="text-lg font-medium">Loading Dashboard...</div>
            <div className="text-sm text-gray-500">Please wait while we update your view</div>
          </div>
        </div>
      </div>
    )
  }

  if (dashboardView === "new") {
    return (
      <div className="p-6 space-y-6">
        {/* New Dashboard Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">New Dashboard</h1>
            <div className="flex items-center space-x-2">
              <Button
                variant={activeWidget === "default" ? "default" : "outline"}
                size="sm"
                onClick={() => handleWidgetChange("default")}
                className={activeWidget === "default" ? "bg-green-500 hover:bg-green-600" : "bg-transparent"}
              >
                Default
              </Button>
              <Button
                variant={activeWidget === "today" ? "default" : "outline"}
                size="sm"
                onClick={() => handleWidgetChange("today")}
                className={activeWidget === "today" ? "bg-blue-500 hover:bg-blue-600" : "bg-transparent"}
              >
                Today
              </Button>
              <Button
                variant={groupBy === "Hour" ? "default" : "outline"}
                size="sm"
                onClick={() => handleGroupByChange("Hour")}
                className={groupBy === "Hour" ? "bg-purple-500 hover:bg-purple-600" : "bg-transparent"}
              >
                Group By Hour
              </Button>
            </div>
          </div>
          <Button variant="outline" onClick={() => handleDashboardChange("default")} className="bg-transparent">
            Back to Classic
          </Button>
        </div>

        {/* Widget Content */}
        {activeWidget === "default" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-green-800">Total Earnings Summary</h3>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">This Month (Sep)</span>
                    <span className="text-xl font-bold text-green-600">$3,840.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Last Month (Aug)</span>
                    <span className="text-lg font-semibold text-green-600">$34,521.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Growth Rate</span>
                    <span className="text-sm font-medium text-green-600">+93%</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-blue-800">Performance Overview</h3>
                  <BarChart2 className="h-8 w-8 text-blue-600" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Impressions</span>
                    <span className="text-lg font-bold text-blue-600">1,250</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Clicks</span>
                    <span className="text-lg font-bold text-blue-600">310</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Average CTR</span>
                    <span className="text-sm font-medium text-blue-600">24.8%</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-purple-800">Revenue Metrics</h3>
                  <Eye className="h-8 w-8 text-purple-600" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Today's eCPM</span>
                    <span className="text-lg font-bold text-purple-600">$2,090.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Best Day</span>
                    <span className="text-lg font-bold text-purple-600">$4,560.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg eCPM (Sep)</span>
                    <span className="text-sm font-medium text-purple-600">$2,090.00</span>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Monthly Earnings Trend</h3>
              <div className="h-64">
                <BarChart />
              </div>
            </Card>
          </div>
        )}

        {activeWidget === "today" && (
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Today's Performance - February 11, 2026</h3>
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-sm text-gray-600 mb-1">Earnings</div>
                  <div className="text-2xl font-bold text-green-600">$5.12</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-sm text-gray-600 mb-1">Impressions</div>
                  <div className="text-2xl font-bold text-blue-600">{todayWidget.impressions.value}</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-sm text-gray-600 mb-1">Clicks</div>
                  <div className="text-2xl font-bold text-purple-600">{todayWidget.clicks.value}</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-sm text-gray-600 mb-1">CTR</div>
                  <div className="text-2xl font-bold text-orange-600">{todayWidget.ctr.value}</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-sm text-gray-600 mb-1">eCPM</div>
                  <div className="text-2xl font-bold text-indigo-600">{todayWidget.ecpm.value}</div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <MetricCard
                icon={Eye}
                iconColor="text-green-500"
                title="IMPRESSIONS"
                value={String(todayWidget.impressions.value)}
                date={todayWidget.impressions.date}
              />
              <MetricCard
                icon={MousePointer}
                iconColor="text-blue-500"
                title="CLICKS"
                value={String(todayWidget.clicks.value)}
                date={todayWidget.clicks.date}
              />
              <MetricCard
                icon={DollarSign}
                iconColor="text-green-500"
                title="ECPM"
                value={todayWidget.ecpm.value}
                date={todayWidget.ecpm.date}
              />
              <MetricCard
                icon={BarChart2}
                iconColor="text-red-500"
                title="CTR"
                value={todayWidget.ctr.value}
                date={todayWidget.ctr.date}
              />
            </div>
          </div>
        )}

        {(activeWidget === "hourly" || groupBy === "Hour") && (
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Hourly Breakdown - 28 March 2026 🎯</h3>
                <div className="flex items-center space-x-2">
                  <BarChart2 className="h-6 w-6 text-purple-600" />
                  <span className="text-sm text-purple-600 font-medium">24 Hour View</span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-sm text-gray-600 mb-1">Peak Hour</div>
                  <div className="text-lg font-bold text-purple-600">11 PM</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-sm text-gray-600 mb-1">Best Revenue</div>
                  <div className="text-lg font-bold text-green-600">$31.88</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-sm text-gray-600 mb-1">Total Hours</div>
                  <div className="text-lg font-bold text-blue-600">24</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-sm text-gray-600 mb-1">Avg/Hour</div>
                  <div className="text-lg font-bold text-orange-600">$1,328.00</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Hourly Performance Chart</h3>
              <div className="h-64 mb-6">
                <HourlyChart data={hourlyData} />
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Detailed Hourly Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-sm">Hour</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Impressions</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Clicks</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">CTR</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">eCPM</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hourlyData.map((hour, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium">{hour.hour}</td>
                        <td className="py-3 px-4 text-sm">{hour.impressions}</td>
                        <td className="py-3 px-4 text-sm">{hour.clicks}</td>
                        <td className="py-3 px-4 text-sm">{hour.ctr}</td>
                        <td className="py-3 px-4 text-sm">{hour.ecpm}</td>
                        <td className="py-3 px-4 text-sm font-medium">${hour.revenue.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
      </div>
    )
  }

  // Default Dashboard View
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <StatsCard title="TODAY" value="$5.12" />
        <StatsCard title="THIS MONTH" value="$45.80" />
        <StatsCard title="LAST MONTH" value="$72.90" />
        <StatsCard
          title="THIS MONTH FORECAST"
          value="$110.50"
          badge={{
            text: "5%",
            color: "bg-green-500",
          }}
        />
        <StatsCard title="LAST 6 MONTHS" value="$115,250.00" />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4 overflow-x-auto pb-2">
        <Button
          className="bg-blue-500 hover:bg-blue-600 whitespace-nowrap flex items-center"
          onClick={() => handleDashboardChange("new")}
        >
          <Grid3X3 size={16} className="mr-2" />
          NEW DASHBOARD
        </Button>
        <Button className="bg-green-500 hover:bg-green-600 whitespace-nowrap flex items-center">
          <Plus size={16} className="mr-2" />
          NEW WIDGET
        </Button>
        <Button variant="outline" className="flex items-center whitespace-nowrap bg-transparent">
          Default
          <ChevronDown size={16} className="ml-2" />
        </Button>
        <div className="flex-1"></div>
        <Button variant="outline" className="flex items-center whitespace-nowrap bg-transparent">
          Today
          <ChevronDown size={16} className="ml-2" />
        </Button>
        <Button variant="outline" className="flex items-center whitespace-nowrap bg-transparent">
          Group By
          <ChevronDown size={16} className="ml-2" />
        </Button>
        <Button
          variant="outline"
          className="flex items-center whitespace-nowrap bg-transparent"
          onClick={() => handleGroupByChange(groupBy === "Hour" ? "Day" : "Hour")}
        >
          {groupBy}
          <ChevronDown size={16} className="ml-2" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard icon={Eye} iconColor="text-green-500" title="IMPRESSIONS" value={dashboardData.metrics.thisMonth.impressions.toLocaleString()} date="29 Mar 2026" />
        <MetricCard icon={MousePointer} iconColor="text-blue-500" title="CLICKS" value={dashboardData.metrics.thisMonth.clicks.toLocaleString()} date="29 Mar 2026" />
        <MetricCard icon={DollarSign} iconColor="text-green-500" title="ECPM" value={`$${dashboardData.metrics.thisMonth.ecpm.toFixed(2)}`} date="29 Mar 2026" />
        <MetricCard icon={BarChart2} iconColor="text-red-500" title="CTR" value={`${dashboardData.metrics.thisMonth.ctr.toFixed(2)}%`} date="29 Mar 2026" />
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex items-center mb-4">
          <Filter size={18} className="mr-2" />
          <h3 className="font-medium">Filters</h3>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" className="flex items-center bg-transparent">
            <Calendar size={16} className="mr-2" />
            Date Range
            <ChevronDown size={16} className="ml-2" />
          </Button>
          <Button variant="outline" className="flex items-center bg-transparent">
            <Globe size={16} className="mr-2" />
            Country
            <ChevronDown size={16} className="ml-2" />
          </Button>
          <Button variant="outline" className="flex items-center bg-transparent">
            <MousePointer size={16} className="mr-2" />
            Device
            <ChevronDown size={16} className="ml-2" />
          </Button>
          <Button className="bg-green-500 hover:bg-green-600">Apply Filters</Button>
          <Button variant="outline">Reset</Button>
        </div>
      </Card>

      {/* Earnings Chart */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h3 className="text-lg font-medium">Earnings Over Time</h3>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              Today
            </Button>
            <Button variant="outline" size="sm">
              Last 7 Days
            </Button>
            <Button variant="outline" size="sm">
              Last 30 Days
            </Button>
            <Button variant="outline" size="sm">
              Custom Range
            </Button>
          </div>
        </div>

        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <EarningsStat title="This Month" value={`$${dashboardData.metrics.thisMonth.revenue.toFixed(2)}`} date="29 Mar 2026" valueColor="text-green-500" />
            <EarningsStat title="Last Month" value={`$${dashboardData.metrics.lastMonth.revenue.toFixed(2)}`} />
            <EarningsStat title="Last 6 Months" value={`$${dashboardData.metrics.last6Months.revenue.toFixed(2)}`} date="29 Mar 2026" valueColor="text-blue-500" />
            <EarningsStat title="Total Clicks" value={dashboardData.metrics.thisMonth.clicks.toLocaleString()} date="29 Mar 2026" valueColor="text-blue-500" />
            <EarningsStat title="Impressions" value={dashboardData.metrics.thisMonth.impressions.toLocaleString()} date="29 Mar 2026" />
          </div>

          <div className="h-64">
            <BarChart />
          </div>
        </Card>
      </div>

      {/* Recent Activity - Updated with October 6 record earnings and August 23 high performance */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Recent Activity</h3>
        <Card className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-sm">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Activity</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Site</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Revenue</th>
                </tr>
              </thead>
              <tbody>
                <ActivityRow
                  date="Feb 11, 2026"
                  activity="Daily Earnings Added"
                  site="lustifysex.com"
                  revenue="$2.00"
                  status="confirmed"
                />
                <ActivityRow
                  date="Feb 10, 2026"
                  activity="Daily Earnings Added"
                  site="lustifysex.com"
                  revenue="$5.00"
                  status="confirmed"
                />
                <ActivityRow
                  date="Feb 9, 2026"
                  activity="Daily Earnings Added"
                  site="lustifysex.com"
                  revenue="$3.00"
                  status="confirmed"
                />
                <ActivityRow
                  date="Feb 8, 2026"
                  activity="Daily Earnings Added"
                  site="lustifysex.com"
                  revenue="$5.00"
                  status="confirmed"
                />
                <ActivityRow
                  date="Feb 7, 2026"
                  activity="Daily Earnings Added"
                  site="lustifysex.com"
                  revenue="$4.00"
                  status="confirmed"
                />
                <ActivityRow
                  date="Feb 6, 2026"
                  activity="Daily Earnings Added"
                  site="lustifysex.com"
                  revenue="$3.00"
                  status="confirmed"
                />
                <ActivityRow
                  date="Feb 5, 2026"
                  activity="Daily Earnings Added"
                  site="lustifysex.com"
                  revenue="$2.00"
                  status="confirmed"
                />
                <ActivityRow
                  date="Feb 4, 2026"
                  activity="Daily Earnings Added"
                  site="lustifysex.com"
                  revenue="$5.00"
                  status="confirmed"
                />
                <ActivityRow
                  date="Feb 3, 2026"
                  activity="Daily Earnings Added"
                  site="lustifysex.com"
                  revenue="$4.00"
                  status="confirmed"
                />
                <ActivityRow
                  date="Feb 2, 2026"
                  activity="Daily Earnings Added"
                  site="lustifysex.com"
                  revenue="$9.00"
                  status="confirmed"
                />
                <ActivityRow
                  date="Feb 2, 2026"
                  activity="Daily Earnings Added"
                  site="lustifysex.com"
                  revenue="$4.00"
                  status="confirmed"
                />
                <ActivityRow
                  date="Feb 1, 2026"
                  activity="Daily Earnings Added"
                  site="lustifysex.com"
                  revenue="$5.00"
                  status="confirmed"
                />
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}

interface StatsCardProps {
  title: string
  value: string
  badge?: {
    text: string
    color: string
  }
}

function StatsCard({ title, value, badge }: StatsCardProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-xs text-gray-500 mb-2">{title}</div>
            <div className="text-2xl font-semibold flex items-center">
              {value}
              {badge && (
                <span className={`ml-2 text-xs text-white px-2 py-0.5 rounded ${badge.color}`}>{badge.text}</span>
              )}
            </div>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p>Earnings for {title.toLowerCase()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

interface MetricCardProps {
  icon: React.ElementType
  iconColor: string
  title: string
  value: string
  date: string
}

function MetricCard({ icon: Icon, iconColor, title, value, date }: MetricCardProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex justify-center mb-2">
              <Icon className={`${iconColor}`} size={24} />
            </div>
            <div className="text-xs text-gray-500 text-center mb-1">{title}</div>
            <div className={`text-2xl font-semibold text-center ${iconColor}`}>{value}</div>
            <div className="text-xs text-gray-500 text-center mt-1">{date}</div>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {title} for {date}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

interface EarningsStatProps {
  title: string
  value: string
  valueColor?: string
  date?: string
}

function EarningsStat({ title, value, valueColor = "text-gray-900", date }: EarningsStatProps) {
  return (
    <div className="text-center">
      <div className="text-sm text-gray-500 mb-1">{title}</div>
      <div className={`text-lg font-semibold ${valueColor}`}>{value}</div>
      {date && <div className="text-xs text-gray-400 mt-1">{date}</div>}
    </div>
  )
}

interface ActivityRowProps {
  date: string
  activity: string
  site: string
  revenue: string
  status?: "confirmed" | "pending" | "failed"
  systemGenerated?: boolean
}

function ActivityRow({ date, activity, site, revenue, status, systemGenerated }: ActivityRowProps) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-4 text-sm">{date}</td>
      <td className="py-3 px-4 text-sm font-medium">
        <div className="flex items-center">
          {activity}
          {status && (
            <span
              className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                status === "confirmed"
                  ? "bg-green-100 text-green-800"
                  : status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
              }`}
            >
              {status}
            </span>
          )}
          {systemGenerated && (
            <>
              <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">System Generated</span>
              <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">Verified</span>
            </>
          )}
        </div>
      </td>
      <td className="py-3 px-4 text-sm">{site}</td>
      <td className="py-3 px-4 text-sm">{revenue}</td>
    </tr>
  )
}
