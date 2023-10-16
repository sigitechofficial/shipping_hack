import React, { useContext } from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { BiPlusMedical } from "react-icons/bi";
import { BsBookHalf, BsFillFileEarmarkRuledFill } from "react-icons/bs";
import {
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
import { TbBellRinging } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import { info_toaster } from "../utilities/Toaster";
import { LayoutContext } from "./Layout";
import ListItem from "./ListItem";

export default function LeftBar() {
  const navigate = useNavigate();
  const { setLoader } = useContext(LayoutContext);
  const location = useLocation().pathname;
  const logoutFunc = (e) => {
    e.preventDefault();
    setLoader(true);
    setTimeout(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("loginStatus");
      navigate("/sign-in");
      info_toaster("Successfully Logged out!");
    }, 400);
  };
  return (
    <div
      className={`w-64 fixed h-[calc(100%-92px)] top-[92px] py-7 xl:pl-6 pl-3 flex bg-white border-black flex-col justify-between border-r border-opacity-10`}
    >
      <ul className="flex flex-col gap-y-5 h-[88%] overflow-auto sidebar xl:pr-2 pr-1">
        <ListItem to={"/"} Icon={RiDashboardFill} title="Home" />
        <ListItem
          to={"/customers"}
          Icon={HiUsers}
          title="Customers"
          active={location === "/customer-details" && true}
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
        />
        <ListItem to={"/employees"} Icon={FaUserTie} title="Employees" />
        <ListItem
          to={"/warehouses"}
          Icon={FaWarehouse}
          title="Warehouses"
          active={
            location === "/create-warehouse" ||
            (location === "/warehouse-details" && true)
          }
        />
        <ListItem
          to={"/logistics"}
          Icon={SiLogstash}
          title="Logistic Companies"
        />
        <ListItem
          to={"/bookings"}
          Icon={BsBookHalf}
          title="Bookings"
          active={location === "/booking-details" && true}
        />
        <ListItem to={"/vehicles"} Icon={FaCar} title="Vehicle Types" />
        <ListItem to={"/banners"} Icon={RiFlag2Fill} title="Banners" />
        <ListItem to={"/categories"} Icon={MdCategory} title="Categories" />
        <ListItem to={"/units"} Icon={FaUnity} title="Unit Management" />
        <ListItem to={"/charges"} Icon={GiPriceTag} title="Charges" />
        <ListItem to={"/faqs"} Icon={FaQuestion} title="FAQ's" />
        <ListItem
          to={"/roles"}
          Icon={RiCheckboxMultipleFill}
          title="Roles & Permission"
        />{" "}
        <ListItem
          to={"/notifications"}
          Icon={TbBellRinging}
          title="Notifications"
        />
        <ListItem to={"/support"} Icon={BiPlusMedical} title="Support" />
        <ListItem
          to={"/privacy-policy"}
          Icon={SiGnuprivacyguard}
          title="Privacy Policy"
        />
        <ListItem
          to={"/terms-and-conditions"}
          Icon={BsFillFileEarmarkRuledFill}
          title="Terms & Conditions"
        />
      </ul>
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
