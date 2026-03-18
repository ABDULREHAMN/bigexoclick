// Dashboard data service - MARCH 1-18 ONLY
export const dashboardData = {
  metrics: {
    thisMonth: {
      revenue: 95,
      impressions: 3900,
      clicks: 89,
      ctr: 2.28,
      ecpm: 3.1,
    },
    lastMonth: {
      revenue: 45,
      impressions: 0,
      clicks: 0,
      ctr: 0,
      ecpm: 0,
    },
    last6Months: {
      revenue: 115345,
      impressions: 60300,
      clicks: 1471,
      ctr: 2.44,
      ecpm: 1912.76,
    },
  },

  recentActivity: [],

  // Chart data: Last 6 Months (using totals from config)
  last6Months: [
    { date: "Mar 01-18", revenue: 95, impressions: 60300, clicks: 1471 },
  ],

  // Reports data organized by period
  reports: {
    "Last 7 Days": {
      "All Countries": {
        "All Devices": [
          { date: "12 Mar", impressions: "3300", clicks: "78", ctr: "2.36%", revenue: "$4.90", ecpm: "$2.60" },
          { date: "13 Mar", impressions: "3400", clicks: "80", ctr: "2.35%", revenue: "$5.10", ecpm: "$2.70" },
          { date: "14 Mar", impressions: "3500", clicks: "83", ctr: "2.37%", revenue: "$5.40", ecpm: "$2.80" },
          { date: "15 Mar", impressions: "3600", clicks: "85", ctr: "2.36%", revenue: "$5.70", ecpm: "$2.90" },
          { date: "16 Mar", impressions: "3700", clicks: "88", ctr: "2.38%", revenue: "$6.00", ecpm: "$3.00" },
          { date: "17 Mar", impressions: "3800", clicks: "90", ctr: "2.37%", revenue: "$6.30", ecpm: "$3.10" },
          { date: "18 Mar", impressions: "3900", clicks: "89", ctr: "2.28%", revenue: "$6.50", ecpm: "$3.10" },
        ],
      },
    },
    "Last 30 Days": {
      "All Countries": {
        "All Devices": [
          { date: "01 Mar", impressions: "3200", clicks: "72", ctr: "2.25%", revenue: "$4.20", ecpm: "$2.30" },
          { date: "02 Mar", impressions: "3300", clicks: "75", ctr: "2.27%", revenue: "$4.50", ecpm: "$2.50" },
          { date: "03 Mar", impressions: "3400", clicks: "78", ctr: "2.29%", revenue: "$4.80", ecpm: "$2.60" },
          { date: "04 Mar", impressions: "3500", clicks: "80", ctr: "2.29%", revenue: "$5.00", ecpm: "$2.70" },
          { date: "05 Mar", impressions: "3600", clicks: "82", ctr: "2.28%", revenue: "$5.20", ecpm: "$2.80" },
          { date: "06 Mar", impressions: "3700", clicks: "85", ctr: "2.30%", revenue: "$5.50", ecpm: "$2.90" },
          { date: "07 Mar", impressions: "3800", clicks: "88", ctr: "2.32%", revenue: "$5.80", ecpm: "$3.00" },
          { date: "08 Mar", impressions: "3900", clicks: "90", ctr: "2.31%", revenue: "$6.00", ecpm: "$3.10" },
          { date: "09 Mar", impressions: "3000", clicks: "70", ctr: "2.33%", revenue: "$4.00", ecpm: "$2.20" },
          { date: "10 Mar", impressions: "3100", clicks: "73", ctr: "2.35%", revenue: "$4.30", ecpm: "$2.30" },
          { date: "11 Mar", impressions: "3200", clicks: "75", ctr: "2.34%", revenue: "$4.60", ecpm: "$2.50" },
          { date: "12 Mar", impressions: "3300", clicks: "78", ctr: "2.36%", revenue: "$4.90", ecpm: "$2.60" },
          { date: "13 Mar", impressions: "3400", clicks: "80", ctr: "2.35%", revenue: "$5.10", ecpm: "$2.70" },
          { date: "14 Mar", impressions: "3500", clicks: "83", ctr: "2.37%", revenue: "$5.40", ecpm: "$2.80" },
          { date: "15 Mar", impressions: "3600", clicks: "85", ctr: "2.36%", revenue: "$5.70", ecpm: "$2.90" },
          { date: "16 Mar", impressions: "3700", clicks: "88", ctr: "2.38%", revenue: "$6.00", ecpm: "$3.00" },
          { date: "17 Mar", impressions: "3800", clicks: "90", ctr: "2.37%", revenue: "$6.30", ecpm: "$3.10" },
          { date: "18 Mar", impressions: "3900", clicks: "89", ctr: "2.28%", revenue: "$6.50", ecpm: "$3.10" },
        ],
      },
    },
    "Last 6 Months": {
      "All Countries": {
        "All Devices": [
          { date: "Mar 01-18", impressions: "60300", clicks: "1471", ctr: "2.44%", revenue: "$95.00", ecpm: "$1912.76" },
        ],
      },
    },
  },
}

export function getChartData(period: string) {
  switch (period) {
    case "7":
      return dashboardData.last7Days
    case "30":
      return dashboardData.last30Days
    case "6months":
      return dashboardData.last6Months
    default:
      return dashboardData.last7Days
  }
}

export function getReportData(period: string) {
  return dashboardData.reports[period as keyof typeof dashboardData.reports] || null
}
