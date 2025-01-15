import { expect, test } from 'vitest'
import {
  calculateExperienceToLevel,
  calculateTotalExperienceForLevel,
  calculeteLevelFromExperience,
} from './gamification'

test('experience to level', () => {
  const exp1 = calculateExperienceToLevel(1)
  const exp2 = calculateExperienceToLevel(2)
  const exp4 = calculateExperienceToLevel(4)

  expect(exp1).toEqual(0)
  expect(exp2).toEqual(26)
  expect(exp4).toEqual(43)
})

test('level from experience', () => {
  const lvl1 = calculeteLevelFromExperience(15)
  const lvl2 = calculeteLevelFromExperience(27)
  const lvl4 = calculeteLevelFromExperience(26 + 33 + 43)

  expect(lvl1).toEqual(1)
  expect(lvl2).toEqual(2)
  expect(lvl4).toEqual(4)
})

test('total experience level', () => {
  const exp1 = calculateTotalExperienceForLevel(1)
  const exp2 = calculateTotalExperienceForLevel(2)
  const exp4 = calculateTotalExperienceForLevel(4)

  expect(exp1).toEqual(0)
  expect(exp2).toEqual(26)
  expect(exp4).toEqual(26 + 33 + 43)
})
