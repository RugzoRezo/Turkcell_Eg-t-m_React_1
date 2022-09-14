import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import component
import Login from './Login'
import ErrorPage from './ErrorPage'

export const routes =
<BrowserRouter>
    <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='*' element={<ErrorPage/>} />
    </Routes>
</BrowserRouter>