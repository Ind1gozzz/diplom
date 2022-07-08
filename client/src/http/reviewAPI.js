import {$authHost, $host} from "./index"

export const createReview = async (username, reviewtext, userId, deviceId) => {
    const {data} = await $host.post('api/review/', {username, reviewtext, userId, deviceId})
    return data
}

export const fetchReviews = async (deviceId) => {
    const {data} = await $host.get('api/review/', {params: {deviceId}})
    return data
}