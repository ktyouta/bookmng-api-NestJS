import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { TypeOrmRepository } from 'src/common/db/TypeOrmRepository';
import { TestConnection } from 'src/entities/TestConnection';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class TestService {

    constructor(
        private readonly entityManager: EntityManager,
    ) { }

    /**
     * test_connectionからレコードを取得(orm)
     */
    async getAllTestConnections(): Promise<TestConnection[]> {

        const testConnectionRepository = TypeOrmRepository.get(TestConnection);

        const testConnection = await testConnectionRepository.find();

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
