import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import GoogleButton from "./GoogleButton";
import {supabase} from "../../helpers/supabase.js";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";

function ErrorFeedback({message}) {
    return (
        <div className={'flex items-center gap-1 text-red-600 motion-preset-slide-down'}>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <div>{message}</div>
        </div>)
}

function Register() {
    const navigate = useNavigate();

    // message returned from supabase
    const [message, setMessage] = useState("");

    const SignupSchema = Yup.object().shape({
        email: Yup.string().trim()
            .email('Invalid email')
            // .matches(/^[a-zA-Z0-9._%+-]+@(barnard\.edu|columbia\.edu)$/, 'Please use your Barnard or Columbia email')
            .required('Required'),
        password: Yup.string()
            .required('Required')
            .notOneOf(['password'], 'Password cannot be "password"')
            .min(8, 'Password must be at least 8 characters'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords do not match')
    });
    return (
        <div
            className={"container px-3 pt-nav mx-auto pb-16 flex flex-col justify-center items-center min-h-screen"}>
            <div className={"max-w-96"}>
                <h1 className={"text-5xl mb-2 font-black uppercase"}>Create an account</h1>
                <div>
                    <div className={'flex flex-col'}>
                        {message && <span className={"text-danger p-1 d-flex justify-start gap-1"}><i
                            className={"bi-exclamation-circle"}/><span>{message}</span></span>}

                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                                confirmPassword: ""
                            }}
                            validationSchema={SignupSchema}
                            onSubmit={
                                async (values) => {
                                    const {data: {user, session}, error} = await supabase.auth.signUp({
                                        email: values.email.trim(),
                                        password: values.password,
                                        options: {
                                            emailRedirectTo: window.location.origin + "/login",
                                        }
                                    })

                                    if (error) {
                                        setMessage(error.message);
                                    }
                                    console.log(user, session, error)

                                    if (user) {
                                        navigate("/dashboard");
                                    }
                                }
                            }>
                            {({errors, touched}) => (
                                <Form className={"text-black flex flex-col gap-3"}>
                                    <div>
                                        <label htmlFor="email" className={"text-white"}>Email</label>
                                        <Field className={'rounded-lg w-full'} name={'email'}/>
                                        {(errors.email && touched.email) && <ErrorFeedback message={errors.email}/>}
                                    </div>
                                    <div>
                                        <label htmlFor="password" className={"text-white"}>Password</label>
                                        <Field className={'rounded-lg w-full'} type={'password'} name={'password'}/>
                                        {(errors.password && touched.password) &&
                                            <ErrorFeedback message={errors.password}/>
                                        }
                                    </div>
                                    <div>
                                        <label htmlFor="confirmPassword" className={"text-white"}>Confirm
                                            Password</label>
                                        <Field className={'rounded-lg w-full'} type={'password'}
                                               name={'confirmPassword'}/>
                                        {(errors.confirmPassword && touched.confirmPassword) &&
                                            <ErrorFeedback message={errors.confirmPassword}/>
                                        }
                                    </div>
                                    <button
                                        className={'bg-purple-900 hover:bg-purple-950 p-2 text-white w-full rounded-lg'}
                                        type={"submit"}>
                                        Register
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
                <div className="my-2">
                    <h4 className="relative pt-2 pb-4 flex items-center justify-center">
                        <span className="flex-1 border-b-2 border-white"></span>
                        <span className="mx-2 font-medium uppercase">or</span>
                        <span className="flex-1 border-b-2 border-white"></span>
                    </h4>
                </div>
                <GoogleButton/>
                <div className={'mt-3 w-full text-center text-sm'}>Have an account? <Link
                    className={'text-blue-500 hover:underline'} to={'/login'}>Sign in</Link>.
                </div>

            </div>
        </div>
    )
        ;
}

export default Register;