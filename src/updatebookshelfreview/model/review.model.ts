import { UpdateBookshelfReviewRequestDto } from "../dto/update-bookshelf-review-request.dto";

export class ReviewModel {

    private readonly _review: string;

    constructor(requestDto: UpdateBookshelfReviewRequestDto) {

        this._review = requestDto.review;
    }

    get review() {
        return this._review;
    }
}