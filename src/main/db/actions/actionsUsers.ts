import { HashPasswordsNamespace } from "../../modules/Hash"
import { TRealtorDTO } from "../../auth/auth.dto"
import { Realtor as _Realtor } from "../entities/Realtor"
import { scryptSync } from "crypto"

export namespace UsersNamespace {

  export const createUser = async (data: TRealtorDTO) => {
    try {
      console.log(data)
      const newRealtor = new _Realtor()
      newRealtor.email = data.email
      newRealtor.phone = data.phone
      newRealtor.password = HashPasswordsNamespace.hashPassword(data.password)
      newRealtor.first_name = data.firstName
      newRealtor.sure_name = data.secondName
      newRealtor.last_name = data.lastName
      return await dbConnection(_Realtor).save(newRealtor)
    } catch (error) {
      console.log(error)
    }
  }

  export const getUser = async (email?: string, phone?: string) => {
    if (!email && !phone) return null
    try {
      let user = null;
      if (email) {
        let user = await dbConnection(_Realtor).findOne({
          where: {
            email: email
          }
        })
        if (user)
          return user
      }
      if (phone) {
        let user = await dbConnection(_Realtor).findOne({
          where: {
            phone: phone
          }
        })
        if (user)
          return user
      }
      return user
    } catch (error) {
      console.log(error)
    }
  }

  export const changeUser = async () => {

  }

}
