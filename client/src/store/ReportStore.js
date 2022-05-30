import { makeAutoObservable } from "mobx";

export default class ReportStore {
    constructor() {
        this._brands = []
        this._types = []
        this._users = []
        this._devices = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._selectedUser = {}
        this._selectedDevice = {}
        this._reports = []
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
    setDevices(devices) {
        this._devices = devices
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
    setSelectedDevice(device) {
        this._selectedDevice = device
    }
    setReports(reports) {
        this._reports = reports
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
    get devices() {
        return this._devices
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
    get selectedDevice() {
        return this._selectedDevice
    }
    get reports() {
        return this._reports
    }
}   