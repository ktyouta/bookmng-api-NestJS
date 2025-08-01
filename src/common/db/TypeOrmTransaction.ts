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

        if (this.isActive()) {
            try {
                await this.queryRunner.commitTransaction();
            } catch (err) {
                console.error('コミット中にエラーが発生しました:', err);
            }
        }
    }

    // ロールバック
    async rollback() {

        if (this.isActive()) {
            try {
                await this.queryRunner.rollbackTransaction();
            } catch (err) {
                console.error('ロールバック中にエラーが発生しました:', err);
            }
        }
    }

    /**
     * リソース開放
     */
    async release() {

        if (this.isActive()) {
            try {
                await this.queryRunner.release();
            } catch (err) {
                console.error('リソース開放中にエラーが発生しました:', err);
            }
        }
    }

    /**
     * トランザクション開始判定
     * @returns 
     */
    isActive() {
        return this.queryRunner.isTransactionActive;
    }
}
