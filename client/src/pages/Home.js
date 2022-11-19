import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import DefaultLayout from '../components/DefaultLayout';
import { getAllCars } from '../redux/actions/carsActions';
import { Button, Row, Col} from 'antd';
import Spinner from '../components/Spinner';


function Home() {
  const user = JSON.parse(localStorage.getItem('user'));

  const {cars} = useSelector(state=>state.carsReducer)
  const {loading} = useSelector(state=>state.alertsReducer)
  const dispatch = useDispatch()
  
  useEffect(() =>{
      dispatch(getAllCars())
  } ,[dispatch])

  return (
    <DefaultLayout>
        {loading == true && (<Spinner/>)}
        <h1>{user.username}</h1>
        <Row justify='center' gutter={16} className='mt-5'>
          {cars.map(car=>{
            return <Col lg={5} sm={24} xs={24}>
              <div className="car p-2 bs1">
                <img src={car.image} className="carimg" alt="car"/>
                <div className="car-content d-flex align-items-center justify-content-between">

                  <div>
                    <p>{car.name}</p>
                    <p>{car.rentPerHour} Rent Per Hour /-</p>
                  </div>

                  <div>
                    <button className="btn1 mr-2">Book Now</button>
                  </div>

                </div>
              </div>
            </Col>
          })}
        </Row>
        
    </DefaultLayout>
  );
}

export default Home