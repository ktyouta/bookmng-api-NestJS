import { Transform } from 'class-transformer';
import { IsString, IsEmail, MinLength, IsNotEmpty, IsInt, IsOptional, Min } from 'class-validator';

export class GetBookListRequestDto {

    @IsNotEmpty({ message: `キーワードを入力してください。` })
    q: string

    @IsOptional()
    @Transform(({ value }) => {
        const parsed = parseInt(value);
        return isNaN(parsed) ? undefined : parsed;
    })
    @Min(0)
    startIndex?: number;

    @IsOptional()
    @Transform(({ value }) => {
        const parsed = parseInt(value);
        return isNaN(parsed) ? undefined : parsed;
    })
    @Min(0)
    maxResult?: number;
}