
declare global {

  interface Window {
    frontApi: {
      signin: any;
      logout: any;
      signup: any;
      createClient: any;
      updateClient: any;
      deleteClient: any;
      createEsate: any;
      updateEsate: any;
      deleteEsate: any;
      createDeal: any;
      updateDeal: any;
      deleteDeal: any;
    }
  }

}

export {}