import { useGetUserExperienceAndLevel } from '../http/generated/api'
import { Progress, ProgressIndicator } from './ui/progress-bar'

export function UserLevel() {
  const { data } = useGetUserExperienceAndLevel()

  if (!data) {
    return null
  }

  const percentToNextLevel = Math.round(
    (data.experience * 100) / data.experienceToNextLevel
  )

  return (
    <div className="max-w-[220px] w-full flex flex-col gap-1">
      <div className="flex items-center w-full justify-between px-2 text-xxs text-zinc-200">
        <span> Lvl {data.level}</span>
        <span className="text-zinc-400">
          {data.experience}xp de {data.experienceToNextLevel}xp
        </span>
        <span> {percentToNextLevel}% </span>
      </div>

      <Progress
        className="bg-zinc-800"
        value={data.experience}
        max={data.experienceToNextLevel}
      >
        <ProgressIndicator style={{ width: `${percentToNextLevel}%` }} />
      </Progress>
    </div>
  )
}
