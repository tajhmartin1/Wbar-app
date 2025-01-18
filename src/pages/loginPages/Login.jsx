import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Container, Row, Col, Form, Button} from "react-bootstrap";
import "./Login.css"
import GoogleButton from "./GoogleButton";
import supabase from "../../helpers/supabase.js";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [session, setSession] = useState(null);

    useEffect(() => {
        const getSession = async () => {
            const {
                data: {session},
            } = await supabase.auth.getSession();
            setSession(session);
        };

        getSession();
    }, []);

    useEffect(() => {
        if (session) {
            navigate("/dashboard");
        }
    }, [session]);



    const handlePasswordSubmit = async (event) => {
        event.preventDefault();
        setMessage("");

        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            setMessage(error.message);
            setEmail("");
            setPassword("");
            return;
        }

        if (data) {
            navigate("/dashboard");
            return null;
        }
    };


    return (
        <Container className={"mt-5"}>
            <Row className="mt-4">
                <Col xs={1} md={3}/>
                <Col xs={10} md={6}>
                    <Row>
                        <h1>Log in to WBAR Radio</h1>
                    </Row>
                    <Row>
                        <Col>
                            {message && <span className={"text-danger p-1 d-flex justify-content-start gap-1"}><i
                                className={"bi-exclamation-circle"}/><span>{message}</span></span>}

                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label column="sm">Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email"/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label column={"sm"}>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password"/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Remember me"/>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button className="w-100" color={"secondary"} onClick={handlePasswordSubmit}>
                                Submit
                            </Button>
                        </Col>
                    </Row>
                    <Row className="my-2">
                        <Col>
                            <h5 className={"divider mt-4"}>
                                <span>OR</span>
                            </h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <GoogleButton/>
                        </Col>
                    </Row>
                    <Row className={"mt-4"}>
                        <Col className={"d-flex gap-2"}>
                            <span className={'text-white'}>Don't have an account?</span>
                            <Link to="/account/register">Register.</Link>
                        </Col>
                    </Row>
                </Col>
                <Col xs={1} md={3}/>
            </Row>

        </Container>

    );
}

export default Login;