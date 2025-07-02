export class SortKeyModel {

    private readonly _sortKey?: string;

    constructor(sortKey?: string,) {
        this._sortKey = sortKey;
    }

    get sortKey() {
        return this._sortKey;
    }
}