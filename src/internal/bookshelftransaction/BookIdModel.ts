export class BookIdModel {

    private readonly _bookId: string;

    constructor(bookId: string) {

        if (!bookId) {
            throw Error(`書籍IDが設定されていません。`);
        }

        this._bookId = bookId;
    }

    get bookId() {
        return this._bookId;
    }
}