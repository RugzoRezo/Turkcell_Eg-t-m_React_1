import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { OrderList } from '../models/IOrder'
import { Bilgiler } from '../models/IUserLogin'
import { URLEnum } from '../RouterEnum'
import { listOrder } from '../service'
import { OrderEnum } from '../useRedux/OrderEnum'
import { IOrderAction } from '../useRedux/OrderReducer'
import { StateType } from '../useRedux/StoreRedux'

function NavBar( item: { userObj:Bilgiler } ) {

  const navigate = useNavigate()  
  const fncLogOut = () => {
    localStorage.removeItem('user')
    sessionStorage.removeItem('user')
    navigate(URLEnum.HOME)
  }

  const dispatch = useDispatch()
  const selector = useSelector( (state: StateType) => state.OrderReducer )

  useEffect(() => {
    listOrder().then( res => {
      const sendItem: IOrderAction = {
        type: OrderEnum.ADD_ORDER,
        payload: res.data.orderList[0]
      }
      dispatch(sendItem)
  } )
  }, [])
  

  return (
    <nav className="navbar navbar-expand-lg bg-light">
    <div className="container-fluid">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <NavLink className="nav-link" to={URLEnum.PRODUCT}>Product</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" to={URLEnum.NOTE}>Note</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" to={URLEnum.TODO}>Todo</NavLink>
            </li>
            <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
            </a>
            <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a onClick={fncLogOut} className="dropdown-item" role='button'>Logout</a></li>
            </ul>
            </li>
            <li className="nav-item">
            <a className="nav-link disabled"> { item.userObj.userName } { item.userObj.userSurname } - ( {selector.length} ) </a>
            </li>
        </ul>
        <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        </div>
    </div>
    </nav>
  )
}

export default NavBar