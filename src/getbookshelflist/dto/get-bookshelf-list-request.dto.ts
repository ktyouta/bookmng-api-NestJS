import { Transform } from 'class-transformer';
import { IsString, IsEmail, MinLength, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class GetBookshelfListRequestDto {

    @IsOptional()
    readStatus?: string;

    @IsOptional()
    @Transform(({ value }) => {
        const parsed = parseInt(value);
        return isNaN(parsed) ? undefined : parsed;
    })
    favoriteLevel?: number;
}