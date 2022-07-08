import {makeAutoObservable} from 'mobx';

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._userId = {}
        this._userBasket = []
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    setUserId(userId) {
        this._userId = userId
    }
    setUserBasket(userBasket) {
        this._userBasket = userBasket
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
    get userId() {
        return this._userId
    }
    get userBasket() {
        return this._userBasket
    }
}