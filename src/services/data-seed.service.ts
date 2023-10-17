import { DataSeedRepository } from '../data-access/data-seed.repository.ts';

export class DataSeedService {
    static async createDataSeed(): Promise<void> {
        await DataSeedRepository.createDataSeed();
    }
}
