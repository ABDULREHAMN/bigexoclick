"use client"

import { useState } from "react"
import { ArrowLeft, User, Mail, Calendar, Shield, CheckCircle, Edit, Camera } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useKyc } from "./kyc-context"

interface ProfilePageProps {
  onBack: () => void
}

export function ProfilePage({ onBack }: ProfilePageProps) {
  const { kycStatus, verificationDate, kycReference, fullName } = useKyc()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    fullName: fullName,
    email: "rohanjanean56@gmail.com",
    username: "lustysex",
    company: "Lustify Media",
    phone: "+1 (555) 123-4567",
    address: "123 Publisher Street, Digital City, DC 12345",
    bio: "Experienced publisher focused on adult content monetization and traffic optimization.",
    website: "https://lustifysex.com",
    joinDate: "January 15, 2024",
  })

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to backend
    console.log("Profile updated:", profileData)
  }

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="p-6 space-y-6 bg-[#f5f5f5] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack} className="flex items-center bg-white">
            <ArrowLeft size={16} className="mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold">My Profile</h1>
        </div>
        <Button
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className={isEditing ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card className="p-6 text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                <User size={32} className="text-white" />
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                  <Camera size={14} />
                </button>
              )}
            </div>
            <h2 className="text-xl font-bold mb-1">{profileData.fullName}</h2>
            <p className="text-gray-500 mb-2">@{profileData.username}</p>
            <Badge className="mb-4 bg-green-500 text-white">
              <CheckCircle size={12} className="mr-1" />
              Publisher Account
            </Badge>
            <div className="text-sm text-gray-600">
              <p className="flex items-center justify-center mb-2">
                <Calendar size={14} className="mr-2" />
                Joined {profileData.joinDate}
              </p>
              <p className="flex items-center justify-center">
                <Mail size={14} className="mr-2" />
                {profileData.email}
              </p>
            </div>
          </Card>

          {/* KYC Status Card */}
          <Card className="p-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center">
                <Shield className="mr-2 h-5 w-5 text-green-600" />
                Verification Status
              </h3>
              <Badge className="bg-green-500 text-white">
                <CheckCircle size={12} className="mr-1" />
                Verified
              </Badge>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">KYC Status:</span>
                <span className="font-medium text-green-600">Verified</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Verification Date:</span>
                <span className="font-medium">{verificationDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Reference ID:</span>
                <span className="font-mono text-xs">{kycReference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Document Type:</span>
                <span className="font-medium">Driving License</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              {!isEditing && (
                <Button variant="outline" onClick={() => setIsEditing(true)} size="sm">
                  <Edit size={14} className="mr-2" />
                  Edit
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="fullName"
                    value={profileData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{profileData.fullName}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{profileData.email}</p>
                )}
              </div>
              <div>
                <Label htmlFor="username">Username</Label>
                {isEditing ? (
                  <Input
                    id="username"
                    value={profileData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">@{profileData.username}</p>
                )}
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                {isEditing ? (
                  <Input
                    id="company"
                    value={profileData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{profileData.company}</p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{profileData.phone}</p>
                )}
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                {isEditing ? (
                  <Input
                    id="website"
                    value={profileData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">
                    <a
                      href={profileData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {profileData.website}
                    </a>
                  </p>
                )}
              </div>
            </div>
            <div className="mt-6">
              <Label htmlFor="address">Address</Label>
              {isEditing ? (
                <Textarea
                  id="address"
                  value={profileData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  rows={2}
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900">{profileData.address}</p>
              )}
            </div>
            <div className="mt-6">
              <Label htmlFor="bio">Bio</Label>
              {isEditing ? (
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  rows={3}
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900">{profileData.bio}</p>
              )}
            </div>
          </Card>

          {/* Account Statistics */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Account Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">$0.00</div>
                <div className="text-sm text-gray-600">Total Earnings</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">0</div>
                <div className="text-sm text-gray-600">Total Impressions</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">0</div>
                <div className="text-sm text-gray-600">Total Clicks</div>
              </div>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-500 text-center py-8">No recent activity</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
