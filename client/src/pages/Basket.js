import React, {useContext, useEffect, useState} from "react";
import { observer } from 'mobx-react-lite';
import { fetchUserBasketDevices } from '../http/deviceAPI';
import { Context } from '../index';
import { getUserBasket } from "../http/basketAPI";
import DeviceList from "../components/DeviceList";
import { Container, Row, Col } from "react-bootstrap";



const Basket = observer(() => {
  const {device} = useContext(Context)
  const {user} = useContext(Context)
  const [userBasketDevice, setUserBasketDevice] = useState('')
  const [devices, setDevices] = useState('')
  let basketArr = []

  getUserBasket(user.userId).then(data => setUserBasketDevice(data))
        
  for (let i = 0; i < userBasketDevice.length; i++) {
    basketArr[i] = userBasketDevice[i].deviceId
  }

  user.setUserBasket(basketArr)

  useEffect(() => {
        fetchUserBasketDevices(basketArr).then(data => device.setDevices(data))
  }, [basketArr])



  return (
    <Container className="mt-2">
        <Row>
            <Col md={2}>
                {/* <TypeBar /> */}
            </Col>
            <Col md={10}>
                <DeviceList />
            </Col>
        </Row>
    </Container>
);
})

export default Basket;