import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { authenticateFromGithubCode } from '../../functions/authenticate-from-github-code'

export const authenticateFromGithubRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/auth/github',
    {
      schema: {
        tags: ['auth'],
        operationId: 'authenticateFromGithub',
        description: 'Authenticate user from GitHub Code',
        body: z.object({
          code: z.string(),
        }),
        response: {
          201: z.object({ token: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { code } = request.body
      console.log(code)
      const { token } = await authenticateFromGithubCode({
        code,
      })

      console.log('token', token)
      return reply.status(201).send({ token })
    }
  )
}
