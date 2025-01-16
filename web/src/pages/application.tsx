import { Dialog } from '@radix-ui/react-dialog'
import dayjs from 'dayjs'
import { Loader2 } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { CreateGoal } from '../components/create-goal'
import { WeeklySummary } from '../components/weekly-summary'
import { useGetWeekSummary } from '../http/generated/api'

export function Application() {
  const [searchParams, setSearchParams] = useSearchParams()
  const weekStartsAtParam = searchParams.get('week_starts_at')

  const weekStartsAt = weekStartsAtParam
    ? new Date(weekStartsAtParam)
    : new Date()

  const { data, isLoading } = useGetWeekSummary({
    weekStartsAt: dayjs(weekStartsAt).startOf('week').toISOString(),
  })

  if (isLoading || !data) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="text-zinc-500 animate-spin size-10" />
      </div>
    )
  }

  return (
    <Dialog>
      <WeeklySummary summary={data.summary} />

      <CreateGoal />
    </Dialog>
  )
}

//      {data.summary.total && data.summary.total > 0 ? (
//     <WeeklySummary summary={data.summary} />
//   ) : (
//     <EmptyGoals />
//   )}
