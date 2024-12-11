import { HashPasswordsNamespace } from "../../modules/Hash"
import { TUserDTO } from "../../auth/auth.dto"
import { User as _User, UserRole } from "../entities/User"
import { sendNotify } from "../../utils/app"

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
      const user = await dbConnection(_User).save(newRealtor)
      if (!user || user === null || user === undefined) {throw new Error('')}
      sendNotify('success', 'Пользователь успешно создан')
      return user
    } catch (error) {
      sendNotify('error', 'Ошбика при создании пользователя')
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

  export const updateUser = async (id: number, user: TUserDTO) => {
    const userRepository = await dbConnection(_User);
    const foundUser = await userRepository.findOne({ where: { id: id} });
    if (!foundUser) {
      return null;
    }
    Object.assign(foundUser, user);
    return await userRepository.save(user);
  }

  export const getAllRealtors = async () => {
    const users = await dbConnection(_User).find({
      where: {
        role: UserRole.REALTOR
      }
    })
    return users
  }

  export const getAll = async () => {
    await dbConnection(_User).find()
  }

  export const deleteUser = async (id: number) => {
    const result =  await dbConnection(_User).delete(id)
    return result.affected !== 0
  }

}
