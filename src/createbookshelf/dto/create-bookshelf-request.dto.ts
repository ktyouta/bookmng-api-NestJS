import { IsString, IsEmail, MinLength, IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateBookshelfRequestDto {

    @IsString()
    bookId: string;
}