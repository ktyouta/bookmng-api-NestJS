import { Injectable } from "@nestjs/common";
import { CreateBookshelfRepository } from "../repository/create-bookshelf.repository";
import { CreateBookshelfRequestModel } from "../model/create-bookshelf.model";
import { FrontUserIdModel } from "src/internal/common/FrontUserIdModel";
import { CreateBookshelfSelectBookshelfEntity } from "../entity/create-bookshelf-select-bookshelf.entity";
import { CreateBookshelfCreateBookshelfEntity } from "../entity/create-bookshelf-create-bookshelf.entity";

@Injectable()
export class CreateBookshelfService {

    constructor(private readonly createBookshelfRepository: CreateBookshelfRepository) { }

    /**
     * 本棚情報を取得
     * @param userIdModel 
     * @param createBookshelfRequestModel 
     */
    async getBookshelfList(userIdModel: FrontUserIdModel,
        createBookshelfRequestModel: CreateBookshelfRequestModel
    ) {

        const createBookshelfSelectBookshelfEntity = new CreateBookshelfSelectBookshelfEntity(
            userIdModel,
            createBookshelfRequestModel.bookIdModel
        );

        const bookshelfList = await this.createBookshelfRepository.getBookshelfList(createBookshelfSelectBookshelfEntity);

        return bookshelfList;
    }

    /**
     * 本棚情報を登録
     * @param frontUserIdModel 
     * @param createFrontUserRequestModel 
     * @returns 
     */
    async createBookshelf(frontUserIdModel: FrontUserIdModel,
        createBookshelfRequestModel: CreateBookshelfRequestModel
    ) {

        const createBookshelfCreateBookshelfEntity = new CreateBookshelfCreateBookshelfEntity(
            frontUserIdModel,
            createBookshelfRequestModel.bookIdModel,
        );

        // 本棚情報を登録
        const frontUserLoginInfo = await this.createBookshelfRepository.createBookshelf(createBookshelfCreateBookshelfEntity);

        return frontUserLoginInfo;
    }
}