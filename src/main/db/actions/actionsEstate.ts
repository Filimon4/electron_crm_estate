import { Flat as _Flat, Builder, Complex, Developer, Flat, House } from "../entities"

export namespace EstateNamespace {


  export const createFlat = async (data: Partial<Flat>): Promise<Flat> => {
    const flatRepository = await dbConnection(Flat);
    const flat = flatRepository.create(data);
    return await flatRepository.save(flat);
  };

  export const getAllFlats = async (): Promise<Flat[]> => {
    const flatRepository = await dbConnection(Flat);
    return await flatRepository.find({ relations: ["house"] });
  };

  export const getFlatById = async (id: number): Promise<Flat | null> => {
    const flatRepository = await dbConnection(Flat);
    return await flatRepository.findOne({ where: { id }, relations: ["house"] });
  };

  export const updateFlat = async (id: number, updates: Partial<Flat>): Promise<Flat | null> => {
    const flatRepository = await dbConnection(Flat);
    const flat = await flatRepository.findOne({ where: { id } });
    if (!flat) return null;
    Object.assign(flat, updates);
    return await flatRepository.save(flat);
  };

  export const deleteFlat = async (id: number): Promise<boolean> => {
    const flatRepository = await dbConnection(Flat);
    const result = await flatRepository.delete(id);
    return result.affected !== 0;
  };

  export const createHouse = async (data: Partial<House>): Promise<House> => {
    const houseRepository = await dbConnection(House);
    const house = houseRepository.create(data);
    return await houseRepository.save(house);
  };

  export const getAllHouses = async (): Promise<House[]> => {
    const houseRepository = await dbConnection(House);
    return await houseRepository.find({ relations: ["colmplex"] });
  };

  export const getHouseById = async (id: number): Promise<House | null> => {
    const houseRepository = await dbConnection(House);
    return await houseRepository.findOne({ where: { id }, relations: ["colmplex"] });
  };

  export const updateHouse = async (id: number, updates: Partial<House>): Promise<House | null> => {
    const houseRepository = await dbConnection(House);
    const house = await houseRepository.findOne({ where: { id } });
    if (!house) return null;
    Object.assign(house, updates);
    return await houseRepository.save(house);
  };

  export const deleteHouse = async (id: number): Promise<boolean> => {
    const houseRepository = await dbConnection(House);
    const result = await houseRepository.delete(id);
    return result.affected !== 0;
  };


  export const createComplex = async (data: Partial<Complex>): Promise<Complex> => {
    const complexRepository = await dbConnection(Complex);
    const complex = complexRepository.create(data);
    return await complexRepository.save(complex);
  };

  export const getAllComplexes = async (): Promise<Complex[]> => {
    const complexRepository = await dbConnection(Complex);
    return await complexRepository.find({ relations: ["builder"] });
  };

  export const getComplexById = async (id: number): Promise<Complex | null> => {
    const complexRepository = await dbConnection(Complex);
    return await complexRepository.findOne({ where: { id }, relations: ["builder"] });
  };

  export const updateComplex = async (id: number, updates: Partial<Complex>): Promise<Complex | null> => {
    const complexRepository = await dbConnection(Complex);
    const complex = await complexRepository.findOne({ where: { id } });
    if (!complex) return null;
    Object.assign(complex, updates);
    return await complexRepository.save(complex);
  };

  export const deleteComplex = async (id: number): Promise<boolean> => {
    const complexRepository = await dbConnection(Complex);
    const result = await complexRepository.delete(id);
    return result.affected !== 0;
  };

  export const createBuilder = async (data: Partial<Builder>): Promise<Builder> => {
    const builderRepository = await dbConnection(Builder);
    const builder = builderRepository.create(data);
    return await builderRepository.save(builder);
  };

  export const getAllBuilders = async (): Promise<Builder[]> => {
    const builderRepository = await dbConnection(Builder);
    return await builderRepository.find({ relations: ["developer"] });
  };

  export const getBuilderById = async (id: number): Promise<Builder | null> => {
    const builderRepository = await dbConnection(Builder);
    return await builderRepository.findOne({ where: { id }, relations: ["developer"] });
  };

  export const updateBuilder = async (id: number, updates: Partial<Builder>): Promise<Builder | null> => {
    const builderRepository = await dbConnection(Builder);
    const builder = await builderRepository.findOne({ where: { id } });
    if (!builder) return null;
    Object.assign(builder, updates);
    return await builderRepository.save(builder);
  };

  export const deleteBuilder = async (id: number): Promise<boolean> => {
    const builderRepository = await dbConnection(Builder);
    const result = await builderRepository.delete(id);
    return result.affected !== 0;
  };

  export const createDeveloper = async (data: Partial<Developer>): Promise<Developer> => {
    const developerRepository = await dbConnection(Developer);
    const developer = developerRepository.create(data);
    return await developerRepository.save(developer);
  };

  export const getAllDevelopers = async (): Promise<Developer[]> => {
    const developerRepository = await dbConnection(Developer);
    return await developerRepository.find();
  };

  export const getDeveloperById = async (id: number): Promise<Developer | null> => {
    const developerRepository = await dbConnection(Developer);
    return await developerRepository.findOne({ where: { id } });
  };

  export const updateDeveloper = async (id: number, updates: Partial<Developer>): Promise<Developer | null> => {
    const developerRepository = await dbConnection(Developer);
    const developer = await developerRepository.findOne({ where: { id } });
    if (!developer) return null;
    Object.assign(developer, updates);
    return await developerRepository.save(developer);
  };

  export const deleteDeveloper = async (id: number): Promise<boolean> => {
    const developerRepository = await dbConnection(Developer);
    const result = await developerRepository.delete(id);
    return result.affected !== 0;
  };

}
