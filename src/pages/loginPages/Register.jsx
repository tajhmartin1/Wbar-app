import {useState} from "react";
import supabase from "../../supabaseClient";
import {Link, useNavigate} from "react-router-dom";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import GoogleButton from "./GoogleButton";

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handlePasswordSubmit = async (event) => {
        event.preventDefault();
        setMessage("");

        const {data: user, error} = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            setMessage(error.message);
            return;
        }

        if (user.session) {
            setMessage("User account created!");
            navigate("/dashboard");
        }


        setEmail("");
        setPassword("");
    };

    return (
        <Container className={"mt-5"}>
            <Row className="mt-4">
                <Col xs={1} md={3}/>
                <Col xs={10} md={6}>
                    <Row>
                        <h1>Create an account</h1>
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
                                
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button className="w-100" color={"secondary"} onClick={handlePasswordSubmit}>
                                Register
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
                </Col>
                <Col xs={1} md={3}/>
            </Row>

        </Container>
    );
}

export default Register;