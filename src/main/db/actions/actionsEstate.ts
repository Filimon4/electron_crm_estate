import { getPostgresErrorMessage } from "../../utils/pqErrors";
import { Flat as _Flat, Builder, Complex, Developer, Flat, House } from "../entities"
import { sendNotify } from "../../utils/app";

export namespace EstateNamespace {
  export const createFlat = async (data: Partial<Flat>): Promise<Flat> => {
    try {
      const flatRepository = await dbConnection(Flat);
      const flat = flatRepository.create(data);
      return await flatRepository.save(flat);
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const getAllFlats = async (): Promise<Flat[]> => {
    try {
      const flatRepository = await dbConnection(Flat);
      return await flatRepository.find({ relations: ["house"] });
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const getFlatById = async (id: number): Promise<Flat | null> => {
    try {
      const flatRepository = await dbConnection(Flat);
      return await flatRepository.findOne({ where: { id }, relations: ["house"] });
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const updateFlat = async (id: number, updates: Partial<Flat>): Promise<Flat | null> => {
    try {
      const flatRepository = await dbConnection(Flat);
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
      const flatRepository = await dbConnection(Flat);
      const result = await flatRepository.delete(id);
      return result.affected !== 0;
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const createHouse = async (data: Partial<House>): Promise<House> => {
    try {
      const houseRepository = await dbConnection(House);
      const house = houseRepository.create(data);
      return await houseRepository.save(house);
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const getAllHouses = async (): Promise<House[]> => {
    try {
      const houseRepository = await dbConnection(House);
      return await houseRepository.find({ relations: ["colmplex"] });
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const getHouseById = async (id: number): Promise<House | null> => {
    try {
      const houseRepository = await dbConnection(House);
      return await houseRepository.findOne({ where: { id }, relations: ["colmplex"] });
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const updateHouse = async (id: number, updates: Partial<House>): Promise<House | null> => {
    try {
      const houseRepository = await dbConnection(House);
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
      const houseRepository = await dbConnection(House);
      const result = await houseRepository.delete(id);
      return result.affected !== 0;
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const createComplex = async (data: Partial<Complex>): Promise<Complex> => {
    try {
      const complexRepository = await dbConnection(Complex);
      const complex = complexRepository.create(data);
      return await complexRepository.save(complex);
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const getAllComplexes = async (): Promise<Complex[]> => {
    try {
      const complexRepository = await dbConnection(Complex);
      return await complexRepository.find({ relations: ["builder"] });
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const getComplexById = async (id: number): Promise<Complex | null> => {
    try {
      const complexRepository = await dbConnection(Complex);
      return await complexRepository.findOne({ where: { id }, relations: ["builder"] });
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const updateComplex = async (id: number, updates: Partial<Complex>): Promise<Complex | null> => {
    try {
      const complexRepository = await dbConnection(Complex);
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
      const complexRepository = await dbConnection(Complex);
      const result = await complexRepository.delete(id);
      return result.affected !== 0;
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const createBuilder = async (data: Partial<Builder>): Promise<Builder> => {
    try {
      const builderRepository = await dbConnection(Builder);
      const builder = builderRepository.create(data);
      return await builderRepository.save(builder);
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const getAllBuilders = async (): Promise<Builder[]> => {
    try {
      const builderRepository = await dbConnection(Builder);
      return await builderRepository.find({ relations: ["developer"] });
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const getBuilderById = async (id: number): Promise<Builder | null> => {
    try {
      const builderRepository = await dbConnection(Builder);
      return await builderRepository.findOne({ where: { id }, relations: ["developer"] });
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const updateBuilder = async (id: number, updates: Partial<Builder>): Promise<Builder | null> => {
    try {
      const builderRepository = await dbConnection(Builder);
      const builder = await builderRepository.findOne({ where: { id } });
      if (!builder) return null;
      Object.assign(builder, updates);
      return await builderRepository.save(builder);
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const deleteBuilder = async (id: number): Promise<boolean> => {
    try {
      const builderRepository = await dbConnection(Builder);
      const result = await builderRepository.delete(id);
      return result.affected !== 0;
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const createDeveloper = async (data: Partial<Developer>): Promise<Developer> => {
    try {
      const developerRepository = await dbConnection(Developer);
      const developer = developerRepository.create(data);
      return await developerRepository.save(developer);
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const getAllDevelopers = async (): Promise<Developer[]> => {
    try {
      const developerRepository = await dbConnection(Developer);
      return await developerRepository.find();
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const getDeveloperById = async (id: number): Promise<Developer | null> => {
    try {
      const developerRepository = await dbConnection(Developer);
      return await developerRepository.findOne({ where: { id } });
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const updateDeveloper = async (id: number, updates: Partial<Developer>): Promise<Developer | null> => {
    try {
      const developerRepository = await dbConnection(Developer);
      const developer = await developerRepository.findOne({ where: { id } });
      if (!developer) return null;
      Object.assign(developer, updates);
      return await developerRepository.save(developer);
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const deleteDeveloper = async (id: number): Promise<boolean> => {
    try {
      const developerRepository = await dbConnection(Developer);
      const result = await developerRepository.delete(id);
      return result.affected !== 0;
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };
}