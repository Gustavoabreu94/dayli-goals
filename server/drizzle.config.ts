import { defineConfig } from 'drizzle-kit'
import './src/env'
import { env } from './src/env'
export default defineConfig({
  out: './.migrations',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
