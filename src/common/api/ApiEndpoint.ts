export const BOOKMNG_ENDPOINT_PATH = "/bookmng/v1"

export enum ApiEndopoint {
    TEST = "test",
    // 書籍
    BOOK = "book",
    // 書籍詳細
    BOOK_ID = "book/:id",
    // ユーザー
    FRONT_USER = "frontuser",
    // ログイン(フロント)
    FRONT_USER_LOGIN = "frontuserlogin",
    // 本棚情報
    BOOKSHELF = "bookshelf",
}