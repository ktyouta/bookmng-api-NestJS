import { AppDataSource } from 'src/datasource';
import { QueryRunner } from 'typeorm';


export class TypeOrmTransaction {
    private queryRunner: QueryRunner;

    constructor() {

        if (!AppDataSource) {
            throw Error(`AppDataSourceが存在しません。`);
        }

        this.queryRunner = AppDataSource.createQueryRunner();
    }

    // トランザクション開始
    async start() {
        await this.queryRunner.connect();
        await this.queryRunner.startTransaction();
    }

    // コミット
    async commit() {
        await this.queryRunner.commitTransaction();
    }

    // ロールバック
    async rollback() {
        await this.queryRunner.rollbackTransaction();
    }

    /**
     * リソース開放
     */
    async release() {
        await this.queryRunner.release();
    }
}
