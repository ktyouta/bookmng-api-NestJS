// httpStatusCodes.ts

export enum HttpStatus {
    // --- Informational Responses (1xx) ---
    // 継続（クライアントがリクエストの一部を送信した後にサーバーが送る）
    HTTP_STATUS_CONTINUE = 100,
    // プロトコルの切り替え
    HTTP_STATUS_SWITCHING_PROTOCOLS = 101,

    // --- Successful Responses (2xx) ---
    // リクエスト成功
    HTTP_STATUS_OK = 200,
    // リソース作成成功
    HTTP_STATUS_CREATED = 201,
    // リクエスト受理（処理は非同期で進行中）
    HTTP_STATUS_ACCEPTED = 202,
    // コンテンツなし（リクエスト成功だが返すデータがない）
    HTTP_STATUS_NO_CONTENT = 204,

    // --- Redirection Messages (3xx) ---
    // 永久的リダイレクト
    HTTP_STATUS_MOVED_PERMANENTLY = 301,
    // 一時的リダイレクト
    HTTP_STATUS_FOUND = 302,
    // 他のリソースを参照
    HTTP_STATUS_SEE_OTHER = 303,
    // 内容未変更
    HTTP_STATUS_NOT_MODIFIED = 304,

    // --- Client Error Responses (4xx) ---
    // 不正なリクエスト
    HTTP_STATUS_BAD_REQUEST = 400,
    // 認証が必要
    HTTP_STATUS_UNAUTHORIZED = 401,
    // 権限がない
    HTTP_STATUS_FORBIDDEN = 403,
    // リソースが見つからない
    HTTP_STATUS_NOT_FOUND = 404,
    // 許可されていないメソッド
    HTTP_STATUS_METHOD_NOT_ALLOWED = 405,
    // 競合（リソース状態の矛盾）
    HTTP_STATUS_CONFLICT = 409,
    // 処理できないエンティティ（バリデーションエラー、業務的なルール違反など）
    HTTP_STATUS_UNPROCESSABLE_ENTITY = 422,

    // --- Server Error Responses (5xx) ---
    // サーバー内部エラー
    HTTP_STATUS_INTERNAL_SERVER_ERROR = 500,
    // 未実装（機能未対応）
    HTTP_STATUS_NOT_IMPLEMENTED = 501,
    // 不正なゲートウェイ応答
    HTTP_STATUS_BAD_GATEWAY = 502,
    // サービス利用不可
    HTTP_STATUS_SERVICE_UNAVAILABLE = 503,
    // ゲートウェイタイムアウト
    HTTP_STATUS_GATEWAY_TIMEOUT = 504,
}