
declare global {

  interface Window {
    frontApi: {
      signin: any;
      logout: any;
      signup: any;
      createClient: any;
      updateClient: any;
      deleteClient: any;
      createEstate: any;
      updateEstate: any;
      deleteEstate: any;
      createDeal: any;
      updateDeal: any;
      deleteDeal: any;
      createRealtor: any,
      updateRealtor: any,
      deleteRealtor: any,
      getRealtor: any,

      onNotify: any
    }
  }

}

export {}