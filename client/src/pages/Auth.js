import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { Context } from "..";
import { login, registration } from "../http/userAPI";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/const";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation();
    const history = useHistory();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const click = async () => {
        try {
            let data;
        if (isLogin) {
            data = await login(email, password)
        } else {            
            data = await registration(email, password)
            console.log(data);
        }
        user.setUser(user)
        user.setIsAuth(true)
        history.push(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
       
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <div className="column">
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">
                    {isLogin ? "Authorization" : "Registration" }</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Button
                        className="mt-3"
                        variant={"outline-success"}
                        onClick={click}
                    >
                        {isLogin ? "Sign in" : "Sign up"}
                        
                    </Button>
                </Form>
            </Card>
            <Card style={{width: 600}} className="d-flex juctify-content-between mt-3 pl-3 pr-3">
                <Form className="d-flex flex-column">
                    {isLogin ?
                    <div className="d-flex juctify-content-between m-2 pl-3 pr-3">
                    
                        <h3 className="m-auto">Do not have an account? <NavLink to={REGISTRATION_ROUTE}>Sign up now</NavLink></h3>
                    </div>
                    :
                    <div className="d-flex juctify-content-between m-2 pl-3 pr-3">
                        <h3 className="m-auto">Already have an account? <NavLink to={LOGIN_ROUTE}>Sign in now</NavLink></h3>
                    </div>
                    }
                </Form>
            </Card></div>
        </Container>
    );
});

export default Auth;