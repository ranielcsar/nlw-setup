import { prisma } from '../prisma'
import dayjs from 'dayjs'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

export function habitRoutes(app: FastifyInstance) {
  app.get('/habits', async () => {
    const habits = await prisma.habit.findMany()

    return habits
  })

  app.post('/habits', async (request) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6))
    })

    const { title, weekDays } = createHabitBody.parse(request.body)

    const today = dayjs().startOf('day').toDate()

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map((weekDay) => ({ week_day: weekDay }))
        }
      }
    })
  })
}
