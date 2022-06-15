import React, { useContext, useEffect, useState } from "react";
import { Container, Col, Image, Row, Button, Card, Form } from "react-bootstrap";
import BigStar from '../assets/BigStar.png'
import {useParams} from "react-router-dom"
import { fetchOneDevice } from "../http/deviceAPI";
import { addDeviceBasket,  } from "../http/basketAPI";
import { Context } from "../index";
import { createReview, fetchReviews } from "../http/reviewAPI";

const DevicePage = () => {
    const {user} = useContext(Context)
    const [device, setDevice] = useState({info: []})
    const {id} = useParams()
    const [isInBasket, setIsInBasket] = useState({info: []})
    const [username, setUsername] = useState('')
    const [reviewtext, setReviewtext] = useState('')
    const [reviews, setReviews] = useState('')
    let Reviews = []

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])

    useEffect(() => {
        fetchReviews(device.id).then(data => {
            setReviews(data)
            console.log(Reviews);
            console.log(reviews);
        })
    })

    const addToBasket = (basketId) => {
        addDeviceBasket(device.id, basketId).then(data => {
            setIsInBasket(1)
        })
    }

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
                        <h3>Price: {new Intl.NumberFormat("ru-RU").format(device.price)} Rub</h3>
                        <Button
                            variant={"outline-dark"}
                            onClick={() => addToBasket(device.id)}
                        >Add to basket</Button>
                    </Card>
                </Col>
            </Row>
            <Row style={{width:"700px", border:"1px"}}>
                <h1>Характеристики</h1>
                {device.info.map((info, index)=>
                    <Row key={info.i} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                    )}
            </Row>
            {user.isAuth ?
                <Form style={{width:"700px", marginRigth: "auto"}}>
                <Form.Group className="mb-3 mt-5" controlId="exampleForm.ControlInput1">
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
            
            <div>
            {
                Reviews.map(review => 
                    <Card style={{width: "700px"}} className="mt-4 mb-4" key={review.id}>
                        <Card.Header></Card.Header>
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                            <p>
                                {' '}
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                                posuere erat a ante.{' '}
                            </p>
                            <footer className="blockquote-footer">
                                Someone famous in <cite title="Source Title">Source Title</cite>
                            </footer>
                            </blockquote>
                        </Card.Body>
                    </Card> 
                )
            }
            </div>
            <Card style={{width: "700px"}} className="mt-4 mb-4" >
                        <Card.Header>{reviews[0]}</Card.Header>
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                            <p>
                                {' '}
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                                posuere erat a ante.{' '}
                            </p>
                            <footer className="blockquote-footer">
                                Someone famous in <cite title="Source Title">Source Title</cite>
                            </footer>
                            </blockquote>
                        </Card.Body>
                    </Card> 
                
                {console.log(Reviews)}
           

            

        </Container>
    );
};

export default DevicePage;