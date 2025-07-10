export class TagIdModel {

    private readonly _tagId: string;

    constructor(strTagId: string) {

        if (!strTagId) {
            return;
        }

        const tagId = Number.parseInt(strTagId);

        if (isNaN(tagId)) {
            throw Error(`タグIDの形式が不正です。tagId:${strTagId}`);
        }

        this._tagId = strTagId;
    }

    get tagId() {
        return this._tagId;
    }
}