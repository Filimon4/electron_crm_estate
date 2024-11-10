import { HashPasswordsNamespace } from "../../modules/Hash"
import { TUserDTO } from "../../auth/auth.dto"
import { User as _User } from "../entities/User"

export namespace UsersNamespace {

  export const createUser = async (data: TUserDTO) => {
    try {
      const newRealtor = new _User()
      newRealtor.email = data.email
      newRealtor.phone = data.phone
      newRealtor.password = HashPasswordsNamespace.hashPassword(data.password)
      newRealtor.first_name = data.firstName
      newRealtor.sure_name = data.secondName
      newRealtor.last_name = data.lastName
      return await dbConnection(_User).save(newRealtor)
    } catch (error) {
      console.log(error)
    }
  }

  export const getUser = async (email?: string, phone?: string) => {
    if (!email && !phone) return null
    try {
      let user = null;
      if (email) {
        let user = await dbConnection(_User).findOne({
          where: {
            email: email
          }
        })
        if (user)
          return user
      }
      if (phone) {
        let user = await dbConnection(_User).findOne({
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

  export const updateUser = async () => {

  }

}