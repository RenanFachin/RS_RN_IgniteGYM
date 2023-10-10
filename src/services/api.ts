import axios from 'axios'

const apiURL= process.env.EXPO_PUBLIC_API_URL

export const api = axios.create({
  baseURL: apiURL
})