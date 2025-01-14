import { eq } from 'drizzle-orm'
import { beforeEach, describe, expect, it } from 'vitest'
import { makeUser } from '../../tests/factories/make-user'
import { db } from '../db'
import { users } from '../db/schema'
import { getUser } from './get-user'

describe('get user', () => {
  beforeEach(async () => {
    await db.delete(users).where(eq(users.id, 'john-doe'))
  })
  it('should be able to get a user', async () => {
    const user = await makeUser()

    const result = await getUser({ userId: user.id })

    expect(result).toEqual({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
      },
    })
  })
})
