import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginOrSignup from "./component/User/LoginOrSignup";
import store from "./store";
import { loadUser } from "./actions/userActions";
import { useSelector } from "react-redux";
import UserOptions from "./component/layout/Header/UserOptions.js";
import UpdatePassword from "./component/User/UpdatePassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import DashBoard from "./component/Admin/DashBoard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import UsersList from "./component/Admin/UsersList";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import NotFound from "./component/layout/Not Found/NotFound";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route extact path="/" element={<Home />} />
        <Route extact path="/contact" element={<Contact />} />
        <Route extact path="/about" element={<About />} />

        <Route extact path="/product/:id" element={<ProductDetails />} />
        <Route extact path="/products" element={<Products />} />
        <Route extact path="/products/:keyword" element={<Products />} />

        <Route extact path="/Search" element={<Search />} />
        <Route extact path="/login" element={<LoginOrSignup />} />
        <Route
          extact
          path="/account"
          element={
            isAuthenticated ? (
              <Profile />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />
        <Route
          extact
          path="/password/update"
          element={
            isAuthenticated ? (
              <UpdatePassword />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />
        <Route extact path="/password/forgot" element={<ForgotPassword />} />
        <Route
          extact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route extact path="/cart" element={<Cart />} />

        <Route
          extact
          path="/me/update"
          element={
            isAuthenticated ? (
              <UpdateProfile />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />

        <Route
          extact
          path="/login/shipping"
          element={
            isAuthenticated ? (
              <Shipping />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />
        <Route
          extact
          path="/order/confirm"
          element={
            isAuthenticated ? (
              <ConfirmOrder />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />
        {stripeApiKey && (
          <Route
            extact
            path="/process/payment"
            element={
              isAuthenticated ? (
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
        )}
        <Route
          extact
          path="/success"
          element={
            isAuthenticated ? (
              <OrderSuccess />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />
        <Route
          extact
          path="/orders"
          element={
            isAuthenticated ? (
              <MyOrders />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />
        <Route
          extact
          path="/order/:id"
          element={
            isAuthenticated ? (
              <OrderDetails />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />
        <Route
          extact
          path="/admin/dashboard"
          element={
            isAuthenticated && user.role === "admin" ? (
              <DashBoard />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />
        <Route
          extact
          path="/admin/products"
          element={
            isAuthenticated && user.role === "admin" ? (
              <ProductList />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />
        <Route
          extact
          path="/admin/product"
          element={
            isAuthenticated && user.role === "admin" ? (
              <NewProduct />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />
        <Route
          extact
          path="/admin/product/:id"
          element={
            isAuthenticated && user.role === "admin" ? (
              <UpdateProduct />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />
        <Route
          extact
          path="/admin/orders"
          element={
            isAuthenticated && user.role === "admin" ? (
              <OrderList />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />
        <Route
          extact
          path="/admin/order/:id"
          element={
            isAuthenticated && user.role === "admin" ? (
              <ProcessOrder />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />
        <Route
          extact
          path="/admin/users"
          element={
            isAuthenticated && user.role === "admin" ? (
              <UsersList />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />
        <Route
          extact
          path="/admin/user/:id"
          element={
            isAuthenticated && user.role === "admin" ? (
              <UpdateUser />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />
        <Route
          extact
          path="/admin/reviews"
          element={
            isAuthenticated && user.role === "admin" ? (
              <ProductReviews />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
