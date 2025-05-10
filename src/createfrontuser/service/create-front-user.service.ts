import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { TestConnection } from 'src/entities/TestConnection';
import { GoogleBooksApiBookListModel } from 'src/external/googlebooksapi/booklist/model/GoogleBooksApiBookListModel';
import { GoogleBooksApiBooksListEndPointModel } from 'src/external/googlebooksapi/booklist/model/GoogleBooksApiBooksListEndPointModel';
import { GoogleBooksApiBookListKeyword } from 'src/external/googlebooksapi/booklist/properties/GoogleBooksApiBookListKeyword';
import { EntityManager, Repository } from 'typeorm';
import { CreateFrontUserRequestModel } from '../model/create-front-user-request.model';
import { CreateFrontUserSelectUserEntity } from '../entity/create-front-user-select-user.entity';
import { CreateFrontUserRepository } from '../repository/create-front-user-repository';

@Injectable()
export class CreateFrontUserService {

    constructor(private readonly createFrontUserRepository: CreateFrontUserRepository,) { }

    /**
     * ユーザーの重複チェック
     * @param createFrontUserRequestModel 
     */
    async isExitstUser(createFrontUserRequestModel: CreateFrontUserRequestModel) {

        const frontUserNameModel = createFrontUserRequestModel.frontUserNameModel;

        const createFrontUserSelectUserEntity = new CreateFrontUserSelectUserEntity(frontUserNameModel);

        // フロントユーザー情報を取得
        const frontUserLoginList = await this.createFrontUserRepository.getFrontUser(createFrontUserSelectUserEntity);

        return frontUserLoginList && frontUserLoginList.length > 0;
    }
}
