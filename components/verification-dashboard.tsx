'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2, ChevronDown } from 'lucide-react'

interface VerificationRequest {
  id: string
  user_id: string
  status: string
  created_at: string
  updated_at: string
  government_id_url?: string
  proof_of_address_url?: string
  selfie_url?: string
  rejection_reason?: string
}

export function VerificationDashboard() {
  const [requests, setRequests] = useState<VerificationRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)
  const [rejectionReason, setRejectionReason] = useState<string>('')

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('/api/verifications')
        if (response.ok) {
          const data = await response.json()
          setRequests(data)
        }
      } catch (error) {
        console.error('Failed to fetch requests:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
    // Poll for updates every 30 seconds
    const interval = setInterval(fetchRequests, 30000)
    return () => clearInterval(interval)
  }, [])

  const updateStatus = async (id: string, newStatus: string, reason?: string) => {
    setUpdating(id)
    try {
      const response = await fetch(`/api/verifications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, reason_for_rejection: reason }),
      })

      if (response.ok) {
        const updated = await response.json()
        setRequests((prev) => prev.map((r) => (r.id === id ? updated : r)))
        setExpandedId(null)
        setRejectionReason('')
      }
    } catch (error) {
      console.error('Failed to update status:', error)
    } finally {
      setUpdating(null)
    }
  }

  const getStatusBadgeColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      under_review: 'bg-blue-100 text-blue-800',
      verified: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      completed: 'bg-green-100 text-green-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Verification Queue</h2>
        <Badge variant="outline">{requests.length} requests</Badge>
      </div>

      {requests.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-gray-500">No verification requests yet</CardContent>
        </Card>
      ) : (
        requests.map((request) => (
          <Card key={request.id}>
            <CardHeader>
              <button
                onClick={() => setExpandedId(expandedId === request.id ? null : request.id)}
                className="flex w-full items-center justify-between text-left hover:opacity-75"
              >
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium">User: {request.user_id.slice(0, 8)}...</p>
                    <p className="text-sm text-gray-500">
                      Submitted {new Date(request.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusBadgeColor(request.status)}>{request.status}</Badge>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${expandedId === request.id ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>
            </CardHeader>

            {expandedId === request.id && (
              <CardContent className="space-y-4 border-t pt-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Uploaded Documents:</p>
                  {request.government_id_url && (
                    <a
                      href={`/api/file?pathname=${encodeURIComponent(request.government_id_url)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-blue-600 hover:underline"
                    >
                      View Government ID
                    </a>
                  )}
                  {request.proof_of_address_url && (
                    <a
                      href={`/api/file?pathname=${encodeURIComponent(request.proof_of_address_url)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-blue-600 hover:underline"
                    >
                      View Proof of Address
                    </a>
                  )}
                  {request.selfie_url && (
                    <a
                      href={`/api/file?pathname=${encodeURIComponent(request.selfie_url)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-blue-600 hover:underline"
                    >
                      View Selfie
                    </a>
                  )}
                </div>

                {request.status === 'pending' || request.status === 'under_review' ? (
                  <div className="space-y-3 border-t pt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Action:</label>
                      {request.status === 'pending' && (
                        <Button
                          onClick={() => updateStatus(request.id, 'under_review')}
                          disabled={updating === request.id}
                          size="sm"
                          className="w-full"
                        >
                          {updating === request.id ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Updating...
                            </>
                          ) : (
                            'Mark as Under Review'
                          )}
                        </Button>
                      )}
                      {request.status === 'under_review' && (
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <Button
                              onClick={() => updateStatus(request.id, 'verified')}
                              disabled={updating === request.id}
                              size="sm"
                              variant="default"
                              className="flex-1"
                            >
                              {updating === request.id ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                </>
                              ) : (
                                'Approve'
                              )}
                            </Button>
                            <Button
                              onClick={() =>
                                rejectionReason
                                  ? updateStatus(request.id, 'rejected', rejectionReason)
                                  : alert('Please enter rejection reason')
                              }
                              disabled={updating === request.id}
                              size="sm"
                              variant="destructive"
                              className="flex-1"
                            >
                              {updating === request.id ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                </>
                              ) : (
                                'Reject'
                              )}
                            </Button>
                          </div>
                          <input
                            type="text"
                            placeholder="Rejection reason (if applicable)"
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            className="w-full rounded border px-2 py-1 text-sm"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600">Status: {request.status.toUpperCase()}</p>
                    {request.rejection_reason && (
                      <p className="text-sm text-red-600">Reason: {request.rejection_reason}</p>
                    )}
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        ))
      )}
    </div>
  )
}
