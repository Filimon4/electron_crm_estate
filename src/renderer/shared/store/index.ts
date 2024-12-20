import { atom } from "jotai";
import { TRealtorDB } from "./types";
import { updatePage } from "../route";
import { DateSelectArg, EventChangeArg, EventDropArg, EventInput } from "@fullcalendar/core";
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

const deal = atom<number>()
export const readDeal = atom((get) => get(deal), null)
export const writeDeal = atom(null, (get, set, update: number) => set(deal, update))

const complex = atom<number>()
export const readComplex = atom((get) => get(complex), null)
export const writeComplex = atom(null, (get, set, update: number) => set(complex, update))
const house = atom<number>()
export const readHouse = atom((get) => get(house), null)
export const writeHouse = atom(null, (get, set, update: number) => set(house, update))

const events = atom<EventInput[]>([])
export const readEvent = atom((get) => get(events), null)
export const addEventFromDb = atom(null, (get, set, update: EventInput) => {
  set(events, [...get(events), update])
})
export const addEvent = atom<any, any, Promise<boolean>>(null, async (get, set, update: EventInput) => {
  try {    
    const userData = get(user)
    if (!userData?.id || typeof userData?.id !== 'number') return false  
      //@ts-ignore
    const event = await window.invokes.createEvent(userData.id, update)
    update.id = event.id
    set(events, [...get(events), update])
    return true
  } catch (error) {
    return false
  }
})
export const deleteEvent = atom<any, any, Promise<boolean>>(null, async (get, set, update: EventImpl): Promise<boolean> => {
  try {
    const userData = get(user) 
    if (!userData?.id || typeof userData?.id !== 'number') return false
    //@ts-ignore
    const result = window.invokes.deleteEvent(userData.id, update.id)
    if (!result) return false
    set(events, get(events).filter(ev => ev.id !== update.id))
    update.remove()
    return true
  } catch (error) {
    return false
  }
})
export const updateEvent = atom<any, any, Promise<boolean>>(null, async (get, set, update: EventChangeArg): Promise<boolean> => {
  const {event} = update
  const existedEvents = [...get(events)]
  const oldEventId = existedEvents.findIndex(ev => ev.id == event.id)

  const newEvent: EventInput = {
    allDay: event.allDay,
    id: event.id,
    start: event.start,
    end: event.end,
    title: event.title,
  }

  const revert = () => {
    console.log('revert')
    update.revert(); return false}

  
  if (oldEventId === undefined || oldEventId === null) return revert()
  try {
    const userData = get(user) 
    if (!userData?.id && typeof userData?.id !== 'number') return revert()
    //@ts-ignore
    const result = await window.invokes.updateEvent(userData.id, newEvent)
    console.log('updateEvent: ', result, Boolean(result))
    if (!result) {
      console.log('reverrt')
      return revert()
    }
    existedEvents.splice(oldEventId, 1, newEvent)
    set(events, existedEvents)
    return true
  } catch (error) {
    return revert()
  }
})