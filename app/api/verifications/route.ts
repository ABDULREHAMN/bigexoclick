import { NextRequest, NextResponse } from 'next/server'
import {
  createVerificationRequest,
  getAllVerificationRequests,
  getUserVerificationStatus,
} from '@/lib/db/verifications'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50', 10)
    const offset = parseInt(searchParams.get('offset') || '0', 10)

    // Get user's verification status if userId provided
    if (userId) {
      const verification = await getUserVerificationStatus(userId)
      return NextResponse.json(verification ? [verification] : [])
    }

    // Get verification status for current user (from header)
    const userIdFromHeader = request.headers.get('x-user-id')
    if (userIdFromHeader) {
      const verification = await getUserVerificationStatus(userIdFromHeader)
      return NextResponse.json(verification ? [verification] : [])
    }

    // Admin endpoint to get all verifications
    const { requests, total } = await getAllVerificationRequests(status, limit, offset)
    return NextResponse.json(requests)
  } catch (error) {
    console.error('[v0] Error fetching verifications:', error)
    return NextResponse.json({ error: 'Failed to fetch verification requests' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { government_id_url, proof_of_address_url, selfie_url, withdrawal_amount, wallet_address } = body

    // Generate a user ID from the request (client should send a session ID or generate one)
    // For this verification system, we'll use a UUID based on the request
    const userId = request.headers.get('x-user-id') || `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const verification = await createVerificationRequest({
      user_id: userId,
      government_id_url,
      proof_of_address_url,
      selfie_url,
      withdrawal_amount,
      wallet_address,
    })

    return NextResponse.json(verification, { status: 201 })
  } catch (error) {
    console.error('[v0] Error creating verification:', error)
    return NextResponse.json({ error: 'Failed to create verification request' }, { status: 500 })
  }
}
