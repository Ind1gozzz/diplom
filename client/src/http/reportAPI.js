import {$authHost, $host} from "./index"

export const addDeviceReport = async (deviceId, userId) => {
    const {data} = await $host.post('api/report', {deviceId, userId})
    return data
}
// Выборка по дате создания
export const fetchDeviceReport = async (deviceId, userId) => {
    const {data} = await $host.get('api/report', {params: {deviceId, userId}})
    return data
}