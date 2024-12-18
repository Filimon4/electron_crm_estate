
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
    getEstateByPage: any;
    countEstate: any;

    createDeal: any;
    updateDeal: any;
    deleteDeal: any;
    getDealsByPage: any;
    countDeals: any;

    createRealtor: any;
    updateRealtor: any;
    deleteRealtor: any;
    getRealtorsByPage: any;
    countRealtors: any;

    onNotify: any;

    createEvent: any;
    updateEvent: any;
    deleteEvent: any;
  }
}
