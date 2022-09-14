import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import component
import Login from './Login'
import ErrorPage from './ErrorPage'
import Product from './Product'
import { URLEnum } from './RouterEnum'
import Security from './Security'


export const routes =
<BrowserRouter>
    <Routes>
        <Route path={URLEnum.HOME} element={<Login/>} />
        <Route path={URLEnum.PRODUCT} element={ <Security component={<Product />} />  } />
        <Route path='*' element={<ErrorPage/>} />
    </Routes>
</BrowserRouter>