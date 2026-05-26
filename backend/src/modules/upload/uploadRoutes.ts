import { Router } from 'express'
import multer from 'multer'

const upload = multer({ storage: multer.memoryStorage() })

export const uploadRouter = Router()

uploadRouter.post('/', upload.single('file'), (request, response) => {
  if (!request.file) {
    response.status(400).json({ error: 'A file is required.' })
    return
  }

  response.json({
    fileName: request.file.originalname,
    size: request.file.size,
    type: request.file.mimetype || 'application/octet-stream',
    summary: 'File accepted by the ingestion API and staged for future OCR, RAG, and metadata enrichment.',
  })
})
