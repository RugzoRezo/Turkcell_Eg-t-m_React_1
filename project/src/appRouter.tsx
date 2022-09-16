import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// import component
import Login from './Login'
import ErrorPage from './ErrorPage'
import Product from './Product'
import { URLEnum } from './RouterEnum'
import Security from './Security'
import Note from './Note'
import TodoPage from './Todo'


export const routes =
<BrowserRouter>
    <ToastContainer/>
    <Routes>
        <Route path={URLEnum.HOME} element={<Login/>} />
        <Route path={URLEnum.PRODUCT} element={ <Security component={<Product />} />} />
        <Route path={URLEnum.NOTE} element={ <Security component={<Note />} />} />
        <Route path={URLEnum.TODO} element={ <Security component={<TodoPage />} />} />
        <Route path='*' element={<ErrorPage/>} />
    </Routes>
</BrowserRouter>