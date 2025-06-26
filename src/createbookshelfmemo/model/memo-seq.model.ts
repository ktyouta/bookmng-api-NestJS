export class MemoSeqModel {

    private readonly _memoSeq: number;

    constructor(memoSeq: number,) {

        if (memoSeq < 1) {
            throw Error(`本棚メモの登録用シーケンスが不正です。シーケンス番号:${memoSeq}`);
        }

        this._memoSeq = memoSeq;
    }

    get memoSeq() {
        return this._memoSeq;
    }
}