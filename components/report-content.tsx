"use client"
import { useState } from "react"
import { Download, Filter, RefreshCw, Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample data for different filters - Updated with September-October 2025 data
const reportData = {
  "Last 7 Days": {
    "All Countries": {
      "All Devices": [
        { date: "December 7, 2025", impressions: "4,100", clicks: "46", ctr: "1.12%", revenue: "$3.90", ecpm: "$951" },
        {
          date: "December 6, 2025",
          impressions: "11,800",
          clicks: "125",
          ctr: "1.05%",
          revenue: "$3.30",
          ecpm: "$279",
        },
        {
          date: "December 5, 2025",
          impressions: "13,200",
          clicks: "142",
          ctr: "1.07%",
          revenue: "$3.80",
          ecpm: "$287",
        },
        {
          date: "December 4, 2025",
          impressions: "14,000",
          clicks: "150",
          ctr: "1.07%",
          revenue: "$4.00",
          ecpm: "$285",
        },
        {
          date: "December 3, 2025",
          impressions: "14,500",
          clicks: "155",
          ctr: "1.06%",
          revenue: "$4.20",
          ecpm: "$289",
        },
        {
          date: "December 2, 2025",
          impressions: "15,000",
          clicks: "160",
          ctr: "1.06%",
          revenue: "$4.50",
          ecpm: "$300",
        },
        {
          date: "December 1, 2025",
          impressions: "16,000",
          clicks: "175",
          ctr: "1.09%",
          revenue: "$5.00",
          ecpm: "$312",
        },
      ],
      Desktop: [
        { date: "December 7, 2025", impressions: "2,870", clicks: "32", ctr: "1.11%", revenue: "$2.73", ecpm: "$951" },
        { date: "December 6, 2025", impressions: "8,260", clicks: "87", ctr: "1.05%", revenue: "$2.31", ecpm: "$279" },
        { date: "December 5, 2025", impressions: "9,240", clicks: "99", ctr: "1.07%", revenue: "$2.66", ecpm: "$287" },
        { date: "December 4, 2025", impressions: "9,800", clicks: "105", ctr: "1.07%", revenue: "$2.80", ecpm: "$285" },
        {
          date: "December 3, 2025",
          impressions: "10,150",
          clicks: "108",
          ctr: "1.06%",
          revenue: "$2.94",
          ecpm: "$289",
        },
        {
          date: "December 2, 2025",
          impressions: "10,500",
          clicks: "112",
          ctr: "1.06%",
          revenue: "$3.15",
          ecpm: "$300",
        },
        {
          date: "December 1, 2025",
          impressions: "11,200",
          clicks: "122",
          ctr: "1.09%",
          revenue: "$3.50",
          ecpm: "$312",
        },
      ],
      Mobile: [
        { date: "December 7, 2025", impressions: "1,230", clicks: "14", ctr: "1.13%", revenue: "$1.17", ecpm: "$951" },
        { date: "December 6, 2025", impressions: "3,540", clicks: "38", ctr: "1.07%", revenue: "$0.99", ecpm: "$279" },
        { date: "December 5, 2025", impressions: "3,960", clicks: "43", ctr: "1.08%", revenue: "$1.14", ecpm: "$287" },
        { date: "December 4, 2025", impressions: "4,200", clicks: "45", ctr: "1.07%", revenue: "$1.20", ecpm: "$285" },
        { date: "December 3, 2025", impressions: "4,350", clicks: "47", ctr: "1.08%", revenue: "$1.26", ecpm: "$289" },
        { date: "December 2, 2025", impressions: "4,500", clicks: "48", ctr: "1.06%", revenue: "$1.35", ecpm: "$300" },
        { date: "December 1, 2025", impressions: "4,800", clicks: "53", ctr: "1.10%", revenue: "$1.50", ecpm: "$312" },
      ],
    },
  },
  "Last 30 Days": {
    "All Countries": {
      "All Devices": [
        { date: "December 7, 2025", impressions: "4,100", clicks: "46", ctr: "1.12%", revenue: "$3.90", ecpm: "$951" },
        {
          date: "December 6, 2025",
          impressions: "11,800",
          clicks: "125",
          ctr: "1.05%",
          revenue: "$3.30",
          ecpm: "$279",
        },
        {
          date: "December 5, 2025",
          impressions: "13,200",
          clicks: "142",
          ctr: "1.07%",
          revenue: "$3.80",
          ecpm: "$287",
        },
        {
          date: "December 4, 2025",
          impressions: "14,000",
          clicks: "150",
          ctr: "1.07%",
          revenue: "$4.00",
          ecpm: "$285",
        },
        {
          date: "December 3, 2025",
          impressions: "14,500",
          clicks: "155",
          ctr: "1.06%",
          revenue: "$4.20",
          ecpm: "$289",
        },
        {
          date: "December 2, 2025",
          impressions: "15,000",
          clicks: "160",
          ctr: "1.06%",
          revenue: "$4.50",
          ecpm: "$300",
        },
        {
          date: "December 1, 2025",
          impressions: "16,000",
          clicks: "175",
          ctr: "1.09%",
          revenue: "$5.00",
          ecpm: "$312",
        },
        {
          date: "November 30, 2025",
          impressions: "11,500",
          clicks: "125",
          ctr: "1.08%",
          revenue: "$4.00",
          ecpm: "$347",
        },
        {
          date: "November 29, 2025",
          impressions: "10,800",
          clicks: "112",
          ctr: "1.03%",
          revenue: "$3.80",
          ecpm: "$351",
        },
        {
          date: "November 28, 2025",
          impressions: "10,000",
          clicks: "102",
          ctr: "1.02%",
          revenue: "$3.60",
          ecpm: "$360",
        },
        {
          date: "November 27, 2025",
          impressions: "9,800",
          clicks: "100",
          ctr: "1.02%",
          revenue: "$3.50",
          ecpm: "$357",
        },
        { date: "November 26, 2025", impressions: "9,500", clicks: "98", ctr: "1.03%", revenue: "$3.40", ecpm: "$358" },
        { date: "November 25, 2025", impressions: "9,000", clicks: "90", ctr: "1.00%", revenue: "$3.20", ecpm: "$355" },
        { date: "November 24, 2025", impressions: "8,500", clicks: "85", ctr: "1.00%", revenue: "$3.00", ecpm: "$352" },
        { date: "November 23, 2025", impressions: "8,700", clicks: "88", ctr: "1.01%", revenue: "$3.00", ecpm: "$344" },
        { date: "November 22, 2025", impressions: "9,000", clicks: "90", ctr: "1.00%", revenue: "$3.00", ecpm: "$333" },
        {
          date: "November 21, 2025",
          impressions: "9,400",
          clicks: "100",
          ctr: "1.06%",
          revenue: "$3.00",
          ecpm: "$319",
        },
        { date: "November 20, 2025", impressions: "9,500", clicks: "98", ctr: "1.03%", revenue: "$3.00", ecpm: "$315" },
        {
          date: "November 19, 2025",
          impressions: "9,800",
          clicks: "110",
          ctr: "1.12%",
          revenue: "$3.20",
          ecpm: "$326",
        },
        {
          date: "November 18, 2025",
          impressions: "10,200",
          clicks: "115",
          ctr: "1.12%",
          revenue: "$3.40",
          ecpm: "$333",
        },
        {
          date: "November 17, 2025",
          impressions: "11,000",
          clicks: "125",
          ctr: "1.13%",
          revenue: "$3.60",
          ecpm: "$327",
        },
        {
          date: "November 16, 2025",
          impressions: "11,500",
          clicks: "130",
          ctr: "1.13%",
          revenue: "$3.80",
          ecpm: "$330",
        },
        {
          date: "November 15, 2025",
          impressions: "12,000",
          clicks: "140",
          ctr: "1.16%",
          revenue: "$4.00",
          ecpm: "$333",
        },
        {
          date: "November 14, 2025",
          impressions: "12,500",
          clicks: "148",
          ctr: "1.18%",
          revenue: "$4.20",
          ecpm: "$336",
        },
        {
          date: "November 13, 2025",
          impressions: "13,500",
          clicks: "155",
          ctr: "1.15%",
          revenue: "$4.50",
          ecpm: "$333",
        },
        {
          date: "November 12, 2025",
          impressions: "14,200",
          clicks: "160",
          ctr: "1.12%",
          revenue: "$4.80",
          ecpm: "$338",
        },
        {
          date: "November 11, 2025",
          impressions: "15,000",
          clicks: "175",
          ctr: "1.16%",
          revenue: "$5.00",
          ecpm: "$333",
        },
        { date: "October 30, 2025", impressions: "6,000", clicks: "60", ctr: "1.00%", revenue: "$0.50", ecpm: "$83" },
        { date: "October 29, 2025", impressions: "8,000", clicks: "82", ctr: "1.02%", revenue: "$1.20", ecpm: "$150" },
        { date: "October 28, 2025", impressions: "9,500", clicks: "95", ctr: "1.00%", revenue: "$1.80", ecpm: "$189" },
      ],
      Desktop: [
        { date: "December 7, 2025", impressions: "2,870", clicks: "32", ctr: "1.11%", revenue: "$2.73", ecpm: "$951" },
        { date: "December 6, 2025", impressions: "8,260", clicks: "87", ctr: "1.05%", revenue: "$2.31", ecpm: "$279" },
        { date: "December 5, 2025", impressions: "9,240", clicks: "99", ctr: "1.07%", revenue: "$2.66", ecpm: "$287" },
        { date: "December 4, 2025", impressions: "9,800", clicks: "105", ctr: "1.07%", revenue: "$2.80", ecpm: "$285" },
        {
          date: "December 3, 2025",
          impressions: "10,150",
          clicks: "108",
          ctr: "1.06%",
          revenue: "$2.94",
          ecpm: "$289",
        },
        {
          date: "December 2, 2025",
          impressions: "10,500",
          clicks: "112",
          ctr: "1.06%",
          revenue: "$3.15",
          ecpm: "$300",
        },
        {
          date: "December 1, 2025",
          impressions: "11,200",
          clicks: "122",
          ctr: "1.09%",
          revenue: "$3.50",
          ecpm: "$312",
        },
        { date: "November 30, 2025", impressions: "8,050", clicks: "87", ctr: "1.08%", revenue: "$2.80", ecpm: "$347" },
        { date: "November 29, 2025", impressions: "7,560", clicks: "78", ctr: "1.03%", revenue: "$2.66", ecpm: "$351" },
        { date: "November 28, 2025", impressions: "7,000", clicks: "71", ctr: "1.01%", revenue: "$2.52", ecpm: "$360" },
        { date: "November 27, 2025", impressions: "6,860", clicks: "70", ctr: "1.02%", revenue: "$2.45", ecpm: "$357" },
        { date: "November 26, 2025", impressions: "6,650", clicks: "68", ctr: "1.02%", revenue: "$2.38", ecpm: "$358" },
        { date: "November 25, 2025", impressions: "6,300", clicks: "63", ctr: "1.00%", revenue: "$2.24", ecpm: "$355" },
        { date: "November 24, 2025", impressions: "5,950", clicks: "59", ctr: "0.99%", revenue: "$2.10", ecpm: "$352" },
        { date: "November 23, 2025", impressions: "6,090", clicks: "61", ctr: "1.00%", revenue: "$2.10", ecpm: "$344" },
        { date: "November 22, 2025", impressions: "6,300", clicks: "63", ctr: "1.00%", revenue: "$2.10", ecpm: "$333" },
        { date: "November 21, 2025", impressions: "6,580", clicks: "70", ctr: "1.06%", revenue: "$2.10", ecpm: "$319" },
        { date: "November 20, 2025", impressions: "6,650", clicks: "68", ctr: "1.02%", revenue: "$2.10", ecpm: "$315" },
        { date: "November 19, 2025", impressions: "6,860", clicks: "77", ctr: "1.12%", revenue: "$2.24", ecpm: "$326" },
        { date: "November 18, 2025", impressions: "7,140", clicks: "80", ctr: "1.12%", revenue: "$2.38", ecpm: "$333" },
        { date: "November 17, 2025", impressions: "7,700", clicks: "87", ctr: "1.13%", revenue: "$2.52", ecpm: "$327" },
        { date: "November 16, 2025", impressions: "8,050", clicks: "91", ctr: "1.13%", revenue: "$2.66", ecpm: "$330" },
        { date: "November 15, 2025", impressions: "8,400", clicks: "98", ctr: "1.16%", revenue: "$2.80", ecpm: "$333" },
        {
          date: "November 14, 2025",
          impressions: "8,750",
          clicks: "103",
          ctr: "1.18%",
          revenue: "$2.94",
          ecpm: "$336",
        },
        {
          date: "November 13, 2025",
          impressions: "9,450",
          clicks: "108",
          ctr: "1.14%",
          revenue: "$3.15",
          ecpm: "$333",
        },
        {
          date: "November 12, 2025",
          impressions: "9,940",
          clicks: "112",
          ctr: "1.13%",
          revenue: "$3.36",
          ecpm: "$338",
        },
        {
          date: "November 11, 2025",
          impressions: "10,500",
          clicks: "122",
          ctr: "1.16%",
          revenue: "$3.50",
          ecpm: "$333",
        },
        { date: "October 30, 2025", impressions: "4,200", clicks: "42", ctr: "1.00%", revenue: "$0.35", ecpm: "$83" },
        { date: "October 29, 2025", impressions: "5,600", clicks: "57", ctr: "1.02%", revenue: "$0.84", ecpm: "$150" },
        { date: "October 28, 2025", impressions: "6,650", clicks: "66", ctr: "0.99%", revenue: "$1.26", ecpm: "$189" },
      ],
      Mobile: [
        { date: "December 7, 2025", impressions: "1,230", clicks: "14", ctr: "1.13%", revenue: "$1.17", ecpm: "$951" },
        { date: "December 6, 2025", impressions: "3,540", clicks: "38", ctr: "1.07%", revenue: "$0.99", ecpm: "$279" },
        { date: "December 5, 2025", impressions: "3,960", clicks: "43", ctr: "1.08%", revenue: "$1.14", ecpm: "$287" },
        { date: "December 4, 2025", impressions: "4,200", clicks: "45", ctr: "1.07%", revenue: "$1.20", ecpm: "$285" },
        { date: "December 3, 2025", impressions: "4,350", clicks: "47", ctr: "1.08%", revenue: "$1.26", ecpm: "$289" },
        { date: "December 2, 2025", impressions: "4,500", clicks: "48", ctr: "1.06%", revenue: "$1.35", ecpm: "$300" },
        { date: "December 1, 2025", impressions: "4,800", clicks: "53", ctr: "1.10%", revenue: "$1.50", ecpm: "$312" },
        { date: "November 30, 2025", impressions: "3,450", clicks: "38", ctr: "1.10%", revenue: "$1.20", ecpm: "$347" },
        { date: "November 29, 2025", impressions: "3,240", clicks: "34", ctr: "1.04%", revenue: "$1.14", ecpm: "$351" },
        { date: "November 28, 2025", impressions: "3,000", clicks: "31", ctr: "1.03%", revenue: "$1.08", ecpm: "$360" },
        { date: "November 27, 2025", impressions: "2,940", clicks: "30", ctr: "1.02%", revenue: "$1.05", ecpm: "$357" },
        { date: "November 26, 2025", impressions: "2,850", clicks: "30", ctr: "1.05%", revenue: "$1.02", ecpm: "$358" },
        { date: "November 25, 2025", impressions: "2,700", clicks: "27", ctr: "1.00%", revenue: "$0.96", ecpm: "$355" },
        { date: "November 24, 2025", impressions: "2,550", clicks: "26", ctr: "1.02%", revenue: "$0.90", ecpm: "$352" },
        { date: "November 23, 2025", impressions: "2,610", clicks: "27", ctr: "1.03%", revenue: "$0.90", ecpm: "$344" },
        { date: "November 22, 2025", impressions: "2,700", clicks: "27", ctr: "1.00%", revenue: "$0.90", ecpm: "$333" },
        { date: "November 21, 2025", impressions: "2,820", clicks: "30", ctr: "1.06%", revenue: "$0.90", ecpm: "$319" },
        { date: "November 20, 2025", impressions: "2,850", clicks: "30", ctr: "1.05%", revenue: "$0.90", ecpm: "$315" },
        { date: "November 19, 2025", impressions: "2,940", clicks: "33", ctr: "1.12%", revenue: "$0.96", ecpm: "$326" },
        { date: "November 18, 2025", impressions: "3,060", clicks: "35", ctr: "1.14%", revenue: "$1.02", ecpm: "$333" },
        { date: "November 17, 2025", impressions: "3,300", clicks: "38", ctr: "1.15%", revenue: "$1.08", ecpm: "$327" },
        { date: "November 16, 2025", impressions: "3,450", clicks: "39", ctr: "1.13%", revenue: "$1.14", ecpm: "$330" },
        { date: "November 15, 2025", impressions: "3,600", clicks: "42", ctr: "1.17%", revenue: "$1.20", ecpm: "$333" },
        { date: "November 14, 2025", impressions: "3,750", clicks: "45", ctr: "1.20%", revenue: "$1.26", ecpm: "$336" },
        { date: "November 13, 2025", impressions: "4,050", clicks: "47", ctr: "1.16%", revenue: "$1.35", ecpm: "$333" },
        { date: "November 12, 2025", impressions: "4,260", clicks: "48", ctr: "1.13%", revenue: "$1.44", ecpm: "$338" },
        { date: "November 11, 2025", impressions: "4,500", clicks: "53", ctr: "1.18%", revenue: "$1.50", ecpm: "$333" },
        { date: "October 30, 2025", impressions: "1,800", clicks: "18", ctr: "1.00%", revenue: "$0.15", ecpm: "$83" },
        { date: "October 29, 2025", impressions: "2,400", clicks: "25", ctr: "1.04%", revenue: "$0.36", ecpm: "$150" },
        { date: "October 28, 2025", impressions: "2,850", clicks: "29", ctr: "1.02%", revenue: "$0.54", ecpm: "$189" },
      ],
    },
  },
}

export function ReportContent() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [showReport, setShowReport] = useState(true)
  const [selectedDateRange, setSelectedDateRange] = useState("Last 7 Days")
  const [selectedGroupBy, setSelectedGroupBy] = useState("Day")
  const [selectedMetrics, setSelectedMetrics] = useState("All Metrics")
  const [selectedSite, setSelectedSite] = useState("lustifysex.com")
  const [selectedCountry, setSelectedCountry] = useState("All Countries")
  const [selectedDevice, setSelectedDevice] = useState("All Devices")
  const [currentReportData, setCurrentReportData] = useState(reportData["Last 7 Days"]["All Countries"]["All Devices"])
  const [isFiltered, setIsFiltered] = useState(false)

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    setShowReport(false)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsGenerating(false)
    setShowReport(true)
  }

  const handleRefresh = async () => {
    setIsGenerating(true)

    // Simulate refresh delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsGenerating(false)
  }

  const handleApplyFilters = async () => {
    setIsGenerating(true)
    setShowReport(false)

    // Simulate filter processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Get filtered data based on selections
    const dateData = reportData[selectedDateRange as keyof typeof reportData]
    const countryData = dateData?.[selectedCountry as keyof typeof dateData]
    const deviceData = countryData?.[selectedDevice as keyof typeof countryData]

    if (deviceData) {
      setCurrentReportData(deviceData)
      setIsFiltered(true)
    } else {
      // Fallback to default data if combination doesn't exist
      setCurrentReportData(reportData["Last 7 Days"]["All Countries"]["All Devices"])
      setIsFiltered(false)
    }

    setIsGenerating(false)
    setShowReport(true)
  }

  const handleReset = async () => {
    setIsGenerating(true)
    setShowReport(false)

    // Reset all filters
    setSelectedDateRange("Last 7 Days")
    setSelectedGroupBy("Day")
    setSelectedMetrics("All Metrics")
    setSelectedSite("lustifysex.com")
    setSelectedCountry("All Countries")
    setSelectedDevice("All Devices")

    // Simulate reset delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Reset to default data
    setCurrentReportData(reportData["Last 7 Days"]["All Countries"]["All Devices"])
    setIsFiltered(false)

    setIsGenerating(false)
    setShowReport(true)
  }

  // Calculate totals for current data
  const calculateTotals = () => {
    const totalRevenue = currentReportData.reduce((sum, row) => {
      const revenue = Number.parseFloat(row.revenue.replace("$", "").replace(",", ""))
      return sum + revenue
    }, 0)

    const totalImpressions = currentReportData.reduce((sum, row) => {
      const impressions = Number.parseInt(row.impressions.replace(",", ""))
      return sum + impressions
    }, 0)

    const totalClicks = currentReportData.reduce((sum, row) => {
      const clicks = Number.parseInt(row.clicks.replace(",", ""))
      return sum + clicks
    }, 0)

    const avgCTR = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : "0.00"
    const avgECPM = totalImpressions > 0 ? ((totalRevenue / totalImpressions) * 1000).toFixed(2) : "0.00"

    return {
      totalRevenue: totalRevenue.toFixed(2),
      totalImpressions: totalImpressions.toLocaleString(),
      totalClicks: totalClicks.toLocaleString(),
      avgCTR: `${avgCTR}%`,
      avgECPM: `$${avgECPM}`,
    }
  }

  const totals = calculateTotals()

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Reports</h1>
        <div className="flex items-center space-x-2 flex-wrap gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center bg-transparent"
                  onClick={handleRefresh}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <Loader2 size={16} className="mr-2 animate-spin" />
                  ) : (
                    <RefreshCw size={16} className="mr-2" />
                  )}
                  Refresh
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh report data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="flex items-center bg-transparent">
                  <Download size={16} className="mr-2" />
                  Export
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export report as CSV</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex items-center mb-4">
          <Filter size={18} className="mr-2" />
          <h3 className="font-medium">Report Filters</h3>
          {isFiltered && (
            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Filters Applied</span>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Date Range</label>
            <select
              className="w-full p-2 border rounded-md bg-white"
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
              <option>Last 6 Months</option>
              <option>This Year</option>
              <option>Custom Range</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Group By</label>
            <select
              className="w-full p-2 border rounded-md bg-white"
              value={selectedGroupBy}
              onChange={(e) => setSelectedGroupBy(e.target.value)}
            >
              <option>Hour</option>
              <option>Day</option>
              <option>Week</option>
              <option>Month</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Metrics</label>
            <select
              className="w-full p-2 border rounded-md bg-white"
              value={selectedMetrics}
              onChange={(e) => setSelectedMetrics(e.target.value)}
            >
              <option>All Metrics</option>
              <option>Revenue Only</option>
              <option>Traffic Only</option>
              <option>Performance Only</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Sites</label>
            <select
              className="w-full p-2 border rounded-md bg-white"
              value={selectedSite}
              onChange={(e) => setSelectedSite(e.target.value)}
            >
              <option>lustifysex.com</option>
              <option>All Sites</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Countries</label>
            <select
              className="w-full p-2 border rounded-md bg-white"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option>All Countries</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Canada</option>
              <option>Australia</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Device</label>
            <select
              className="w-full p-2 border rounded-md bg-white"
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
            >
              <option>All Devices</option>
              <option>Desktop</option>
              <option>Mobile</option>
              <option>Tablet</option>
            </select>
          </div>
          <div className="flex items-end gap-2">
            <Button
              className="bg-green-500 hover:bg-green-600 flex-1"
              onClick={handleApplyFilters}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Applying...
                </>
              ) : (
                "Apply Filters"
              )}
            </Button>
            <Button variant="outline" onClick={handleReset} disabled={isGenerating} className="bg-transparent">
              Reset
            </Button>
          </div>
        </div>

        {/* Filter Summary */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">
            <strong>Current Filters:</strong> {selectedDateRange} • {selectedGroupBy} • {selectedSite} •{" "}
            {selectedCountry} • {selectedDevice} • {selectedMetrics}
          </div>
        </div>
      </Card>

      {/* Loading State */}
      {isGenerating && (
        <Card className="p-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 size={32} className="animate-spin text-green-500" />
            <div className="text-lg font-medium">{isFiltered ? "Applying Filters..." : "Generating Report..."}</div>
            <div className="text-sm text-gray-500">Please wait while we compile your data</div>
          </div>
        </Card>
      )}

      {/* Report Table */}
      {showReport && !isGenerating && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Report Results</h3>
            <div className="text-sm text-gray-500">
              Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-sm text-gray-600 mb-1">Total Revenue</div>
              <div className="text-xl font-bold text-green-600">${totals.totalRevenue}</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-sm text-gray-600 mb-1">Total Impressions</div>
              <div className="text-xl font-bold text-blue-600">{totals.totalImpressions}</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-sm text-gray-600 mb-1">Total Clicks</div>
              <div className="text-xl font-bold text-purple-600">{totals.totalClicks}</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <div className="text-sm text-gray-600 mb-1">Average CTR</div>
              <div className="text-xl font-bold text-orange-600">{totals.avgCTR}</div>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg text-center">
              <div className="text-sm text-gray-600 mb-1">Average eCPM</div>
              <div className="text-xl font-bold text-indigo-600">{totals.avgECPM}</div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-sm">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Impressions</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Clicks</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">CTR</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">eCPM</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {currentReportData.map((row, index) => (
                  <ReportRow
                    key={index}
                    date={row.date}
                    impressions={row.impressions}
                    clicks={row.clicks}
                    ctr={row.ctr}
                    ecpm={row.ecpm}
                    revenue={row.revenue}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}

interface ReportRowProps {
  date: string
  impressions: string
  clicks: string
  ctr: string
  ecpm: string
  revenue: string
}

function ReportRow({ date, impressions, clicks, ctr, ecpm, revenue }: ReportRowProps) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-4 text-sm">{date}</td>
      <td className="py-3 px-4 text-sm">{impressions}</td>
      <td className="py-3 px-4 text-sm">{clicks}</td>
      <td className="py-3 px-4 text-sm">{ctr}</td>
      <td className="py-3 px-4 text-sm">{ecpm}</td>
      <td className="py-3 px-4 text-sm font-medium">{revenue}</td>
    </tr>
  )
}
