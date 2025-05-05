import { SeqKeyModel } from "src/internal/seqmaster/SeqKeyModel";
import { RepositoryType } from "../const/CommonConst";
import { InjectRepository } from "@nestjs/typeorm";
import { SeqMaster } from "src/entities/SeqMaster";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SeqIssue {

    private readonly INCREMENT_SEQ = 1;

    constructor(
        @InjectRepository(SeqMaster)
        private readonly seqMasterRepository: Repository<SeqMaster>,
    ) { }

    /**
     * シーケンス番号を取得
     * @param keyModel 
     * @returns 
     */
    async get(keyModel: SeqKeyModel): Promise<number> {

        const sequence = await this.seqMasterRepository.findOneBy({ key: keyModel.key });
        if (!sequence) {
            throw new Error(`キーに対するシーケンスを取得できませんでした。key:${keyModel.key}`);
        }

        const retId = sequence.nextId;
        const nextId = retId + this.INCREMENT_SEQ;

        await this.seqMasterRepository.update({ key: keyModel.key }, { nextId });

        return retId;
    }
}
