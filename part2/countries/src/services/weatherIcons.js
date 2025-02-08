import axios from "axios"
const baseUrl = 'https://gist.githubusercontent.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c/raw/76b0cb0ef0bfd8a2ec988aa54e30ecd1b483495d/descriptions.json'

const getAll = (lat,long) => {
    const request = axios.get(baseUrl)
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