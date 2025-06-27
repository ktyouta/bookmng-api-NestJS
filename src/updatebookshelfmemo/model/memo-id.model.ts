export class MemoIdModel {

    private readonly _memoId: number;

    constructor(strMemoId: string) {

        const memoId = Number.parseInt(strMemoId);

        if (isNaN(memoId)) {
            throw Error(`メモIDの形式が不正です。memoId:${strMemoId}`);
        }

        this._memoId = memoId;
    }

    get memoId() {
        return this._memoId;
    }
}