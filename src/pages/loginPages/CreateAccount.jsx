import React, {useEffect, useState, useCallback, useMemo} from "react";
import {Form, Button, Container} from "react-bootstrap";
import {ExclamationTriangle} from "react-bootstrap-icons";
// import "./CreateAccount.css";

const CreateAccount = ({token}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        first_name: {value: "", allowValidation: false},
        last_name: {value: "", allowValidation: false},
        uni: {value: "", allowValidation: false},
        affiliation: {value: "", allowValidation: false},
        dj_name: {value: "", allowValidation: false},
        grad_year: {value: "", allowValidation: false},
        mailing_list: {value: true}, // mailing list is optional
    });


    const [canMoveToNextStep, setCanMoveToNextStep] = useState(false);

    const currentYear = new Date().getFullYear();
    const years = Array.from({length: 6}, (_, i) => currentYear - 1 + i);

    const affiliations = useMemo(() => {
        return [
            {value: "", label: "Select..."},
            {value: "barnard", label: "Barnard"},
            {value: "cc", label: "divumbia divlege"},
            {value: "seas", label: "SEAS"},
            {value: "gs", label: "General Studies"},
            {value: "graduate_student", label: "divumbia graduate school"}
        ];
    }, []);

    const [errors, setErrors] = useState({});
    const [firstName, setFirstName] = useState("");

    const validateInput = useCallback((fieldName, value) => {
        switch (fieldName) {
            case "first_name":
            case "last_name":
                return value.length === 0 ? "This field is required" : "";
            case "affiliation":
                return (affiliations.some(affiliation => affiliation.value === value) && value.length !== 0) ? "" : "Please select an affiliation.";
            case "grad_year":
                return years.includes(Number(value)) ? "" : "Invalid graduation year.";
            case "uni":
                return (value.length !== 0) ? "" : "This field is required";
            case "dj_name":
                return value.length === 0 ? "You need to pick a DJ name." : "";
            default:
                return "";
        }
    }, [affiliations, years]);


    const formDataIsValid = useCallback((currentFormData, step) => {
        const newErrors = {};
        const stepFields = [["first_name", "last_name", "uni", "affiliation", "grad_year"], ["dj_name"]];
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


    const next = () => {
        setFormData((prevData) =>
            Object.fromEntries(
                Object.entries(prevData).map(([key, value]) => [
                    key,
                    typeof value === "string" ? value.trim() : value,
                ]),
            ),
        );
        setFirstName(formData.first_name.value);
        setCurrentStep((step) => step + 1);
        setCanMoveToNextStep(formDataIsValid(formData, currentStep));
    };

    const prev = () => {
        setCanMoveToNextStep(formDataIsValid(formData, currentStep - 1));
        setCurrentStep((step) => step - 1);

    };

    const submitForm = async () => {
        const newErrors = {};
        const dataToSend = {}
        Object.entries(formData).forEach(([field, attributes]) => {
            const error = validateInput(
                field,
                typeof attributes.value === "string" ? attributes.value.trim() : attributes.value,
            );

            if (error) newErrors[field] = error;
            dataToSend[field] = attributes.value;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }


        fetch("http://localhost:8000/user/me", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(dataToSend),
        }).then((response) => response.json()).then((data) => {
            console.log("got response",
                data)
        })

        console.log("Subscribing to mailing list");
    }


    const steps = [
        {
            title: "Confirm personal information",
            content: (
                <form className="text-white">
                    <div>
                        <div>
                                <div className={'flex flex-col'}>
                                <label htmlFor={'first_name'}>First Name</label>
                                <input
                                    className={"bg-gray-800 border rounded-lg"}
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name.value}
                                    onChange={handleInputChange}
                                />

                            </div>
                        </div>
                        <div>
                            <div controlId="formBasicLastName">
                                <label htmlFor={'last_name'}>Last Name</label>
                                <input
                                    size="lg"
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name.value}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div>
                                <label htmlFor={'affiliation'} >
                                   Columbia affiliation
                                </label>
                                <select
                                    name="affiliation"
                                    value={formData.affiliation.value}
                                    onChange={handleInputChange}
                                >
                                    {affiliations.map((affiliation) => (
                                        <option key={affiliation.value} value={affiliation.value}>
                                            {affiliation.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div>
                        {formData.affiliation.value !== "" && (
                            <>
                                <div xs={6}>
                                    <div>
                                        <label divumn={"sm"}>UNI</label>
                                        <input
                                            size="lg"
                                            type="text"
                                            name="uni"
                                            value={formData.uni.value}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.uni}
                                        />
                                    </div>
                                </div>
                                <div xs={6}>
                                    <div>
                                        <label divumn={"sm"}>Graduation Year</label>
                                        <select
                                            name="grad_year"
                                            value={formData.grad_year.value}
                                            onChange={handleInputChange}
                                        >
                                            <option value={""}>Select...</option>
                                            {years.map((year) => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </select>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.grad_year}
                                        </Form.Control.Feedback>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div>
                        <div className={'mt-4'}>
                            <div >
                                <Form.Check
                                    type="checkbox"
                                    name="mailing_list"
                                    label="Sign me up for the WBAR mailing list"
                                    checked={formData.mailing_list.value}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            ),
        },
        {
            title: "Please choose a DJ name.",
            content: (
                <form className="text-white">
                    <div>
                        <div className="mb-3">
                            <div id="warning-box" className="p-4 pb-2">
                                <div>
                                    <div className="h6 flex mx-auto gap-2 justify-items-start">
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
                        </div>
                        <div>
                            <div >
                                <label >DJ name</label>
                                <input
                                    size="lg"
                                    type="text"
                                    name="dj_name"
                                    value={formData.dj_name.value}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            ),
        }
    ];


    return (
        <div className="container flex flex-col justify-center h-screen mx-auto max-w-screen-sm mt-4 text-white">
            <div className={"px-10"}>
                <div>
                    <div className={"flex justify-between items-end border-b"}>
                        <h1>{firstName ? `Welcome, ${firstName}.` : "Hi there!"}</h1>
                        <div>
                            Step {currentStep + 1} of {steps.length}
                        </div>
                    </div>
                    <hr/>
                    <h5 className={"mt-4 font-extrabold uppercase text-3xl"}>{steps[currentStep].title}</h5>
                    <div className="steps-content border-b">{steps[currentStep].content}</div>
                    <div className="steps-action mt-4 flex justify-between">
                        <button
                            disabled={currentStep === 0}
                            style={{margin: "0 8px"}}
                            onClick={() => prev()}
                        >
                            Previous
                        </button>

                        <button
                            onClick={currentStep < steps.length - 1 ? next : submitForm}
                            disabled={!canMoveToNextStep}
                        >
                            {currentStep < steps.length - 1 ? "Next" : "Submit"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;