import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Context } from "../index";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import TypeBar from "../components/TypeBar";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceAPI";
import Pages from "../components/Pages";

const Shop = observer( () => {
    const {device} = useContext(Context)
    
    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(null, null, 1, 6).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 10).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.selectedType.id, device.selectedBrand.id, device.page])

    return (
        <Container className="mt-2">
            <Row>
                <Col md={2}>
                    <TypeBar />
                </Col>
                <Col md={10}>
                    <BrandBar />
                    <DeviceList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;