import * as fns from 'date-fns'

interface Day {
  full: string
  abbr: string
}

export const days: Day[] = [
  {
    full: 'Sunday',
    abbr: 'Sun'
  },
  {
    full: 'Monday',
    abbr: 'Mon'
  },
  {
    full: 'Tuesday',
    abbr: 'Tue'
  },
  {
    full: 'Wednesday',
    abbr: 'Wed'
  },
  {
    full: 'Thursday',
    abbr: 'Thu'
  },
  {
    full: 'Friday',
    abbr: 'Fri'
  },
  {
    full: 'Saturday',
    abbr: 'Sat'
  }
]

const chunk = <T>(arrayData: T[], chunkSize: number) => {
  return Array.from({ length: Math.ceil(arrayData.length / chunkSize) }, (_v, i) => {
    return arrayData.slice(i * chunkSize, i * chunkSize + chunkSize)
  })
}

export const generateMonthView = (selectedDate: Date) => {
  const daysInMonth = fns.getDaysInMonth(selectedDate)
  const startWeekday = fns.getDay(fns.startOfMonth(selectedDate))
  const endWeekday = fns.getDay(fns.endOfMonth(selectedDate))
  const gridDays = chunk<Date | null>(
    [
      ...Array.from<null>({ length: startWeekday }).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => fns.setDate(selectedDate, i + 1)),
      ...Array.from<null>({ length: 6 - endWeekday }).fill(null)
    ],
    7
  )
  return gridDays
}
