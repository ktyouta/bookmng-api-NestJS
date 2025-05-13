import { IsString, IsEmail, MinLength, IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateBookshelfRequestDto {

    bookId: string;
}