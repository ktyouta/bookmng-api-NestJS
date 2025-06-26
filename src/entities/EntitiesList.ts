import { BookshelfMemoTransaction } from "./BookshelfMemoTransaction";
import { BookshelfTransaction } from "./BookshelfTransaction";
import { FrontUserInfoMaster } from "./FrontUserInfoMaster";
import { FrontUserLoginMaster } from "./FrontUserLoginMaster";
import { ReadStatusMaster } from "./ReadStatusMaster";
import { SeqMaster } from "./SeqMaster";
import { TestConnection } from "./TestConnection";

// テーブルリスト
export const ENTITIES_LIST = [
    // テスト接続用
    TestConnection,
    // シーケンスマスタ
    SeqMaster,
    // フロントユーザーログインマスタ
    FrontUserLoginMaster,
    // フロントユーザーマスタ
    FrontUserInfoMaster,
    // 本棚
    BookshelfTransaction,
    // 読書状況マスタ
    ReadStatusMaster,
    // 本棚メモ
    BookshelfMemoTransaction,
];