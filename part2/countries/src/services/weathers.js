import axios from "axios"
const baseUrl = 'https://api.open-meteo.com/v1/forecast'

const getAll = (lat,long) => {
    const request = axios.get(`${baseUrl}?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&hourly=temperature_2m`)
    return request.then(response => response.data)
}

const create = temp => {
    const request = axios.post(baseUrl, temp)
    return request.then(response => response.data)
}

const deleteSome = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (temp,id) => {
    const request = axios.put(`${baseUrl}/${id}`, temp)
    return request.then(response => response.data)
}

export default {getAll, create, deleteSome, update}