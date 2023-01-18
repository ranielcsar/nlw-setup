import { FastifyInstance } from 'fastify'
import { habitRoutes, dayRoutes } from './lib/serverRoutes'

export async function appRoutes(app: FastifyInstance) {
  habitRoutes(app)
  dayRoutes(app)
}
