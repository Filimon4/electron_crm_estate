
export const route_pages = {
  home: `/`,
  auth: `/auth`,
  singin: `/auth/signin`,
  signup: `/auth/signup`,
  desk: `/desk`,
  clients: `/clients`,
  estate: `/estate`,
  reports: `/reports`,
  calendar: `/calendar`,
}

export type TRoutesPages = keyof typeof route_pages

export function updatePage(link: TRoutesPages | string): boolean {
  if (Object.values(route_pages).indexOf(link) === -1) return false
  document.defaultView.location.hash = link
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