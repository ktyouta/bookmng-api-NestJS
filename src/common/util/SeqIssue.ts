import { SeqKeyModel } from "src/internal/seqmaster/SeqKeyModel";
import { RepositoryType } from "../const/CommonConst";
import { InjectRepository } from "@nestjs/typeorm";
import { SeqMaster } from "src/entities/SeqMaster";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { TypeOrmRepository } from "../db/TypeOrmRepository";
import { TypeOrmTransaction } from "../db/TypeOrmTransaction";

@Injectable()
export class SeqIssue {

    private static readonly INCREMENT_SEQ = 1;
    private static readonly seqMasterRepository = TypeOrmRepository.get(SeqMaster);

    private constructor(
    ) { }

    /**
     * シーケンス番号を取得
     * @param keyModel 
     * @returns 
     */
    static async get(keyModel: SeqKeyModel): Promise<number> {

        // トランザクション開始
        const tx = new TypeOrmTransaction();

        try {
            // トランザクション開始
            await tx.start();

            const sequence = await this.seqMasterRepository.findOneBy({ key: keyModel.key });
            if (!sequence) {
                throw new Error(`キーに対するシーケンスを取得できませんでした。key:${keyModel.key}`);
            }

            const retId = sequence.nextId;
            const nextId = retId + SeqIssue.INCREMENT_SEQ;

            await this.seqMasterRepository.update({ key: keyModel.key }, { nextId });

            await tx.commit();

            return retId;
        } catch (e) {
            await tx.rollback();
            throw Error(`シーケンス番号の取得処理でエラーが発生しました。ERROR:${e}`);
        } finally {
            await tx.release();
        }
    }
}
