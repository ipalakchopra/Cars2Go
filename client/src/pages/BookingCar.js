import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';


function BookingCar() {
  const params = useParams();
  const {carid} = params;  
  return (
    <DefaultLayout>
        <h1>Booking Car</h1>
        <h1>Car Id = {carid}</h1>
    </DefaultLayout>
  )
}



export default BookingCar