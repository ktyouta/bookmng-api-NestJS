import { BookshelfTransaction } from "src/entities/BookshelfTransaction";
import { GoogleBooksApiBookDetailModel } from "src/external/googlebooksapi/bookdetail/model/GoogleBooksApiBookDetailModel";
import { GoogleBooksDetailResponseType } from "src/external/googlebooksapi/bookdetail/type/GoogleBooksDetailResponseType";
import { GoogleBooksApiBookListModel } from "src/external/googlebooksapi/booklist/model/GoogleBooksApiBookListModel";
import { GoogleBooksAPIsModelType } from "src/external/googlebooksapi/booklist/type/GoogleBooksAPIsModelType";
import { IsOptional, isString, IsString, Matches } from "class-validator";
import { Transform } from "class-transformer";

export class UpdateBookshelfStatusRequestDto {

    @IsOptional()
    readStatus: string;

    @Transform(({ value }) => value === '' ? null : value)
    @IsOptional()
    @Matches(/^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/, {
        message: '読書開始日は日付形式(yyyyMMdd)である必要があります。',
    })
    startDate: string;

    @Transform(({ value }) => value === '' ? null : value)
    @IsOptional()
    @Matches(/^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/, {
        message: '読書終了日は日付形式(yyyyMMdd)である必要があります。',
    })
    endDate: string;

    favoriteLevel: number;

    @Transform(({ value }) => value === '' ? null : value)
    @IsOptional()
    @Matches(/^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/, {
        message: '購入日は日付形式(yyyyMMdd)である必要があります。',
    })
    purchaseDate: string;
}