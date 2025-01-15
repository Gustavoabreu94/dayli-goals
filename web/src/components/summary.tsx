import { DialogTrigger } from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-BR'
import { CheckCircle2, Plus } from 'lucide-react'
import { getSummary } from '../http/get-summary'
import { PedingGoals } from './pedding-goals'
import { Button } from './ui/button'
import { InOrbitIcon } from './ui/in-orbit-icon'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'

dayjs.locale(ptBR)
export function Summary() {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60,
  })

  if (!data) {
    return null
  }
  const firstDayOfWeek = dayjs().startOf('week').format('D MMM')
  const lastDayOfWeek = dayjs().endOf('week').format('D MMM')

  const completedPercentage = Math.round(
    (data.summary.completed * 100) / data.summary.total
  )
  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <InOrbitIcon />
          <span className="text-lg font-semibold capitalize">
            {firstDayOfWeek} - {lastDayOfWeek}
          </span>
        </div>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={data?.summary.completed} max={data?.summary.total}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{' '}
            <span className="text-zinc-100">{data?.summary.completed}</span> de
            <span className="text-zinc-100"> {data?.summary.total} </span> metas
            nessa semana.
          </span>
          <span> {completedPercentage}%</span>
        </div>

        <Separator />

        <PedingGoals />

        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-medium"> Sua semana</h2>
          {Object.entries(data.summary.goalsPerDay).map(([date, goals]) => {
            const weekDay = dayjs(date).format('dddd')
            const formattedDate = dayjs(date).format('D[ de ] MMMM')
            return (
              <div key={date} className="flex flex-col gap-4">
                <h3 className="font-medium ">
                  <span className="capitalize">{weekDay} </span>

                  <span className="text-zinc-400 text-xs">
                    ({formattedDate})
                  </span>
                </h3>

                <ul className="flex flex-col gap-3">
                  {goals.map(goal => {
                    const time = dayjs(goal.completedAt).format('HH:mm[h]')
                    return (
                      <li key={goal.id} className="flex items-center gap-2">
                        <CheckCircle2 className="text-pink-500 size-4" />
                        <span className="text-sm text-zinc-400">
                          Você completou “
                          <span className="text-zinc-100">{goal.title}</span>”
                          às <span className="text-zinc-100">{time}</span>
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
