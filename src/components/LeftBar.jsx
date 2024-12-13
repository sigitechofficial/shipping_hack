import React, { useContext } from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { BiPlusMedical } from "react-icons/bi";
import { BsBookHalf, BsFillFileEarmarkRuledFill } from "react-icons/bs";
import {
  FaBan,
  FaCar,
  FaQuestion,
  FaUnity,
  FaUserNurse,
  FaUserTie,
  FaWarehouse,
} from "react-icons/fa";
import { GiPriceTag } from "react-icons/gi";
import { HiUsers } from "react-icons/hi";
import { MdCategory } from "react-icons/md";
import {
  RiCheckboxMultipleFill,
  RiDashboardFill,
  RiFlag2Fill,
} from "react-icons/ri";
import { SiGnuprivacyguard } from "react-icons/si";
import { SiLogstash } from "react-icons/si";
import { TbBellRinging, TbCapture } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import { info_toaster } from "../utilities/Toaster";
import { LayoutContext } from "./Layout";
import ListItem from "./ListItem";

export default function LeftBar() {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  const { setLoader } = useContext(LayoutContext);
  const location = useLocation().pathname;
  const logoutFunc = (e) => {
    e.preventDefault();
    setLoader(true);
    setTimeout(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("loginStatus");
      localStorage.removeItem("orderId");
      localStorage.removeItem("trackId");
      localStorage.removeItem("driverId");
      navigate("/sign-in");
      info_toaster("Successfully Logged out!");
    }, 400);
  };
  
  return (
    <div
      className={`w-64 fixed h-[calc(100%-92px)] top-[92px] py-7 xl:pl-6 pl-3 flex bg-white border-black flex-col justify-between border-r border-opacity-10`}
    >
      <div className="flex flex-col gap-y-5 h-[88%] overflow-auto sidebar xl:pr-2 pr-1">
        <ListItem
          to={"/"}
          Icon={RiDashboardFill}
          title="Home"
          userType={userType === "Employee" ? true : false}
        />
        <ListItem
          to={"/track-order"}
          Icon={TbCapture}
          title="Track Order"
          userType={userType === "Employee" ? true : false}
        />
        <ListItem
          to={"/customers"}
          Icon={HiUsers}
          title="Customers"
          active={location === "/customer-details" && true}
          userType={false}
        />
        <ListItem
          to={"/drivers"}
          Icon={FaUserNurse}
          title="Drivers"
          active={
            location === "/create_driver" ||
            location === "/driver-details" ||
            location === "/create-driver/step-one" ||
            location === "/create-driver/step-two" ||
            (location === "/create-driver/step-three" && true)
          }
          userType={userType === "Employee" ? true : false}
        />
        <ListItem
          to={"/employees"}
          Icon={FaUserTie}
          title="Employees"
          userType={userType === "Employee" ? true : false}
        />

        <ListItem
          to={"/roles"}
          Icon={RiCheckboxMultipleFill}
          title="Roles & Permission"
          userType={userType === "Employee" ? true : false}
        />

        <ListItem
          to={"/warehouses"}
          Icon={FaWarehouse}
          title="Warehouses"
          active={
            location === "/create-warehouse" ||
            (location === "/warehouse-details" && true)
          }
          userType={userType === "Employee" ? true : false}
        />
        <ListItem
          to={"/logistics"}
          Icon={SiLogstash}
          title="Logistic Companies"
          userType={false}
        />
        <ListItem
          to={"/bookings"}
          Icon={BsBookHalf}
          title="Bookings"
          active={location === "/booking-details" && true}
          userType={userType === "Employee" ? true : false}
        />
        <ListItem
          to={"/vehicles"}
          Icon={FaCar}
          title="Vehicle Types"
          userType={userType === "Employee" ? true : false}
        />
        <ListItem
          to={"/banners"}
          Icon={RiFlag2Fill}
          title="Banners"
          userType={userType === "Employee" ? true : false}
        />
        <ListItem
          to={"/categories"}
          Icon={MdCategory}
          title="Categories"
          userType={userType === "Employee" ? true : false}
        />
        <ListItem
          to={"/units"}
          Icon={FaUnity}
          title="Unit Management"
          userType={false}
        />
        <ListItem
          to={"/charges"}
          Icon={GiPriceTag}
          title="Charges"
          userType={userType === "Employee" ? true : false}
        />
        <ListItem
          to={"/faqs"}
          Icon={FaQuestion}
          title="FAQ's"
          userType={false}
        />

        <ListItem
          to={"/restricted-items"}
          Icon={FaBan}
          title="Restricted Items"
          userType={userType === "Employee" ? true : false}
        />
        <ListItem
          to={"/notifications"}
          Icon={TbBellRinging}
          title="Notifications"
          userType={userType === "Employee" ? true : false}
        />
        <ListItem
          to={"/support"}
          Icon={BiPlusMedical}
          title="Support"
          userType={userType === "Employee" ? true : false}
        />
        <ListItem
          to={"/privacy-policy"}
          Icon={SiGnuprivacyguard}
          title="Privacy Policy"
          userType={userType === "Employee" ? true : false}
        />
        <ListItem
          to={"/terms-and-conditions"}
          Icon={BsFillFileEarmarkRuledFill}
          title="Terms & Conditions"
          userType={userType === "Employee" ? true : false}
        />
      </div>
      <ul className="xl:pr-2 pr-1 relative">
        <li>
          <button
            onClick={logoutFunc}
            className={`w-full flex items-center gap-x-4 px-4 py-2 rounded text-black text-opacity-40 font-medium xl:text-lg text-base focus:bg-themeBlue focus:text-themeOrange focus:text-opacity-100`}
          >
            <AiOutlinePoweroff size={24} />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
