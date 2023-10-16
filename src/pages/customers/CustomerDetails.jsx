import React, { useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import MyDataTable from "../../components/MyDataTable";
import { mini_toaster } from "../../utilities/Toaster";
import { BackButton, DTView } from "../../utilities/Buttons";
import Layout from "../../components/Layout";

export default function CustomerDetails() {
  const [disabled, setDisabled] = useState(false);
  const emailRef = useRef();
  const phoneRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const cusDetails = location?.state?.cusDetails;
  const bookingDetails = async (id) => {
    setDisabled(true);
    localStorage.setItem("orderId", id);
    navigate("/booking-details");
  };
  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
    },
    {
      name: "Order #",
      selector: (row) => row.orderId,
    },
    {
      name: "Pickup Date",
      selector: (row) => row.date,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Action",
      selector: (row) => row.action,
      minWidth: "160px",
    },
  ];
  const datas = [];
  location?.state?.cusDetails?.customer?.map((det, index) => {
    return datas.push({
      id: index + 1,
      orderId: det?.trackingId ?? "No Data",
      date: det?.pickupDate ?? "No Data",
      status: det?.bookingStatus?.title ?? "No Data",
      action: (
        <DTView view={() => bookingDetails(det?.id)} disabled={disabled} />
      ),
    });
  });
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text.current.innerText);
    mini_toaster("Copied to Clipboard!");
  };
  return (
    <Layout
      title="Customer Details"
      content={
        <section className="space-y-4">
          <div>
            <BackButton />
          </div>
          <section className="2xl:grid 2xl:grid-cols-12 gap-x-5 flex flex-col gap-y-8">
            <div className="2xl:col-span-9 2xl:order-1 order-2">
              <MyDataTable columns={columns} data={datas} />
            </div>
            <div
              className={`2xl:col-span-3 2xl:order-2 order-1 bg-white text-black rounded-lg flex flex-col items-center text-center gap-y-5 py-8 px-12`}
            >
              <FaUser size={40} />
              <div>
                <h4 className="font-bold text-2xl">
                  {cusDetails?.firstName + " " + cusDetails?.lastName}
                </h4>
                <p className="font-normal text-sm">
                  Member Since: {cusDetails?.joinedOn}
                </p>
              </div>
              <hr
                className={`border-none w-full h-0.5 bg-black bg-opacity-20`}
              />
              <div>
                <p className="font-normal text-sm text-opacity-60">Email</p>
                <p
                  className="font-medium text-lg underline cursor-pointer"
                  ref={emailRef}
                  onClick={() => copyToClipboard(emailRef)}
                >
                  {cusDetails?.email}
                </p>
              </div>
              <hr
                className={`border-none w-full h-0.5 bg-black bg-opacity-20`}
              />
              <div>
                <p className="font-normal text-sm text-opacity-60">Phone</p>
                <p
                  className="font-medium text-lg underline cursor-pointer"
                  ref={phoneRef}
                  onClick={() => copyToClipboard(phoneRef)}
                >
                  {cusDetails?.countryCode + " " + cusDetails?.phoneNum}
                </p>
              </div>
            </div>
          </section>
        </section>
      }
    />
  );
}
