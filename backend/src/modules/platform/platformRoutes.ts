import { Router } from 'express'
import { platformData } from '../../data/platformData.js'
import { futureIntegrationModules } from '../../future/integrations.js'

export const platformRouter = Router()

platformRouter.get('/', (_request, response) => {
  response.json({
    ...platformData,
    integrations: futureIntegrationModules,
  })
})
