export class TagSeqModel {

    private readonly _tagSeq: number;

    constructor(tagSeq: number) {

        if (tagSeq < 0) {
            throw Error(`タグマスタのシーケンス番号が不正です。tagSeq:${tagSeq}`);
        }

        this._tagSeq = tagSeq;
    }

    get tagSeq() {
        return this._tagSeq;
    }
}