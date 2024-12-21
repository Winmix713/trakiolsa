import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Fetch monthly performance
    const monthlyPerformance = await db.query(`
      SELECT 
        DATE_FORMAT(date, '%Y-%m') as month,
        SUM(profit) as profit
      FROM predictions
      GROUP BY DATE_FORMAT(date, '%Y-%m')
      ORDER BY month DESC
      LIMIT 12
    `)

    // Fetch league performance
    const leaguePerformance = await db.query(`
      SELECT 
        league,
        COUNT(CASE WHEN result = 'win' THEN 1 END) * 100.0 / COUNT(*) as winRate
      FROM predictions
      GROUP BY league
    `)

    return NextResponse.json({
      monthlyPerformance,
      leaguePerformance,
    })
  } catch (error) {
    console.error('Statistics error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

