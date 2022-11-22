import {Col, Row, Divider} from 'antd'
import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { Link, useParams } from 'react-router-dom';
import { getAllCars } from '../redux/actions/carsActions';
import Spinner from '../components/Spinner';

function BookingCar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const {cars} = useSelector(state=>state.carsReducer)
  const {loading} = useSelector(state=>state.alertsReducer)
  const[car, setcar]=useState({})
  const dispatch = useDispatch()
  
  useEffect(() =>{
      if(cars.length>0)
      {dispatch(getAllCars())
        setcar(cars.find(o=>o._id=carid))
      }
  } ,[])


  const params = useParams();
  const {carid} = params;  
  return (
    <DefaultLayout>
        {loading && (<Spinner />)}
        <Row justify='center'className="d-flex align-items-center" style={{minHeight:'90vh'}}>
          <Col lg={10} sm={24} xs={24}>
            <img src={car.image} className="carimg2 bs1"/>
          </Col>

          <Col lg={10} sm={24} xs={24} className="text-right">
            <Divider type='horizontal' dashed>Car Info</Divider>
            <div>
              <p>{car.name}</p>
              <p>{car.rentPerHour} Rent Per Hour /-</p>
              <p>Fuel Type: {car.fuelType} </p>
              <p>Max Persons: {car.capacity}</p>
            </div>
          </Col>

        </Row>
    </DefaultLayout>
  )
}



export default BookingCar