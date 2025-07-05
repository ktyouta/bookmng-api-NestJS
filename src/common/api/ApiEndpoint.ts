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
    // ログアウト(フロント)
    FRONT_USER_LOGOUT = "frontuserlogout",
    // 認証
    FRONT_USER_CHECK_AUTH = "frontusercheckauth",
    // 本棚情報
    BOOKSHELF = "bookshelf",
    // 本棚情報詳細
    BOOKSHELF_ID = "bookshelf/:id",
    // 本棚要約
    BOOKSHELF_SUMMARY = "bookshelf/:bookId/summary",
    // 本棚レビュー
    BOOKSHELF_REVIEW = "bookshelf/:bookId/review",
    // 読書状況一覧
    READ_STATUS = "readstatus",
    // 本棚ステータス
    BOOKSHELF_STATUS = "bookshelf/:bookId/status",
    // 本棚メモ
    BOOKSHELF_MEMO = "bookshelf/:bookId/memo",
    // 本棚メモ
    BOOKSHELF_MEMO_ID = "bookshelf/:bookId/memo/:memoId",
    // 本棚ソートリスト
    BOOKSHELF_SORT_LIST = "bookshelfsortlist",
    // タグリスト
    TAG_LIST = "taglist",
    // 本棚タグ
    BOOKSHELF_TAG = "bookshelf/:bookId/tag",
}