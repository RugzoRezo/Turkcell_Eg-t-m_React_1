import axios from "axios";
import { IProduct } from "./models/IProduct";
import { IUserLogin } from "./models/IUserLogin";
const baseUrl = process.env.REACT_APP_BASE_URL

const config = axios.create({
    baseURL: baseUrl,
    timeout: 15000,
    params: { ref: 'd1becef32825e5c8b0fc1b096230400b' },
    //headers: { 'turkcell_id': '12312312312' }
})


// user login
export const userLoginService = ( email: string, password: string ) => {
    const sendParams = {
        userEmail: email,
        userPass: password,
        face: 'no'
    }
    return config.get<IUserLogin>('userLogin.php', { params: sendParams })
}

// product List
export const productList = () => {
   const sendParams = {
    start: 0
   } 
   return  config.get<IProduct>('product.php', { params: sendParams })
}
