import { HashPasswordsNamespace } from "../../modules/Hash"
import { TUserDTO } from "../../auth/auth.dto"
import { User as _User, UserRole } from "../entities/User"
import { sendNotify } from "../../utils/app"
import { getPostgresErrorMessage } from "../../utils/pqErrors"
import { TFilterRealtorDTO } from "../../realtors/realtors.dto"
import { Like } from "typeorm"

export namespace UsersNamespace {

  export const resetPassword = async (user_id: number, realtor_id: number, password: string) => {
    try {
      console.log(user_id, realtor_id, password)
      const user = await dbConnection(_User).findOne({
        where: {id: user_id}
      })
      if (user.role !== UserRole.ADMIN) throw new Error('у пользователя нету прав для этого дейсвия')
      return await dbConnection(_User).update(realtor_id, {
        password: HashPasswordsNamespace.hashPassword(password)
      })
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error?.driverError?.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  }

  export const getRealtorsByPage = async (page: number, limit: number, filters: TFilterRealtorDTO) => {
    try {
      const whereConditions: {[k in any]: any} = {}
      Object.entries(filters ?? {}).forEach(([k, v]) => {
        whereConditions[k] = Like(`%${v}%`)
      });
      return await dbConnection(_User).find({
        skip:  ((page - 1) * limit),
        take: limit,
        order: { id: "ASC"},
        where: {
          ...whereConditions,
          role: UserRole.REALTOR
        }
      })
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
 }


  export const createUser = async (data: TUserDTO) => {
    try {
      const newRealtor = await dbConnection(_User).create()
      newRealtor.email = data.email
      newRealtor.phone = data.phone
      newRealtor.password = HashPasswordsNamespace.hashPassword(data.password)
      newRealtor.first_name = data.first_name
      newRealtor.sure_name = data.sure_name
      newRealtor.last_name = data.last_name
      newRealtor.role = UserRole.REALTOR
      const user = await dbConnection(_User).save(newRealtor)
      if (!user || user === null || user === undefined) {throw new Error('')}
      sendNotify('success', 'Пользователь успешно создан')
      return user
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  }

  export const getUserById = async (id: number) => {
    return await dbConnection(_User).findOne({
      where: {
        id: id
      }
    })
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
      // const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', error)
      // console.log(errorMessage)
    }
  }

  export const updateUser = async (id: number, user: TUserDTO) => {
    try {
      const userRepository = await dbConnection(_User);
      const foundUser = await userRepository.findOne({ where: { id: id} });
      if (!foundUser) {
        return null;
      }
      Object.assign(foundUser, user);
      return await userRepository.update(user.id, {
        ...user
      });
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  }

  export const deleteUser = async (id: number) => {
    try {
      const result =  await dbConnection(_User).delete(id)
      return result.affected !== 0
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  }
}
