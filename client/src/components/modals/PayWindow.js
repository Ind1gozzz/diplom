import { observer } from "mobx-react-lite"
import React, { useState } from "react"
import { Form, Button, Row } from "react-bootstrap"
import Modal from "react-bootstrap/Modal"

const PayWindow = observer(({show, onHide}) => {
    const [cardNumber, setCardNumber] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const [cVVCode, setCVVCode] = useState('')

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Enter your card data    
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Control
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.cardNumber)}
                    placeholder={"0000-0000-0000-0000"}
                    pattern={"[a-zA-Z]"}
                    // style={{marginLeft:"5px", marginRight:"5px"}}
                />
                <Form.Label>
                    <h6>Card number</h6>  
                </Form.Label>
                <Row>
                    <div style={{marginRight:"auto", width:"50%"}}>
                        <Form.Control
                            className="mt-3"
                            value={expiryDate}
                            onChange={e => setExpiryDate(e.target.expiryDate)}
                            placeholder={"MM/YY"}
                        />
                        <Form.Label
                        >
                        <h6>Expiry date</h6>
                        </Form.Label>
                    </div>
                    <div style={{marginLeft:"auto", width:"50%"}}>
                        <Form.Control
                            className="mt-3"
                            value={cVVCode}
                            onChange={e => setCVVCode(e.target.cVVCode)}
                            placeholder={"CVV-code"}
                        />
                        <Form.Label
                        >
                           <h6>Back of card. 3 digits</h6>
                        </Form.Label>
                    </div>
                </Row>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-danger" onClick={onHide}>Close</Button>
            <Button variant="outline-success" onClick={() => console.log("qwd")}>Complete payment</Button>
        </Modal.Footer>
        </Modal>
    )
})

export default PayWindow