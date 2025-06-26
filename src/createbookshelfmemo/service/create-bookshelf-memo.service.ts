import { Injectable } from "@nestjs/common";
import { CreateBookshelfMemoRepository } from "../repository/create-bookshelf-memo.repository";
import { CreateBookshelfMemoRequestModel } from "../model/create-bookshelf-memo-request.model";
import { FrontUserIdModel } from "src/internal/common/FrontUserIdModel";
import { CreateBookshelfMemoSelectBookshelfEntity } from "../entity/create-bookshelf-memo-select-bookshelf.entity";
import { CreateBookshelfMemoCreateBookshelfMemoEntity } from "../entity/create-bookshelf-memo-create-bookshelf-memo.entity";
import { CreateBookshelfMemoSelectBookshelfMemoSeqEntity } from "../entity/create-bookshelf-memo-select-bookshelf-memo-seq.entity";
import { MemoSeqModel } from "../model/memo-seq.model";

@Injectable()
export class CreateBookshelfMemoService {

    constructor(private readonly createBookshelfMemoRepository: CreateBookshelfMemoRepository) { }

    /**
     * 本棚情報を取得
     * @param userIdModel 
     * @param createBookshelfMemoRequestModel 
     */
    async getBookshelfList(userIdModel: FrontUserIdModel,
        createBookshelfMemoRequestModel: CreateBookshelfMemoRequestModel
    ) {

        const createBookshelfMemoSelectBookshelfEntity = new CreateBookshelfMemoSelectBookshelfEntity(
            userIdModel,
            createBookshelfMemoRequestModel.bookIdModel
        );

        const bookshelfList = await this.createBookshelfMemoRepository.getBookshelfList(createBookshelfMemoSelectBookshelfEntity);

        return bookshelfList;
    }

    /**
     * 本棚メモの登録用シーケンス番号を取得
     * @param frontUserIdModel 
     * @param createFrontUserRequestModel 
     * @returns 
     */
    async getNestMemoSeq(frontUserIdModel: FrontUserIdModel,
        createBookshelfMemoRequestModel: CreateBookshelfMemoRequestModel
    ) {

        const createBookshelfMemoSelectBookshelfMemoSeqEntity = new CreateBookshelfMemoSelectBookshelfMemoSeqEntity(
            frontUserIdModel,
            createBookshelfMemoRequestModel.bookIdModel,
        );

        // 本棚メモのシーケンスを取得
        const nextSeq = await this.createBookshelfMemoRepository.getBookshelfMemoSeq(createBookshelfMemoSelectBookshelfMemoSeqEntity);

        const memoSeqModel = new MemoSeqModel(nextSeq);

        return memoSeqModel;
    }

    /**
     * 本棚メモ情報を登録
     * @param frontUserIdModel 
     * @param createFrontUserRequestModel 
     * @returns 
     */
    async createBookshelfMemo(frontUserIdModel: FrontUserIdModel,
        createBookshelfMemoRequestModel: CreateBookshelfMemoRequestModel,
        memoSeqModel: MemoSeqModel
    ) {

        const createBookshelfMemoCreateBookshelfMemoEntity = new CreateBookshelfMemoCreateBookshelfMemoEntity(
            frontUserIdModel,
            createBookshelfMemoRequestModel.bookIdModel,
            createBookshelfMemoRequestModel.memoModel,
            memoSeqModel,
        );

        // 本棚メモのシーケンスを取得


        // 本棚メモ情報を登録
        const frontUserLoginInfo = await this.createBookshelfMemoRepository.createBookshelfMemo(createBookshelfMemoCreateBookshelfMemoEntity);

        return frontUserLoginInfo;
    }
}