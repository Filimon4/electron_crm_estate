import { atom, WritableAtom } from "jotai";
import { EPageTaskBar } from "./types";
import { updatePage } from "../route";

const page = atom(EPageTaskBar.desk)

export const currentHomePage = atom(
  (get) => get(page),
  (get, set, update: any) => {
    set(page, update)
    updatePage(update)
  },
)
