import { IsInt, IsString } from "class-validator";

export class UpdateBookshelfTagReqeustTagDto {

    @IsString()
    tagId: string;

    @IsString()
    tagName: string;
}