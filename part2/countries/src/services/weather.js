import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY
const baseURL = `http://api.weatherstack.com/current?access_key=${api_key}&query=`

const get = (city) => {
    const request = axios.get(`${baseURL}${city}`).then(response => {
        return response.data
    })
    return request
}

const weatherService = { get }

export default weatherService