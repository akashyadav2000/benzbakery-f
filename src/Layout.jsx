import React, { useEffect } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPurchaseHistory } from "./components/Store/authSlice";
import { loadCartFromServer } from "./components/Store/cartSlice";

function Layout() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Fetch user data when authenticated
  useEffect(() => {
    if (isAuthenticated && user?.email) {
      // Load purchase history
      dispatch(fetchPurchaseHistory(user.email));

      // Load saved cart items
      dispatch(loadCartFromServer(user.email));
    }
  }, [isAuthenticated, user, dispatch]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
