import cors from 'cors'
import express from 'express'
import { authRouter } from './modules/auth/authRoutes.js'
import { chatRouter } from './modules/chat/chatRoutes.js'
import { platformRouter } from './modules/platform/platformRoutes.js'
import { uploadRouter } from './modules/upload/uploadRoutes.js'

export function createServer() {
  const app = express()

  app.use(cors())
  app.use(express.json({ limit: '2mb' }))

  app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok' })
  })

  app.use('/api/platform', platformRouter)
  app.use('/api/auth', authRouter)
  app.use('/api/chat', chatRouter)
  app.use('/api/upload', uploadRouter)

  return app
}

const port = Number(process.env.PORT ?? 3001)

if (process.env.NODE_ENV !== 'test') {
  createServer().listen(port, () => {
    console.log(`AutoResearch Scientist AI backend listening on port ${port}`)
  })
}
