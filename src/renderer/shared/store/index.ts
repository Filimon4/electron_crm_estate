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

export const writeUser = atom(null, (get, set, update: TRealtorDB) => {
  set(user, update)

})
