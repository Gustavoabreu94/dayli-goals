import { eq } from 'drizzle-orm'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { makeUser } from '../../tests/factories/make-user'
import { db } from '../db'
import { users } from '../db/schema'
import * as github from '../modules/github-oauth'
import { authenticateFromGithubCode } from './authenticate-from-github-code'

describe('authenticate from github code ', () => {
  beforeEach(() => {
    vi.mock('..modules/github-oauth')

    vi.clearAllMocks()
  })
  it('should be able to authenticate from github code ', async () => {
    vi.spyOn(github, 'getUserFromAccessToken').mockResolvedValueOnce({
      id: 12345,
      name: 'John Doe',
      email: null,
      avatar_url: 'qualquercoisa',
    })

    const sut = await authenticateFromGithubCode({
      code: 'sample-github-code',
    })

    expect(sut.token).toEqual(expect.any(String))

    const [userOnDb] = await db
      .select()
      .from(users)
      .where(eq(users.externalAccountId, 12345))

    expect(userOnDb.name).toEqual('John Doe')
  })

  it('should be able to authenticate with existing github user ', async () => {
    const existing = await makeUser({
      name: 'Jane Doe',
    })

    vi.spyOn(github, 'getUserFromAccessToken').mockResolvedValueOnce({
      id: existing.externalAccountId,
      name: 'John Doe',
      email: null,
      avatar_url: 'qualquercoisa',
    })

    const sut = await authenticateFromGithubCode({
      code: 'sample-github-code',
    })

    expect(sut.token).toEqual(expect.any(String))

    const [userOnDb] = await db
      .select()
      .from(users)
      .where(eq(users.externalAccountId, existing.externalAccountId))

    expect(userOnDb.name).toEqual('Jane Doe')
  })
})
