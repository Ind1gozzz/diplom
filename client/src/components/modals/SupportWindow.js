import { observer } from "mobx-react-lite"
import React, { useState } from "react"
import { Form, Button, Row } from "react-bootstrap"
import Modal from "react-bootstrap/Modal"

const SupportWindow = observer(({show, onHide}) => {
    const [number, setNumber] = useState('')
    const [name, setName] = useState('')
    const [text, setText] = useState('')

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Describe your problem   
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form.Control
            className="mt-2"
            value={number}
            onChange={e => setNumber(e.target.setNumber)}
            placeholder={"+X (XXX)-XX-XX"}
        />
        <Form.Label
        >
            <h6>Enter phone number</h6>
        </Form.Label>
        <Form.Control
            className="mt-2"
            value={name}
            onChange={e => setName(e.target.name)}
            placeholder={"Your name"}
        />
        <Form.Label
        >
            <h6>Enter your name</h6>
        </Form.Label>
        <Form.Control
            className="mt-2"
            style={{height:"100px"}}
            value={text}
            onChange={e => setText(e.target.text)}
            placeholder={"Text of your question"}
        />
        <Form.Label
        >
            <h6>Your question</h6>
        </Form.Label>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-danger" onClick={onHide}>Close</Button>
            <Button variant="outline-success">Send</Button>
           </Modal.Footer>
        </Modal>
    )
})

export default SupportWindow