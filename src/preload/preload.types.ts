
export namespace PreloadNamespace {

  export interface IFrontApi {
    signin: any;
    signup: any;

    createClient: any;
    updateClient: any;
    deleteClient: any;
    getClientsByPage: any;
    countClient: any;

    createEstate: any;
    updateEstate: any;
    deleteEstate: any;
    getEstate: any;

    createDeal: any;
    updateDeal: any;
    deleteDeal: any;

    createRealtor: any,
    updateRealtor: any,
    deleteRealtor: any,
    getRealtor: any,

    onNotify: any,

    createEvent: any,
    updateEvent: any,
    deleteEvent: any,
  }
}
