import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import DefaultLayout from '../components/DefaultLayout';
import { getAllCars } from '../redux/actions/carsActions';
import { Button, Row, Col} from 'antd';
function Home() {
  const {cars} = useSelector(state=>state.carsReducer)
  const {loading} = useSelector(state=>state.alertsReducer)
  const dispatch = useDispatch()

  useEffect(() =>{
      dispatch(getAllCars())
  } ,[])

  return (
    <DefaultLayout>

        {loading == true && (<Spinner/>)}

        <Row justify='center' gutter={16} className='mt-5'>
          {cars.map(car=>{
            return <col lg={5} sm={24} xs={24}>
              <div className="car p-2 bs1">
                <img src={car.image} className="carimg"/>
                <div className="car-content d-flex align-items-center justify-content-between">

                  <di>
                    <p>{car.name}</p>
                    <p>{car.rentPerHour} Rent Per Hour /-</p>
                  </di>

                  <div>
                    <button className="btn1 mr-2">Book Now</button>
                  </div>

                </div>
              </div>
            </col>
          })}
        </Row>
    </DefaultLayout>
  );
}

export default Home