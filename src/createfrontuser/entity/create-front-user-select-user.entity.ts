import { FrontUserNameModel } from "src/internal/frontuserinfomaster/FrontUserNameModel";

export class CreateFrontUserSelectUserEntity {

    private readonly _frontUserNameModel: FrontUserNameModel;

    constructor(frontUserNameModel: FrontUserNameModel) {

        this._frontUserNameModel = frontUserNameModel;
    }

    get frontUserName() {
        return this._frontUserNameModel.frontUserName;
    }
}