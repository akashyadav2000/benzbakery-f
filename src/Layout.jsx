import React, { useEffect } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPurchaseHistory } from "./components/Store/authSlice";

function Layout() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Fetch purchase history when authenticated
  useEffect(() => {
    if (isAuthenticated && user?.email) {
      dispatch(fetchPurchaseHistory(user.email));
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
