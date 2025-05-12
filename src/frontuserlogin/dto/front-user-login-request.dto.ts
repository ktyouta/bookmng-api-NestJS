import { IsString, IsEmail, MinLength, IsNotEmpty, Length, Matches } from 'class-validator';

export class FrontUserLoginRequestDto {

    @IsNotEmpty({ message: 'ユーザー名は必須です。' })
    @Length(3, 30, { message: 'ユーザー名は3文字以上30文字以内で入力してください。' })
    userName: string;

    @IsNotEmpty({ message: 'パスワードは必須です。' })
    @Length(3, 30, { message: 'パスワードは3文字以上30文字以内で入力してください。' })
    password: string;
}