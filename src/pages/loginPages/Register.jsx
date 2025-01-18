import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import GoogleButton from "./GoogleButton";
import supabase from "../../helpers/supabase.js";

function Register() {
    const navigate = useNavigate();

    // message returned from supabase
    const [message, setMessage] = useState("");
    const [canSubmit, setCanSubmit] = useState(false);

    const [formData, setFormData] = useState({
        email: {value: "", allowValidation: false},
        password: {value: "", allowValidation: false},
        confirmPassword: {value: "", allowValidation: false},
    });
    const [formErrors, setFormErrors] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const checkPasswordsMatch = useCallback(() => {
        return formData.password.value === formData.confirmPassword.value
    }, [formData.confirmPassword.value, formData.password.value]);

    const validateEmail = useCallback(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(formData.email.value)
    }, [formData.email.value]);

    const validatePasswordLength = useCallback((field) => {
        return formData[field].value.length >= 8;
    }, [formData])

    const checkIfCanSubmit = useCallback(() => {
        return (validateEmail() &&
            validatePasswordLength("password") &&
            validatePasswordLength("confirmPassword") &&
            checkPasswordsMatch())
    }, [checkPasswordsMatch, validateEmail, validatePasswordLength]);

    const noErrorMsg = "Looks good!";

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        console.log(name, value);
        setFormData({...formData, [name]: {value: value, allowValidation: true}});
    }

    useEffect(() => {
        if (formData.email.allowValidation) {
            const isValidEmail = validateEmail();
            setFormErrors((prevFeedback) => ({
                ...prevFeedback,
                email: !isValidEmail && "Please enter a valid email address",
            }));
        }
    }, [formData.email.value, formData.email.allowValidation, validateEmail]);
    useEffect(() => {
        if (formData.password.allowValidation) {
            const isLongEnough = validatePasswordLength("password");
            setFormErrors((prevFeedback) => ({
                ...prevFeedback,
                password: !isLongEnough && "Password must be at least 8 characters long",
            }));
        }
    }, [formData.password.value, formData.password.allowValidation, validateEmail, validatePasswordLength]);

    useEffect(() => {
        if (formData.confirmPassword.allowValidation) {
            const isLongEnough = validatePasswordLength("confirmPassword")
            setFormErrors((prevFeedback) => ({
                ...prevFeedback,
                confirmPassword: !isLongEnough && "Password must be at least 8 characters long",
            }));
        }
    }, [formData.confirmPassword, validatePasswordLength]);

    useEffect(() => {
        if (formData.confirmPassword.allowValidation && formData.password.allowValidation) {
            const passwordsMatch = checkPasswordsMatch();
            setFormErrors((prevFeedback) => ({
                ...prevFeedback,
                confirmPassword: !passwordsMatch && "Passwords do not match.",
            }));
        }
    }, [formData.confirmPassword, formData.password, checkPasswordsMatch]);

    useEffect(() => {
        setCanSubmit(checkIfCanSubmit());
    }, [formData, checkIfCanSubmit]);


    const handlePasswordSubmit = async (event) => {
        event.preventDefault();
        setMessage("");

        const {data: user, error} = await supabase.auth.signUp({
            email: formData.email.value.trim(), password: formData.password.value,
        });

        if (error) {
            setMessage(error.message);
            return;
        }

        if (user.session) {
            setMessage("User account created!");
            navigate("/account/new");
        }


        setFormData({
            email: {value: "", allowValidation: false},
            password: {value: "", allowValidation: false},
            confirmPassword: {value: "", allowValidation: false}
        });
        setFormErrors({
            email: "",
            password: "",
            confirmPassword: ""
        })
    };


    return (<Container className={"mt-5"}>
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
                                <Form.Control type="email" placeholder="Enter email" name="email"
                                              value={formData.email.value}
                                              isValid={!formErrors.email && formData.email.allowValidation}
                                              isInvalid={formErrors.email}
                                              onChange={handleInputChange}/>
                                <Form.Control.Feedback
                                    type={formErrors.email ? "invalid" : "valid"}>{formErrors.email || noErrorMsg}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label column={"sm"}>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password"
                                              value={formData.password.value} onChange={handleInputChange}
                                              isValid={!formErrors.password && formData.password.allowValidation}
                                              isInvalid={formErrors.password}/>
                                <Form.Control.Feedback
                                    type={formErrors.password ? "invalid" : "valid"}>{formErrors.password || noErrorMsg}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formConfirmPassword">
                                <Form.Label column={"sm"}>Confirm password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm password" name="confirmPassword"
                                              value={formData.confirmPassword.value}
                                              onChange={handleInputChange}
                                              isValid={!formErrors.confirmPassword && formData.confirmPassword.allowValidation}
                                              isInvalid={formErrors.confirmPassword}
                                />
                                <Form.Control.Feedback
                                    type={formErrors.confirmPassword ? "invalid" : "valid"}>{formErrors.confirmPassword || "Password matches!"}</Form.Control.Feedback>
                            </Form.Group>

                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button className="w-100" color={"secondary"}
                                disabled={!canSubmit}
                                onClick={handlePasswordSubmit}>
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

    </Container>);
}

export default Register;