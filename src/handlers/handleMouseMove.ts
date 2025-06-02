import { calcCardMoving } from '@/hooks/calcCardMoving'
import { getISODateFormatted } from '@/hooks/getISODateFormatted'
import { useCommonStore } from '@/store/common'
import { useDataStore } from '@/store/data'

export const handleMouseMove = (e: MouseEvent) => {
  const common = useCommonStore()
  const data = useDataStore()

  if (common.indexActiveElement == -1) return

  common.newCoordX = e.clientX - common.startX
  calcCardMoving(e)

  const activeTask = data.tasks[common.selectedDevice][common.indexActiveElement]
  const countIntersections = data.tasks[common.selectedDevice].filter((passiveTask) => {
    if (activeTask.id == passiveTask.id) return false

    const activeTimeStart = new Date(activeTask.dateStartISO).getTime()
    const activeTimeFinish = new Date(activeTask.dateEndISO).getTime()

    const passiveTimeStart = new Date(passiveTask.dateStartISO).getTime()
    const passiveTimeFinish = new Date(passiveTask.dateEndISO).getTime()
    return activeTimeFinish >= passiveTimeStart && activeTimeStart <= passiveTimeFinish
  })

  if (countIntersections.length > 0) {
    common.isIntersecting = true
  } else {
    common.isIntersecting = false
  }
  const newDate = new Date(common.newDate)
  const newDateStart = getISODateFormatted(newDate)
  const newDateStartMsec = newDate.getTime()
  const newDateEndMsec =
    newDateStartMsec + data.tasks[common.selectedDevice][common.indexActiveElement].duration
  const newDateFinish = getISODateFormatted(new Date(newDateEndMsec))

  data.tasks[common.selectedDevice][common.indexActiveElement] = {
    ...data.tasks[common.selectedDevice][common.indexActiveElement],
    dateStartISO: newDateStart,
    dateEndISO: newDateFinish,
  }

  data.tasks[common.selectedDevice][common.indexActiveElement] = {
    ...data.tasks[common.selectedDevice][common.indexActiveElement],
    coordX: common.newCoordX,
  }
}
