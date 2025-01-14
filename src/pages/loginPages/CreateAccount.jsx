import React, {useEffect, useState, useCallback, useMemo} from "react";
import {Form, Row, Col, Button, Container} from "react-bootstrap";
import {ExclamationTriangle} from "react-bootstrap-icons";
import "./CreateAccount.css";

const CreateAccount = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        firstName: {value: "", allowValidation: false},
        lastName: {value: "", allowValidation: false},
        uni: {value: "", allowValidation: false},
        affiliation: {value: "", allowValidation: false},
        alias: {value: "", allowValidation: false},
        gradYear: {value: "", allowValidation: false},
        mailingList: {value: true}, // mailing list is optional
    });


    const [canMoveToNextStep, setCanMoveToNextStep] = useState(false);

    const currentYear = new Date().getFullYear();
    const years = Array.from({length: 6}, (_, i) => currentYear - 1 + i);

    const affiliations = useMemo(() => {
        return [
            {value: "", label: "Select..."},
            {value: "barnard", label: "Barnard"},
            {value: "cc", label: "Columbia College"},
            {value: "seas", label: "SEAS"},
            {value: "gs", label: "General Studies"},
            {value: "graduate_student", label: "Columbia graduate school"}
        ];
    }, []);

    const [errors, setErrors] = useState({});
    const [firstName, setFirstName] = useState("");

    const validateInput = useCallback((fieldName, value) => {
        switch (fieldName) {
            case "firstName":
            case "lastName":
                return value.length === 0 ? "This field is required" : "";
            case "affiliation":
                return (affiliations.some(affiliation => affiliation.value === value) && value.length !== 0) ? "" : "Please select an affiliation.";
            case "gradYear":
                return years.includes(Number(value)) ? "" : "Invalid graduation year.";
            case "uni":
                return (value.length !== 0) ? "" : "This field is required";
            case "alias":
                return value.length === 0 ? "You need to pick an alias." : "";
            default:
                return "";
        }
    }, [affiliations, years]);


    const formDataIsValid = useCallback((currentFormData, step) => {
        const newErrors = {};
        const stepFields = [["firstName", "lastName", "uni", "affiliation", "gradYear"], ["alias"]];
        Object.entries(currentFormData).forEach(([field, attributes]) => {
            if (!stepFields[step].includes(field)) return;
            const error = validateInput(
                field,
                typeof attributes.value === "string" ? attributes.value.trim() : attributes.value,
            );
            if (error) newErrors[field] = error;
        });
        return Object.keys(newErrors).length === 0
    }, [validateInput]);

    const handleInputChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]:
                {
                    value: type === "checkbox" ? checked : value,
                    allowValidation: true
                }
        }));
    };


    useEffect(() => {
        const newErrors = {};
        Object.entries(formData).forEach(([field, attributes]) => {
            if (attributes.allowValidation) {
                const error = validateInput(field, typeof attributes.value === "string" ? attributes.value.trim() : attributes.value);
                if (error) newErrors[field] = error;
            }
        });

        if (JSON.stringify(newErrors) !== JSON.stringify(errors)) {
            setErrors(newErrors);
        }

        const canMove = formDataIsValid(formData, currentStep);
        if (canMove !== canMoveToNextStep) {
            setCanMoveToNextStep(canMove);
        }
    }, [formData, currentStep, formDataIsValid, validateInput, errors, canMoveToNextStep]);


    const validateAliasUnique = (alias) => {
        return alias === "unique" ? "This alias is already taken." : "";
    }

    const next = () => {
        setFormData((prevData) =>
            Object.fromEntries(
                Object.entries(prevData).map(([key, value]) => [
                    key,
                    typeof value === "string" ? value.trim() : value,
                ]),
            ),
        );
        setFirstName(formData.firstName.value);
        setCurrentStep((step) => step + 1);
        setCanMoveToNextStep(formDataIsValid(formData, currentStep));
    };

    const prev = () => {
        setCanMoveToNextStep(formDataIsValid(formData, currentStep - 1));
        setCurrentStep((step) => step - 1);

    };

    const submitForm = async () => {
        const newErrors = {};
        const dataToSend = {};
        Object.entries(formData).forEach(([field, attributes]) => {
            const error = validateInput(
                field,
                typeof attributes.value === "string" ? attributes.value.trim() : attributes.value,
            );

            dataToSend[field] = attributes.value;
            if (attributes.value === "") {
                delete dataToSend[field];
            }
            if (error) newErrors[field] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log("Submitting form", dataToSend);

        console.log("Subscribing to mailing list");
    }


    const steps = [
        {
            title: "Confirm personal information",
            content: (
                <Form className="text-white">
                    <Row>
                        <Col sm={5}>
                            <Form.Group controlId="formBasicFirstName">
                                <Form.Label column={"sm"}>First Name</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName.value}
                                    onChange={handleInputChange}
                                    isInvalid={!!errors.firstName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.firstName}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col sm={7}>
                            <Form.Group controlId="formBasicLastName">
                                <Form.Label column={"sm"}>Last Name</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName.value}
                                    onChange={handleInputChange}
                                    isInvalid={!!errors.lastName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.lastName}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Form.Group>
                                <Form.Label column={"sm"}>
                                    Columbia affiliation
                                </Form.Label>
                                <Form.Select
                                    size="lg"
                                    type="text"
                                    name="affiliation"
                                    value={formData.affiliation.value}
                                    onChange={handleInputChange}
                                    isInvalid={!!errors.affiliation}
                                >
                                    {affiliations.map((affiliation) => (
                                        <option key={affiliation.value} value={affiliation.value}>
                                            {affiliation.label}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.affiliation}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        {formData.affiliation.value !== "" && (
                            <>
                                <Col xs={6}>
                                    <Form.Group>
                                        <Form.Label column={"sm"}>UNI</Form.Label>
                                        <Form.Control
                                            size="lg"
                                            type="text"
                                            name="uni"
                                            value={formData.uni.value}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.uni}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.uni}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group>
                                        <Form.Label column={"sm"}>Graduation Year</Form.Label>
                                        <Form.Select
                                            size="lg"
                                            type="text"
                                            name="gradYear"
                                            value={formData.gradYear.value}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.gradYear}
                                        >
                                            <option value={""}>Select...</option>
                                            {years.map((year) => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.gradYear}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </>
                        )}
                    </Row>
                    <Row>
                        <Col className={'mt-4'} xs={12}>
                            <Form.Group controlId="formBasicMailingList">
                                <Form.Check
                                    type="checkbox"
                                    name="mailingList"
                                    label="Sign me up for the WBAR mailing list"
                                    checked={formData.mailingList.value}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            ),
        },
        {
            title: "Please choose an alias.",
            content: (
                <Form className="text-white">
                    <Row>
                        <Col sm={12} className="mb-3">
                            <div id="warning-box" className="p-4 pb-2">
                                <div>
                                    <div className="h6 d-flex mx-auto gap-2 justify-items-start">
                                        <ExclamationTriangle
                                            className="bi bi-exclamation-triangle"></ExclamationTriangle>
                                        <strong>Choose carefully!</strong>
                                    </div>
                                    <ul className="fs-6">
                                        <li>
                                            This is how you'll be known to listeners (
                                            <span className="italics">your DJ name</span>).
                                        </li>
                                        <li>It can't be changed later.</li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                        <Col sm={12}>
                            <Form.Group controlId="formBasicAlias">
                                <Form.Label column={"sm"}>Alias</Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    name="alias"
                                    value={formData.alias.value}
                                    onChange={handleInputChange}
                                    isInvalid={!!errors.alias}
                                    isValid={!(!!errors.alias) && formData.alias.allowValidation}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.alias}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                    Looks good!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            ),
        }
    ];


    return (
        <Container className="container mt-4 text-white">
            <Row>
                <Col xs={0} md={2}></Col>
                <Col xs={12} md={8} className="align-self-center">
                    <div className={"d-flex justify-content-between align-items-end"}>
                        <h1>{firstName ? `Welcome, ${firstName}.` : "Hi there!"}</h1>
                        <div>
                            Step {currentStep + 1} of {steps.length}
                        </div>
                    </div>
                    <hr/>
                    <h5 className={"mt-4"}>{steps[currentStep].title}</h5>
                    <div className="steps-content">{steps[currentStep].content}</div>
                    <hr/>
                    <div className="steps-action mt-4 d-flex justify-content-between">
                        <Button
                            disabled={currentStep === 0}
                            style={{margin: "0 8px"}}
                            onClick={() => prev()}
                        >
                            Previous
                        </Button>

                        <Button
                            type="primary"
                            onClick={currentStep < steps.length - 1 ? next : submitForm}
                            disabled={!canMoveToNextStep}
                        >
                            {currentStep < steps.length - 1 ? "Next" : "Submit"}
                        </Button>
                    </div>
                </Col>
                <Col xs={0} md={2}></Col>
            </Row>
        </Container>
    );
};

export default CreateAccount;