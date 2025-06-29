import { Injectable } from "@nestjs/common";
import { CreateBookshelfMemoRepository } from "../repository/create-bookshelf-memo.repository";
import { CreateBookshelfMemoRequestModel } from "../model/create-bookshelf-memo-request.model";
import { FrontUserIdModel } from "src/internal/common/FrontUserIdModel";
import { CreateBookshelfMemoSelectBookshelfEntity } from "../entity/create-bookshelf-memo-select-bookshelf.entity";
import { CreateBookshelfMemoCreateBookshelfMemoEntity } from "../entity/create-bookshelf-memo-create-bookshelf-memo.entity";
import { CreateBookshelfMemoSelectBookshelfMemoSeqEntity } from "../entity/create-bookshelf-memo-select-bookshelf-memo-seq.entity";
import { MemoSeqModel } from "../model/memo-seq.model";
import { BookIdModel } from "src/internal/bookshelftransaction/BookIdModel";

@Injectable()
export class CreateBookshelfMemoService {

    constructor(private readonly createBookshelfMemoRepository: CreateBookshelfMemoRepository) { }

    /**
     * 本棚情報を取得
     * @param userIdModel 
     * @param createBookshelfMemoRequestModel 
     */
    async getBookshelfList(userIdModel: FrontUserIdModel,
        bookIdModel: BookIdModel,
    ) {

        const createBookshelfMemoSelectBookshelfEntity = new CreateBookshelfMemoSelectBookshelfEntity(
            userIdModel,
            bookIdModel
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
        bookIdModel: BookIdModel,
    ) {

        const createBookshelfMemoSelectBookshelfMemoSeqEntity = new CreateBookshelfMemoSelectBookshelfMemoSeqEntity(
            frontUserIdModel,
            bookIdModel,
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
        bookIdModel: BookIdModel,
        createBookshelfMemoRequestModel: CreateBookshelfMemoRequestModel,
        memoSeqModel: MemoSeqModel
    ) {

        const createBookshelfMemoCreateBookshelfMemoEntity = new CreateBookshelfMemoCreateBookshelfMemoEntity(
            frontUserIdModel,
            bookIdModel,
            createBookshelfMemoRequestModel.memoModel,
            memoSeqModel,
        );

        // 本棚メモ情報を登録
        const bookshelfMemo = await this.createBookshelfMemoRepository.createBookshelfMemo(createBookshelfMemoCreateBookshelfMemoEntity);

        return bookshelfMemo;
    }
}