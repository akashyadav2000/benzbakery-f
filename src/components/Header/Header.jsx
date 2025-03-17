// Importing necessary tools from libraries
import React, { useState, useEffect } from "react"; // React and its hooks for state and side effects
import { Link as ScrollLink } from "react-scroll"; // For smooth scrolling to sections
import { Link, useLocation, useNavigate } from "react-router-dom"; // For page navigation
import { useSelector } from "react-redux"; // To access Redux store data
import { selectIsAuthenticated } from "../Store/authSlice"; // To check if user is logged in
import { HomeIcon, Cake, CakeSlice, IceCreamBowl, Gift, Info, ThumbsUp, X, Menu } from "lucide-react"; // Icons for the UI

// The Header component
const Header = () => {
  // Tools for navigation and location
  const navigate = useNavigate(); // Helps us move to different pages
  const location = useLocation(); // Tells us which page we’re on

  // States to manage the component
  const [activeSection, setActiveSection] = useState(null); // Tracks the current section in view
  const [menuOpen, setMenuOpen] = useState(false); // Controls if mobile menu is open or closed
  const [isScrolling, setIsScrolling] = useState(false); // Tracks if page is scrolling

  // Getting data from Redux store
  const cart = useSelector((store) => store.cart); // Cart items from store
  const isAuthenticated = useSelector(selectIsAuthenticated); // Check if user is logged in
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0); // Total items in cart

  // Function to scroll to a section when a navigation item is clicked
  const handleSectionClick = (sectionId) => {
    if (activeSection === sectionId) return; // If already on this section, do nothing
    setIsScrolling(true); // Mark that we’re scrolling

    // If not on homepage, go to homepage and scroll to section later
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      // Scroll to the section on the current page
      const section = document.getElementById(sectionId);
      if (section) {
        const offset = 56; // Space for the fixed header
        const position = section.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: position, behavior: "smooth" }); // Smooth scroll
      }
    }

    setActiveSection(sectionId); // Update active section
    setMenuOpen(false); // Close mobile menu
    setTimeout(() => setIsScrolling(false), 1000); // Reset scrolling flag after 1 second
  };

  // Effect to highlight the section in view while scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return; // Don’t run if we’re already scrolling
      const sections = ["home", "cake", "pastry", "cupCake", "weddingCake"];

      // Loop through sections to find which one is in view
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) { // Section is near top of screen
            setActiveSection(section);
            break; // Stop once we find the section
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll); // Listen to scroll events
    return () => window.removeEventListener("scroll", handleScroll); // Clean up listener
  }, [isScrolling]);

  // Effect to reset active section on certain pages
  useEffect(() => {
    const noScrollPages = ["/About", "/Feedback", "/Cart", "/Login"];
    if (noScrollPages.includes(location.pathname)) {
      setActiveSection(null); // Clear active section
    }
  }, [location.pathname]);

  // Effect to close mobile menu when screen size increases
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1100) setMenuOpen(false); // Close menu on big screens
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Effect to stop body scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto"; // Lock or unlock scroll
  }, [menuOpen]);

  // Function to go to cart page or login page
  const handleCartClick = (e) => {
    e.preventDefault(); // Stop default link behavior
    setMenuOpen(false); // Close mobile menu
    navigate(isAuthenticated ? "/Cart" : "/Login"); // Go to cart if logged in, else login
  };

  // Function to go to user profile or login page
  const handleLoginClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    navigate(isAuthenticated ? "/UserProfile" : "/Login"); // Profile if logged in, else login
  };

  // List of navigation items with their details
  const navigationItems = [
    { id: "home", label: "Home", icon: <HomeIcon size={17} />, type: "scroll" },
    { id: "cake", label: "Cake", icon: <Cake size={17} />, type: "scroll" },
    { id: "pastry", label: "Pastry", icon: <CakeSlice size={17} />, type: "scroll" },
    { id: "cupCake", label: "Cup Cake", icon: <IceCreamBowl size={17} />, type: "scroll" },
    { id: "weddingCake", label: "Wedding Cake", icon: <Gift size={17} />, type: "scroll" },
    { id: "about", path: "/About", label: "About", icon: <Info size={17} />, type: "link" },
    { id: "feedback", path: "/Feedback", label: "Feedback", icon: <ThumbsUp size={17} />, type: "link" },
  ];

  const isLoginOrCartPage = ["/Login", "/Cart"].includes(location.pathname); // Check current page

  // The UI part of the component
  return (
    <>
      {/* Fixed header at the top */}
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between bg-white shadow-md h-[50px] sm:h-14 px-[10px] sm:px-4 border-b border-[#002a1b] z-50">
        {/* Logo */}
        <div className="flex items-center">
          <ScrollLink
            to="home"
            smooth={true}
            duration={400}
            offset={-56}
            spy={true}
            onSetActive={() => !isScrolling && setActiveSection("home")}
            onClick={() => handleSectionClick("home")}
            className="cursor-pointer"
          >
            <img src="/Benz_Logo.png" alt="Lodha Preferred Partner" className="h-9 md:h-11 w-auto" />
          </ScrollLink>
        </div>

        {/* Navigation links for desktop */}
        <div className="mx-auto">
          <ul className="flex space-x-5 max-xl:space-x-2 green-text text-sm font-medium max-[1100px]:hidden">
            {navigationItems.map((item) => (
              <li key={item.id} className="flex flex-col items-center justify-center cursor-pointer">
                {item.type === "scroll" ? (
                  <ScrollLink
                    to={item.id}
                    smooth={true}
                    duration={400}
                    offset={-56}
                    spy={true}
                    onSetActive={() => !isScrolling && setActiveSection(item.id)}
                    onClick={() => handleSectionClick(item.id)}
                    className={`flex items-center gap-1 px-2 py-1 rounded-t-sm transition-all duration-300 
                      ${activeSection === item.id ? "bg-[#2aff5126] green-text" : "green-text"} hover:bg-[#2aff5126] hover:green-text`}
                  >
                    {item.icon}
                    <span className="text-[16px] xl:text-[16.5px] pl-1">{item.label}</span>
                  </ScrollLink>
                ) : (
                  <Link
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-1 px-2 py-1 rounded-t-sm transition-all duration-300 
                      ${location.pathname === item.path && !isLoginOrCartPage ? "bg-[#2aff5126] green-text" : "green-text"} hover:bg-[#2aff5126] hover:green-text`}
                  >
                    {item.icon}
                    <span className="text-base pl-1">{item.label}</span>
                  </Link>
                )}
                {/* Highlight bar under active item */}
                <div
                  className={`h-[2px] w-full bg-green-600 rounded-full transition-all duration-300 ${(item.type === "scroll" && activeSection === item.id) ||
                    (item.type === "link" && location.pathname === item.path && !isLoginOrCartPage)
                    ? "opacity-100"
                    : "opacity-0"
                    } max-[1100px]:hidden`}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Cart and Login buttons */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Link to="Cart" onClick={handleCartClick} className="relative flex items-center justify-center" aria-label="cart_btn">
            <img src="/cart-icon.png" className="h-[21px] sm:h-5.5 md:h-6.5 w-auto mr-[2px] sm:mr-1 lg:mr-3" alt="cart_img" />
            <span className="poppins absolute sm:top-[4%] lg:top-[5%] left-[55%] sm:left-[53%] md:left-[46%] lg:left-[44.5%] transform -translate-x-1/2 -translate-y-1/3 text-red-600 text-[14.5px] md:text-[15px] lg:text-[15.5px] font-semibold">
              {totalQuantity}
            </span>
          </Link>

          <Link onClick={handleLoginClick} className="flex items-center justify-center" aria-label="login_btn">
            <img src="/login-icon.png" className="h-[21px] sm:h-5.5 md:h-6.5 w-auto" alt="login_img" />
          </Link>

          {/* Mobile menu botton */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="hidden max-[1100px]:block pl-[1px] sm:p-0 focus:outline-none z-50 green-text" aria-label="menu_btn">
            {menuOpen ? <X className="w-7 h-7 md:w-8 md:h-8" /> : <Menu className="w-7 h-7 md:w-8 md:h-8" />}
          </button>
        </div>
      </nav>

      {/* Backdrop for mobile menu */}
      <div className={`fixed inset-0 backdrop-blur-sm z-40 transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setMenuOpen(false)} />

      {/* Mobile menu */}
      <div className={`fixed top-[50px] sm:top-14 right-0 h-[calc(100vh-50px)] sm:h-[calc(100vh-56px)] bg-white shadow-md z-50 transition-transform duration-300 ease-in-out w-[35%] min-w-[250px] max-w-[250px] sm:max-w-[35%] ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <ul className="flex flex-col space-y-2 p-4">
          {navigationItems.map((item) => (
            <li key={item.id} className="flex flex-col items-start justify-center cursor-pointer">
              {item.type === "scroll" ? (
                <ScrollLink
                  to={item.id}
                  smooth={true}
                  duration={400}
                  offset={-50}
                  spy={true}
                  onSetActive={() => !isScrolling && setActiveSection(item.id)}
                  onClick={() => handleSectionClick(item.id)}
                  className={`flex items-center gap-1 px-2 py-1 rounded-t-sm transition-all duration-300 
                    ${activeSection === item.id ? "bg-[#2aff5126] green-text" : "green-text"} hover:bg-[#2aff5126] hover:green-text`}
                >
                  {item.icon}
                  <span className="text-base pl-1">{item.label}</span>
                </ScrollLink>
              ) : (
                <Link
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all duration-300 
                    ${location.pathname === item.path && !isLoginOrCartPage ? "bg-[#02302029] green-text" : "green-text"} hover:bg-[#02302029] hover:green-text`}
                >
                  {item.icon}
                  <span className="text-base pl-1">{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Header;