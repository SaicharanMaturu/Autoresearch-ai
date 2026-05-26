import { Router } from 'express'

export const authRouter = Router()

authRouter.post('/login', (request, response) => {
  const { email, password } = request.body as { email?: string; password?: string }

  if (!email || !password) {
    response.status(400).json({ error: 'Email and password are required.' })
    return
  }

  response.json({
    token: 'preview-session-token',
    user: {
      name: 'Aurora Vega',
      role: 'Lead AutoResearch Strategist',
      email,
    },
  })
})
