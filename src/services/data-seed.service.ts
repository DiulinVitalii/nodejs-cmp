import { DataSeedRepository } from '../data-access/data-seed.repository';

export class DataSeedService {
    static async createDataSeed(): Promise<void> {
        await DataSeedRepository.createDataSeed();
    }
}
