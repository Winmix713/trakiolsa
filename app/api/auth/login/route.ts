import { NextResponse } from 'next/server'
import { sign } from 'jsonwebtoken'
import { db } from '@/lib/db'
import { compare } from 'bcrypt'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    // Validate user credentials
    const [user] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    ) as any[]

    if (!user || !(await compare(password, user.password))) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    return NextResponse.json({ token })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

