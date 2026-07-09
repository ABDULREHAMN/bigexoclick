"use client"

import { CheckCircle2, Circle, Clock } from "lucide-react"

interface VerificationStep {
  name: string
  status: "completed" | "in_progress" | "pending"
}

const VERIFICATION_STEPS: VerificationStep[] = [
  { name: "Identity Verification", status: "completed" },
  { name: "Account Verification", status: "completed" },
  { name: "Payment Method Verification", status: "completed" },
  { name: "Security Review", status: "completed" },
  { name: "Finance Review", status: "in_progress" },
  { name: "Compliance Review", status: "in_progress" },
  { name: "Final Payment Authorization", status: "pending" },
  { name: "Payment Release Queue", status: "pending" },
]

export function VerificationProgressCard() {
  const completedCount = VERIFICATION_STEPS.filter((s) => s.status === "completed").length
  const totalSteps = VERIFICATION_STEPS.length
  const progressPercentage = (completedCount / totalSteps) * 100

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
      {/* Header with progress indicator */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">Verification Progress</h3>
          <span className="text-xs font-medium text-gray-600">
            {completedCount} of {totalSteps} steps
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Steps list */}
      <div className="space-y-3">
        {VERIFICATION_STEPS.map((step, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              {step.status === "completed" && (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              )}
              {step.status === "in_progress" && (
                <Circle className="w-5 h-5 text-blue-500 fill-blue-500" />
              )}
              {step.status === "pending" && (
                <Clock className="w-5 h-5 text-gray-300" />
              )}
            </div>
            <div className="flex-1">
              <p
                className={`text-sm font-medium ${
                  step.status === "completed"
                    ? "text-green-700"
                    : step.status === "in_progress"
                      ? "text-blue-700"
                      : "text-gray-400"
                }`}
              >
                {step.name}
              </p>
            </div>
            <div className="flex-shrink-0">
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  step.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : step.status === "in_progress"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                }`}
              >
                {step.status === "completed"
                  ? "Completed"
                  : step.status === "in_progress"
                    ? "In Progress"
                    : "Pending"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
