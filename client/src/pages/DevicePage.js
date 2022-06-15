import React, { useEffect, useState } from "react";
import { Container, Col, Image, Row, Button, Card } from "react-bootstrap";
import BigStar from '../assets/BigStar.png'
import {useParams} from "react-router-dom"
import { fetchOneDevice } from "../http/deviceAPI";
import { addDeviceBasket,  } from "../http/basketAPI";

const DevicePage = () => {
    const [device, setDevice] = useState({info: []})
    const {id} = useParams()
    const [isInBasket, setIsInBasket] = useState({info: []})

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])

    const addToBasket = (basketId) => {
        addDeviceBasket(device.id, basketId).then(data => {
            setIsInBasket(1)
        })
    }

    return (
             
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} heiight={300} src={process.env.REACT_APP_API_URL + device.img} />
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{device.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{background: `url(${BigStar}) no-repeat center center`, width:240, height:240, backgroundSize: 'cover', fontSize:64}}
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width:300, height:300, fintSize:32, border: '5px solid lightgray'}}
                    >
                        <h3>Цена: {new Intl.NumberFormat("ru-RU").format(device.price)} руб.</h3>
                        <Button
                            variant={"outline-dark"}
                            onClick={() => addToBasket(device.id)}
                        >Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row>
                <h1>Характеристики</h1>
                {device.info.map((info, index)=>
                    <Row key={info.i} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                    )}
            </Row>
        </Container>
    );
};

export default DevicePage;