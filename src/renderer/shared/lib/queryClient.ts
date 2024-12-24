import { QueryClient } from "@tanstack/react-query";

export const QUERY_KEYS = {
  //@ts-ignore
  ...Object.keys(window.invokes).reduce((acc, cur) => ({ ...acc, [cur]: `${cur}` }), {}),
};

const MINUTE = 1000 * 60;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 40000,
      gcTime: 10 * MINUTE
    }
  }
});

// (async () => {
//   await queryClient.prefetchQuery({ queryKey: ['getClients'], queryFn: async () => {
//     //@ts-ignore
//     const clients = await window.getClients()
//     console.log(clients)
//     return clients
//   }})
//   await queryClient.prefetchQuery({ queryKey: ['getEstates'], queryFn: () => {
//     return []
//   }})
// })();
