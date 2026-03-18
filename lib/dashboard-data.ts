// Dashboard data service - Manages all dashboard metrics and analytics data
export const dashboardData = {
  metrics: {
    thisMonth: {
      revenue: 8547.5,
      impressions: 1584200,
      clicks: 16845,
      ctr: 1.06,
      ecpm: 5.39,
    },
    lastMonth: {
      revenue: 7234.2,
      impressions: 1423100,
      clicks: 15120,
      ctr: 1.06,
      ecpm: 5.08,
    },
    last6Months: {
      revenue: 42156.8,
      impressions: 8520400,
      clicks: 90340,
      ctr: 1.06,
      ecpm: 4.94,
    },
  },

  recentActivity: [
    {
      id: "activity-17",
      date: "March 17, 2025 at 10:30 PM",
      type: "payment",
      description: "Payment received from Google Ads",
      amount: "$412.50",
      status: "completed",
    },
    {
      id: "activity-16",
      date: "March 16, 2025 at 3:45 PM",
      type: "payout",
      description: "Payout request submitted",
      amount: "$2,156.30",
      status: "pending",
    },
    {
      id: "activity-15",
      date: "March 15, 2025 at 2:15 PM",
      type: "revenue",
      description: "Revenue milestone reached: $500k",
      amount: "$500,000.00",
      status: "completed",
    },
    {
      id: "activity-14",
      date: "March 14, 2025 at 11:00 AM",
      type: "payment",
      description: "Payment received from Facebook Ads",
      amount: "$389.75",
      status: "completed",
    },
    {
      id: "activity-13",
      date: "March 13, 2025 at 4:30 PM",
      type: "campaign",
      description: "New campaign approved",
      amount: null,
      status: "completed",
    },
    {
      id: "activity-12",
      date: "March 12, 2025 at 9:15 AM",
      type: "payment",
      description: "Payment received from Bing Ads",
      amount: "$254.20",
      status: "completed",
    },
    {
      id: "activity-11",
      date: "March 11, 2025 at 1:45 PM",
      type: "payout",
      description: "Payout processed successfully",
      amount: "$1,987.65",
      status: "completed",
    },
    {
      id: "activity-10",
      date: "March 10, 2025 at 6:30 PM",
      type: "revenue",
      description: "Daily revenue record set",
      amount: "$687.45",
      status: "completed",
    },
  ],

  // Chart data: Last 7 Days (March 11-17)
  last7Days: [
    { date: "Mar 11", revenue: 1245.3, impressions: 234500, clicks: 2480 },
    { date: "Mar 12", revenue: 1456.8, impressions: 267800, clicks: 2840 },
    { date: "Mar 13", revenue: 1123.5, impressions: 198700, clicks: 2100 },
    { date: "Mar 14", revenue: 1567.2, impressions: 289400, clicks: 3070 },
    { date: "Mar 15", revenue: 1789.4, impressions: 312600, clicks: 3310 },
    { date: "Mar 16", revenue: 1456.9, impressions: 256700, clicks: 2720 },
    { date: "Mar 17", revenue: 882.4, impressions: 124500, clicks: 1325 },
  ],

  // Chart data: Last 30 Days (breakdown)
  last30Days: [
    { date: "Mar 1", revenue: 1156.2, impressions: 203400, clicks: 2150 },
    { date: "Mar 2", revenue: 1234.5, impressions: 218900, clicks: 2320 },
    { date: "Mar 3", revenue: 1045.8, impressions: 189700, clicks: 2010 },
    { date: "Mar 4", revenue: 1378.9, impressions: 245600, clicks: 2600 },
    { date: "Mar 5", revenue: 1512.3, impressions: 268900, clicks: 2850 },
    { date: "Mar 6", revenue: 1289.7, impressions: 229800, clicks: 2430 },
    { date: "Mar 7", revenue: 1445.2, impressions: 256700, clicks: 2720 },
    { date: "Mar 8", revenue: 1156.4, impressions: 203800, clicks: 2160 },
    { date: "Mar 9", revenue: 1367.8, impressions: 243900, clicks: 2580 },
    { date: "Mar 10", revenue: 1423.6, impressions: 253400, clicks: 2690 },
    { date: "Mar 11", revenue: 1245.3, impressions: 234500, clicks: 2480 },
    { date: "Mar 12", revenue: 1456.8, impressions: 267800, clicks: 2840 },
    { date: "Mar 13", revenue: 1123.5, impressions: 198700, clicks: 2100 },
    { date: "Mar 14", revenue: 1567.2, impressions: 289400, clicks: 3070 },
    { date: "Mar 15", revenue: 1789.4, impressions: 312600, clicks: 3310 },
    { date: "Mar 16", revenue: 1456.9, impressions: 256700, clicks: 2720 },
    { date: "Mar 17", revenue: 882.4, impressions: 124500, clicks: 1325 },
    { date: "Mar 18", revenue: 1234.2, impressions: 219800, clicks: 2330 },
    { date: "Mar 19", revenue: 1345.6, impressions: 239200, clicks: 2540 },
    { date: "Mar 20", revenue: 1478.9, impressions: 262400, clicks: 2780 },
    { date: "Mar 21", revenue: 1267.3, impressions: 225300, clicks: 2390 },
    { date: "Mar 22", revenue: 1389.4, impressions: 247100, clicks: 2620 },
    { date: "Mar 23", revenue: 1523.8, impressions: 271200, clicks: 2870 },
    { date: "Mar 24", revenue: 1456.2, impressions: 259600, clicks: 2750 },
    { date: "Mar 25", revenue: 1345.7, impressions: 240100, clicks: 2550 },
    { date: "Mar 26", revenue: 1678.9, impressions: 299200, clicks: 3170 },
    { date: "Mar 27", revenue: 1567.4, impressions: 279300, clicks: 2960 },
    { date: "Mar 28", revenue: 1423.1, impressions: 253900, clicks: 2690 },
    { date: "Mar 29", revenue: 1534.6, impressions: 273200, clicks: 2900 },
    { date: "Mar 30", revenue: 1689.3, impressions: 301400, clicks: 3190 },
  ],

  // Chart data: Last 6 Months (revenue only)
  last6Months: [
    { month: "September", revenue: 6234.5 },
    { month: "October", revenue: 7128.9 },
    { month: "November", revenue: 6945.3 },
    { month: "December", revenue: 7568.2 },
    { month: "January", revenue: 7234.1 },
    { month: "February", revenue: 7856.4 },
  ],

  // Chart data: Year view (revenue only)
  yearData: [
    { month: "January", revenue: 5234.2 },
    { month: "February", revenue: 5456.8 },
    { month: "March", revenue: 5678.9 },
    { month: "April", revenue: 6123.4 },
    { month: "May", revenue: 6456.7 },
    { month: "June", revenue: 6234.5 },
    { month: "July", revenue: 6789.1 },
    { month: "August", revenue: 6945.3 },
    { month: "September", revenue: 7156.2 },
    { month: "October", revenue: 7234.5 },
    { month: "November", revenue: 7456.8 },
    { month: "December", revenue: 7687.9 },
  ],

  // Reports data
  reports: {
    "Last 7 Days": {
      "All Countries": {
        "All Devices": [
          { date: "March 17, 2025", impressions: "124,500", clicks: "1,325", ctr: "1.06%", revenue: "$882.40", ecpm: "$7.08" },
          { date: "March 16, 2025", impressions: "256,700", clicks: "2,720", ctr: "1.06%", revenue: "$1,456.90", ecpm: "$5.68" },
          { date: "March 15, 2025", impressions: "312,600", clicks: "3,310", ctr: "1.06%", revenue: "$1,789.40", ecpm: "$5.72" },
          { date: "March 14, 2025", impressions: "289,400", clicks: "3,070", ctr: "1.06%", revenue: "$1,567.20", ecpm: "$5.41" },
          { date: "March 13, 2025", impressions: "198,700", clicks: "2,100", ctr: "1.06%", revenue: "$1,123.50", ecpm: "$5.65" },
          { date: "March 12, 2025", impressions: "267,800", clicks: "2,840", ctr: "1.06%", revenue: "$1,456.80", ecpm: "$5.44" },
          { date: "March 11, 2025", impressions: "234,500", clicks: "2,480", ctr: "1.06%", revenue: "$1,245.30", ecpm: "$5.31" },
        ],
        Desktop: [
          { date: "March 17, 2025", impressions: "87,150", clicks: "928", ctr: "1.06%", revenue: "$617.68", ecpm: "$7.09" },
          { date: "March 16, 2025", impressions: "179,690", clicks: "1,904", ctr: "1.06%", revenue: "$1,019.83", ecpm: "$5.68" },
          { date: "March 15, 2025", impressions: "218,820", clicks: "2,317", ctr: "1.06%", revenue: "$1,252.58", ecpm: "$5.73" },
          { date: "March 14, 2025", impressions: "202,580", clicks: "2,149", ctr: "1.06%", revenue: "$1,097.04", ecpm: "$5.42" },
          { date: "March 13, 2025", impressions: "139,090", clicks: "1,470", ctr: "1.06%", revenue: "$786.45", ecpm: "$5.65" },
          { date: "March 12, 2025", impressions: "187,460", clicks: "1,988", ctr: "1.06%", revenue: "$1,019.76", ecpm: "$5.44" },
          { date: "March 11, 2025", impressions: "164,150", clicks: "1,736", ctr: "1.06%", revenue: "$871.71", ecpm: "$5.31" },
        ],
        Mobile: [
          { date: "March 17, 2025", impressions: "37,350", clicks: "397", ctr: "1.06%", revenue: "$264.72", ecpm: "$7.08" },
          { date: "March 16, 2025", impressions: "77,010", clicks: "816", ctr: "1.06%", revenue: "$437.07", ecpm: "$5.68" },
          { date: "March 15, 2025", impressions: "93,780", clicks: "993", ctr: "1.06%", revenue: "$536.82", ecpm: "$5.72" },
          { date: "March 14, 2025", impressions: "86,820", clicks: "921", ctr: "1.06%", revenue: "$470.16", ecpm: "$5.41" },
          { date: "March 13, 2025", impressions: "59,610", clicks: "630", ctr: "1.06%", revenue: "$337.05", ecpm: "$5.65" },
          { date: "March 12, 2025", impressions: "80,340", clicks: "852", ctr: "1.06%", revenue: "$437.04", ecpm: "$5.44" },
          { date: "March 11, 2025", impressions: "70,350", clicks: "744", ctr: "1.06%", revenue: "$373.59", ecpm: "$5.31" },
        ],
      },
    },
    "Last 30 Days": {
      "All Countries": {
        "All Devices": [
          // Include all 30 days of data (abbreviated here)
          { date: "March 30, 2025", impressions: "301,400", clicks: "3,190", ctr: "1.06%", revenue: "$1,689.30", ecpm: "$5.61" },
          { date: "March 29, 2025", impressions: "273,200", clicks: "2,900", ctr: "1.06%", revenue: "$1,534.60", ecpm: "$5.62" },
          // ... more days ...
        ],
      },
    },
    "Last 6 Months": {
      "All Countries": {
        "All Devices": [
          { period: "February 1-28, 2025", impressions: "1,456,200", clicks: "15,420", ctr: "1.06%", revenue: "$7,856.40", ecpm: "$5.39" },
          { period: "January 1-31, 2025", impressions: "1,345,100", clicks: "14,260", ctr: "1.06%", revenue: "$7,234.10", ecpm: "$5.37" },
          { period: "December 1-31, 2024", impressions: "1,420,300", clicks: "15,070", ctr: "1.06%", revenue: "$7,568.20", ecpm: "$5.33" },
          { period: "November 1-30, 2024", impressions: "1,302,400", clicks: "13,810", ctr: "1.06%", revenue: "$6,945.30", ecpm: "$5.33" },
          { period: "October 1-31, 2024", impressions: "1,336,700", clicks: "14,170", ctr: "1.06%", revenue: "$7,128.90", ecpm: "$5.34" },
          { period: "September 1-30, 2024", impressions: "1,168,600", clicks: "12,390", ctr: "1.06%", revenue: "$6,234.50", ecpm: "$5.33" },
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
    case "year":
      return dashboardData.yearData
    default:
      return dashboardData.last7Days
  }
}

export function getReportData(period: string, country: string, device: string) {
  const periodData = dashboardData.reports[period as keyof typeof dashboardData.reports]
  if (!periodData) return []

  const countryData = periodData[country as keyof typeof periodData]
  if (!countryData) return []

  return countryData[device as keyof typeof countryData] || []
}
