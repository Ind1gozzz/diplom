import { makeAutoObservable } from "mobx";

export default class ReportStore {
    constructor() {
        this._brands = []
        this._types = []
        this._users = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._selectedUser = {}
        makeAutoObservable(this)
    }

    setUsers(users) {
        this._users = users
    }
    setBrands(brands) {
        this._brands = brands
    }
    setTypes(types) {
        this._types = types
    }
    setSelectedType(type) {
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this._selectedBrand = brand
    }
    setSelectedUser(user) {
        this._selectedUser = user
    }

    get users() {
        return this._users
    }
    get brands() {
        return this._brands
    }
    get types() {
        return this._types
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get selectedUser() {
        return this._selectedUser
    }
}   