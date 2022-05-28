import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Container, Dropdown, Form, Button } from "react-bootstrap";
import { Context } from "../index";
import { fetchBrands, fetchTypes } from "../http/deviceAPI";
import { fetchUsers } from "../http/userAPI"
import { fetchDeviceReport } from "../http/reportAPI";

const Report = observer(() => {
    const {report} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => report.setTypes(data))
        fetchBrands().then(data => report.setBrands(data))
        fetchUsers().then(data => report.setUsers(data))
    }, [])

    const generateReport = () => {
        fetchDeviceReport(2, 1).then(data => console.log(data))
    }

    return (

        <Container>
            <Form>
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
                variant={"outline-dark"}
                onClick={() => generateReport()}
            >
                Show the report
            </Button>
        </Container>
    )
})

export default Report