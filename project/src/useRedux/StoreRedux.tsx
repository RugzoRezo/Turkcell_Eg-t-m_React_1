import { combineReducers, createStore } from "redux";
import { OrderReducer } from "./OrderReducer";

export const combine = combineReducers({
    OrderReducer
})
export type StateType = ReturnType<typeof combine>
export const store = createStore(combine)
