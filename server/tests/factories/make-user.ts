import { faker } from '@faker-js/faker'
import type { InferSelectModel } from 'drizzle-orm'
import { db } from '../../src/db'
import { users } from '../../src/db/schema'

export async function makeUser(
  override: Partial<InferSelectModel<typeof users>> = {}
) {
  const [result] = await db
    .insert(users)
    .values({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatarGitHub(),
      externalAccountId: faker.number.int({ min: 1, max: 1000000 }),
      ...override,
    })
    .returning()

  return result
}
