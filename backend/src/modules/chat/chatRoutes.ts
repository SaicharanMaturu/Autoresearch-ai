import { Router } from 'express'
import { buildAssistantReply } from '../../services/assistantService.js'

export const chatRouter = Router()

chatRouter.post('/', (request, response) => {
  const { message } = request.body as { message?: string }

  if (!message?.trim()) {
    response.status(400).json({ error: 'Message is required.' })
    return
  }

  response.json({
    reply: buildAssistantReply(message),
    suggestions: [
      'Open the research gap lab',
      'Save the finding to the memory chamber',
      'Draft a presentation storyboard',
    ],
  })
})
