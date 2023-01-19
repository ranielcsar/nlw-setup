import { FastifyInstance } from 'fastify'
import { habitRoutes, dayRoutes, summaryRoutes } from './lib/serverRoutes'

export async function appRoutes(app: FastifyInstance) {
  habitRoutes(app)
  dayRoutes(app)
  summaryRoutes(app)
}
