import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { TestConnection } from 'src/entities/TestConnection';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class TestService {

    constructor(
        @InjectRepository(TestConnection)
        private readonly testConnectionRepository: Repository<TestConnection>,
        private readonly entityManager: EntityManager,
    ) { }

    /**
     * test_connectionからレコードを取得(orm)
     */
    async getAllTestConnections(): Promise<TestConnection[]> {

        const testConnection = await this.testConnectionRepository.find();

        return testConnection;
    }

    /**
     * test_connectionからレコードを取得(sql)
     * @returns 
     */
    async getByQuery(): Promise<TestConnection[]> {

        const result = await this.entityManager.query(
            `SELECT * FROM bookmng.test_connection`
        );

        return plainToInstance(TestConnection, result as TestConnection[]);
    }
}
