import { Col, Row, Divider, DatePicker, Checkbox, Modal } from 'antd'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { Link, useParams } from 'react-router-dom';
import { getAllCars } from '../redux/actions/carsActions';
import Spinner from '../components/Spinner';
import moment from 'moment'
import { bookCar } from '../redux/actions/bookingActions'
import StripeCheckout from 'react-stripe-checkout';
const { RangePicker } = DatePicker;


function BookingCar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const { cars } = useSelector(state => state.carsReducer)
  const { loading } = useSelector(state => state.alertsReducer)
  const [car, setcar] = useState({})
  const dispatch = useDispatch()
  const [from, setFrom] = useState()
  const [to, setTo] = useState()
  const [totalHours, setTotalHours] = useState(0)
  const [driver, setdriver] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCars());
    } else {
      setcar(cars.find((o) => o._id == params.carid));
    }
  }, [cars]);

  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour);
    if (driver) {
      setTotalAmount(totalHours * (car.rentPerHour + 50));
    }
  }, [driver, totalHours]);

  function selectTimeSlots(values) {
    setFrom(moment(values[0]).format('MM DD yyyy HH:mm'))
    setTo(moment(values[1]).format('MM DD yyyy HH:mm'))

    setTotalHours(values[1].diff(values[0], 'hours'))
  }

  function bookNow() {


  }

  function onToken(token) {
    const reqObj = {
      token,
      car: car._id,
      user: user[0]._id,

      bookedTimeSlots: {
        from,
        to
      },
      totalHours,
      totalAmount,
      driverRequired: driver,
    }
    dispatch(bookCar(reqObj))
  }

  const params = useParams();
  const { carid } = params;

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24} className='p-3'>
          <img src={car.image} className="carimg2 bs1 w-100" data-aos='flip-left' data-aos-duration='1500' />
        </Col>

        <Col lg={10} sm={24} xs={24} className="text-right">
          <Divider type="horizontal" dashed>
            Car Info {user[0]._id}
          </Divider>
          <div style={{ textAlign: "right" }}>
            <p>{car.name}</p>
            <p>{car.rentPerHour} Rent Per hour /-</p>
            <p>Fuel Type : {car.fuelType}</p>
            <p>Max Persons : {car.capacity}</p>
          </div>

          <Divider type="horizontal" dashed>
            Select Time Slots
          </Divider>

          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm"
            onChange={selectTimeSlots}
          />

          <br />
          <button
            className="btn1 mt-2"
            onClick={() => {
              setShowModal(true);
            }}
          >
            See Booked Slots
          </button>
          {from && to && (
            <div>
              <p>
                Total Hours : <b>{totalHours}</b>
              </p>
              <p>
                Rent Per Hour : <b>{car.rentPerHour}</b>
              </p>
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    setdriver(true);
                  } else {
                    setdriver(false);
                  }
                }}
              >
                Driver Required
              </Checkbox>

              <h3>Total Amount : {totalAmount}</h3>
              <StripeCheckout
                shippingAddress
                token={onToken}
                currency='inr'
                amount={totalAmount * 100}
                stripeKey="pk_test_51M2qdGSEaaXqSwAjtOOevy7h1J6HcsbSdcNica8MyjcSEP2jrlxFnUmbiUT4Poc14RlwSJXbRZEAa9ZpV2b4Ee5C00LU5RIvco"
              >
                <button className="btn1" >
                  Book Now
                </button>
              </StripeCheckout>



            </div>
          )}
        </Col>


      </Row>
      <Modal visible={showModal} closable={false} footer={false} title='Booked time slots'>
        {car && (<div className='p-2'>

          {car.bookedTimeSlots?.map(slot => {
            return <button className='btn1 mt-2'>{slot.from} - {slot.to}</button>
          })}

          <div className='text-right mt-5'>

            <button className='btn1' onClick={() => { setShowModal(false) }}>CLOSE</button>
          </div>

        </div>)}

      </Modal>
    </DefaultLayout>
  );
}



export default BookingCar