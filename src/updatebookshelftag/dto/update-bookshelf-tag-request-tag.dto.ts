import { Transform } from "class-transformer";
import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateBookshelfTagReqeustTagDto {

    @IsOptional()
    @IsString()
    tagId: string;

    @IsString()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    tagName: string;
}