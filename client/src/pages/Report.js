import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Container, Dropdown, Form, Button, Table } from "react-bootstrap";
import { Context } from "../index";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceAPI";
import { fetchUsers } from "../http/userAPI"
import { fetchDeviceReport } from "../http/reportAPI";

const Report = observer(() => {
    const {report} = useContext(Context)
    const [reports, setReports] = useState('')

    useEffect(() => {
        fetchTypes().then(data => report.setTypes(data))
        fetchBrands().then(data => report.setBrands(data))
        fetchUsers().then(data => report.setUsers(data))
        fetchDevices().then(data => report.setDevices(data.rows))
    }, [])

    const generateReport = () => {
        fetchDeviceReport(report.selectedDevice.id, report.selectedUser.id).then(data => {
            setReports(data.rows)
        })
    }

    return (

        <Container>
            <Form>
                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>{report.selectedDevice.name || "Select the device"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {report.devices.map(device => 
                                <Dropdown.Item
                                    onClick={() => report.setSelectedDevice(device)}
                                    key={device.id}
                                >
                                    {device.brand} - {device.name}
                                </Dropdown.Item>)}
                        </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>{report.selectedType.name || "Select the type"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {report.types.map(type =>
                            <Dropdown.Item
                                onClick={() => report.setSelectedType(type)}
                                key={type.id}
                            >
                                {type.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>{report.selectedBrand.name || "Select the brand"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {report.brands.map(brand =>
                            <Dropdown.Item
                                onClick={() => report.setSelectedBrand(brand)}
                                key={brand.id}
                            >
                                {brand.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>{report.selectedUser.email || "Select the user"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {report.users.map(user =>
                            <Dropdown.Item
                                onClick={() => report.setSelectedUser(user)}
                                key={user.id}
                            >
                                {user.email}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </Form>
            <Button
                className="mb-3"
                variant={"outline-dark"}
                onClick={() => generateReport()}
            >
                Show the report
            </Button>
            <Button
                className="mb-3"
                variant={"outline-dark"}
                onClick={() => setReports([])}
            >
                Clear filtres
            </Button>
            {console.log(reports)}
            {!reports.length == 0 ?
             <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>
                        User name
                    </th>
                    <th>
                        Device
                    </th>
                    <th>
                        Device price
                    </th>
                    <th>
                        Date
                    </th>
                </tr>
                </thead>
                <tbody>
                    {reports.map(report => <tr>
                        <td>
                            {report.user.email}
                        </td>
                        <td>
                            {report.device.name}
                        </td>
                        <td>
                            {report.device.price}
                        </td>
                        <td>
                            {report.date}
                        </td>
                    </tr>)}
                    
                
                    
                </tbody>
                
            </Table>
            :
            <div></div>
            }            
        </Container>
    )
})

export default Report