import { IsString, IsEmail, MinLength, IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateBookshelfMemoRequestDto {

    @IsString()
    bookId: string;

    @IsString()
    memo: string;
}