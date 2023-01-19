import { prisma } from '../prisma'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

export function summaryRoutes(app: FastifyInstance) {
  app.get('/summary', async () => {
    const summary = await prisma.$queryRaw`
      SELECT
        D.id,
        D.date,
        (
          SELECT
            cast(count(*) as float)
          FROM
            day_habits DH
          WHERE
            DH.day_id = D.id
        ) as completed,
        (
          SELECT
            cast(count(*) as float)
          FROM
            habit_week_days HWD
          JOIN habits H
            ON H.id = HWD.habit_id
          WHERE
            HWD.week_day = cast(strftime('%w', D.date / 1000.0, 'unixepoch') as int)
            AND
            H.created_at <= D.date
        ) as amount
      FROM
        days D
    `

    return summary
  })
}
