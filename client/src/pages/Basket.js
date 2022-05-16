import React, {useContext, useEffect, useState} from "react";
import { observer } from 'mobx-react-lite';
import { fetchUserBasketDevices } from '../http/deviceAPI';
import { Context } from '../index';
import { getUserBasket, deleteAllFromBasket } from "../http/basketAPI";
import DeviceList from "../components/DeviceList";
import { Container, Row, Col, Button } from "react-bootstrap";
import PayWindow from "../components/modals/PayWindow";
import { getSummaryDevices } from '../http/basketAPI'



const Basket = observer(() => {
    const {device} = useContext(Context)
    const {user} = useContext(Context)
    const [userBasketDevice, setUserBasketDevice] = useState('')
    const [devices, setDevices] = useState('')
    const [PayWindowVisible, setPayWindowVisible] = useState(false)
    let basketArr = []

    useEffect(() => {
        getUserBasket(user.userId).then(data => setUserBasketDevice(data))
    }, [])

    for (let i = 0; i < userBasketDevice.length; i++) {
        basketArr[i] = userBasketDevice[i].deviceId
    }

    user.setUserBasket(basketArr)

    useEffect(() => {
        fetchUserBasketDevices(basketArr).then(data => device.setDevices(data))
    }, [basketArr])

    const getSummaryDev = (basketID) => {
        getSummaryDevices(basketID).then(data => console.log(data))
    }

    return (
        <Container className="mt-2">
            <Row>
                <Col md={2}>
                    {/* <TypeBar /> */}
                </Col>
                <Col md={10}>
                    {basketArr.length === 0 ?
                    <h2>Your basket is empty</h2>
                    :
                    <Col md={10}>
                    <h2>Your basket</h2>
                    <DeviceList />
                    <Button
                        variant={"outline-dark"}
                        className="mt-5"
                        onClick={() => setPayWindowVisible(true)}
                    >
                        Pay the basket
                    </Button>
                    <Button
                        variant={"outline-dark"}
                        className="mt-5"
                        onClick={() => getSummaryDev(user.userId)}
                    >
                        Button - 1
                    </Button>
            <PayWindow show={PayWindowVisible} onHide={() => setPayWindowVisible(false)} />
                    </Col>
                    }
                </Col>
            </Row>
            
        </Container>
        );
    })

export default Basket;