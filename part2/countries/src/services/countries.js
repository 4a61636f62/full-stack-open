import axios from "axios";

const baseUrl = "https://restcountries.eu/rest/v2/all"

const getAll = () => {
    const request = axios.get(baseUrl).then((response) => {
        return response.data
    })
    return request
}

const countriesService = { getAll }

export default countriesService