"use client"
import { Plus, Search, Filter, ChevronDown, Edit, CheckCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function SiteZoneContent() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Sites & Zones</h1>
        <Button className="bg-green-500 hover:bg-green-600 flex items-center">
          <Plus size={16} className="mr-2" />
          Add New Site
        </Button>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-medium mb-4">Site Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Site Name</label>
            <Input defaultValue="Lustify Sex" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Domain</label>
            <Input defaultValue="lustifysex.com" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select className="w-full p-2 border rounded-md">
              <option>Adult</option>
              <option>Entertainment</option>
              <option>Dating</option>
              <option>Lifestyle</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-100 text-green-800 flex items-center">
                <CheckCircle size={12} className="mr-1" />
                Verified & Active
              </Badge>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Button className="bg-green-500 hover:bg-green-600">Save Changes</Button>
        </div>
      </Card>

      <Tabs defaultValue="sites">
        <TabsList className="mb-6 overflow-x-auto flex w-full">
          <TabsTrigger value="sites">Sites</TabsTrigger>
          <TabsTrigger value="zones">Zones</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="sites" className="space-y-6">
          <Card className="p-4">
            <div className="flex flex-wrap gap-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input className="pl-10" placeholder="Search sites..." defaultValue="lustifysex.com" />
              </div>
              <Button variant="outline" className="flex items-center whitespace-nowrap">
                <Filter size={16} className="mr-2" />
                Status: Active
                <ChevronDown size={16} className="ml-2" />
              </Button>
              <Button variant="outline" className="flex items-center whitespace-nowrap">
                <Filter size={16} className="mr-2" />
                Category: Adult
                <ChevronDown size={16} className="ml-2" />
              </Button>
            </div>
          </Card>

          <Card className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-sm">Site Name</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">URL</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Zones</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <SiteRow name="Lustify Sex" url="lustifysex.com" category="Adult" status="verified" zones={5} />
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="zones" className="space-y-6">
          <Card className="p-4">
            <div className="flex flex-wrap gap-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input className="pl-10" placeholder="Search zones..." />
              </div>
              <Button variant="outline" className="flex items-center whitespace-nowrap">
                <Filter size={16} className="mr-2" />
                Site: Lustify Sex
                <ChevronDown size={16} className="ml-2" />
              </Button>
              <Button variant="outline" className="flex items-center whitespace-nowrap">
                <Filter size={16} className="mr-2" />
                Format
                <ChevronDown size={16} className="ml-2" />
              </Button>
              <Button variant="outline" className="flex items-center whitespace-nowrap">
                <Filter size={16} className="mr-2" />
                Status: Active
                <ChevronDown size={16} className="ml-2" />
              </Button>
            </div>
          </Card>

          <Card className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-sm">Zone Name</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Site</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Format</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Size</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <ZoneRow name="Header Banner" site="Lustify Sex" format="Banner" size="728x90" status="active" />
                  <ZoneRow name="Sidebar Ad" site="Lustify Sex" format="Banner" size="300x250" status="active" />
                  <ZoneRow
                    name="In-Content Native"
                    site="Lustify Sex"
                    format="Native"
                    size="Responsive"
                    status="active"
                  />
                  <ZoneRow name="Footer Banner" site="Lustify Sex" format="Banner" size="468x60" status="active" />
                  <ZoneRow name="Mobile Banner" site="Lustify Sex" format="Mobile" size="320x50" status="active" />
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Site Settings for Lustify Sex</h3>

            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h4 className="font-medium">Auto-approve new zones</h4>
                  <p className="text-sm text-gray-500">Automatically approve new zones when they are created</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h4 className="font-medium">Default ad format</h4>
                  <p className="text-sm text-gray-500">Set the default ad format for new zones</p>
                </div>
                <Button variant="outline" className="flex items-center">
                  Banner
                  <ChevronDown size={16} className="ml-2" />
                </Button>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h4 className="font-medium">Domain verification</h4>
                  <p className="text-sm text-gray-500">Domain verification status</p>
                </div>
                <Badge className="bg-green-100 text-green-800 flex items-center">
                  <CheckCircle size={12} className="mr-1" />
                  Verified
                </Badge>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h4 className="font-medium">Content filtering</h4>
                  <p className="text-sm text-gray-500">Filter ads based on site content</p>
                </div>
                <Button variant="outline" className="flex items-center">
                  Adult Content
                  <ChevronDown size={16} className="ml-2" />
                </Button>
              </div>

              <Button className="bg-green-500 hover:bg-green-600">Save Settings</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface SiteRowProps {
  name: string
  url: string
  category: string
  status: "verified" | "pending" | "inactive"
  zones: number
}

function SiteRow({ name, url, category, status, zones }: SiteRowProps) {
  const statusConfig = {
    verified: { color: "bg-green-100 text-green-800", icon: CheckCircle },
    pending: { color: "bg-yellow-100 text-yellow-800", icon: null },
    inactive: { color: "bg-gray-100 text-gray-800", icon: null },
  }

  const StatusIcon = statusConfig[status].icon

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-4 text-sm font-medium">{name}</td>
      <td className="py-3 px-4 text-sm">{url}</td>
      <td className="py-3 px-4 text-sm">{category}</td>
      <td className="py-3 px-4">
        <Badge className={`${statusConfig[status].color} capitalize flex items-center w-fit`}>
          {StatusIcon && <StatusIcon size={12} className="mr-1" />}
          {status === "verified" ? "Verified & Active" : status}
        </Badge>
      </td>
      <td className="py-3 px-4 text-sm">{zones}</td>
      <td className="py-3 px-4">
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Edit size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit site</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </td>
    </tr>
  )
}

interface ZoneRowProps {
  name: string
  site: string
  format: string
  size: string
  status: "active" | "pending" | "inactive"
}

function ZoneRow({ name, site, format, size, status }: ZoneRowProps) {
  const statusConfig = {
    active: { color: "bg-green-100 text-green-800" },
    pending: { color: "bg-yellow-100 text-yellow-800" },
    inactive: { color: "bg-gray-100 text-gray-800" },
  }

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-4 text-sm font-medium">{name}</td>
      <td className="py-3 px-4 text-sm">{site}</td>
      <td className="py-3 px-4 text-sm">{format}</td>
      <td className="py-3 px-4 text-sm">{size}</td>
      <td className="py-3 px-4">
        <Badge className={`${statusConfig[status].color} capitalize`}>{status}</Badge>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Edit size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit zone</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </td>
    </tr>
  )
}
