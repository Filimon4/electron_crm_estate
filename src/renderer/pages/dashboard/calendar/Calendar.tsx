import React, { useEffect, useRef, useState } from 'react';
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
  EventDropArg,
  EventInput,
  CalendarApi,
} from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction';
import ruLocale from '@fullcalendar/core/locales/ru';
import { createEventId } from './event_utils';
import { Flex } from '@chakra-ui/react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { addEvent, addEventFromDb, dateContext, deleteEvent, readEvent, readUser, updateEvent } from '../../../shared/store';
import OnlyNameModal from '../../../components/modals/InputModal/OnlyNameModal/OnlyNameModal';
import ConfirmationModal from '../../../components/modals/ConfirmModal/ConfirmModal';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../../shared/lib/queryClient';

const Calendar: React.FC = () => {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confimDelete, setConfimDeleteOpen] = useState<EventClickArg>(null)
  const dateData = useAtomValue(dateContext)
  const setDateDate = useSetAtom(dateContext)
  const calendarRef = useRef(null)
  const [user,] = useAtom(readUser)

  const [events,] = useAtom(readEvent)
  const [,setEventsFromDb] = useAtom(addEventFromDb)
  const [,setAddEvent] = useAtom(addEvent)
  const [,setRemoveEvent] = useAtom(deleteEvent)
  const [,setUpdateEvent] = useAtom(updateEvent)
  
  const { data: eventsData} = 
  //@ts-ignore
  useQuery({placeholderData:keepPreviousData,queryKey:[QUERY_KEYS['getAllEvents']],queryFn:async()=>{
      //@ts-ignore
      const result = await window.invokes.getAllEvents(user.id)
      result.forEach((event: any) => {
        const api = calendarRef.current.getApi()
        if (!api) return
        if (api.getEventById(event.id)) return
        api.addEvent(event);
        api.unselect();
        setEventsFromDb(event)
      })
      return result
    }});

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setDateDate({ dateInfo: selectInfo});
    setIsModalOpen(true);
  };

  const handleModalName = (name: string) => {
    handleModalSave(dateData.dateInfo, name)
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    setConfimDeleteOpen(clickInfo)
  };

  const handleConfigDelete = () => {
    setConfimDeleteOpen(null)
    setRemoveEvent(confimDelete.event)
  } 

  const handleEvents = (events: EventApi[]) => {
    setCurrentEvents(events);
  };

  const handleModalSave = async (dateInfo: DateSelectArg, title: string) => {
    if (dateInfo && title.trim()) {
      const calendarApi: CalendarApi = calendarRef.current.getApi()
      if (!calendarApi) return
      
      const event: EventInput = {
        id: createEventId(),
        title: title.trim(),
        start: dateInfo.startStr,
        end: dateInfo.endStr,
        allDay: dateInfo.allDay,
      }

      const result = await setAddEvent(event)
      if (!result) return
      calendarApi.addEvent(event);
      calendarApi.unselect();
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleEventDrop = (drop: EventDropArg) => {
    setUpdateEvent(drop)
  }
  
  const handleEventResize = (drop: EventResizeDoneArg) => {
    setUpdateEvent(drop)
  }

  return (
    <>
      <Flex className='demo-app' width={'100%'} direction={'column'} justifyContent={'space-between'} overflowX={'hidden'}>
        
        {/* <Sidebar
          weekendsVisible={weekendsVisible}
          onToggleWeekends={handleWeekendsToggle}
          currentEvents={currentEvents}
        /> */}
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
            select={handleDateSelect}
            initialEvents={events}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
            eventsSet={handleEvents}
            eventDrop={handleEventDrop}
            eventResize={handleEventResize}
            locale={ruLocale}
            height={'100vh'}
            ref={calendarRef}
          />
        </div>
      </Flex>
      <OnlyNameModal isOpen={isModalOpen} onClose={handleModalClose} onSave={((name) => {handleModalClose();handleModalName(name)})} />
      <ConfirmationModal isOpen={confimDelete !== null} onClose={() => setConfimDeleteOpen(null)} onConfirm={() => handleConfigDelete()} body='Вы уверены, что хотите удалить событие' title='Удаление события' />
    </>
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

const Modal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='modal-overlay'>
      <div className='modal'>{children}</div>
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

export default Calendar;
