import axios from "axios";
const baseURL = `/api/persons`

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const add = (newObject) => {
    const request = axios.post(baseURL, newObject)
    return request
        .then(response => response.data)
        .catch(error => {
            throw new Error(error.response.data.error)
        })
}

const update = (update, id) => {
    const request = axios.put(`${baseURL}/${id}`, update)
    return request
        .then(response => response.data)
        .catch(error => {
            if (error.response.status === 404) {
                throw new Error('Not Found')
            } else {
                throw new Error(error.response.data.error)
            }
        })
}

const _delete = (id) => {
    return axios.delete(`${baseURL}/${id}`)
}

const phonebookService = { getAll, add, update, _delete }

export default phonebookService