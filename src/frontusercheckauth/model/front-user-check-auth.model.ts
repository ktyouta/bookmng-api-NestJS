import { JsonWebTokenUserModel } from "src/jsonwebtoken/model/JsonWebTokenUserModel";

export class FrontUserCheckAuthModel {

    private readonly userName: string;
    private readonly birthday: string;

    constructor(jsonWebTokenUserModel: JsonWebTokenUserModel) {

        const userInfo = jsonWebTokenUserModel.frontUserInfo;

        this.userName = userInfo.userName;
        this.birthday = userInfo.birthday;
    }
}