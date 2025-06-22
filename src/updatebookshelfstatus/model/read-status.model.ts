import { UpdateBookshelfStatusRequestDto } from "../dto/update-bookshelf-status-request.dto";

export class ReadStatusModel {

    private readonly _readStatus: string;

    constructor(readStatus: string) {

        this._readStatus = readStatus;
    }

    get readStatus() {
        return this._readStatus;
    }
}