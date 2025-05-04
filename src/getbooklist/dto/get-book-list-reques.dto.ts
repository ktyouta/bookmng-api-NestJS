import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class GetBookListRequestDto {

    @IsNotEmpty()
    q: string
}