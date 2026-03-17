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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 relative">
      {/* Logo at Top */}
      <div className="absolute top-8 left-0 right-0 flex justify-center">
        <Image
          src="/exoclick-logo.jpg"
          alt="ExoClick Logo"
          width={180}
          height={60}
          priority
          className="h-auto w-auto max-h-16"
        />
      </div>

      <div className="w-full max-w-md mt-20">
        {/* Login Card Container */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
          {/* Logo in Card Header */}
          <div className="flex justify-center mb-10">
            <Image
              src="/exoclick-logo.jpg"
              alt="ExoClick Logo"
              width={220}
              height={70}
              priority
              className="h-auto w-auto max-h-20"
            />
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-semibold text-blue-600">
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                className="w-full px-0 py-2.5 border-0 border-b-2 border-gray-300 focus:border-blue-600 focus:ring-0 rounded-none placeholder:text-gray-400 bg-transparent text-gray-800 transition-colors"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-blue-600">
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
                  className="w-full px-0 py-2.5 border-0 border-b-2 border-gray-300 focus:border-blue-600 focus:ring-0 rounded-none placeholder:text-gray-400 bg-transparent text-gray-800 transition-colors"
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
            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md font-medium">{error}</div>
            )}

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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all duration-200 mt-8 text-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  LOGGING IN
                </div>
              ) : (
                "LOG IN"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="mt-10 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600 text-sm mb-4 font-medium">Create an Advertiser or Publisher account:</p>
            <Button
              type="button"
              variant="outline"
              className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 rounded-lg transition-all duration-200"
            >
              SIGN UP
            </Button>
          </div>
        </div>

        {/* Logo at Bottom */}
        <div className="flex justify-center mt-12">
          <Image
            src="/exoclick-logo.jpg"
            alt="ExoClick Logo"
            width={140}
            height={45}
            priority
            className="h-auto w-auto opacity-50 hover:opacity-70 transition-opacity"
          />
        </div>
      </div>

      {/* Corner Logo Elements (subtle background accents) */}
      <div className="absolute bottom-8 right-8 opacity-10">
        <Image
          src="/exoclick-logo.jpg"
          alt="ExoClick Logo"
          width={100}
          height={33}
          className="h-auto w-auto"
        />
      </div>

      <div className="absolute top-1/3 left-8 opacity-5">
        <Image
          src="/exoclick-logo.jpg"
          alt="ExoClick Logo"
          width={120}
          height={40}
          className="h-auto w-auto"
        />
      </div>
    </div>
  )
}
