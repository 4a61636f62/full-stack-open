import axios from "axios";
const baseURL = `http://localhost:3001/persons`

const getAll = () => {
    const request = axios.get(baseURL).then(response => {
        return response.data
    })
    return request
}

const add = (newObject) => {
    const request = axios.post(baseURL, newObject).then(response => {
        return response.data
    })
    return request
}

const update = (newObject, id) => {
    const request = axios.put(`${baseURL}/${id}`, newObject).then(response => {
        return response.data
    })
    return request
}

const _delete = (id) => {
    return axios.delete(`${baseURL}/${id}`)
}

const phonebookService = { getAll, add, update, _delete }

export default phonebookService