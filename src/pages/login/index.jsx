/** **************************** Import Packages ****************************** */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

/** ********************************* formik ************************************* */
import { useFormik } from "formik";
import * as yup from "yup";

/** ********************************* CSS ************************************* */
import { addErrorIcon } from "../../utils/common";
import { login } from "../../redux/slice/login";

const LoginPage = (props) => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [loader, setLoader] = useState(false);
    const [LoginUser, setLoginUser] = useState("Admin");
    // const [btnLoader, setBtnLoader] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: "",
            password: "",
        },

        validationSchema: yup.object({
            email: yup
                .string()
                .required("Email is required")
                .strict()
                .matches(
                    /^[a-zA-Z](([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    "Enter the valid email"
                )
                .email("Enter valid email"),
            password: yup
                .string()
                .required("Password is required")
                .min(5, "Minimum 5 characters is required"),
        }),
        onSubmit: async (values) => {
            setLoader(true);
            values.role = LoginUser === "Admin" ? "admin" : "faculty";
            values.email = values.email.toLowerCase();
            await dispatch(login(values)).then((res) => {
                console.log(res, "res,payload");
                const responseData = res?.payload;
                if (responseData?.userDetails) {
                    const accessToken = responseData?.accessToken;
                    const RefreshToken = responseData?.refreshToken;
                    localStorage.setItem("refreshToken", RefreshToken);
                    localStorage.setItem("token", accessToken);
                    const userDetails = {
                        role: LoginUser === "Admin" ? "admin" : "faculty",
                        ...responseData?.userDetails
                    }
                    localStorage.setItem("loggedUser", JSON.stringify(userDetails));
                    setLoader(false);
                    toast.success("Logged in Successfully");
                    formik.resetForm();
                    // navigate("/dashboard");
                    window.location.href = "/dashboard";
                    console.log("sdbfjskgd")
                } else if (responseData?.success === false) {
                    setLoader(false);
                    toast.error(responseData?.message?.results);
                } else {
                    setLoader(false);
                    toast.error(responseData?.error);
                }
            });
        },
    });

    return (
        <div className="Background">
            <div className="h-full flex justify-center items-center">
                <div className="">
                    <h5 className="text-dark font-semibold text-center text-2xl mb-5">
                        Welcome to Student Management
                    </h5>
                    <div className="w-[500px] bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl px-8 pt-5 pb-5 max-w-md border border-white/30 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/30 before:to-transparent before:pointer-events-none">
                        <h1
                            className="text-xl text-center font-semibold text-black"

                        >
                            Log In
                        </h1>
                        <div className="flex justify-center text-center my-6">
                            <div
                                className={`px-6 py-2 mx-1 rounded-full cursor-pointer transition-all duration-300 backdrop-blur-sm ${LoginUser === "Admin"
                                    ? "bg-[#047bba] text-white shadow-lg border border-blue-400/50"
                                    : "bg-white/30 text-gray-700 hover:bg-white/50 border border-white/60"
                                    }`}
                                onClick={() => setLoginUser("Admin")}
                            >
                                Admin
                            </div>
                            <div
                                className={`px-6 py-2 mx-1 rounded-full cursor-pointer transition-all duration-300 backdrop-blur-sm ${LoginUser === "Faculty"
                                    ? "bg-[#047bba] text-white shadow-lg border border-blue-400/50"
                                    : "bg-white/30 text-gray-700 hover:bg-white/50 border border-white/60"
                                    }`}
                                onClick={() => setLoginUser("Faculty")}
                            >
                                Faculty
                            </div>
                        </div>
                        <form
                            onSubmit={(event) => {
                                formik.handleSubmit(event);
                            }}
                            className="row mt-3"
                        >
                            <div>
                                <input
                                    labelName="Email"
                                    required
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                                <div className="error-space">
                                    {formik.errors.email && formik.touched.email ? (
                                        <div className="error-txt ps-2">
                                            {addErrorIcon(formik.errors.email)}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="mt-3">
                                <input
                                    labelName="Password"
                                    required
                                    type={passwordShown ? "text" : "password"}
                                    placeholder="Password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    icon={true}
                                    iconValue={
                                        <i
                                            role="button"
                                            className={`fa password-eye  ${passwordShown ? "fa-eye" : "fa-eye-slash"
                                                } password-icon`}
                                            onClick={() => setPasswordShown(!passwordShown)}
                                        />
                                    }
                                />
                                <div className="error-space">
                                    {formik.errors.password && formik.touched.password ? (
                                        <div className="error-txt ps-2">
                                            {addErrorIcon(formik.errors.password)}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="col-12">
                                <button disabled={loader} className="w-full bg-white/40 backdrop-blur-sm hover:bg-white/40 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed border shadow-sm border-[#b1ccea] mt-5" type="submit" onClick={formik.handleSubmit}>
                                    {loader ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm ml-2"
                                                role="status"
                                                aria-hidden="false"
                                            />
                                            <span className="sr-only text-gray-800">Logging in...</span>
                                        </>
                                    ) : (
                                        "Login"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;
