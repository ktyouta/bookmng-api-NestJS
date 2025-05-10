import { AppDataSource } from 'src/datasource';
import { EntityTarget, ObjectLiteral, Repository } from 'typeorm';


export class TypeOrmRepository {

    /**
     * typeormのリポジトリを取得
     * @param entity 
     * @returns 
     */
    static get<T extends ObjectLiteral>(entity: EntityTarget<T>): Repository<T> {
        return AppDataSource.getRepository(entity);
    }
}