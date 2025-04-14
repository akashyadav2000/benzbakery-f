import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./components/Store/store.js";
import { ErrorBoundary } from "react-error-boundary";
import "./index.css";
import "./App.css";

const Layout = lazy(() => import("./Layout.jsx"));
const Home = lazy(() => import("./components/Home/Home"));
const CakeContainer = lazy(() => import("./components/Cake/CakeContainer.jsx"));
const PastryContainer = lazy(() =>
  import("./components/Pastry/PastryContainer.jsx")
);
const CupCakeContainer = lazy(() =>
  import("./components/CupCake/CupCakeContainer.jsx")
);
const WeddingCakeContainer = lazy(() =>
  import("./components/WeddingCake/WeddingCakeContainer.jsx")
);
const ProductDetailsContainer = lazy(() =>
  import("./components/ProductDetails/ProductDetailsContainer.jsx")
);
const About = lazy(() => import("./components/About/About.jsx"));
const Feedback = lazy(() => import("./components/Feedback/Feedback.jsx"));
const Cart = lazy(() => import("./components/Cart/Cart.jsx"));
const Login = lazy(() => import("./components/Login/Login.jsx"));
const Signup = lazy(() => import("./components/Signup/Signup.jsx"));
const UserProfile = lazy(() => import("./components/Header/UserProfile.jsx"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="Cake" element={<CakeContainer />} />
      <Route path="Pastry" element={<PastryContainer />} />
      <Route path="CupCake" element={<CupCakeContainer />} />
      <Route path="WeddingCake" element={<WeddingCakeContainer />} />
      <Route path="ProductDetails" element={<ProductDetailsContainer />} />
      <Route path="About" element={<About />} />
      <Route path="Feedback" element={<Feedback />} />
      <Route path="Cart" element={<Cart />} />
      <Route path="Login" element={<Login />} />
      <Route path="Signup" element={<Signup />} />
      <Route path="UserProfile" element={<UserProfile />} />
    </Route>
  )
);

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="p-4 text-center">
      <h2>Something went wrong</h2>
      <p className="text-red-500">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Try Again
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>
);
