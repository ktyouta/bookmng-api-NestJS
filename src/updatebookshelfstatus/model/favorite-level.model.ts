import { UpdateBookshelfStatusRequestDto } from "../dto/update-bookshelf-status-request.dto";

export class FavoriteLevelModel {

    private readonly _favoriteLevel: number;

    constructor(favoriteLevel: number) {

        this._favoriteLevel = favoriteLevel;
    }

    get favoriteLevel() {
        return this._favoriteLevel;
    }
}