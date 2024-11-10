import { Flat as _Flat } from "../entities"

export namespace EstateNamespace {


  export const createEstate = async () => {

  }
  export const updateEstate = async () => {

  }
  export const deleteEstate = async (id: number) => {

  }

  export const getAll = async () => {
    const data = await dbConnection(_Flat).find()
    return data
  }
}
