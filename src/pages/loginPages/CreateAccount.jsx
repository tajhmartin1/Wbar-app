import React, {useEffect, useState, useCallback, useMemo} from "react";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import {ErrorFeedback} from "./ErrorFeedback.jsx";
import {useAuth} from "../../Auth.jsx";
import {Link, useNavigate} from "react-router-dom";
import {doAuthenticatedAPIRequest} from "../../helpers/supabase.js";

const LabeledField = ({label, name, type = "text", placeholder, errors, touched, children}) => (
    <div className={"flex flex-col gap-1 mb-3 w-full"}>
        <label htmlFor={name} className={"text-white"}>{label}</label>
        {type === "select" ? (
            <Field as="select" className={'rounded-lg w-full'} name={name} placeholder={placeholder}>
                {children}
            </Field>
        ) : (
            <Field className={'rounded-lg w-full'} name={name} type={type} placeholder={placeholder}/>
        )}
        {errors[name] && touched[name] && <ErrorFeedback message={errors[name]}/>}
    </div>
);

const CreateAccount = () => {
        const years = Array.from({length: 6}, (_, i) => new Date().getFullYear() - 1 + i);
        const affiliations = [
            {affiliation: "barnard", label: "Barnard"}, {
                affiliation: "cc",
                label: "Columbia College"
            }, {affiliation: "seas", label: "SEAS"}, {
                affiliation: "gs",
                label: "General Studies"
            }, {affiliation: "graduate_school", label: "Other Columbia school"}];

        const {sessionEmail, session, signOut} = useAuth();
        const token = session?.access_token;

        const navigate = useNavigate()

        const [currentStep, setCurrentStep] = useState(0);
        const [formData, setFormData] = useState([{
            first_name: "",
            last_name: "",
            uni: "",
            grad_year: "",
            affiliation: "",
        }, {dj_name: ""}]);

        function StepButtons({errors, touched, fields}) {
            const [disableNextStep, setDisableNextStep] = useState(true)

            useEffect(() => {
                function checkNoErrors(formikErrors) {
                    return fields.every((field) => formikErrors[field] === undefined);
                }
                function checkAllTouched(formikTouched) {
                    return fields.every((field) => formikTouched[field] !== undefined);
                }
                setDisableNextStep(!checkNoErrors(errors) || !checkAllTouched(touched))
            }, [errors, touched]);

            return <div className={'flex justify-between mt-4'}>
                <button onClick={() => currentStep !== 0 && setCurrentStep((prevStep) => prevStep - 1)}
                        disabled={currentStep === 0}
                        className={'bg-purple-900 text-white py-2 px-4 rounded-lg'}>Back
                </button>
                <button onClick={currentStep === stepForms.length - 1 ?
                    () => console.log(formData) :
                    () => setCurrentStep((prevStep) => prevStep + 1)
                }
                        disabled={disableNextStep}
                        className={'bg-purple-900 text-white py-2 px-4 rounded-lg'}>Next
                </button>
            </div>
        }

        const validationSchemas = [
            Yup.object().shape({
                first_name: Yup.string()
                    .trim()
                    .required("This field is required"),
                last_name: Yup.string()
                    .trim()
                    .required("This field is required"),
                uni: Yup.string()
                    .trim()
                    .matches(/^[a-zA-Z]+\d+$/, "Hmm... this doesn't look like a UNI")
                    .required("This field is required"),
                grad_year: Yup.number()
                    .oneOf(years, "Invalid grad year.")
                    .required("This field is required"),
                affiliation: Yup.string()
                    .oneOf("barnard cc seas gs graduate_school".split(" "))
                    .required("Please select an affiliation."),
            }),
            Yup.object().shape({
                dj_name: Yup.string()
                    .trim()
                    .lowercase()
                    .notOneOf(["wbar e-board", "e-board", "wbar", "wbar eboard", "wbar e board", "wbar executive board", "eboard", "admin"], "Nice try! This name is forbidden.")
                    .required("You need to pick a DJ name."),
            })
        ]



        const stepForms = [
            {
                title: "confirm personal information",
                form: <Formik initialValues={formData[0]} validationSchema={validationSchemas[0]} onSubmit={
                    (values) => {
                        setFormData([values, formData[1]]);
                        setCurrentStep(1);
                    }
                }>
                    {({errors, touched}) => (
                        <Form className={"text-black flex flex-col"}>
                            <div className={'sm:flex sm:gap-6'}>
                                <div className={'sm:w-2/5'}>
                                    <LabeledField label="First name" name="first_name" placeholder="First Name"
                                                  errors={errors}
                                                  touched={touched}/>
                                </div>
                                <div className={"sm:w-3/5"}>
                                    <LabeledField label="Last name" name="last_name" placeholder="Last Name" errors={errors}
                                                  touched={touched}/>
                                </div>
                            </div>
                            <LabeledField label="Columbia UNI" name="uni" placeholder="UNI" errors={errors}
                                          touched={touched}/>
                            <div className={"flex gap-6"}>
                                <LabeledField label="Graduation year" name="grad_year" type="select"
                                              placeholder="Graduation year" errors={errors} touched={touched}>
                                    <option disabled value={""} defaultChecked>Select graduation year...</option>
                                    {years.map((year, i) => <option key={i} value={year}>{year}</option>)}
                                </LabeledField>
                                <LabeledField label="School" name="affiliation" type="select"
                                              placeholder="Columbia University Affiliation" errors={errors}
                                              touched={touched}>
                                    <option disabled value={""} defaultChecked>Select affiliation...</option>
                                    {affiliations.map((affiliation, i) => <option key={i}
                                                                                  value={affiliation.affiliation}>{affiliation.label}</option>)}
                                </LabeledField>
                            </div>
                            <StepButtons errors={errors} touched={touched} fields={["first_name", "last_name", "uni", "grad_year", "affiliation"]}/>
                        </Form>
                    )}
                </Formik>
            },
            {
                title: "Please choose a DJ name.",
                form: <Formik initialValues={formData[1]} validationSchema={validationSchemas[1]} onSubmit={
                    () => console.log(formData)
                }
                >
                    {({errors, touched}) => (
                        <Form className="text-black flex flex-col">
                            <LabeledField label={"DJ Name"} name={"dj_name"} placeholder={"DJ Name"} errors={errors}
                                          touched={touched}/>
                            <StepButtons errors={errors} touched={touched} fields={["dj_name"]}/>
                        </Form>)
                    }
                </Formik>
            }
        ]
        const handleDeleteUser = async () => {
            const deleteResponse = await doAuthenticatedAPIRequest("/user/me", "DELETE", token)
            console.log(deleteResponse)

            // signing out removes the token from local storage
            signOut()
            navigate('/account/register')
        }

        return <div
            className={'container px-3 pt-nav mx-auto pb-16 flex flex-col justify-center items-center min-h-screen'}>
            <div className={"max-w-screen-sm min-h-96"}>
                <div className={'mb-3 pb-2 border-b'}>
                    <h1 className={"text-2xl md:text-3xl font-black uppercase mb-2"}>{stepForms[currentStep].title}</h1>
                    <div className={'flex justify-between items-end text-sm'}>
                        <div>
                            <div className={'text-gray-400'}>Signed in as <span>{sessionEmail}</span></div>
                            <div className={'text-xs mt-1'}>Not you? <span
                                className={'text-blue-500 hover:underline cursor-pointer'} onClick={handleDeleteUser}>Go back</span>
                            </div>
                        </div>
                        <div>Step {currentStep + 1} of {stepForms.length}</div>
                    </div>
                </div>
                {stepForms[currentStep].form}
            </div>
        </div>

    }
;

export default CreateAccount;