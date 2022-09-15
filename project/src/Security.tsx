import React from 'react'
import { Navigate } from 'react-router-dom'
import NavBar from './components/NavBar'
import { URLEnum } from './RouterEnum'
import { control } from './util'

function Security( item: { component: JSX.Element } ) {

  const userObj = control()
  
  return (
    userObj === null
    ?
    <Navigate to={URLEnum.HOME} />
    :
    <><NavBar userObj={userObj} /> { item.component } </>
  )

}

export default Security