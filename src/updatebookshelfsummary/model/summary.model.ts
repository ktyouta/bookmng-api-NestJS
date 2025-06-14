import { UpdateBookshelfSummaryRequestDto } from "../dto/update-bookshelf-summary-request.dto";

export class SummaryModel {

    private readonly _summary: string;

    constructor(requestDto: UpdateBookshelfSummaryRequestDto) {

        this._summary = requestDto.summary;
    }

    get summary() {
        return this._summary;
    }
}