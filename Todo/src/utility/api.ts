import axios from "axios";

export const Api = axios.create({
    baseURL: "http://localhost:4001"
})

//axios.post => APi.post("todos")