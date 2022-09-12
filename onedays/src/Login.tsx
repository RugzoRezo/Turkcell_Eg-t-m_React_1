import React, { useState } from 'react'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const fncSend = (evt:React.FormEvent) => {
    evt.preventDefault() // formun gönderimini durdur!
    console.log('fncSend Call',email, password)
  }

  // variable
  // const, let, var
  const name = "Erkan Bilirim"
  let status = "4.Class"
  status = "3.Class"
  const age = 30

  const fncCall = () => {
    if (status === "3.Class") {
        let x = 'let variable'
        var y = 'var variable'
    }
    y = 'Boş y'
    console.log( y )
  }
  fncCall()


  // Array
  const cities = ['İstanbul', 'Ankara', 'İzmir', 'Samsun', 'Antalya']
  // Array Add item
  cities.push('Mersin')




  return (
    <>
        <h1>Site Title</h1>
        <form onSubmit={fncSend}>
            <input required type='email' onChange={(evt) => setEmail(evt.target.value) } placeholder='E-Mail' />
            <input required type='password' onChange={(evt) => setPassword(evt.target.value) } placeholder='Password' />
            <input type='submit' value='Send' />
        </form>
        <h3> {name} </h3>
        <h3> {status} </h3>
        <h3> { cities[0] } </h3>
        { cities.map( (item, index) =>
           <li key={index}> {item} </li> 
        )}
    </>
  )

}

export default Login
export const name = "Ali"