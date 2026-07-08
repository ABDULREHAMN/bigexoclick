import { NextRequest, NextResponse } from 'next/server'
import { getVerificationRequestById, updateVerificationStatus } from '@/lib/db/verifications'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const verification = await getVerificationRequestById(id)

    if (!verification) {
      return NextResponse.json({ error: 'Verification request not found' }, { status: 404 })
    }

    return NextResponse.json(verification)
  } catch (error) {
    console.error('[v0] Error fetching verification:', error)
    return NextResponse.json({ error: 'Failed to fetch verification request' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status, reason_for_rejection, verified_by } = body

    if (!status) {
      return NextResponse.json({ error: 'status is required' }, { status: 400 })
    }

    const verification = await updateVerificationStatus(id, status, {
      reason_for_rejection,
      verified_by,
    })

    return NextResponse.json(verification)
  } catch (error) {
    console.error('[v0] Error updating verification:', error)
    if ((error as any).message === 'Verification request not found') {
      return NextResponse.json({ error: 'Verification request not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Failed to update verification request' }, { status: 500 })
  }
}
