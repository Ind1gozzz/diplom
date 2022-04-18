import React, { useState } from "react";
import Modal from "react-bootstrap/Modal"
import {Form, Button} from "react-bootstrap";
import { createType } from "../../http/deviceAPI";

const CreateType = ({show, onHide}) => {

    const [value, setValue] = useState('')

    const addType = () => {
        createType({name: value}).then(data => {
            setValue('')
            onHide()
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Add new type
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Control
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder={"Type name"}
                />
                    
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-danger" onClick={onHide}>Close</Button>
            <Button variant="outline-success" onClick={addType}>Add type</Button>
        </Modal.Footer>
        </Modal>
    )
}

export default CreateType;