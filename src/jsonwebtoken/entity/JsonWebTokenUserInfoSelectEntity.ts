import { FrontUserIdModel } from "src/internal/common/FrontUserIdModel";
import { FrontUserPasswordModel } from "src/internal/frontuserloginmaster/FrontUserPasswordModel";


export class JsonWebTokenUserInfoSelectEntity {

    // ユーザーID
    private readonly _frontUserIdModel: FrontUserIdModel;
    // パスワード
    private readonly _frontUserPasswordModel: FrontUserPasswordModel;

    constructor(frontUserIdModel: FrontUserIdModel,
        frontUserPasswordModel: FrontUserPasswordModel
    ) {

        this._frontUserIdModel = frontUserIdModel;
        this._frontUserPasswordModel = frontUserPasswordModel;
    }

    public get frontUserId() {
        return this._frontUserIdModel.frontUserId;
    }

    public get frontUserPassword() {
        return this._frontUserPasswordModel.frontUserPassword;
    }

}