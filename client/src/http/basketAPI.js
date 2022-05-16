import {$authHost, $host} from "./index"

export const addDeviceBasket = async (deviceId, userId) => {
    const {data} = await $authHost.post('api/basket', {basketId: userId, deviceId})
    return data
}

export const getUserBasket = async (BasketID) => {
    const {data} = await $host.get('api/basket', {params:{BasketID}})
    return data
}

export const isDeviceInBasket = async (deviceID, basketID) => {
    const {data} = await $host.get('api/basket/device/isInBasket', {params: {deviceID,basketID}})
    return data
}

export const deleteFromBasket = async (deviceID, basketID) => {
    const {data} = await $host.post('api/basket/delete', {deviceID, basketID})
    return data
}

export const deleteAllFromBasket = async (basketId) => {
    const {data} = await $host.post('api/basket/delete/deleteAll', {basketId})
    return data
}

export const getSummaryDevices = async (basketId) => {
    const {data} = await $host.get('api/basket/getsummary', {params: {basketId}})
    return data
}