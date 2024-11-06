import { atom, WritableAtom } from "jotai";
import { EPageTaskBar, TRealtorDB } from "./types";
import { updatePage } from "../route";

const page = atom(EPageTaskBar.desk)
const user = atom<TRealtorDB>()

export const currentHomePage = atom(
  (get) => get(page),
  (get, set, update: any) => {
    set(page, update)
    updatePage(update)
  },
)

export const readUser = atom(
  (get) => get(user), null)

export const writeUser = atom(
  null,
  (get, set, update: TRealtorDB) => {
    set(user, update)
  }
)

const estate = atom<number>()

export const readEstate = atom(
  (get) => get(estate),
  null
)

export const writeEstate = atom(
  null,
  (get, set, update: number) => {
    set(estate, update)
  }
)

const client = atom<number>()

export const readClient = atom(
  (get) => get(client),
  null
)

export const writeClient = atom(
  null,
  (get, set, update: number) => {
    set(client, update)
  }
)