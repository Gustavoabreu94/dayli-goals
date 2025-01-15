import { eq } from 'drizzle-orm'
import { db } from '../db'
import { users } from '../db/schema'
import {
  calculateTotalExperienceForLevel,
  calculeteLevelFromExperience,
} from '../modules/gamification'

interface GetUserLevelAndExperienceRequest {
  userId: string
}
export async function getUserLevelAndExperience({
  userId,
}: GetUserLevelAndExperienceRequest) {
  const [{ experience }] = await db
    .select({
      experience: users.experience,
    })
    .from(users)
    .where(eq(users.id, userId))

  const level = calculeteLevelFromExperience(experience)
  const experienceToNextLevel = calculateTotalExperienceForLevel(level)

  return {
    experience,
    level,
    experienceToNextLevel,
  }
}
