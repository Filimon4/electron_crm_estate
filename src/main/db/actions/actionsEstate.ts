import { getPostgresErrorMessage } from "../../utils/pqErrors";
import { Flat as _Flat, Complex as _Complex, House as _House } from "../entities"
import { sendNotify } from "../../utils/app";
import { TFlatDTO } from "../../estates/estates.dto";

export namespace EstateNamespace {
  export const createFlat = async (data: TFlatDTO): Promise<_Flat> => {
    try {
      console.log(JSON.stringify(data, null, 2))
      const flatRepository = await dbConnection(_Flat);
      const flat = flatRepository.create()
      flat.flat = +data.flat
      flat.floor = +data.floor
      flat.house_id = +data.house_id
      flat.price = +data.price
      flat.room_amount = +data.room_amount
      flat.size = +data.size
      flat.description = ' '
      return await flatRepository.save(flat);
    } catch (error) {
      console.log(error)
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const getFlatsByPage = async (page: number, limit: number): Promise<[_Flat[], number]> => {
    try {
      if (!page || !limit) throw new Error('there is not values')
      return await dbConnection(_Flat).findAndCount({
        skip:  ((page - 1) * limit),
        take: limit,
        order: { id: "ASC"},
      })
    } catch (error) {
      console.log(error)
      const errorMessage = getPostgresErrorMessage(error?.driverError?.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const getFlatById = async (id: number): Promise<_Flat | null> => {
    try {
      const flatRepository = await dbConnection(_Flat);
      return await flatRepository.findOne({ where: { id }, relations: ["house"] });
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const updateFlat = async (id: number, updates: TFlatDTO): Promise<_Flat | null> => {
    try {
      const flatRepository = await dbConnection(_Flat);
      const flat = await flatRepository.findOne({ where: { id } });
      if (!flat) return null;
      Object.assign(flat, updates);
      return await flatRepository.save(flat);
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const deleteFlat = async (id: number): Promise<boolean> => {
    try {
      const flatRepository = await dbConnection(_Flat);
      const result = await flatRepository.delete(id);
      return result.affected !== 0;
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const createHouse = async (data: Partial<_House>): Promise<_House> => {
    try {
      const houseRepository = await dbConnection(_House);
      const house = houseRepository.create(data);
      return await houseRepository.save(house);
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const getComplexesByPage = async (page: number, limit: number) => {
    try {
      return await dbConnection(_Complex).findAndCount({
        skip:  ((page - 1) * limit),
        take: limit,
        order: { id: "ASC"},
      })
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  }

  export const getHousesByPage = async (page: number, limit: number): Promise<[_House[], number]> => {
    try {
      return await dbConnection(_House).findAndCount({
        skip:  ((page - 1) * limit),
        take: limit,
        order: { id: "ASC"},
      })
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const getHouseById = async (id: number): Promise<_House | null> => {
    try {
      const houseRepository = await dbConnection(_House);
      return await houseRepository.findOne({ where: { id }, relations: ["colmplex"] });
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const updateHouse = async (id: number, updates: Partial<_House>): Promise<_House | null> => {
    try {
      const houseRepository = await dbConnection(_House);
      const house = await houseRepository.findOne({ where: { id } });
      if (!house) return null;
      Object.assign(house, updates);
      return await houseRepository.save(house);
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const deleteHouse = async (id: number): Promise<boolean> => {
    try {
      const houseRepository = await dbConnection(_House);
      const result = await houseRepository.delete(id);
      return result.affected !== 0;
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const createComplex = async (data: Partial<_Complex>): Promise<_Complex> => {
    try {
      const complexRepository = await dbConnection(_Complex);
      const complex = complexRepository.create(data);
      return await complexRepository.save(complex);
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const getAllComplexes = async (): Promise<_Complex[]> => {
    try {
      const complexRepository = await dbConnection(_Complex);
      return await complexRepository.find({ relations: ["builder"] });
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const getComplexById = async (id: number): Promise<_Complex | null> => {
    try {
      const complexRepository = await dbConnection(_Complex);
      return await complexRepository.findOne({ where: { id }, relations: ["builder"] });
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const updateComplex = async (id: number, updates: Partial<_Complex>): Promise<_Complex | null> => {
    try {
      const complexRepository = await dbConnection(_Complex);
      const complex = await complexRepository.findOne({ where: { id } });
      if (!complex) return null;
      Object.assign(complex, updates);
      return await complexRepository.save(complex);
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const deleteComplex = async (id: number): Promise<boolean> => {
    try {
      const complexRepository = await dbConnection(_Complex);
      const result = await complexRepository.delete(id);
      return result.affected !== 0;
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };


  export const searchHouses = async (query: string) => {
    try {
      const houseRepository = await dbConnection(_House);
      const results = await houseRepository
        .createQueryBuilder('house')
        .where('house.search_vector @@ to_tsquery(:query)', {
          query: query.replace(/\s/g, ' & '),
        })
        .getMany();
    
      return results;
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const searchFlats = async (query: string) => {
    try {
      const houseRepository = await dbConnection(_Flat);
      const results = await houseRepository
        .createQueryBuilder('flat')
        .innerJoinAndSelect('house', 'house', 'house.id = flat.house_id')
        .where(`(flat.search_vector || house.search_vector) @@ plainto_tsquery('russian', :query)`, { query: query.replace(/\s/g, ' & ')})
        .getMany();
    
      return results;
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const searchComplex = async (query: string) => {
    try {
      const houseRepository = await dbConnection(_Complex);
      const results = await houseRepository
        .createQueryBuilder('complex')
        .where(`complex.search_vector @@ plainto_tsquery('russian', :query)`, { query: query.replace(/\s/g, ' & ')})
        .getMany();
      return results;
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };
}