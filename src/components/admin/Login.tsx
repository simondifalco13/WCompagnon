import { Button } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "../../css/login.css";
var sha1 = require("sha-1");

interface LoginProps {
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    urlPath: string;
    sessionVariable: string;
}

export const Login = (props: LoginProps) => {
    const [isSubmitted, setIsSubmitted] = useState<boolean>(true);
    const navigate = useNavigate();
    async function isAdmin(values: any) {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Cross-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Methods": "*",
            },
            body: values,
        };
        const response = await fetch(
            process.env.REACT_APP_API_BASE_URL + "/user/login",
            requestOptions
        );
        try {
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Formik
                initialValues={{ mail: "", password: "" }}
                validationSchema={Yup.object({
                    mail: Yup.string()
                        .max(200, "Must be 200 characters or less")
                        .required("Required")
                        .email("Invalid email address"),
                    password: Yup.string()
                        .max(40, "Must be 40 characters or less")
                        .required("Required"),
                })}
                onSubmit={async (values) => {
                    var val = { ...values };
                    val.password = sha1(val.password);
                    isAdmin(JSON.stringify(val)).then((res) => {
                        values.password = "";
                        if (res.status === 200) {
                            if (res.admin !== null) {
                                window.sessionStorage.setItem("loggedIn", "true");
                                var admin = res.admin;
                                //stocker Token dans sessionStorage
                                //window.sessionStorage.setItem("token", user.token);
                                //window.sessionStorage.setItem("user", JSON.stringify(admin));
                                setIsSubmitted(true);
                                props.setIsLoggedIn(true);
                                navigate("/admin");
                            } else {
                                if (res.user != null) {
                                    window.sessionStorage.setItem("userLoggedIn", "true");
                                    var user = res.user;
                                    window.sessionStorage.setItem("user", JSON.stringify(user));
                                    setIsSubmitted(true);
                                    props.setIsLoggedIn(true);
                                    navigate("/account");
                                } else {
                                    values.password = "";
                                    setIsSubmitted(false);
                                }
                            }
                        } else {
                            values.password = "";
                            setIsSubmitted(false);
                        }
                    });
                }}
            >
                <Form>
                    <label htmlFor="mail">Email</label>
                    <Field name="mail" type="text" />
                    <ErrorMessage name="mail" component={"span"} />
                    <label htmlFor="password">Password</label>
                    <Field name="password" type="password" />
                    <ErrorMessage name="password" component={"span"} />
                    <br />
                    <br />
                    <Button type="submit" variant="contained">
                        Login
                    </Button>
                    {!isSubmitted && <p>Wrong email or password</p>}
                </Form>
            </Formik>
        </div>
    );
};
