import { access } from "fs"
import { UserRole } from "../store/types"

export const taskBarConfig = [
  {
    type: 'desk',
    name: 'Рабочий стол',
    access: UserRole.REALTOR,
  },
  {
    type: 'estate',
    name: 'Объекты',
    access: 'all'
  },
  {
    type: 'houses',
    name: 'Дома',
    access: UserRole.ADMIN
  },
  {
    type: 'complexes',
    name: 'Комплексы',
    access: UserRole.ADMIN
  },
  {
    type: 'clients',
    name: 'Клиенты',
    access: 'all'
  },
  {
    type: 'realtors',
    name: 'Риелторы',
    access: UserRole.ADMIN
  },
  {
    type: 'calendar',
    name: 'Календарь',
    access: 'all'
  },
  {
    type: 'deals',
    name: 'Сделки',
    access: 'all'
  },
  {
    type: 'reports',
    name: 'Отчёты',
    access: UserRole.ADMIN
  },
  
]
