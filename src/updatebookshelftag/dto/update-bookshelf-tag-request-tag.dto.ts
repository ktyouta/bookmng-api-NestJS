import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateBookshelfTagReqeustTagDto {

    @IsOptional()
    @IsString()
    tagId: string;

    @IsString()
    tagName: string;
}