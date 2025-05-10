import { FrontUserInfoMaster } from "./FrontUserInfoMaster";
import { FrontUserLoginMaster } from "./FrontUserLoginMaster";
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
];