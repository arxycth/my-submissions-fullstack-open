import axios from "axios";
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
//https://studies.cs.helsinki.fi/restcountries/api/all
//https://studies.cs.helsinki.fi/restcountries/api/name/

const getAll = () => {
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