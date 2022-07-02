import React, {useContext, useEffect, useState} from "react";
import { Card, Col, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useHistory } from "react-router-dom";
import star from '../assets/Star.png';
import { DEVICE_ROUTE } from "../utils/const";
import { fetchOneBrand } from "../http/deviceAPI";
import { Context } from "../index";
import { addDeviceBasket, isDeviceInBasket, deleteFromBasket, getSummaryDevices } from "../http/basketAPI";
import { observer } from "mobx-react-lite";

const DeviceItem = observer(({device}) => {
    const [brand, setBrand] = useState({info: []})
    const history = useHistory()
    const {user} = useContext(Context)
    const [isInBasket, setIsInBasket] = useState({info: []})

    const addToBasket = (basketId) => {
        addDeviceBasket(device.id, basketId).then(data => {
            setIsInBasket(1)
        })
    }

    const deleteDeviceBasket = (basketId) => {
        deleteFromBasket(device.id, basketId).then(data => {
            setIsInBasket(0)
        })
    }

    useEffect(() => {
        fetchOneBrand(device.brandId).then(data => setBrand(data))
    }, [])

    useEffect(() => {
        isDeviceInBasket(device.id, user.userId).then(data => {
            if(data.length != 0 && user.isAuth) {
                setIsInBasket(data)
            }
            else {
                setIsInBasket(data)
            }
        })
    }, [])


    return (
        <Col md={3} className="mt-3 mb-5">
            <Card
                style={{width: 200, height: 500, cursor: 'pointer'}} border={"light"}
                onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}>
                <Image width={120} height={360} src={process.env.REACT_APP_API_URL + device.img}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>{brand.name}</div>
                    <div className="d-flex align-items-center">
                        <div>{device.rating}</div>
                        <Image width={18} height={18} src={star}/>
                    </div>
                </div>
                <div>{device.name}</div>
                <div style={{"marginTop": "auto"}}>{new Intl.NumberFormat("ru-RU").format(device.price)} Rub</div>
            </Card>
            {user.isAuth && isInBasket ? 
                <Button
                variant="btn btn-danger"
                style={{width:"auto", marginTop:4}}
                onClick={() => deleteDeviceBasket(user.userId)}
            >
                Delete from Basket
            </Button>
            :
            <Button
                variant="btn btn-outline-secondary"
                style={{width:"auto", marginTop:4}}
                onClick={() => addToBasket(user.userId)}
            >
                Add to Basket
            </Button>
            }
        </Col>

    );
});

export default DeviceItem;