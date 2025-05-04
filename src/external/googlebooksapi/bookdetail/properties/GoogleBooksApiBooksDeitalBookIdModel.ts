export class GoogleBooksApiBooksDeitalBookIdModel {

    // 書籍ID
    private readonly _id: string;

    constructor(bookId: string) {

        if (!bookId) {
            throw Error(`書籍IDが設定されていません。`);
        }

        this._id = bookId;
    }

    get id() {
        return this._id;
    }
}