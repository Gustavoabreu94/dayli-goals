import { useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import {
  getGetPendingGoalsQueryKey,
  getGetUserExperienceAndLevelQueryKey,
  getGetWeekSummaryQueryKey,
  useCreateCompletion,
  useGetPendingGoals,
} from '../http/generated/api'
import { OutlineButton } from './ui/outline-button'

export function PendingGoals() {
  const queryClient = useQueryClient()

  const { data } = useGetPendingGoals()
  const { mutateAsync: createCompletion } = useCreateCompletion()

  if (!data) {
    return null
  }

  async function handleCompleteGoal(goalId: string) {
    await createCompletion({ data: { goalId } })

    queryClient.invalidateQueries({ queryKey: getGetPendingGoalsQueryKey() })
    queryClient.invalidateQueries({ queryKey: getGetWeekSummaryQueryKey() })
    queryClient.invalidateQueries({
      queryKey: getGetUserExperienceAndLevelQueryKey(),
    })
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.pendingGoals.map(goal => {
        return (
          <OutlineButton
            key={goal.id}
            disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
            onClick={() => handleCompleteGoal(goal.id)}
          >
            <Plus className="size-4 text-zinc-600" />
            {goal.title}
          </OutlineButton>
        )
      })}
    </div>
  )
}
