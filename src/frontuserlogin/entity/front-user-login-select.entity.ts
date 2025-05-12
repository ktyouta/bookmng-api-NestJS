import { FrontUserIdModel } from "src/internal/common/FrontUserIdModel";
import { FrontUserNameModel } from "src/internal/frontuserinfomaster/FrontUserNameModel";
import { FrontUserPasswordModel } from "src/internal/frontuserloginmaster/FrontUserPasswordModel";
import { FrontUserSaltValueModel } from "src/internal/frontuserloginmaster/FrontUserSaltValueModel";

export class FrontUserLoginSelectEntity {

    // ユーザー名
    private readonly _frontUserNameModel: FrontUserNameModel;

    constructor(frontUserNameModel: FrontUserNameModel,) {

        this._frontUserNameModel = frontUserNameModel;
    }

    public get frontUserName() {
        return this._frontUserNameModel.frontUserName;
    }
}