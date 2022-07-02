import React, { useContext } from "react";
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav"
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, SHOP_ROUTE, LOGIN_ROUTE, BASKET_ROUTE, REPORT_ROUTE } from "../utils/const";
import {Button} from 'react-bootstrap';
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory();

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" variant="dark" className="ml-auto">
            <NavLink
                style={{color: 'white', marginLeft:30, marginRight: "auto"}}
                to = {SHOP_ROUTE}
                // onClick={() => }
            >
               <h3>La Musica</h3>
            </NavLink>
            {/* <Button
                variant="btn btn-light"
                onClick={() => history.push(REPORT_ROUTE)}
                className="ml-4px" style={{paddingLeft: "10px", marginLeft:"auto", marginRight:"15px"}}
            >
                REPORT
            </Button> */}
            {user.isAuth ? 
            <Nav className="ml-auto" style={{color: 'white'}}>
                {/* <Button 
                    variant="info"
                    onClick={() =>history.push(ADMIN_ROUTE)}
                    style={{paddingRight: "10px", marginRight:"15px"}}
                >
                    Admin
                </Button> */}
                <Button
                    variant="danger"
                    onClick={() => logOut()}
                    className="ml-4px" style={{paddingLeft: "10px", marginLeft:"auto", marginRight:"15px"}}
                >
                    Log out
                </Button>
                <Button
                    variant="success"
                    onClick={() => history.push(BASKET_ROUTE)}
                    className="ml-4px" style={{paddingLeft: "10px", marginLeft:"auto", marginRight:"15px"}}
                >
                    Basket
                </Button>
            </Nav>
            :
            <Nav className="ml-auto" style={{color: 'white', marginLeft:'auto', marginRight:"30"}}>
                <Button
                    variant={"outline-light"}
                    onClick={() => {
                        history.push(LOGIN_ROUTE)
                        window.location.reload()
                    }}
                >
                    Sing in
                </Button>
            </Nav>

            }
        </Navbar>
    );
});

export default NavBar;