import { describe, expect, it } from 'vitest'
import { makeGoal } from '../../tests/factories/make-goal'
import { makeGoalCompletion } from '../../tests/factories/make-goal-completion'
import { makeUser } from '../../tests/factories/make-user'
import { createGoalCompletion } from './create-goal-completion'

describe('create goal completion', () => {
  it('should be able to complete a new goal', async () => {
    const user = await makeUser()
    const goal = await makeGoal({ userId: user.id })

    const result = await createGoalCompletion({
      userId: user.id,
      goalId: goal.id,
    })

    expect(result).toEqual({
      goalCompletion: expect.objectContaining({
        id: expect.any(String),
        goalId: goal.id,
      }),
    })
  })

  it('should not be able to complete a goal more times then it expects', async () => {
    const user = await makeUser()
    const goal = await makeGoal({ userId: user.id, desiredWeeklyFrequency: 1 })

    const result = await makeGoalCompletion({
      goalId: goal.id,
    })

    await expect(
      createGoalCompletion({
        userId: user.id,
        goalId: goal.id,
      })
    ).rejects.toThrow()
  })
})
