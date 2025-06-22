import { UpdateBookshelfStatusRequestDto } from "../dto/update-bookshelf-status-request.dto";

export class PurchaseDateModel {

    private readonly _purchaseDate: string;

    constructor(purchaseDate: string) {

        this._purchaseDate = purchaseDate;
    }

    get purchaseDate() {
        return this._purchaseDate;
    }
}