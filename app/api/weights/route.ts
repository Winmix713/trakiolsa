import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const weights = await req.json()

    // Save weights to database
    await db.query(`
      INSERT INTO weights (
        recent_form,
        head_to_head,
        home_advantage,
        team_strength
      ) VALUES (?, ?, ?, ?)
    `, [
      weights.recentForm,
      weights.headToHead,
      weights.homeAdvantage,
      weights.teamStrength,
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Weights error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

