import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {

    const navigate = useNavigate()

    const [remember, setRemember] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const userLogin = (evt:React.FormEvent) => {
        evt.preventDefault()
        if ( email === 'ali@mail.com' && password === '12345' ) {
            navigate('/dashboard')
            //window.location.href= '/dashboard'
        }else {
            setError('Username or password fail!')
        }
    }

  return (
    <>
        <div className='row'>
            <div className='col-sm-4'></div>
            <div className='col-sm-4'>
                <h2>User Login</h2>

                { error !== '' && 
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error!</strong> { error }
                    <button onClick={() => setError('')} type="button" className="btn-close"></button>
                    </div>
                }

                <form onSubmit={userLogin}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input onChange={(evt) => setEmail(evt.target.value) }  required type="email" className="form-control" id="exampleInputEmail1" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input onChange={(evt) => setPassword(evt.target.value) } required type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3 form-check">
                    <input onClick={() => setRemember(!remember)} type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Remember</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <div className='col-sm-4'></div>
        </div>
    </>
  )
}

export default Login