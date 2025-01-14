import type { InferSelectModel } from 'drizzle-orm'
import { db } from '../../src/db'
import { goalCompletions } from '../../src/db/schema'

export async function makeGoalComplations(
  override: Partial<InferSelectModel<typeof goalCompletions>> &
    Pick<InferSelectModel<typeof goalCompletions>, 'goalId'>
) {
  const [result] = await db
    .insert(goalCompletions)
    .values({
      ...override,
    })
    .returning()

  return result
}
