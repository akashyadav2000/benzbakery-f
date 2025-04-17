import React, { useState } from "react";
import axios from "axios";
// import './Feedback.css'

function Feedback() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [productName, setProductName] = useState("");
  const [message, setMessage] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    name: "",
    email: "",
    productName: "",
    message: "",
  });

  const validateInputs = () => {
    const updatedErrorMessages = {
      name: /^[A-Za-z][A-Za-z\s]*$/.test(name) && name.length <= 40
        ? ""
        : "Name should only contain alphabets",
      email: /^[^\s@]+@([^\s@]+\.)?gmail\.com$/.test(email) && email.length <= 40
        ? ""
        : "Please enter a valid email id",
      productName: /^[A-Za-z][A-Za-z\s]*$/.test(productName) && productName.length <= 40
        ? ""
        : "Product name only contain alphabets",
      message: /^[A-Za-z][A-Za-z\s]*$/.test(message) && message.length <= 200
        ? ""
        : "Please enter your message",
    };

    setErrorMessages(updatedErrorMessages);

    return Object.values(updatedErrorMessages).every((msg) => msg === "");
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (validateInputs()) {
      const formData = { name, email, productName, message };

      try {
        const res = await axios.post("https://benzbakery-backend.onrender.com/feedback", formData, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (res.data.status === "Success") {
          setFeedbackMessage("Your details have been successfully submitted.");
          setName("");
          setEmail("");
          setProductName("");
          setMessage("");
          setTimeout(() => {
            setFeedbackMessage("");
          }, 2000);
        } else {
          setFeedbackMessage("An error occurred. Please try again.");
        }
      } catch (err) {
        setFeedbackMessage("An error occurred. Please try again.");
      }
    } else {
      setFeedbackMessage("Please correct the highlighted errors.");
    }
  };

  const handleClosePopup = () => {
    setFeedbackMessage("");
  };

  return (
    <div className="roboto-serif about-background pt-14 h-screen flex items-center justify-evenly transition-all duration-500 ease-in-out">
      <form onSubmit={onSubmit} className="flex flex-col items-start">
        <div className="flex flex-col">
          <span className="font-medium leading-none xl:leading-tight max-[450px]:text-[22px] text-[24px] lg:text-[26px] xl:text-[28px] 2xl:text-[30px] text-[#3498ff]">
            Feedback Form
          </span>
          <hr className="border-t-2 border-gray-500 w-auto mb-3 lg:mb-4 xl:mb-6" />
        </div>

        <span className="max-[450px]:text-[16px] text-[17px] xl:text-[18px] 2xl:text-[18.5px] font-normal mb-[1px]">Name</span>
        <input
          type="text"
          name="name"
          required
          className="max-[450px]:w-[19rem] w-[25rem] h-[33px] lg:h-[34px] xl:h-[36px] 2xl:h-[37px] outline-none mb-[4px] px-[10px] max-[450px]:text-[15px] text-[15.5px] xl:text-[16px] 2xl:text-[16.5px] font-poppins font-normal bg-white text-[#0090ff] rounded-md border border-[#7a7a7a] border-b-2 transition-all duration-300 ease-in-out focus:scale-100.5 focus:border-[#4facfe]"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={40}
        />
        <p className="text-red-500 text-[12.5px] sm:text-[13px] lg:text-[13.5px] xl:text-[14px] font-medium mb-[1px] ml-2 max-[450px]:mt-[-3px]">
          {errorMessages.name}
        </p>

        <span className="max-[450px]:text-[16px] text-[17px] xl:text-[18px] 2xl:text-[18.5px] font-normal mb-[1px]">Email id</span>
        <input
          type="email"
          name="email"
          required
          className="max-[450px]:w-[19rem] w-[25rem] h-[33px] lg:h-[34px] xl:h-[36px] 2xl:h-[37px] outline-none mb-[4px] px-[10px] max-[450px]:text-[15px] text-[15.5px] xl:text-[16px] 2xl:text-[16.5px] font-poppins font-normal bg-white text-[#0090ff] rounded-md border border-[#7a7a7a] border-b-2 transition-all duration-300 ease-in-out focus:scale-100.5 focus:border-[#4facfe]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={40}
        />
        <p className="text-red-500 text-[12.5px] sm:text-[13px] lg:text-[13.5px] xl:text-[14px] font-medium  ml-2 max-[450px]:mt-[-3px]">
          {errorMessages.email}
        </p>

        <span className="max-[450px]:text-[16px] text-[17px] xl:text-[18px] 2xl:text-[18.5px] font-normal mb-[1px]">Product Name</span>
        <input
          type="text"
          name="productName"
          required
          className="max-[450px]:w-[19rem] w-[25rem] h-[33px] lg:h-[34px] xl:h-[36px] 2xl:h-[37px] outline-none mb-[4px] px-[10px] max-[450px]:text-[15px] text-[15.5px] xl:text-[16px] 2xl:text-[16.5px] font-poppins font-normal bg-white text-[#0090ff] rounded-md border border-[#7a7a7a] border-b-2 transition-all duration-300 ease-in-out focus:scale-100.5 focus:border-[#4facfe]"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          maxLength={40}
        />
        <p className="text-red-500 text-[12.5px] sm:text-[13px] lg:text-[13.5px] xl:text-[14px] font-medium ml-2 max-[450px]:mt-[-3px]">
          {errorMessages.productName}
        </p>

        <span className="max-[450px]:text-[16px] text-[17px] xl:text-[18px] 2xl:text-[18.5px] font-normal mb-[1px]">Message</span>
        <textarea
          name="message"
          required
          className="max-[450px]:w-[19rem] w-[25rem] h-[120px] lg:h-[98px] xl:h-[124px] 2xl:h-[127px] outline-none resize-none text-justify leading-snug mb-[4px] px-[10px] pt-[6px] max-[450px]:text-[15px] text-[15.5px] xl:text-[16px] 2xl:text-[16.5px] font-poppins font-normal bg-white text-[#0090ff] rounded-md border border-[#7a7a7a] border-b-2 transition-all duration-300 ease-in-out focus:scale-100.5 focus:border-[#4facfe] "
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={200}
        ></textarea>
        <p className="text-red-500 text-[12.5px] sm:text-[13px] lg:text-[13.5px] xl:text-[14px] font-medium ml-2 mb-[-4px] max-[450px]:mt-[-3px]">
          {errorMessages.message}
        </p>

        <button
          type="submit"
          className="w-full py-[4px] lg:py-[4px] xl:py-[5px] mt-3 max-[450px]:text-[16px] text-[17px] xl:text-[17.5px] 2xl:text-[18px] font-medium text-white bg-gradient-to-r from-[#3498ff] to-[#00f2fe] rounded-md border-2 border-white transition-all duration-300 ease-in-out cursor-pointer hover:bg-gradient-to-r hover:from-[#ff91da] hover:to-[#d791ff] hover:text-black"
        >
          Submit
        </button>

        {feedbackMessage && (
          <div
            className={`font-medium text-center ${feedbackMessage.includes("submitted") ? "text-blue-700" : "text-red-600"
              }`}
          >
            {/* {feedbackMessage} */}
            {feedbackMessage.includes("submitted") && (
              <div className="fixed inset-0 z-40 max-[450px]:pt-[50px] pt-14 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-white max-[450px]:w-[17rem] w-[21rem] xl:w-[22rem] 2xl:w-[24rem] rounded-lg shadow-lg p-[16px] xl:p-[20px] 2xl:p-[22px] text-center">
                  <img src="./tick.webp" alt="tick" className="max-[450px]:w-13 w-15 xl:w-16 2xl:w-17 max-[450px]:-mt-[45px] -mt-[52px] mx-auto rounded-full shadow-md" />
                  <h2 className="max-[450px]:text-[18px] text-[20px] xl:text-[22px] 2xl:text-[24px] font-medium max-[450px]:mt-[8px] mt-[9px] xl:mt-[10px] 2xl:mt-[11px]">Thank You</h2>
                  <p className="max-[450px]:text-[15px] text-[16.5px] xl:text-[17.5px] 2xl:text-[19px] font-medium max-[450px]:mt-[3px] mt-[5px] xl:mt-[6px] 2xl:mt-[8px] leading-snug items-j">{feedbackMessage}</p>
                  <button
                    className="w-full max-[450px]:py-[3px] py-[4px] xl:py-[5px] 2xl:py-[5px] max-[450px]:mt-[12px] mt-[16px] xl:mt-[17px] 2xl:mt-[20px] bg-[#6fd649] text-black max-[450px]:text-[16px] text-[17px] xl:text-[18px] 2xl:text-[19px] font-medium rounded-md cursor-pointer"
                    onClick={handleClosePopup}
                  >
                    OK
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </form>

      <div className="hidden md:block">
        <img src="./flower.webp" alt="feedback-img" className="h-[26rem] lg:h-[26rem] xl:h-[30rem] 2xl:h-[31rem] rounded-md" />
      </div>
    </div>
  );
}

export default Feedback;