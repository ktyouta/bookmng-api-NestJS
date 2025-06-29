import { TypeOrmRepository } from "src/common/db/TypeOrmRepository";
import { FrontUserLoginMaster } from "src/entities/FrontUserLoginMaster";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { DeleteFlgModel } from "src/internal/common/DeleteFlgModel";
import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { CreateBookshelfMemoSelectBookshelfEntity } from "../entity/create-bookshelf-memo-select-bookshelf.entity";
import { CreateBookshelfMemoCreateBookshelfMemoEntity } from "../entity/create-bookshelf-memo-create-bookshelf-memo.entity";
import { BookshelfMemoTransaction } from "src/entities/BookshelfMemoTransaction";
import { CreateBookshelfMemoSelectBookshelfMemoSeqEntity } from "../entity/create-bookshelf-memo-select-bookshelf-memo-seq.entity";

@Injectable()
export class CreateBookshelfMemoRepository {


    constructor(
        @InjectRepository(BookshelfTransaction)
        private readonly bookshelfTransactionRepository: Repository<BookshelfTransaction>,
        @InjectRepository(BookshelfMemoTransaction)
        private readonly bookshelfMemoTransactionRepository: Repository<BookshelfMemoTransaction>,
        private readonly entityManager: EntityManager,
    ) { }

    /**
     * 本棚情報を取得
     * @param createBookshelfMemoSelectBookshelfEntity 
     * @returns 
     */
    async getBookshelfList(createBookshelfMemoSelectBookshelfEntity: CreateBookshelfMemoSelectBookshelfEntity) {

        const userId = createBookshelfMemoSelectBookshelfEntity.frontUserId;
        const bookId = createBookshelfMemoSelectBookshelfEntity.bookId;

        // 本棚情報を取得
        const bookshelfList = await this.bookshelfTransactionRepository.find({
            where: {
                userId,
                bookId
            },
        });

        return bookshelfList;
    }


    /**
     * 本棚メモ情報を登録
     * @param createBookshelfMemoCreateBookshelfMemoEntity 
     * @returns 
     */
    async createBookshelfMemo(createBookshelfMemoCreateBookshelfMemoEntity: CreateBookshelfMemoCreateBookshelfMemoEntity) {

        const userId = createBookshelfMemoCreateBookshelfMemoEntity.frontUserId;
        const bookId = createBookshelfMemoCreateBookshelfMemoEntity.bookId;
        const memo = createBookshelfMemoCreateBookshelfMemoEntity.memo;
        const memoSeq = createBookshelfMemoCreateBookshelfMemoEntity.memoSeq;

        // 本棚メモ情報作成
        const result = await this.bookshelfMemoTransactionRepository.insert({
            userId,
            bookId,
            seq: memoSeq,
            memo,
            createDate: new Date(),
            updateDate: new Date(),
            deleteFlg: DeleteFlgModel.OFF,
        });

        const bookshelfMemo = await this.bookshelfMemoTransactionRepository.findOneBy(
            {
                userId,
                bookId,
                seq: memoSeq
            }
        );

        return bookshelfMemo;
    }

    /**
     * 本棚メモシーケンスを取得
     * @param createBookshelfMemoCreateBookshelfMemoEntity 
     * @returns 
     */
    async getBookshelfMemoSeq(createBookshelfMemoSelectBookshelfMemoSeqEntity: CreateBookshelfMemoSelectBookshelfMemoSeqEntity) {

        const params: unknown[] = [
            createBookshelfMemoSelectBookshelfMemoSeqEntity.frontUserId,
            createBookshelfMemoSelectBookshelfMemoSeqEntity.bookId,
        ];

        let query = `
            SELECT 
                COALESCE(MAX(seq),0) + 1 as next_seq
            FROM 
                bookmng.bookshelf_memo_transaction  
            WHERE
                user_id = $1 AND
                book_id = $2
        `;

        // シーケンスを取得
        const result = await this.entityManager.query(
            query,
            params
        );

        const nextSeq: number = result[0].next_seq;

        return nextSeq;
    }
}