import React, { useState } from 'react';
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ruLocale from '@fullcalendar/core/locales/ru';
import { INITIAL_EVENTS, createEventId } from './event_utils';
import { dialog } from 'electron';

const DemoApp: React.FC = () => {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const handleDateSelect = async (selectInfo: DateSelectArg) => {
    console.log(selectInfo)
    const title = await dialog.showOpenDialog({
      title: 'Введите название события',
    });
    console.log(title)
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // Clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay,
    //   });
    // }
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm(`Вы уверены, что хотите удалить событие '${clickInfo.event.title}'?`)) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events: EventApi[]) => {
    setCurrentEvents(events);
  };

  return (
    <div className='demo-app'>
      <Sidebar
        weekendsVisible={weekendsVisible}
        onToggleWeekends={handleWeekendsToggle}
        currentEvents={currentEvents}
      />
      <div className='demo-app-main'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          initialEvents={INITIAL_EVENTS}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
          locale={ruLocale}
        />
      </div>
    </div>
  );
};

const Sidebar: React.FC<{
  weekendsVisible: boolean;
  onToggleWeekends: () => void;
  currentEvents: EventApi[];
}> = ({ weekendsVisible, onToggleWeekends, currentEvents }) => {
  return (
    <div className='demo-app-sidebar'>
      <div className='demo-app-sidebar-section'>
        <label>
          <input
            type='checkbox'
            checked={weekendsVisible}
            onChange={onToggleWeekends}
          ></input>
          Переключить выходные
        </label>
      </div>
      <div className='demo-app-sidebar-section'>
        <h2>Все события ({currentEvents.length})</h2>
        <ul>
          {currentEvents.map(renderSidebarEvent)}
        </ul>
      </div>
    </div>
  );
};

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  );
}

function renderSidebarEvent(event: EventApi) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start!, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
      <i>{event.title}</i>
    </li>
  );
}

export default DemoApp;
