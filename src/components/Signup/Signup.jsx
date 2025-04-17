import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../Store/authSlice";
import { useDispatch } from "react-redux";
import { Circle, Eye, EyeOff, Lock, Mail, User, Loader2 } from "lucide-react";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false); // Tracks if button was clicked
  const [isLoading, setIsLoading] = useState(false); // Tracks loading state

  const validateInputs = () => {
    const updatedErrorMessages = {
      username:
        /^[A-Za-z][A-Za-z\s]*$/.test(name) && name.length <= 40
          ? ""
          : "Name should only contain alphabets",
      email:
        /^[^\s@]+@([^\s@]+\.)?gmail\.com$/.test(email) && email.length <= 40
          ? ""
          : "Please enter a valid Gmail address",
      password:
        /^.{8,}$/.test(password) && password.length <= 20
          ? ""
          : "Password must be at least 8 characters.",
      confirmPassword:
        password === confirmPassword ? "" : "Passwords do not match",
    };

    const isValid = Object.values(updatedErrorMessages).every(
      (message) => message === ""
    );

    setErrorMessages(updatedErrorMessages);

    return { isValid, updatedErrorMessages };
  };

  const signup_handleSubmit = async (e) => {
    e.preventDefault();

    const { isValid } = validateInputs();

    if (isValid) {
      setFeedbackMessage("");
      setIsLoading(true); // Start loading

      try {
        const response = await axios.post(
          "https://benz-1vam.onrender.com/signup",
          {
            name,
            email,
            password,
          }
        );

        // Check for successful signup
        if (response.data && response.data.message === "Signup successful") {
          const user = response.data.user; // Get user details from response
          dispatch(login(user));
          setFeedbackMessage("Registration successful...");
          setTimeout(() => {
            navigate("/Login");
          }, 1200);
        } else {
          // Handle other cases (e.g., email already registered)
          setFeedbackMessage(
            response.data.message || "Signup failed. Please try again."
          );
        }
      } catch (err) {
        // Handle errors from the backend
        if (err.response && err.response.data) {
          // Ensure feedbackMessage is a string
          setFeedbackMessage(
            typeof err.response.data === "string"
              ? err.response.data
              : err.response.data.message || "Signup failed. Please try again."
          );
        } else {
          setFeedbackMessage("Signup failed. Please try again.");
        }
      } finally {
        setIsLoading(false); // Stop loading
      }
    } else {
      setFeedbackMessage("Please correct the highlighted errors.");
      setIsLoading(false); // Stop loading
    }
  };

  const handleSignup = () => {
    setSubmitted(true);
    const { isValid } = validateInputs();
    if (isValid) {
      console.log("Signup successful!");
      setFeedbackMessage(""); // Clear the feedback message
    }
  };

  return (
    <div className="flex max-[350px]:pt-22 pt-[50px] sm:pt-14 items-center justify-center max-[450px]:h-svh h-screen login-background ">
      <div className="shadow-lg rounded-md flex overflow-hidden border-2 border-white max-[450px]:w-[19rem] w-[21rem] h-[28rem] sm:w-[38rem] sm:h-[29rem] md:w-[39rem] md:h-[30rem] lg:w-[40rem] lg:h-[28rem] xl:w-[41rem] xl:h-[31rem] 2xl:w-[43rem] 2xl:h-[33rem] login-container">
        {/* Left Side - Image */}
        <div className="hidden sm:block sm:w-1/2">
          <img
            src="/signup-login-bg.webp"
            alt="Cupcake Tower"
            className="object-cover object-top h-full w-full"
          />
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full sm:w-1/2 flex flex-col justify-center p-4 login-container-background poppins">
          <form onSubmit={signup_handleSubmit}>
            <h2 className="text-lg font-medium text-center lg:mb-[8px] xl:mb-[10px] underline underline-offset-4 text-pink-500">
              SIGNUP
            </h2>

            {/* Name Input */}
            <div className="mb-[5px] md:mb-[6px] xl:mb-[7px]">
              <span className="text-[13.5px] lg:text-[14px] xl:text-[14.5px] 2xl:text-[15px] font-medium green-text">Name</span>
              <div className="relative">
                <User
                  className="w-[20px] h-[20px] absolute left-[10px] login_icon -translate-y-1/2 text-pink-500 peer-focus:text-blue-500"
                />
                <input
                  type="text"
                  value={name}
                  maxLength={40}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className={`pl-[37px] pr-[8px] md:pr-[10px] w-full h-9 text-[14px] lg:text-[14.5px] xl:text-[15px] 2xl:text-[15.5px] input-box rounded-md border ${errorMessages.username && submitted
                    ? "border-red-500"
                    : submitted
                      ? "border-green-500"
                      : "border-pink-500"
                    } bg-[whitesmoke] focus:border-green-500 outline-none peer`}
                />
                {submitted && errorMessages.username && (
                  <p className="text-red-500 text-[12.2px] sm:text-[12.5px] lg:text-[13px] xl:text-[13.5px] font-medium h-3">
                    {errorMessages.username}
                  </p>
                )}
              </div>
            </div>

            {/* Email Input */}
            <div className="mb-[5px] md:mb-[6px] xl:mb-[7px]">
              <span className="text-[13.5px] lg:text-[14px] xl:text-[14.5px] 2xl:text-[15px] font-medium green-text">Email</span>
              <div className="relative">
                <Mail
                  className="w-[20px] h-[20px] absolute left-[10px] login_icon -translate-y-1/2 text-pink-500 peer-focus:text-blue-500"
                />
                <input
                  type="email"
                  value={email}
                  maxLength={40}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`pl-[37px] pr-[8px] md:pr-[10px] w-full h-9 text-[14px] lg:text-[14.5px] xl:text-[15px] 2xl:text-[15.5px] input-box rounded-md border ${errorMessages.email && submitted
                    ? "border-red-500"
                    : submitted
                      ? "border-green-500"
                      : "border-pink-500"
                    } bg-[whitesmoke] focus:border-green-500 outline-none peer`}
                />
                {submitted && errorMessages.email && (
                  <p className="text-red-500 text-[12.2px] sm:text-[12.5px] lg:text-[13px] xl:text-[13.5px] font-medium h-3">
                    {errorMessages.email}
                  </p>
                )}
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-[5px] md:mb-[6px] xl:mb-[7px]">
              <span className="text-[13.5px] lg:text-[14px] xl:text-[14.5px] 2xl:text-[15px] font-medium green-text">Password</span>
              <div className="relative">
                <Lock
                  className="w-[20px] h-[20px] absolute left-[10px] login_icon -translate-y-1/2 text-pink-500 peer-focus:text-blue-500"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  maxLength={20}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`pl-[37px] pr-[35px] h-9 text-[14px] lg:text-[14.5px] xl:text-[15px] 2xl:text-[15.5px] py-2 w-full rounded-md input-box border ${errorMessages.password && submitted
                    ? "border-red-500"
                    : submitted
                      ? "border-green-500"
                      : "border-pink-500"
                    } bg-[whitesmoke] focus:border-green-500 outline-none peer`}
                />
                <button
                  type="button"
                  className="absolute right-[8px] login_icon -translate-y-1/2 focus:outline-none text-[14px]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-[20px] h-[20px]" /> : <Eye className="w-[20px] h-[20px]" />}
                </button>
                {submitted && errorMessages.password && (
                  <p className="text-red-500 text-[12.2px] sm:text-[12.5px] lg:text-[13px] xl:text-[13.5px] font-medium h-3">
                    {errorMessages.password}
                  </p>
                )}
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="mb-[13.5px] md:mb-[14px] xl:mb-[14.5px]">
              <span className="text-[13.5px] lg:text-[14px] xl:text-[14.5px] 2xl:text-[15px] font-medium green-text">Confirm Password</span>
              <div className="relative">
                <Lock
                  className="w-[20px] h-[20px] absolute left-[10px] login_icon -translate-y-1/2 text-pink-500 peer-focus:text-blue-500"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  maxLength={20}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className={`pl-[37px] pr-[35px] h-9 text-[14px] lg:text-[14.5px] xl:text-[15px] 2xl:text-[15.5px] py-2 w-full rounded-md input-box border ${errorMessages.confirmPassword && submitted
                    ? "border-red-500"
                    : submitted
                      ? "border-green-500"
                      : "border-pink-500"
                    } bg-[whitesmoke] focus:border-green-500 outline-none peer`}
                />
                <button
                  type="button"
                  className="absolute right-[8px] login_icon -translate-y-1/2 focus:outline-none text-[14px]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-[20px] h-[20px]" /> : <Eye className="w-[20px] h-[20px]" />}
                </button>
                {submitted && errorMessages.confirmPassword && (
                  <p className="text-red-500 text-[12.2px] sm:text-[12.5px] lg:text-[13px] xl:text-[13.5px] font-medium h-3">
                    {errorMessages.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Signup Button */}
            <button
              className="w-full h-9 mb-[5px] rounded-md login-signup-btn text-white font-medium text-[18px] flex items-center justify-center"
              type="submit"
              onClick={handleSignup}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5 mr-2" />
                  Signing Up...
                </>
              ) : (
                "Sign Up"
              )}
            </button>

            {feedbackMessage && (
              <p
                className={`signup-feedback-message ${feedbackMessage.includes("successful") ? "success" : "error"
                  }`}
              >
                <span className="text-red-500 font-medium text-[13.5px] lg:text-[14px] xl:text-[14.5px] 2xl:text-[15px] flex justify-center">{feedbackMessage}</span>
              </p>
            )}

            {/* Login Link */}
            <Link to={"/Login"} className="text-center flex items-center justify-center text-[15px] 2xl:text-[16px]">
              Already have an account ?
              <span className="font-medium cursor-pointer pl-1 signup_link">
                Login
              </span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}