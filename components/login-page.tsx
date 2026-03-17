"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"

const VALID_USERNAME = "lustifysex"
const VALID_PASSWORD = "Lusti@007"

export function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password")
      return
    }

    setIsLoading(true)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Check credentials
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      // Store session
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("username", username)
      // Redirect to dashboard
      router.push("/")
    } else {
      setError("Invalid username or password")
      setPassword("")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Login Card Container */}
        <div className="bg-white rounded-lg shadow-md p-8 md:p-10">
          {/* Logo - ONLY ONE */}
          <div className="flex justify-center mb-8">
            <Image
              src="/exoclick-logo.png"
              alt="ExoClick Logo"
              width={200}
              height={60}
              priority
              className="h-auto w-auto"
            />
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-blue-600">
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-blue-600 focus:ring-0 rounded-none placeholder:text-gray-400 bg-transparent text-gray-800 transition-colors"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-blue-600">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-blue-600 focus:ring-0 rounded-none placeholder:text-gray-400 bg-transparent text-gray-800 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded font-medium">{error}</div>}

            {/* Links */}
            <div className="flex justify-between text-sm pt-2">
              <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Verify your email
              </Link>
              <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition-all duration-200 mt-8"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  LOGGING IN
                </div>
              ) : (
                "LOG IN"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600 text-sm mb-4">Create an Advertiser or Publisher account:</p>
            <Button
              type="button"
              variant="outline"
              className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 rounded transition-all duration-200"
            >
              SIGN UP
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
