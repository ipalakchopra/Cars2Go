import React, { Component }  from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, BrowserRouter, Routes, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import BookingCar from './pages/BookingCar'
import 'antd/dist/antd.min.css'
import UserBookings from './pages/UserBookings';
function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/> 
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/booking/:carid' element={<BookingCar/>} />
          <Route path='/userbookings' element={<UserBookings/>} />
        </Routes>
      </BrowserRouter>      
    </div>
  );
}

export default App;

export function ProtectedRoute(props){
  if(localStorage.getItem('user')){
    return <Route {...props}/>
  }
  else{
    return <Navigate to='/login'/>
  }
}