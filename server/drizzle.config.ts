import { defineConfig } from 'drizzle-kit'
import './src/env'
import { env } from './src/env'
export default defineConfig({
  out: './.migartions',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  migrations: {
    schema: 'drizzle', // Esquema padrão para migrações
  },
})

// user: 'docker',
// password: 'docker',
// host: 'localhost',
// port: 5432,
// database: 'inorbit',
