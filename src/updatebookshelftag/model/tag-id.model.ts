export class TagIdModel {

    private readonly _tagId: number;

    constructor(strTagId: string) {

        const tagId = Number.parseInt(strTagId);

        if (isNaN(tagId)) {
            throw Error(`タグIDの形式が不正です。tagId:${strTagId}`);
        }

        this._tagId = tagId;
    }

    get tagId() {
        return this._tagId;
    }
}