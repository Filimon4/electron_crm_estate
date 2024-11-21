import { atom } from "jotai";
import { TRealtorDB } from "./types";
import { updatePage } from "../route";

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
export const readRealtor = atom((get) => get(client), null)
export const writeRealtor = atom(null, (get, set, update: number) => set(realtor, update))