import { IsString, IsEmail, MinLength, IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateBookshelfMemoRequestDto {

    @IsString()
    memo: string;
}