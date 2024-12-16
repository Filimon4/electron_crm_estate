import { statTypes } from "../config/stat.config"

export interface IStatData {
  label: keyof typeof statTypes,
  value: string
  text: string
}
