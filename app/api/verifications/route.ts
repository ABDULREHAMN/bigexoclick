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
      return NextResponse.json(verification || { status: 'none' })
    }

    // Admin endpoint to get all verifications
    const { requests, total } = await getAllVerificationRequests(status, limit, offset)
    return NextResponse.json({ requests, total })
  } catch (error) {
    console.error('[v0] Error fetching verifications:', error)
    return NextResponse.json({ error: 'Failed to fetch verification requests' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, governmentIdUrl, proofOfAddressUrl, selfieUrl, withdrawalAmount, walletAddress } = body

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    const verification = await createVerificationRequest({
      user_id: userId,
      government_id_url: governmentIdUrl,
      proof_of_address_url: proofOfAddressUrl,
      selfie_url: selfieUrl,
      withdrawal_amount: withdrawalAmount,
      wallet_address: walletAddress,
    })

    return NextResponse.json(verification, { status: 201 })
  } catch (error) {
    console.error('[v0] Error creating verification:', error)
    return NextResponse.json({ error: 'Failed to create verification request' }, { status: 500 })
  }
}
