'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react'

interface VerificationStatusDisplayProps {
  status: 'pending' | 'under_review' | 'verified' | 'rejected' | 'completed'
  message?: string
  createdAt?: string
  reviewCompletedAt?: string
  rejectionReason?: string | null
}

export function VerificationStatusDisplay({
  status,
  message,
  createdAt,
  reviewCompletedAt,
  rejectionReason,
}: VerificationStatusDisplayProps) {
  const statusConfig = {
    pending: {
      label: 'Pending',
      color: 'bg-yellow-50 text-yellow-800',
      icon: Clock,
      description: 'Awaiting verification',
    },
    under_review: {
      label: 'Under Review',
      color: 'bg-blue-50 text-blue-800',
      icon: Clock,
      description: 'Our team is reviewing your documents',
    },
    verified: {
      label: 'Verified',
      color: 'bg-green-50 text-green-800',
      icon: CheckCircle,
      description: 'Your documents have been verified',
    },
    rejected: {
      label: 'Rejected',
      color: 'bg-red-50 text-red-800',
      icon: XCircle,
      description: 'Verification could not be completed',
    },
    completed: {
      label: 'Completed',
      color: 'bg-green-50 text-green-800',
      icon: CheckCircle,
      description: 'Verification process completed',
    },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Verification Status</CardTitle>
          <Badge className={`${config.color} border-0`}>{config.label}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <Icon size={20} className={config.color.split(' ')[1]} />
          <div className="space-y-1 flex-1">
            <p className="text-sm font-medium">{config.description}</p>
            {message && <p className="text-sm text-gray-600">{message}</p>}
            {rejectionReason && status === 'rejected' && (
              <p className="text-sm text-red-700">
                <strong>Reason:</strong> {rejectionReason}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2 border-t pt-4">
          {createdAt && (
            <div className="text-sm">
              <span className="text-gray-600">Submitted:</span>
              <span className="ml-2 font-medium">{new Date(createdAt).toLocaleDateString()}</span>
            </div>
          )}
          {reviewCompletedAt && (
            <div className="text-sm">
              <span className="text-gray-600">Review Completed:</span>
              <span className="ml-2 font-medium">{new Date(reviewCompletedAt).toLocaleDateString()}</span>
            </div>
          )}
          {status === 'under_review' && (
            <div className="text-sm text-blue-700">
              <span>Estimated review time: 12–24 hours</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
