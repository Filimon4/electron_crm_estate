import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 120000 
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
