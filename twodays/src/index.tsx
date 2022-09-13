import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import component - Page
import Login from './Login';
import Dashboard from './Dashboard';
import ErrorPage from './ErrorPage';
import Profile from './Profile';
import Settings from './Settings';

const routes =
<BrowserRouter>
  <Routes>
    <Route path='/' element={<Login/>} />
    <Route path='/dashboard' element={<Dashboard />} />
    <Route path='/profile' element={<Profile />} />
    <Route path='/settings' element={<Settings />} />
    <Route path='*' element={<ErrorPage />} />
  </Routes>
</BrowserRouter>

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render( routes );