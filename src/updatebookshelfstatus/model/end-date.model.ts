import { UpdateBookshelfStatusRequestDto } from "../dto/update-bookshelf-status-request.dto";

export class EndDateModel {

    private readonly _endDate: string;

    constructor(endDate: string) {

        this._endDate = endDate;
    }

    get endDate() {
        return this._endDate;
    }
}