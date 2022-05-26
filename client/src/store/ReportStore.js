import { makeAutoObservable } from "mobx";

export default class ReportStore {
    constructor() {
        this._selectedType = {}
        this._selectedBrand = {}
        this._seelctedUser = {}
        makeAutoObservable(this)
    }

    setSelectedType(type) {
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this._selectedBrand = brand
    }
    setSelectedUser(user) {
        this._seelctedUser = user
    }

    get type() {
        return this._selectedType
    }
    get brand() {
        return this._selectedBrand
    }
    get user() {
        return this._seelctedUser
    }
}   