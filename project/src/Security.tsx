import React from 'react'
import { Navigate } from 'react-router-dom'
import { URLEnum } from './RouterEnum'
import { control } from './util'

function Security( item: { component: JSX.Element } ) {

  const userObj = control()
  
  return (
    userObj === null
    ?
    <Navigate to={URLEnum.HOME} />
    :
    <><h1>{userObj.userName} { userObj.userSurname }</h1> { item.component } </>
  )

}

export default Security