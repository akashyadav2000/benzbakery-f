import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { CircleCheckBig, Mail, MoveRight } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Footer = () => {
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    email: "",
  });

  const validateInputs = () => {
    const updatedErrorMessages = {
      email: /^[^\s@]+@([^\s@]+\.)?gmail\.com$/.test(email) && email.length <= 50
        ? ""
        : "Please enter a valid email",
    };
    const isValid = Object.values(updatedErrorMessages).every(
      (message) => message === ""
    );

    setErrorMessages(updatedErrorMessages);

    return { isValid, updatedErrorMessages };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { isValid } = validateInputs();

    if (isValid) {
      setFeedbackMessage("");
      try {
        const result = await axios.post("https://benz-1vam.onrender.com/newsLetter", { email });
        setFeedbackMessage("Thank you for subscribing!");
        setEmail(""); // Clear the input field
        setTimeout(() => setFeedbackMessage(""), 20000000);
      } catch (err) {
        if (err.response && err.response.data) {
          setFeedbackMessage(err.response.data.message || "An error occurred. Please try again.");
        } else {
          setFeedbackMessage("An error occurred. Please try again.");
        }
      }
    }
    // else {
    //   setFeedbackMessage("Please correct the highlighted errors.");
    // }
  };
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // closeMobileMenu();
  };
  return (
    <footer className="roboto-serif bg-gradient-to-r from-[#0a0a3c] to-[#3a0a1c] text-white max-[450px]:px-4 px-10 sm:px-2 md:px-5  xl:px-18 py-5">
      {/* Main Content */}
      <div className="flex flex-wrap max-[450px]:justify-between justify-evenly">
        {/* Logo & About */}
        <div className="flex lg:flex-wrap items-center max-[1024px]:justify-center w-full lg:w-70 xl:w-85 space-y-0 md:space-y-4">
          <LazyLoadImage
            src="/pink.png"
            alt="Logo"
            className="w-11 md:w-12 lg:w-13 xl:w-14"
          />
          <p className="pl-5 lg:pl-0 max-[450px]:text-[13.5px] text-[14.5px] sm:text-[15px] lg:text-[15.5px] xl:text-[16px] 2xl:text-[17px] font-normal text-justify">
            We aim to provide fresh and high-quality baked goods. So please
            enjoy, this is our tradition.
          </p>
        </div>

        {/* Shop Info */}
        <div className="max-[450px]:w-55 w-62 xl:w-75 mt-6 lg:mt-0">
          <h2 className="max-[450px]:text-[14.5px] text-[15.5px] sm:text-[16px] md:text-[16.5px] lg:text-[17.5px] xl:text-[18px] 2xl:text-[19px] font-medium text-pink-400 underline underline-offset-5 mb-2">
            Shop
          </h2>
          <p className="max-[450px]:text-[13.5px] text-[14.5px] sm:text-[15px] lg:text-[15.5px] xl:text-[16px] 2xl:text-[17px] leading-normal font-normal text-justify">
            Tembipada Road, Bhandup (West), Mumbai, 400078, India
          </p>
          <a
            href="mailto:akashvinodyadav11@gmail.com"
            className="text-pink-400 max-[450px]:text-[13.5px] text-[14.5px] sm:text-[15px] lg:text-[15.5px] xl:text-[16px] 2xl:text-[17px] font-normal underline"
          >
            akashvinodyadav11@gmail.com
          </a>
          <p className="mt-2 font-normal max-[450px]:text-[13.5px] text-[14.5px] sm:text-[15px] lg:text-[15.5px] xl:text-[16px] 2xl:text-[17px]">
            Mon - Sun: 10 AM - 10 PM
          </p>
        </div>

        {/* Links */}
        <div className="w-19 xl:w-21 mt-6 lg:mt-0">
          <h2 className="max-[450px]:text-[14.5px] text-[15.5px] sm:text-[16px] md:text-[16.5px] lg:text-[17.5px] xl:text-[18px] 2xl:text-[19px] font-medium text-pink-400 underline underline-offset-5 mb-2">
            Links
          </h2>
          <ul className="space-y-[5px] max-[450px]:text-[13.5px] text-[14.5px] sm:text-[15px] lg:text-[15.5px] xl:text-[16px] 2xl:text-[17px]">
            <li>
              <Link to="/" className="hover:text-pink-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/About" className="hover:text-pink-400">
                About
              </Link>
            </li>
            <li>
              <Link to="/Feedback" className="hover:text-pink-400">
                Feedback
              </Link>
            </li>
            <li>
              <Link to="/Login" className="hover:text-pink-400">
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter & Socials */}
        <div className="w-full sm:w-60 md:w-77 xl:w-85 mt-6 lg:mt-0">
          <h2 className="max-[450px]:text-[14.5px] text-[15.5px] sm:text-[16px] md:text-[16.5px] lg:text-[17.5px] xl:text-[18px] 2xl:text-[19px] font-medium text-pink-400 underline underline-offset-5 mb-2">
            Newsletter
          </h2>
          <form onSubmit={handleSubmit} className="flex items-center border-b border-gray-500 pb-2 mb-2">
            <Mail className="text-white" />
            <input
              type="email"
              placeholder="Enter your email id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent items-center text-center mx-2 outline-none max-[450px]:text-[13.5px] text-[14.5px] sm:text-[15px] lg:text-[15.5px] xl:text-[16px] 2xl:text-[17px] w-full"
            />
            <button type="submit" className="text-white hover:text-pink-400">
              <MoveRight />
            </button>
          </form>

          {errorMessages.email && (
            <p className="text-center max-[450px]:text-[14.5px] text-[15.5px] sm:text-[16px] md:text-[16.5px] lg:text-[17.5px] xl:text-[18px] 2xl:text-[19px]  text-red-500 -mb-3 font-normal">
              {errorMessages.email}
            </p>
          )}

          {!errorMessages.email && feedbackMessage && (
            <div
              className={`font-medium flex items-center justify-center -mb-3 ${feedbackMessage.includes("subscribing")
                ? "text-green-500 max-[450px]:text-[14.5px] text-[15.5px] sm:text-[16px] md:text-[16.5px] lg:text-[17.5px] xl:text-[18px] 2xl:text-[19px] font-normal"
                : "text-red-500 max-[450px]:text-[14.5px] text-[15.5px] sm:text-[16px] md:text-[16.5px] lg:text-[17.5px] xl:text-[18px] 2xl:text-[19px]  font-normal"
                }`}
            >
              {feedbackMessage}
              {feedbackMessage.includes("subscribing")}
            </div>
          )}

          <div className="flex justify-between  max-[450px]:px-8 px-15 sm:px-6 lg:px-8 items-center mt-6 cursor-pointer">
            <FaFacebookF className="text-[24px] sm:text-[25px] md:text-[26px] lg:text-[27px] hover:text-[#0055ff] " />
            <FaInstagram className="text-[24px] sm:text-[25px] md:text-[26px] lg:text-[27px] hover:text-[#e23670]" />
            <FaTwitter className="text-[24px] sm:text-[25px] md:text-[26px] lg:text-[27px] hover:text-[#26a4f2]" />
            <FaYoutube className="text-[24px] sm:text-[25px] md:text-[26px] lg:text-[27px] hover:text-[#ff1a1a]" />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white mt-4 pt-4 text-center max-[450px]:text-[13.5px] text-[14.5px] sm:text-[15px] lg:text-[15.5px] xl:text-[16px] 2xl:text-[17px] text-pink-400">
        Designed and developed by Akash Yadav.
      </div>
    </footer>
  );
};

export default Footer;