import { Controller, Get, Req, Res } from '@nestjs/common';
import { TestService } from '../service/test.service';
import { ApiEndopoint, BOOKMNG_ENDPOINT_PATH } from 'src/common/api/ApiEndpoint';
import { DataSource } from 'typeorm';
import { TypeOrmTransaction } from 'src/common/db/TypeOrmTransaction';

@Controller(BOOKMNG_ENDPOINT_PATH)
export class TestController {

    constructor(private readonly testService: TestService,
    ) { }

    @Get(ApiEndopoint.TEST)
    async execute(@Req() req: Request) {

        const tx = new TypeOrmTransaction();

        try {
            console.log(`testConnection start`);

            // トランザクション開始
            await tx.start();

            // test_connectionからレコードを取得(orm)
            const testConnectionOrm = await this.testService.getAllTestConnections();

            console.log(`testConnection by orm`);
            testConnectionOrm.forEach((e) => {
                Object.keys(e).forEach((e1) => {
                    console.log(`${e1}:${e[e1]}`);
                });
            });

            // test_connectionからレコードを取得(sql)
            const testConnectionSql = await this.testService.getByQuery();

            console.log(`testConnection by sql`);
            testConnectionSql.forEach((e) => {
                Object.keys(e).forEach((e1) => {
                    console.log(`${e1}:${e[e1]}`);
                });
            });

            // コミット
            await tx.commit();

            return {
                statusCode: 200,
                timestamp: new Date(),
                path: req.url,
                message: 'test success',
            };

        } catch (e) {
            await tx.rollback();

            throw Error(`ERROR:${e}`);
        } finally {
            await tx.release();
        }
    }
}
