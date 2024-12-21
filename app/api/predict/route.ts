import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { homeTeam, awayTeam } = await req.json()

    // Call Python API for prediction
    const response = await fetch(process.env.PYTHON_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify({ homeTeam, awayTeam }),
    })

    const prediction = await response.json()

    return NextResponse.json(prediction)
  } catch (error) {
    console.error('Prediction error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

