
export type TPageClient = {
  clients: any[],
  count: number
}

export const fetchClientsPage = (userId: number, page: number) => {
  //@ts-ignore
  return window.context.getClientsByPage(userId, page)
}
