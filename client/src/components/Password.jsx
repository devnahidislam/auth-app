import React from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/validate";

const Password = () => {
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,
    validateOnBlure: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello Again!</h4>
            <span className="py-1 text-xl text-gray-500">
              Explore more by connecting with us
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-3">
              <img className={styles.profile_img} src={avatar} alt="avatar" />
            </div>
            <div className="flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="text"
                placeholder="Password"
              />
              <button
                className="border bg-indigo-500 w-3/4 py-2 rounded-lg text-gray-50 text-xl shadow-sm text-center hover:bg-indigo-800"
                type="submit"
              >
                Sign In
              </button>
            </div>
            <div className="text-center mt-2">
              <span className="text-gray-500">
                Forgot password?{" "}
                <Link
                  className="text-blue-500 hover:text-blue-800"
                  to="/recovery"
                >
                  Recover Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Password;
