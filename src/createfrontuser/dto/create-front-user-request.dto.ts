import { IsString, IsEmail, MinLength, IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateFrontUserRequestDto {

    @IsNotEmpty({ message: 'ユーザー名は必須です。' })
    @Length(3, 30, { message: 'ユーザー名は3文字以上30文字以内で入力してください。' })
    userName: string;

    @IsNotEmpty({ message: 'パスワードは必須です。' })
    @Length(3, 30, { message: 'パスワードは3文字以上30文字以内で入力してください。' })
    password: string;

    @IsNotEmpty({ message: '生年月日は必須です。' })
    @Matches(/^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/, {
        message: '生年月日は日付形式(yyyyMMdd)である必要があります。',
    })
    birthday: string;
}