import { AppError } from '@utils/AppError'
import axios from 'axios'

const apiURL = process.env.EXPO_PUBLIC_API_URL

const api = axios.create({
  baseURL: apiURL
})

api.interceptors.response.use(response => response, (error) => {
  // verificando se a mensagem é tratada pelo servidor
  if(error.response && error.response.data){
    return Promise.reject(new AppError(error.response.data.message))
  } else {
    return Promise.reject(new AppError('Erro no servidor. Tente novamente mais tarde.'))
  }
})



export { api }