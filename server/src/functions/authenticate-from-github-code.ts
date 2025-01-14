import { eq } from 'drizzle-orm'
import { db } from '../db'
import { users } from '../db/schema'
import { authenticateUser } from '../modules/auth'
import {
  getAcessTokenFromCode,
  getUserFromAccessToken,
} from '../modules/github-oauth'

interface AuthenticateFromGithubCodeRequest {
  code: string
}

export async function authenticateFromGithubCode({
  code,
}: AuthenticateFromGithubCodeRequest) {
  const { access_token } = await getAcessTokenFromCode(code)

  const githubUser = await getUserFromAccessToken(access_token)

  const result = await db
    .select()
    .from(users)
    .where(eq(users.externalAccountId, githubUser.id))

  const userAlreadyExists = result.length > 0

  let userId = ''

  if (userAlreadyExists) {
    userId = result[0].id
  } else {
    if (!userAlreadyExists) {
      const [insertedUser] = await db.insert(users).values({
        name: githubUser.name,
        email: githubUser.email,
        avatarUrl: githubUser.avatar_url,
        externalAccountId: githubUser.id,
      })

      userId = insertedUser
    }
  }

  const token = await authenticateUser(userId)

  return token
}
