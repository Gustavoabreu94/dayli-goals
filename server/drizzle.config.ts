import { defineConfig } from 'drizzle-kit'
import './src/env'
export default defineConfig({
  out: './.migartions',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    // url: env.DATABASE_URL,
    user: 'docker',
    password: 'docker',
    host: 'localhost',
    port: 5432,
    database: 'inorbit',
  },
})
