import { env } from '../env'

interface GetUserResponse {
  id: number
  name: string | null
  email: string | null
  avatar_url: string
}

export async function getAcessTokenFromCode(code: string) {
  const accessTokenURL = new URL(
    'GET https://github.com/login/oauth/access_token'
  )

  accessTokenURL.searchParams.set('client_id', env.GITHUB_CLIENT_ID)
  accessTokenURL.searchParams.set('client_secret', env.GITHUB_CLIENT_SECRET)
  accessTokenURL.searchParams.set('code ', code)

  const response = await fetch(accessTokenURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  })

  return await response.json()
}

export async function getUserFromAccessToken(
  accessToken: string
): Promise<GetUserResponse> {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response.json()
}
