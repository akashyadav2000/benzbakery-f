import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Circle, Eye, EyeOff, Lock, Mail, Loader2 } from "lucide-react"; // Import Loader2
import { login, fetchPurchaseHistory } from "../Store/authSlice"; // Import fetchPurchaseHistory

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
  });
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false); // Tracks if button was clicked
  const [isLoading, setIsLoading] = useState(false); // Tracks loading state

  const validateInputs = () => {
    const updatedErrorMessages = {
      email: /^[^\s@]+@([^\s@]+\.)?gmail\.com$/.test(email)
        ? ""
        : "Please enter a valid Gmail address",
      password: /^.{8,}$/.test(password)
        ? ""
        : "Password must be at least 8 characters.",
    };

    const isValid = Object.values(updatedErrorMessages).every(
      (message) => message === ""
    );

    setErrorMessages(updatedErrorMessages);

    return { isValid, updatedErrorMessages };
  };

  const login_handleSubmit = async (e) => {
    e.preventDefault();

    const { isValid } = validateInputs();

    if (isValid) {
      setFeedbackMessage("");
      setIsLoading(true); // Start loading

      try {
        const response = await axios.post(
          "https://benz-1vam.onrender.com/login",
          {
            email,
            password,
          }
        );

        if (response.data.status === "Success") {
          const user = response.data.user;

          // Fetch purchase history after login
          await dispatch(fetchPurchaseHistory(user.email));

          // Dispatch login action with user and purchase history
          dispatch(
            login({
              user,
              purchaseHistory: response.data.purchaseHistory || [],
            })
          );

          // setFeedbackMessage("Login successful ...");
          setTimeout(() => {
            navigate("/");
          },);
        } else {
          setFeedbackMessage(
            response.data.message || "Login failed. Please try again."
          );
        }
      } catch (err) {
        if (err.response && err.response.data) {
          setFeedbackMessage(
            typeof err.response.data === "string"
              ? err.response.data
              : err.response.data.message || "Login failed. Please try again."
          );
        } else {
          setFeedbackMessage("Login failed. Please try again.");
        }
      } finally {
        setIsLoading(false); // Stop loading
      }
    } else {
      setFeedbackMessage("Please correct the highlighted errors.");
      setIsLoading(false); // Stop loading
    }
  };

  const handleLogin = () => {
    setSubmitted(true);
    const { isValid } = validateInputs();
    if (isValid) {
      console.log("Login successful!");
      setFeedbackMessage(""); // Clear the feedback message
    }
  };

  return (
    <div className="flex max-[350px]:pt-22 pt-[50px] sm:pt-14 items-center justify-center max-[450px]:h-svh h-screen login-background ">

      <div className=" shadow-lg rounded-md flex overflow-hidden border-2 border-white max-[450px]:w-[19rem] w-[21rem] h-[28rem] sm:w-[38rem] sm:h-[29rem] md:w-[39rem] md:h-[30rem] lg:w-[40rem] lg:h-[28rem] xl:w-[41rem] xl:h-[31rem] 2xl:w-[43rem] 2xl:h-[33rem] login-container">
        {/* Left Side - Image */}
        <div className="hidden sm:block sm:w-1/2">
          <img
            src="/signup-login-bg.jpg"
            alt="Cupcake Tower"
            className="object-cover object-top h-full w-full"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full sm:w-1/2 flex flex-col justify-center p-4 login-container-background poppins">
          <form onSubmit={login_handleSubmit}>
            <h2 className="text-lg font-medium text-center mb-4 underline underline-offset-4 text-pink-500">
              LOGIN
            </h2>

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
                  onChange={(e) => setEmail(e.target.value)} // No validation on change
                  placeholder="Enter your email"
                  className={`pl-[37px] pr-[8px] md:pr-[10px] w-full h-9 text-[14px] lg:text-[14.5px] xl:text-[15px] 2xl:text-[15.5px] input-box rounded-md border ${errorMessages.email && submitted
                    ? "border-red-500"
                    : submitted
                      ? "border-green-500"
                      : "border-pink-500"
                    } bg-[whitesmoke] focus:border-green-500 outline-none peer`}
                />
                {submitted && errorMessages.email && (
                  <p className="text-red-500 text-[12px] sm:text-[12.5px] lg:text-[13px] xl:text-[13.5px] font-medium h-3">
                    {errorMessages.email}
                  </p>
                )}
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-[13.5px] md:mb-[14px] xl:mb-[14.5px]">
              <span className="text-[13.5px] lg:text-[14px] xl:text-[14.5px] 2xl:text-[15px] font-medium green-text">Password</span>
              <div className="relative">
                <Lock
                  className="w-[20px] h-[20px] absolute left-[10px] login_icon -translate-y-1/2 text-pink-500 peer-focus:text-blue-500"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  maxLength={20}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // No validation on change
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
                  <p className="text-red-500 text-[12px] sm:text-[12.5px] lg:text-[13px] xl:text-[13.5px] font-medium h-3">
                    {errorMessages.password}
                  </p>
                )}
              </div>
            </div>

            {/* Login Button */}
            <button
              className="w-full h-9 mb-[5px] rounded-md login-signup-btn text-white font-medium text-[18px] flex items-center justify-center"
              type="submit"
              onClick={handleLogin} // Trigger validation on click
              disabled={isLoading} // Disable the button when loading
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5 mr-2" />
                  Log In...
                </>
              ) : (
                "Log In"
              )}
            </button>

            {feedbackMessage && (
              <p
                className={`login-feedback-message ${feedbackMessage.includes("successful") ? "success" : "error"
                  }`}
              >
                <span className="text-red-500 font-medium text-[13.5px] lg:text-[14px] xl:text-[14.5px] 2xl:text-[15px] flex justify-center">{feedbackMessage}</span>
                {/* {feedbackMessage.includes("successful") && <Circle />} */}
              </p>
            )}

            {/* Sign Up Link */}
            <Link to={"/Signup"} className="text-center flex items-center justify-center mt-[2px] text-[15px] 2xl:text-[16px]">
              Don’t have an account ?
              <span className="font-medium cursor-pointer pl-1 signup_link">
                Sign up
              </span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}