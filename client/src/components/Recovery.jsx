import React from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";

const Recovery = () => {
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Recovery</h4>
            <span className="py-1 text-xl text-gray-500">
              Enter OTP to Recover Password
            </span>
          </div>
          <form className="py-20">
            <div className="flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="text-sm text-left text-gray-500">
                  Enter 6 Digit OTP sent to your email
                </span>
                <input
                  className={styles.textbox}
                  type="text"
                  placeholder="OTP"
                />
              </div>
              <button
                className="border bg-indigo-500 w-3/4 py-2 rounded-lg text-gray-50 text-xl shadow-sm text-center hover:bg-indigo-800"
                type="submit"
              >
                Sign In
              </button>
            </div>
            <div className="text-center mt-2">
              <span className="text-gray-500">
                Can't Get OTP?{" "}
                <button
                  className="text-blue-500 hover:text-blue-800"
                >
                  Resend OTP
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
