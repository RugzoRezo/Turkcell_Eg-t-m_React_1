import { useState } from "react";
import { IOrder, OrderList } from "../models/IOrder";
import { listOrder } from "../service";
import { OrderEnum } from "./OrderEnum";

export interface IOrderAction {
    type: OrderEnum,
    payload: OrderList[]
}


export const OrderReducer = ( state: OrderList[] = [],  action: IOrderAction  ) => {
    switch (action.type) {

        case OrderEnum.ADD_ORDER:
            return action.payload

        case OrderEnum.LIST_ORDER:
            return state;
    
        default:
            return state;
    }
}


const allPromise = () => {
    return new Promise<IOrder>( async ( resolve, reject ) => {
        const {data} = await listOrder();
        resolve(data)
    } )
}

const allOrder = async () => {
    const  dt = (await allPromise()).orderList[0]
    return dt
}

