import { VerificationDashboard } from '@/components/verification-dashboard'

export default function VerificationsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Verification Review Dashboard</h1>
          <p className="text-gray-600 mt-2">Review and manage user verification requests</p>
        </div>

        <VerificationDashboard />
      </div>
    </div>
  )
}
