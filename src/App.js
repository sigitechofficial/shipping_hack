import { ChakraProvider } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./utilities/ProtectedRoute";
import NoInternet from "./pages/errors/NoInternet";
import Home from "./pages/home/Home";
import Customers from "./pages/customers/Customers";
import CustomerDetails from "./pages/customers/CustomerDetails";
import Drivers from "./pages/drivers/Drivers";
import Warehouses from "./pages/warehouses/Warehouses";
import Bookings from "./pages/bookings/Bookings";
import Vehicles from "./pages/vehicles/Vehicles";
import FAQ from "./pages/faq/FAQ";

export default function App() {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);
  useEffect(() => {
    function handleOnlineStatusChange() {
      setIsOnline(window.navigator.onLine);
    }

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);
  return (
    <>
      {isOnline ? (
        <section className="font-fiexen">
          <ToastContainer />
          <ChakraProvider>
            <Router>
              <Routes>
                <Route exact path="/sign-in" element={<Login />} />
                <Route
                  exact
                  path="/"
                  element={<ProtectedRoute Component={Home} />}
                />
                <Route
                  exact
                  path="/customers"
                  element={<ProtectedRoute Component={Customers} />}
                />
                <Route
                  exact
                  path="/customer-details"
                  element={<ProtectedRoute Component={CustomerDetails} />}
                />
                <Route
                  exact
                  path="/drivers"
                  element={<ProtectedRoute Component={Drivers} />}
                />
                <Route
                  exact
                  path="/warehouses"
                  element={<ProtectedRoute Component={Warehouses} />}
                />
                <Route
                  exact
                  path="/bookings"
                  element={<ProtectedRoute Component={Bookings} />}
                />
                <Route
                  exact
                  path="/vehicles"
                  element={<ProtectedRoute Component={Vehicles} />}
                />
                <Route
                  exact
                  path="/faqs"
                  element={<ProtectedRoute Component={FAQ} />}
                />
              </Routes>
            </Router>
          </ChakraProvider>
        </section>
      ) : (
        <NoInternet />
      )}
    </>
  );
}
