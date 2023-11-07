import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./utilities/ProtectedRoute";
import NoInternet from "./pages/errors/NoInternet";
import Home from "./pages/home/Home";
import Customers from "./pages/customers/Customers";
import CustomerDetails from "./pages/customers/CustomerDetails";
import Drivers from "./pages/drivers/Drivers";
import DriverDetails from "./pages/drivers/DriverDetails";
import CreateDriver1 from "./pages/drivers/CreateDriver1";
import CreateDriver2 from "./pages/drivers/CreateDriver2";
import CreateDriver3 from "./pages/drivers/CreateDriver3";
import UpdateDriver1 from "./pages/drivers/UpdateDriver1";
import UpdateDriver2 from "./pages/drivers/UpdateDriver2";
import UpdateDriver3 from "./pages/drivers/UpdateDriver3";
import Warehouses from "./pages/warehouses/Warehouses";
import CreateWarehouse from "./pages/warehouses/CreateWarehouse";
import WarehouseDetails from "./pages/warehouses/WarehouseDetails";
import Bookings from "./pages/bookings/Bookings";
import BookingDetails from "./pages/bookings/BookingDetails";
import Vehicles from "./pages/vehicles/Vehicles";
import Categories from "./pages/categories/Categories";
import FAQ from "./pages/faq/FAQ";
import Banners from "./pages/banners/Banners";
import Charges from "./pages/charges/Charges";
import Support from "./pages/support/Support";
import Logistics from "./pages/logistics/Logistics";
import Roles from "./pages/roles/Roles";
import PrivacyPolicy from "./pages/privacy/PrivacyPolicy";
import Terms from "./pages/terms/Terms";
import Units from "./pages/units/Units";
import Employees from "./pages/employees/Employees";
import Notifications from "./pages/notifications/Notifications";
import Tracking from "./pages/live-tracking/Tracking";

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
                  path="/track-order"
                  element={<ProtectedRoute Component={Tracking} />}
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
                  path="/driver-details"
                  element={<ProtectedRoute Component={DriverDetails} />}
                />
                <Route
                  exact
                  path="/create-driver/step-one"
                  element={<ProtectedRoute Component={CreateDriver1} />}
                />
                <Route
                  exact
                  path="/create-driver/step-two"
                  element={<ProtectedRoute Component={CreateDriver2} />}
                />
                <Route
                  exact
                  path="/create-driver/step-three"
                  element={<ProtectedRoute Component={CreateDriver3} />}
                />
                <Route
                  exact
                  path="/update-driver/personal-info"
                  element={<ProtectedRoute Component={UpdateDriver1} />}
                />
                <Route
                  exact
                  path="/update-driver/vehicle-info"
                  element={<ProtectedRoute Component={UpdateDriver2} />}
                />
                <Route
                  exact
                  path="/update-driver/license-info"
                  element={<ProtectedRoute Component={UpdateDriver3} />}
                />
                <Route
                  exact
                  path="/employees"
                  element={<ProtectedRoute Component={Employees} />}
                />
                <Route
                  exact
                  path="/warehouses"
                  element={<ProtectedRoute Component={Warehouses} />}
                />
                <Route
                  exact
                  path="/create-warehouse"
                  element={<ProtectedRoute Component={CreateWarehouse} />}
                />
                <Route
                  exact
                  path="/warehouse-details"
                  element={<ProtectedRoute Component={WarehouseDetails} />}
                />
                <Route
                  exact
                  path="/logistics"
                  element={<ProtectedRoute Component={Logistics} />}
                />
                <Route
                  exact
                  path="/bookings"
                  element={<ProtectedRoute Component={Bookings} />}
                />
                <Route
                  exact
                  path="/booking-details"
                  element={<ProtectedRoute Component={BookingDetails} />}
                />
                <Route
                  exact
                  path="/vehicles"
                  element={<ProtectedRoute Component={Vehicles} />}
                />
                <Route
                  exact
                  path="/banners"
                  element={<ProtectedRoute Component={Banners} />}
                />
                <Route
                  exact
                  path="/categories"
                  element={<ProtectedRoute Component={Categories} />}
                />
                <Route
                  exact
                  path="/units"
                  element={<ProtectedRoute Component={Units} />}
                />
                <Route
                  exact
                  path="/charges"
                  element={<ProtectedRoute Component={Charges} />}
                />
                <Route
                  exact
                  path="/faqs"
                  element={<ProtectedRoute Component={FAQ} />}
                />
                <Route
                  exact
                  path="/roles"
                  element={<ProtectedRoute Component={Roles} />}
                />
                <Route
                  exact
                  path="/support"
                  element={<ProtectedRoute Component={Support} />}
                />
                <Route
                  exact
                  path="/privacy-policy"
                  element={<ProtectedRoute Component={PrivacyPolicy} />}
                />
                <Route
                  exact
                  path="/terms-and-conditions"
                  element={<ProtectedRoute Component={Terms} />}
                />
                <Route
                  exact
                  path="/notifications"
                  element={<ProtectedRoute Component={Notifications} />}
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
