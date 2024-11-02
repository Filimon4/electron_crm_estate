import { route_pages } from "../route";

export const EPageTaskBar = {
  'desk': route_pages.desk,
  'estate': route_pages.estate,
  'clients': route_pages.clients,
  'reports': route_pages.reports,
  'calendar': route_pages.calendar
}

export type TRealtorDB = {
  phone: string;
  email: string;
  first_name: string;
  sure_name: string;
  last_name: string;
  password: string;
}
