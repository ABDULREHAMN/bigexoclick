'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Loader2, AlertCircle } from 'lucide-react'

interface DocumentUploadFormProps {
  onSubmit: (files: { governmentId: string; proofOfAddress: string; selfie: string }) => Promise<void>
  isLoading?: boolean
  onStatusChange?: (status: string) => void
}

export function DocumentUploadForm({ onSubmit, isLoading = false, onStatusChange }: DocumentUploadFormProps) {
  const [files, setFiles] = useState({
    governmentId: null as File | null,
    proofOfAddress: null as File | null,
    selfie: null as File | null,
  })

  const [uploadProgress, setUploadProgress] = useState({
    governmentId: false,
    proofOfAddress: false,
    selfie: false,
  })

  const [uploadedPaths, setUploadedPaths] = useState({
    governmentId: '',
    proofOfAddress: '',
    selfie: '',
  })

  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = (type: 'governmentId' | 'proofOfAddress' | 'selfie', file: File | null) => {
    setFiles((prev) => ({ ...prev, [type]: file }))
    setError(null)
  }

  const uploadFile = async (type: 'governmentId' | 'proofOfAddress' | 'selfie', file: File) => {
    try {
      setUploadProgress((prev) => ({ ...prev, [type]: true }))

      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Upload failed')
      }

      const { pathname } = await response.json()
      if (!pathname) {
        throw new Error('No pathname returned from upload')
      }
      setUploadedPaths((prev) => ({ ...prev, [type]: pathname }))
    } catch (err) {
      console.error(`[v0] Upload error for ${type}:`, err)
      setError(`Failed to upload ${type}. Please try again.`)
    } finally {
      setUploadProgress((prev) => ({ ...prev, [type]: false }))
    }
  }

  const handleUpload = async () => {
    if (!files.governmentId || !files.proofOfAddress || !files.selfie) {
      setError('Please select all three documents')
      return
    }

    setUploading(true)
    setError(null)

    try {
      // Upload all files in parallel
      await Promise.all([
        uploadFile('governmentId', files.governmentId),
        uploadFile('proofOfAddress', files.proofOfAddress),
        uploadFile('selfie', files.selfie),
      ])

      // Check if all files were uploaded
      if (!uploadedPaths.governmentId || !uploadedPaths.proofOfAddress || !uploadedPaths.selfie) {
        throw new Error('Not all files were uploaded successfully')
      }

      // All uploads successful
      await onSubmit(uploadedPaths)
    } catch (err) {
      console.error('[v0] Submit error:', err)
      setError('Failed to submit documents. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const isAllUploaded = uploadedPaths.governmentId && uploadedPaths.proofOfAddress && uploadedPaths.selfie

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base">Verification Documents</CardTitle>
        <CardDescription>Upload the required documents to complete verification</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-800">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {/* Government ID */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Government-issued Photo ID</label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleFileChange('governmentId', e.target.files?.[0] || null)}
              disabled={uploading || uploadProgress.governmentId}
              className="flex-1 text-sm"
            />
            {uploadProgress.governmentId ? (
              <Loader2 size={18} className="animate-spin text-blue-600" />
            ) : uploadedPaths.governmentId ? (
              <Check size={18} className="text-green-600" />
            ) : null}
          </div>
        </div>

        {/* Proof of Address */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Proof of Address (issued within last 3 months)</label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleFileChange('proofOfAddress', e.target.files?.[0] || null)}
              disabled={uploading || uploadProgress.proofOfAddress}
              className="flex-1 text-sm"
            />
            {uploadProgress.proofOfAddress ? (
              <Loader2 size={18} className="animate-spin text-blue-600" />
            ) : uploadedPaths.proofOfAddress ? (
              <Check size={18} className="text-green-600" />
            ) : null}
          </div>
        </div>

        {/* Selfie */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Selfie holding your Photo ID</label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange('selfie', e.target.files?.[0] || null)}
              disabled={uploading || uploadProgress.selfie}
              className="flex-1 text-sm"
            />
            {uploadProgress.selfie ? (
              <Loader2 size={18} className="animate-spin text-blue-600" />
            ) : uploadedPaths.selfie ? (
              <Check size={18} className="text-green-600" />
            ) : null}
          </div>
        </div>

        <Button
          onClick={handleUpload}
          disabled={!files.governmentId || !files.proofOfAddress || !files.selfie || uploading || isLoading}
          className="w-full"
          size="sm"
        >
          {uploading || isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Documents'
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
