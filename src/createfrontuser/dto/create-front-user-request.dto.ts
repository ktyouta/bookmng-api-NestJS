import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class CreateFrontUserRequestDto {

    @IsNotEmpty()
    // ユーザー名
    userName: string;

    @IsNotEmpty()
    // 生年月日
    birthday: string;

    @IsNotEmpty()
    // パスワード
    password: string;
}