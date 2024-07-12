import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080"
})

export class Products{
    
    produtos(){
        return axiosInstance.post('/create_product')
    }
}