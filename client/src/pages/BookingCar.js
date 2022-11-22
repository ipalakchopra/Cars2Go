import {Col, Row, Divider, DatePicker} from 'antd'
import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { Link, useParams } from 'react-router-dom';
import { getAllCars } from '../redux/actions/carsActions';
import Spinner from '../components/Spinner';
import moment from 'moment'
const{RangePicker}= DatePicker;
function BookingCar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const {cars} = useSelector(state=>state.carsReducer)
  const {loading} = useSelector(state=>state.alertsReducer)
  const[car, setcar]=useState({})
  const dispatch = useDispatch()
  const[from, setFrom]=useState()
  const[to, setTo]=useState()
  const[totalHours , setTotalHours]=useState(0)
  
  useEffect(() =>{
      if(cars.length>0)
      {dispatch(getAllCars())
        setcar(cars.find(o=>o._id=carid))
      }
  } ,[])

  function selectTimeSlots(values){
    setFrom(moment(values[0]).format('MM DD yyyy HH:mm'))
    setTo(moment(values[1]).format('MM DD yyyy HH:mm'))

    setTotalHours(values[1].diff(values[0], 'hours'))
  }

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

            <Divider type='horizontal' dashed>Select Time Slots</Divider>
            <RangePicker showTime={{format: 'HH:mm'}} format='MM DD YYYY HH:mm' onChange={selectTimeSlots}/>

            <div>
            {totalHours}
            </div>
          </Col>

        </Row>
    </DefaultLayout>
  )
}



export default BookingCar