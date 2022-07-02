import React, { useContext, useEffect, useState } from "react";
import { Container, Col, Image, Row, Button, Card, Form } from "react-bootstrap";
import BigStar from '../assets/BigStar.png'
import {useParams} from "react-router-dom"
import { fetchOneDevice, fetchOneBrand } from "../http/deviceAPI";
import { addDeviceBasket, deleteFromBasket, isDeviceInBasket } from "../http/basketAPI";
import { Context } from "../index";
import { createReview, fetchReviews } from "../http/reviewAPI";

const DevicePage = () => {
    const [brand, setBrand] = useState({info: []})
    const {user} = useContext(Context)
    const [device, setDevice] = useState({info: []})
    const {id} = useParams()
    const [isInBasket, setIsInBasket] = useState({info: []})
    const [username, setUsername] = useState('')
    const [reviewtext, setReviewtext] = useState('')
    const [reviews, setReviews] = useState('')
    let Reviews = [{id: 1, username: "David Indigo", reviewtext: "All Rigth", rate: 8}, {id: 2, username: "Mary Oil", reviewtext: "Good guitar!", rate: 9}]
    let revs = []

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])

    useEffect(() => {
        fetchOneBrand(device.brandId).then(data => setBrand(data))
    }, [])

    useEffect(() => {
        fetchReviews(device.id).then(data => {
            let tempReviews = []
            for (let i = 0; i < data.length; i++) {
                tempReviews[i] = data[i]
            }
            for (let i = 0; i < tempReviews.length; i++) {
                Reviews[i] = tempReviews[i]
            }
            for (let i = 0; i < data.length; i++) {
                revs[i] = data[i]
            }
            console.log("revs:", revs);
        })
    })

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
        isDeviceInBasket(device.id, user.userId).then(data => {
            if(data.length != 0 && user.isAuth) {
                setIsInBasket(data)
            }
            else {
                setIsInBasket(data)
            }
        })
    }, [])

    const sendReview = (username, reviewtext) => {
        createReview(username, reviewtext, user.userId, device.id).then(data => {
            setUsername('')
            setReviewtext('')
        })
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={150} heiight={350} src={process.env.REACT_APP_API_URL + device.img} />
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{brand.name}</h2>
                        <h3>{device.name}</h3>
                        <h3>Rating: 8.5</h3>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width:300, height:300, fintSize:32, border: '5px solid lightgray'}}
                    >
                        <h3>Price: {new Intl.NumberFormat("ru-RU").format(device.price)} Rub</h3>
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
                    </Card>
                </Col>
            </Row>
            <Row style={{width:"700px", border:"1px"}}>
                <h3>Specifications</h3>
                <h4>The Fender Squier Affinity 2021 Telecaster is a classic telecaster, the guitar with which the history of solid-body electric guitars began. It is based on a simple and ingenious formula that has given the world hundreds of famous songs and unique sound options – a one-piece body, a maple neck and two powerful single-type pickups.</h4>
                {/* {device.info.map((info, index)=>
                    <Row key={info.i} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                    )} */}
            </Row>
            <h3 className="mt-4">Reviews</h3>
            {user.isAuth ?
                <Form style={{width:"700px", marginRigth: "auto"}}>
                <Form.Group className="mb-3 mt-4" controlId="exampleForm.ControlInput1">
                    <Form.Label>Your name</Form.Label>
                    <Form.Control
                        value={username}
                        placeholder="Your name"
                        onChange={e => setUsername((e.target.value))}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Your review</Form.Label>
                    <Form.Control
                        as="textarea" rows={4}
                        type="text"
                        value={reviewtext}
                        placeholder="Enter your review"
                        onChange={e => setReviewtext(e.target.value)}
                    />
                    <Button variant="info" className="mt-3" style={{marginLeft:"550px"}} onClick={() => sendReview(username, reviewtext)}>Send review</Button>
                </Form.Group>
            </Form>
            :
            <div></div>
            }
            
            {Reviews.map(review => 
                <Card style={{width: "700px"}} className="mt-4 mb-4" key={review.id}>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                        <p>
                            {' '}
                            {review.reviewtext} {' '} <h5>Rate: {review.rate}</h5>
                        </p>
                        <footer className="blockquote-footer">
                            <cite title="Source Title">{review.username}</cite>
                        </footer>
                        </blockquote>
                    </Card.Body>
                </Card>
            )}             
            
                      
        </Container>
    );
};

export default DevicePage;