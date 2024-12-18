
export const route_pages = {
  home: `/`,
  auth: `/auth`,
  singin: `/auth/signin`,
  desk: `/desk`,
  clients: `/clients`,
  estate: `/estate`,
  reports: `/reports`,
  calendar: `/calendar`,
  realtors: `/realtors`,
  deals: `/deals`,
}

export type TRoutesPages = keyof typeof route_pages

export function updatePage(link: TRoutesPages): boolean {
  if (Object.keys(route_pages).indexOf(link) === -1) {
    console.warn('there is no such route')
    return false
  }
  document.defaultView.location.hash = route_pages[link]
  return true
}
export function getPage(): TRoutesPages {
  let route: TRoutesPages;
  for (let i of Object.entries(route_pages)) {
    if (i[1] === document.defaultView.location.hash) {
      route = i[0] as TRoutesPages
      break
    }
  }
  return route
}