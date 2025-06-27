import { UpdateBookshelfMemoRequestDto } from "../dto/update-bookshelf-memo-request.dto";

export class MemoModel {

    private readonly _memo: string;

    constructor(memo: string) {

        this._memo = memo;
    }

    get memo() {
        return this._memo;
    }
}