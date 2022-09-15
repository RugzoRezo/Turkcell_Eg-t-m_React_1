import { Bilgiler } from "./models/IUserLogin";
import * as CryptoJS from 'crypto-js'

const secretKey = process.env.REACT_APP_SECRET_KEY

export const encrypt = ( plainText:string ) => {
    const ciphertext = CryptoJS.AES.encrypt(plainText, secretKey! ).toString()
    return ciphertext
}

export const decrypt = ( cipherText: string ) => {
    const bytes  = CryptoJS.AES.decrypt(cipherText, secretKey!)
    const plainText = bytes.toString(CryptoJS.enc.Utf8)
    return plainText
}

export const control = () => {

    const localBilgiler = localStorage.getItem('user')
    if ( localBilgiler ) {
        sessionStorage.setItem('user', localBilgiler)
    }

    const stBilgiler = sessionStorage.getItem('user')
    if ( stBilgiler ) {
        try {
            const bilgiler:Bilgiler = JSON.parse( decrypt(stBilgiler) )
            return bilgiler
        } catch (error) {
            sessionStorage.removeItem('user')
            return null
        }
    }else {
       return null; 
    }
}