import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080"
})

export class Products{
    
    produtos(){
        return axiosInstance.post('/create_product')
    }

    carrinho(){
        return axiosInstance.get('/get_cart')
    }
    
    updateproduto(){
        return axiosInstance.put('/edit_product')
    }

    deleteproduto(){
        return axiosInstance.delete('delete_product/:id')
    }


}