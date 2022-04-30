import {$authHost, $host} from "./index"

export const addDeviceBasket = async (deviceId, userId) => {
    const {data} = await $authHost.post('api/basket', {basketId: userId, deviceId})
    return data
}

export const fetchUserBasket = async (basketId) => {
    const {data} = await $authHost.get('api/basket', {where: {basketId: basketId}})
    return data
}