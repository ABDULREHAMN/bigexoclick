import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export interface VerificationRequest {
  id: string
  user_id: string
  status: 'pending' | 'under_review' | 'verified' | 'rejected' | 'completed'
  government_id_url?: string
  proof_of_address_url?: string
  selfie_url?: string
  reason_for_rejection?: string
  withdrawal_amount?: number
  wallet_address?: string
  created_at: string
  updated_at: string
  review_completed_at?: string
  verified_by?: string
}

export async function createVerificationRequest(data: {
  user_id: string
  government_id_url?: string
  proof_of_address_url?: string
  selfie_url?: string
  withdrawal_amount?: number
  wallet_address?: string
}): Promise<VerificationRequest> {
  const query = `
    INSERT INTO public.verification_requests (
      user_id, government_id_url, proof_of_address_url, selfie_url, 
      withdrawal_amount, wallet_address, status, created_at, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
    ON CONFLICT (user_id) DO UPDATE SET
      government_id_url = COALESCE($2, verification_requests.government_id_url),
      proof_of_address_url = COALESCE($3, verification_requests.proof_of_address_url),
      selfie_url = COALESCE($4, verification_requests.selfie_url),
      withdrawal_amount = COALESCE($5, verification_requests.withdrawal_amount),
      wallet_address = COALESCE($6, verification_requests.wallet_address),
      status = $7,
      updated_at = NOW()
    RETURNING *
  `

  const result = await pool.query(query, [
    data.user_id,
    data.government_id_url || null,
    data.proof_of_address_url || null,
    data.selfie_url || null,
    data.withdrawal_amount || null,
    data.wallet_address || null,
    'pending',
  ])

  return result.rows[0]
}

export async function getUserVerificationStatus(user_id: string): Promise<VerificationRequest | null> {
  const query = `
    SELECT * FROM public.verification_requests 
    WHERE user_id = $1
  `
  const result = await pool.query(query, [user_id])
  return result.rows[0] || null
}

export async function getAllVerificationRequests(
  status?: string,
  limit = 50,
  offset = 0
): Promise<{ requests: VerificationRequest[]; total: number }> {
  let query = 'SELECT * FROM public.verification_requests'
  let countQuery = 'SELECT COUNT(*) as total FROM public.verification_requests'
  const params: any[] = []

  if (status) {
    query += ' WHERE status = $1'
    countQuery += ' WHERE status = $1'
    params.push(status)
  }

  query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`
  params.push(limit, offset)

  const [result, countResult] = await Promise.all([
    pool.query(query, params),
    pool.query(countQuery, status ? [status] : []),
  ])

  return {
    requests: result.rows,
    total: parseInt(countResult.rows[0].total, 10),
  }
}

export async function updateVerificationStatus(
  id: string,
  status: string,
  data?: {
    reason_for_rejection?: string
    verified_by?: string
  }
): Promise<VerificationRequest> {
  const query = `
    UPDATE public.verification_requests 
    SET 
      status = $1,
      reason_for_rejection = $2,
      verified_by = $3,
      review_completed_at = CASE WHEN $1 IN ('verified', 'rejected', 'completed') THEN NOW() ELSE review_completed_at END,
      updated_at = NOW()
    WHERE id = $4
    RETURNING *
  `

  const result = await pool.query(query, [
    status,
    data?.reason_for_rejection || null,
    data?.verified_by || null,
    id,
  ])

  if (result.rows.length === 0) {
    throw new Error('Verification request not found')
  }

  return result.rows[0]
}

export async function getVerificationRequestById(id: string): Promise<VerificationRequest | null> {
  const query = `
    SELECT * FROM public.verification_requests 
    WHERE id = $1
  `
  const result = await pool.query(query, [id])
  return result.rows[0] || null
}
