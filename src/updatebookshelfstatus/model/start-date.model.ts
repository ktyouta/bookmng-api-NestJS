import { UpdateBookshelfStatusRequestDto } from "../dto/update-bookshelf-status-request.dto";

export class StartDateModel {

    private readonly _startDate: string;

    constructor(startDate: string) {

        this._startDate = startDate;
    }

    get startDate() {
        return this._startDate;
    }
}