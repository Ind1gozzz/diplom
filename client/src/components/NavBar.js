import React, { useContext } from "react";
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav"
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, SHOP_ROUTE, LOGIN_ROUTE, BASKET_ROUTE} from "../utils/const";
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
                style={{color: 'white', marginLeft:30}}
                to = {SHOP_ROUTE}
            >
                Music Store
            </NavLink>
            {user.isAuth ? 
            <Nav className="ml-auto" style={{color: 'white'}}>
                <Button 
                    variant="info"
                    onClick={() =>history.push(ADMIN_ROUTE)}
                    style={{paddingRight: "10px", marginLeft:'auto'}}
                >
                    Admin
                </Button>
                <Button
                    variant="light"
                    onClick={() => logOut()}
                    className="ml-4px" style={{paddingLeft: "10px", marginRight:"auto"}}
                >
                    Log out
                </Button>
            </Nav>
            :
            <Nav className="ml-auto" style={{color: 'white', marginLeft:'auto', marginRight:30}}>
                <Button
                    variant={"outline-light"}
                    onClick={() => history.push(LOGIN_ROUTE)}
                >
                    Sing in
                </Button>
                <Button
                    variant="dark"
                    onClick={() => history.push(BASKET_ROUTE)}
                    className="ml-4px" style={{paddingLeft: "10px", marginRight:""}}
                >
                    Basket
                </Button>
            </Nav>
            
            }
        </Navbar>
    );
});

export default NavBar;