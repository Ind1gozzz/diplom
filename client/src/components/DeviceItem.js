import React, {useContext, useEffect, useState} from "react";
import { Card, Col, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useHistory } from "react-router-dom";
import star from '../assets/Star.png';
import { DEVICE_ROUTE } from "../utils/const";
import { fetchOneBrand } from "../http/deviceAPI";
import { Context } from "../index";
import { fetchUserBasket, addDeviceBasket } from "../http/basketAPI";

const DeviceItem = ({device}) => {
    const [brand, setBrand] = useState({info: []})
    const [userBasket, setUserBasket] = useState({info: []})
    const history = useHistory()
    const {user} = useContext(Context)

    const addToBasket = () => {
            let data
            //const data = UserBasket(user.userId)
            // UserBasket(1).then(data => setUserBasket(data))
            // console.log(data);
            // console.log(user.userId);
            // console.log(UserBasket);

            // addDeviceBasket(device.id, user.userId).then(data => console.log(data))
           

            fetchUserBasket(user.userId).then(data => user.setUserBasket(data))
            user.setUserBasket(data)
            console.log(user.userBasket)
    }

    useEffect(() => {
        fetchOneBrand(device.brandId).then(data => setBrand(data))
    }, [])

    return (
        <Col md={3} className="mt-3">
            <Card style={{width: 180, cursor: 'pointer'}} border={"light"}  onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}>
                <Image width={200} height={200} src={process.env.REACT_APP_API_URL + device.img}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>{brand.name}</div>
                    <div className="d-flex align-items-center">
                        <div>{device.rating}</div>
                        <Image width={18} height={18} src={star}/>
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
            <Button
                variant="btn btn-outline-secondary"
                style={{width:"auto", marginTop:4}}
                onClick={() => addToBasket(user.id)}
            >
                Add to Basket
            </Button>
        </Col>

    );
};

export default DeviceItem;