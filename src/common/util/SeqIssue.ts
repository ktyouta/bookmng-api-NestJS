import { SeqKeyModel } from "src/internal/seqmaster/SeqKeyModel";
import { RepositoryType } from "../const/CommonConst";
import { InjectRepository } from "@nestjs/typeorm";
import { SeqMaster } from "src/entities/SeqMaster";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { TypeOrmRepository } from "../db/TypeOrmRepository";

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

        const sequence = await this.seqMasterRepository.findOneBy({ key: keyModel.key });
        if (!sequence) {
            throw new Error(`キーに対するシーケンスを取得できませんでした。key:${keyModel.key}`);
        }

        const retId = sequence.nextId;
        const nextId = retId + SeqIssue.INCREMENT_SEQ;

        await this.seqMasterRepository.update({ key: keyModel.key }, { nextId });

        return retId;
    }
}
