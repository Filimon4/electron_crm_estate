import { getPostgresErrorMessage } from "../../utils/pqErrors";
import { Flat as _Flat, Complex as _Complex, House as _House } from "../entities"
import { sendNotify } from "../../utils/app";
import { TFilterComplexDTO, TFilterFlatDTO, TFilterHouseDTO, TFlatDTO } from "../../estates/estates.dto";
import { Between, Like } from "typeorm";

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
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const getFlatsByPage = async (page: number, limit: number, filters: TFilterFlatDTO): Promise<_Flat[]> => {
    try {
      if (!page || !limit) throw new Error('there is not values')
      const whereConditions: {[k in any]: any} = {}
      Object.entries(filters ?? {}).forEach(([k, v]) => {
        if (typeof v == 'number')
          whereConditions[k] = +v
        if (typeof v == 'object' && 'length' in v && v.length == 2)
          whereConditions[k] = Between(+v[0], +v[1])
      });
      console.log(JSON.stringify(filters, null, 2))
      return await dbConnection(_Flat).find({
        skip:  ((page - 1) * limit),
        take: limit,
        order: { id: "ASC"},
        where: {
          ...whereConditions
        }
      })
    } catch (error) {
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
      const house = houseRepository.create()
      house.complex_id = data.complex_id
      house.house_number = +data.house_number
      house.street = data.street
      return await houseRepository.save(house);
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const getComplexesByPage = async (page: number, limit: number, filters: TFilterComplexDTO) => {
    try {
      const whereConditions: {[k in any]: any} = {}
      Object.entries(filters ?? {}).forEach(([k, v]) => {
        whereConditions[k] = Like(`%${v}%`)
      });
      return await dbConnection(_Complex).find({
        skip:  ((page - 1) * limit),
        take: limit,
        order: { id: "ASC"},
        where: {
          ...whereConditions
        }
      })
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  }

  export const getHousesByPage = async (page: number, limit: number, filters: TFilterHouseDTO) => {
    try {
      const whereConditions: {[k in any]: any} = {}
      Object.entries(filters ?? {}).forEach(([k, v]) => {
        if (typeof v == 'string')
          whereConditions[k] = Like(`%${v}%`)
        if (typeof v == 'number')
          whereConditions[k] = v
      });
      console.log(JSON.stringify(whereConditions, null, 2))
      const houseData = await dbConnection(_House).find({
        skip:  ((page - 1) * limit),
        take: limit,
        order: { id: "ASC"},
        relations: {
          complex: true as unknown as never
        },
        where: {
          ...whereConditions
        }
      })
      console.log(JSON.stringify(houseData[0], null, 2))
      const houses = houseData.map(hous => ({
        id: hous.id,
        street: hous.street,
        house_number: hous.house_number,
        //@ts-ignore
        name: hous.complex.name,
        //@ts-ignore
        city: hous.complex.city,
        //@ts-ignore
        district: hous.complex.district
      }))
      return houses
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
        .select([
          'house.id as id',
          'house.street as street',
          'house.house_number as house_number',
          'complex.name as complex_name',
          'complex.city as complex_city',
          'complex.district as complex_district',
        ])
        .innerJoinAndSelect('complex', 'complex', 'complex.id = house.complex')
        .where('house.search_vector @@ to_tsquery(:query)', {
          query: query.replace(/\s/g, ' & '),
        })
        .getRawMany();
        
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
        .select([
          'flat.id AS id',
          'flat.house_id AS house_id',
          'flat.flat AS flat',
          'flat.room_amount AS room_amount',
          'flat.floor AS floor',
          'flat.size AS size',
          'flat.price AS price',
          'house.street AS street',
          'house.house_number AS house_number',
          'house.complex AS complex'
        ])
        .innerJoinAndSelect('house', 'house', 'house.id = flat.house_id')
        .leftJoinAndSelect('deal', 'd', 'd.flat = flat.id')
        .where("d.id is null and (flat.search_vector || house.search_vector) @@ plainto_tsquery('russian', :query)", { query: query.replace(/\s/g, ' & ')})
        .getRawMany();
      
      console.log('searchFlats: ', JSON.stringify(results, null, 2))
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