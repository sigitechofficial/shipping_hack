import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import { PostAPI } from "../../utilities/PostAPI";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../utilities/Toaster";
import { BackButton } from "../../utilities/Buttons";
import { inputStyle, labelStyle, style } from "../../utilities/Input";
import Layout from "../../components/Layout";
import isValidEmail from "../../utilities/MailCheck";

export default function CreateWarehouse() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [warehouse, setWarehouse] = useState({
    email: "",
    password: "",
    companyName: "",
    country: "",
    province: "",
    district: "",
    city: "",
    completeAddress: "",
    located: "",
    countryCode: "507",
    phoneNum: "",
  });
  const onChange = (e) => {
    setWarehouse({ ...warehouse, [e.target.name]: e.target.value });
  };
  const createWarehouseFunc = async (e) => {
    e.preventDefault();
    if (warehouse.name === "") {
      info_toaster("Please enter Warehouse's Name");
    } else if (warehouse.email === "") {
      info_toaster("Please enter Warehouse's Email");
    } else if (!isValidEmail(warehouse.email)) {
      info_toaster("Please enter a valid email");
    } else if (warehouse.phoneNum === "") {
      info_toaster("Please enter Warehouse's Phone");
    } else if (warehouse.password === "") {
      info_toaster("Please create Warehouse's Password");
    } else if (warehouse.addressDBSId === "") {
      info_toaster("Please select Warehouse's DBS Code");
    } else {
      let res = await PostAPI("createwarehouse", {
        email: warehouse.email,
        password: warehouse.password,
        companyName: warehouse.companyName,
        country: warehouse.country,
        province: warehouse.province,
        district: warehouse.district,
        city: warehouse.city,
        completeAddress: warehouse.completeAddress,
        located: warehouse.country,
        countryCode: warehouse.countryCode,
        phoneNum: warehouse.phoneNum,
      });
      if (res?.data?.status === "1") {
        setWarehouse({
          email: "",
          password: "",
          companyName: "",
          country: "",
          province: "",
          district: "",
          city: "",
          completeAddress: "",
          located: "",
          countryCode: "507",
          phoneNum: "",
        });
        navigate("/warehouses");
        success_toaster(res?.data?.message);
      } else {
        error_toaster(res?.data?.message);
      }
    }
  };
  return (
    <>
      <style>{style}</style>
      <Layout
        title="Create Warehouse"
        content={
          <section className="space-y-4">
            <div>
              <BackButton />
            </div>
            <section className="grid grid-cols-12 gap-5">
              <form className="col-span-8 grid grid-cols-2 gap-x-20 gap-y-5 bg-white rounded-md p-8">
                <div className="space-y-1">
                  <label className={labelStyle} htmlFor="companyName">
                    Warehouse Name
                  </label>
                  <input
                    value={warehouse.companyName}
                    onChange={onChange}
                    type="text"
                    name="companyName"
                    id="companyName"
                    placeholder="Enter your Warehouse's Name"
                    className={inputStyle}
                  />
                </div>
                <div className="space-y-1">
                  <label className={labelStyle} htmlFor="email">
                    Warehouse Email
                  </label>
                  <input
                    value={warehouse.email}
                    onChange={onChange}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your Warehouse's Email"
                    className={inputStyle}
                  />
                </div>
                <div className="space-y-1">
                  <label className={labelStyle} htmlFor="phoneNum">
                    Warehouse Phone
                  </label>
                  <div className="flex gap-x-1">
                    <PhoneInput
                      inputStyle={{
                        display: "block",
                        width: "88px",
                        paddingTop: "22px",
                        paddingBottom: "22px",
                        background: "#F4F5FA",
                        color: "black",
                        border: "none",
                      }}
                      inputProps={{ id: "code", name: "code" }}
                      country="Panama"
                      value={warehouse.countryCode}
                      onChange={(e) =>
                        setWarehouse({ ...warehouse, countryCode: e })
                      }
                    />
                    <input
                      value={warehouse.phoneNum}
                      onChange={onChange}
                      type="number"
                      name="phoneNum"
                      id="phoneNum"
                      placeholder="Enter your Warehouse's Number"
                      className={inputStyle}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className={labelStyle} htmlFor="password">
                    Create Password
                  </label>
                  <div className="relative">
                    <input
                      value={warehouse.password}
                      onChange={onChange}
                      type={visible ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Create your Password"
                      className={inputStyle}
                      autoComplete="off"
                    />
                    <button
                      onClick={() => setVisible(!visible)}
                      type="button"
                      className="text-black text-opacity-40 absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      {visible ? (
                        <AiOutlineEye size={20} />
                      ) : (
                        <AiOutlineEyeInvisible size={20} />
                      )}
                    </button>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className={labelStyle} htmlFor="city">
                    City
                  </label>
                  <input
                    value={warehouse.city}
                    onChange={onChange}
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Enter your City"
                    className={inputStyle}
                  />
                </div>
                <div className="space-y-1">
                  <label className={labelStyle} htmlFor="district">
                    District
                  </label>
                  <input
                    value={warehouse.district}
                    onChange={onChange}
                    type="text"
                    name="district"
                    id="district"
                    placeholder="Enter your District"
                    className={inputStyle}
                  />
                </div>
                <div className="space-y-1">
                  <label className={labelStyle} htmlFor="province">
                    Province
                  </label>
                  <input
                    value={warehouse.province}
                    onChange={onChange}
                    type="text"
                    name="province"
                    id="province"
                    placeholder="Enter your Province"
                    className={inputStyle}
                  />
                </div>
                <div className="space-y-1">
                  <label className={labelStyle} htmlFor="country">
                    Country
                  </label>
                  <input
                    value={warehouse.country}
                    onChange={onChange}
                    type="text"
                    name="country"
                    id="country"
                    placeholder="Enter your Country"
                    className={inputStyle}
                  />
                </div>
                <div className="col-span-2 space-y-1">
                  <label className={labelStyle} htmlFor="completeAddress">
                    Address
                  </label>
                  <input
                    value={warehouse.completeAddress}
                    onChange={onChange}
                    type="text"
                    name="completeAddress"
                    id="completeAddress"
                    placeholder="Enter your Address"
                    className={inputStyle}
                  />
                </div>
                <div className="col-span-2 flex justify-end items-center gap-x-5 mt-20">
                  <button
                    type="button"
                    onClick={() =>
                      setWarehouse({
                        email: "",
                        password: "",
                        companyName: "",
                        country: "",
                        province: "",
                        district: "",
                        city: "",
                        completeAddress: "",
                        located: "",
                        countryCode: "507",
                        phoneNum: "",
                      })
                    }
                    className="bg-transparent w-40 font-medium text-xl text-themeBlue py-2.5 px-5 rounded border border-themeBlue hover:text-white hover:bg-themeBlue"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={createWarehouseFunc}
                    className="bg-themeBlue w-40 font-medium text-xl text-white py-2.5 px-5 rounded border border-themeBlue hover:text-themeBlue hover:bg-transparent"
                  >
                    Create
                  </button>
                </div>
              </form>
              <div className="col-span-4 bg-white rounded-md space-y-5 p-8">
                <h2 className="font-bold text-xl text-themeBlue">
                  Your Entries
                </h2>
                <hr className="border-none h-0.5 bg-black bg-opacity-10" />
                <div>
                  <h6 className="font-medium text-sm">Name</h6>
                  <p className="font-bold text-base text-black text-opacity-60">
                    {warehouse.name === ""
                      ? "Enter your Warehouse's Name"
                      : warehouse.name}
                  </p>
                </div>
                <hr className="border-none h-0.5 bg-black bg-opacity-10" />
                <div>
                  <h6 className="font-medium text-sm">Email</h6>
                  <p className="font-bold text-base text-black text-opacity-60">
                    {warehouse.email === ""
                      ? "Enter your Warehouse's Email"
                      : warehouse.email}
                  </p>
                </div>
                <hr className="border-none h-0.5 bg-black bg-opacity-10" />
                <div>
                  <h6 className="font-medium text-sm">Phone No</h6>
                  <p className="font-bold text-base text-black text-opacity-60">
                    {warehouse.phoneNum === ""
                      ? "Enter your Warehouse's Phone"
                      : "+" + warehouse.countryCode + " " + warehouse.phoneNum}
                  </p>
                </div>
                <hr className="border-none h-0.5 bg-black bg-opacity-10" />
                <div>
                  <h6 className="font-medium text-sm">Address</h6>
                  <p className="font-bold text-base text-black text-opacity-60">
                    {warehouse.city === "" ||
                    warehouse.province === "" ||
                    warehouse.country === "" ||
                    warehouse.completeAddress === ""
                      ? "Enter your Warehouse's Address"
                      : `${warehouse.completeAddress}, ${warehouse.city}, ${warehouse.province}, ${warehouse.country}`}
                  </p>
                </div>
              </div>
            </section>
          </section>
        }
      />
    </>
  );
}
