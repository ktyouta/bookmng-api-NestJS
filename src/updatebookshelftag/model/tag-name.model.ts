import { UpdateBookshelfTagRequestDto } from "../dto/update-bookshelf-tag-request.dto";

export class TagNameModel {

    private readonly _tagName: string;

    constructor(tagName: string) {

        this._tagName = tagName;
    }

    get tagName() {
        return this._tagName;
    }
}