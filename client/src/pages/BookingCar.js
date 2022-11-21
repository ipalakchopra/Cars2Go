import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { Link, useParams } from 'react-router-dom';
function BookingCar({match}) {
  
  return (
    <DefaultLayout>
        <h1>Booking Car</h1>
        <h1>Car Id = {match.params.carid}</h1>
    </DefaultLayout>
  )
}

export default BookingCar