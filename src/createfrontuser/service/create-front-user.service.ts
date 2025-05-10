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
import { FrontUserIdModel } from 'src/internal/common/FrontUserIdModel';
import { CreateFrontUserCreateLoginEntity } from '../entity/create-front-user-create-login.entity';
import { CreateFrontUserCreateUserMasterEntity } from '../entity/create-front-user-create-user-master.entity';

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


    /**
     * ユーザーログイン情報作成
     * @param frontUserIdModel 
     * @param createFrontUserRequestModel 
     */
    async createUseriLoginInfo(frontUserIdModel: FrontUserIdModel,
        createFrontUserRequestModel: CreateFrontUserRequestModel
    ) {

        const createFrontUserCreateLoginEntity = new CreateFrontUserCreateLoginEntity(
            frontUserIdModel,
            createFrontUserRequestModel.frontUserPasswordModel,
            createFrontUserRequestModel.saltValueModel,
            createFrontUserRequestModel.frontUserNameModel,
        );

        // フロントユーザーログイン情報作成
        const frontUserLoginInfo = await this.createFrontUserRepository.createUserLoginInfo(createFrontUserCreateLoginEntity);

        return frontUserLoginInfo;
    }


    /**
     * ユーザーマスタ情報作成
     * @param frontUserIdModel 
     * @param createFrontUserRequestModel 
     */
    async createUserMasterInfo(frontUserIdModel: FrontUserIdModel,
        createFrontUserRequestModel: CreateFrontUserRequestModel
    ) {

        const createFrontUserCreateUserMasterEntity = new CreateFrontUserCreateUserMasterEntity(
            frontUserIdModel,
            createFrontUserRequestModel.frontUserNameModel,
            createFrontUserRequestModel.frontUserBirthdayModel,
        );

        // フロントユーザー情報作成
        const frontUserLoginInfo = await this.createFrontUserRepository.createUserMasterInfo(createFrontUserCreateUserMasterEntity);

        return frontUserLoginInfo;
    }
}
