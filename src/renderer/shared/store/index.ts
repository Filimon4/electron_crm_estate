import { atom } from "jotai";
import { TRealtorDB } from "./types";
import { updatePage } from "../route";
import { DateSelectArg, EventDropArg, EventInput } from "@fullcalendar/core";
import { EventImpl } from "@fullcalendar/core/internal";

const page = atom('desk')
export const currentHomePage = atom(
  (get) => get(page),
  (get, set, update: any) => {
    set(page, update)
    updatePage(update)
  },
)

const user = atom<TRealtorDB>()
export const readUser = atom((get) => get(user), null)
export const writeUser = atom(null, (get, set, update: TRealtorDB) => set(user, update))

const estate = atom<number>()
export const readEstate = atom((get) => get(estate),null)
export const writeEstate = atom(null, (get, set, update: number) => set(estate, update))

const client = atom<number>()
export const readClient = atom((get) => get(client),null)
export const writeClient = atom(null,(get, set, update: number) => set(client, update))

const realtor = atom<number>()
export const readRealtor = atom((get) => get(realtor), null)
export const writeRealtor = atom(null, (get, set, update: number) => set(realtor, update))

export const dateContext = atom<{
  dateInfo: DateSelectArg
}>()


const events = atom<EventInput[]>([])
export const readEvent = atom((get) => get(events), null)
export const addEvent = atom(null, (get, set, update: EventInput) => {
  set(events, [...get(events), update])
  console.log(update, get(events))
  //@ts-ignore
  window.invokes.createEvent(update)
})
export const deleteEvent = atom(null, (get, set, update: string) => {
  set(events, get(events).filter(ev => ev.id !== update))
  //@ts-ignore
  window.invokes.deleteEvent(update)
})
export const updateEvent = atom(null, (get, set, update: EventDropArg) => {
  const {event} = update
  const existedEvents = [...get(events)]
  const oldEvent = existedEvents.find(ev => ev.id == event.id)
  const oldEventId = existedEvents.findIndex(ev => ev.id == event.id)
  const newEvent: EventInput = {
    allDay: event.allDay,
    id: event.id,
    start: event.start,
    end: event.end,
    title: oldEvent.title,
  }
  existedEvents.splice(oldEventId, 1, newEvent)
  // console.log(existedEvents)
  set(events, existedEvents)
  //@ts-ignore
  window.invokes.updateEvent(newEvent)
})