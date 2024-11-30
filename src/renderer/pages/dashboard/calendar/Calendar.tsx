import React, { useMemo, useState } from 'react'
import { Calendar, DateLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";

const cultures = ['ru']
const lang: {
  [k in string]: any
} = {
  ru: {
    week: 'Неделя',
    work_week: 'Рабочая неделя',
    day: 'День',
    month: 'Месяц',
    previous: 'Предыдущий',
    next: 'Следующий',
    today: 'Сегодня',
    agenda: 'Дневник',
    showMore: (total: any) => `+${total} ещё`,
  },
}

const MyCalendar = ({ localizer }: {localizer: any}) => {
  const [culture, setCulture] = useState('ru')
  const { defaultDate, messages } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 1),
      messages: lang[culture],
    }),
    [culture]
  )

  return (
    <div>
      <Calendar
        culture={culture}
        localizer={localizer}
        events={[]}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  )
}

export default MyCalendar