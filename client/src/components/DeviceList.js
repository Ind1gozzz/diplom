import React, {useContext, useState} from "react";
import { Row } from "react-bootstrap";
import {observer} from 'mobx-react-lite';
import { Context } from "../index";
import DeviceItem from "./DeviceItem";
import Button from "react-bootstrap/Button";
import SupportWindow from "./modals/SupportWindow";

const DeviceList = observer(() => {
    const {device} = useContext(Context)
    const [supportWindowVisible, setSupportWindowVisible] = useState(false)

    return (
        <div>
          <Row className="d-flex">
            {device.devices.map(device => 
                <DeviceItem key={device.id} device={device} />
            )}
        <Button variant="warning"
            style={{ marginLeft:"auto", marginTop:"auto", width:"100px"}}
            onClick={() => setSupportWindowVisible(true)}>Support</Button>
        </Row>
            <SupportWindow show={supportWindowVisible} onHide={() => setSupportWindowVisible(false)}></SupportWindow>
        </div>
    );
});

export default DeviceList;