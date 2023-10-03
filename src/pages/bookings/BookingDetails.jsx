import React, { useContext } from "react";
import { BsBoxSeam } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { ModeContext } from "../../App";
import { BackButton } from "../../utilities/Buttons";
import { imgURL } from "../../utilities/URL";
import Layout from "../../components/Layout";
import StatusPill from "../../components/StatusPill";
import Select from "react-select";
import GetAPI from "../../utilities/GetAPI";
import { PostAPI } from "../../utilities/PostAPI";
import { error_toaster, success_toaster } from "../../utilities/Toaster";
import Loader from "../../components/Loader";

export default function BookingDetails() {
  const featureData = JSON.parse(localStorage.getItem("featureData"));
  const bookingsFeatureId =
    featureData && featureData.find((ele) => ele.title === "Bookings")?.id;
  const { dark } = useContext(ModeContext);
  const bookingId = localStorage.getItem("orderId");
  const { data, reFetch } = GetAPI(
    `bookingdetails?id=${bookingId}&`,
    bookingsFeatureId
  );
  const statuses = GetAPI("allstatuses", bookingsFeatureId);
  const allStatus = [];
  statuses?.data?.data?.map((sta, index) => {
    return allStatus.push({
      value: sta?.id,
      label: sta?.title,
    });
  });
  const convertTo12Hour = (time) => {
    if (time && time !== "") {
      let hours = parseInt(time.substr(0, 2));
      let minutes = time.substr(3, 2);
      let ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      return `${hours}:${minutes} ${ampm}`;
    }
  };
  const changeStatusFunc = async (bookingStatusId) => {
    let res = await PostAPI("updatebookingstatus", bookingsFeatureId, {
      bookingId: bookingId,
      bookingStatusId: bookingStatusId,
    });
    if (res?.data?.status === "1") {
      success_toaster(res?.data?.message);
      reFetch();
    } else {
      error_toaster(res?.data?.message);
    }
  };
  return data.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      title="Booking Details"
      content={
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <BackButton />
            </div>
            <div className="flex items-center gap-x-6">
              <div className="flex items-center gap-x-3">
                <h4 className="font-medium text-xl">Status:</h4>
                <div className="font-semibold text-lg text-themePurple border border-themePurple py-2 px-4 rounded">
                  {data?.data?.bookingStatus}
                </div>
              </div>
              <div className="w-80 inner">
                <Select
                  onChange={(e) => changeStatusFunc(e.value)}
                  options={allStatus}
                  inputId="dbs"
                  placeholder="Change Status"
                />
              </div>
            </div>
          </div>
          <section className="grid grid-cols-12 gap-5">
            <div
              className={`col-span-12 ${
                dark ? "bg-themeBlack2" : "bg-white"
              } py-8 px-10 rounded-lg`}
            >
              <div className="flex gap-5 [&>div]:min-w-[12.5%] overflow-auto pb-5">
                {data?.data?.bookingHistory?.map((booking, index) => (
                  <StatusPill
                    title={booking?.statusText}
                    text={booking?.statusDesc}
                    pillStatus={booking?.status ? "completed" : "inProcess"}
                    date={booking?.date}
                    time={convertTo12Hour(booking?.time)}
                  />
                ))}
              </div>
            </div>
            <div
              className={`xl:row-span-3 2xl:col-span-4 xl:col-span-6 col-span-12 ${
                dark ? "text-white bg-themeBlack2" : "text-black bg-white"
              } py-8 px-10 rounded-lg space-y-8`}
            >
              <h1 className="font-medium text-2xl">
                Order#
                <span
                  className={`${
                    dark ? "text-white" : "text-black"
                  } text-opacity-60 ml-2`}
                >
                  {data?.data?.trackingId}
                </span>
              </h1>
              <h1 className="font-medium text-2xl">
                Scheduled By
                <span
                  className={`${
                    dark ? "text-white" : "text-black"
                  } text-opacity-60 ml-2`}
                >
                  {data?.data?.scheduleSetBy
                    ? (data?.data?.scheduleSetBy).charAt(0).toUpperCase() +
                      (data?.data?.scheduleSetBy).slice(1)
                    : "No Data"}
                </span>
              </h1>
              <div className={`space-y-4`}>
                <h1 className="font-medium text-2xl">Sender Details</h1>
                <div className="space-y-2">
                  <h5
                    className={`font-bold text-xl ${
                      dark ? "text-white" : "text-themePurple"
                    }`}
                  >
                    {data?.data?.senderDetails?.name}
                  </h5>
                  <span>
                    Member since: {data?.data?.senderDetails?.memberSince}
                  </span>
                  <div>
                    <span
                      className={`font-normal text-sm ${
                        dark ? "text-white" : "text-black"
                      } text-opacity-60`}
                    >
                      Email
                    </span>
                    <p className="font-normal text-base">
                      {data?.data?.senderDetails?.email}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`font-normal text-sm ${
                        dark ? "text-white" : "text-black"
                      } text-opacity-60`}
                    >
                      Phone no
                    </span>
                    <p className="font-normal text-base">
                      {data?.data?.senderDetails?.phone}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h1 className="font-medium text-2xl">Recipient Details</h1>
                <div className="space-y-2">
                  <h5
                    className={`font-bold text-xl ${
                      dark ? "text-white" : "text-themePurple"
                    }`}
                  >
                    {data?.data?.recipientDetails?.name}
                  </h5>
                  <div>
                    <span
                      className={`font-normal text-sm ${
                        dark ? "text-white" : "text-black"
                      } text-opacity-60`}
                    >
                      Email
                    </span>
                    <p className="font-normal text-base">
                      {data?.data?.recipientDetails?.email}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`font-normal text-sm ${
                        dark ? "text-white" : "text-black"
                      } text-opacity-60`}
                    >
                      Phone
                    </span>
                    <p className="font-normal text-base">
                      {data?.data?.recipientDetails?.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`xl:row-span-3 2xl:col-span-4 xl:col-span-6 col-span-12 ${
                dark ? "bg-themeBlack2 text-white" : "bg-white text-black"
              } py-8 px-10 rounded-lg space-y-12`}
            >
              <div className="space-y-4">
                <h1 className="font-medium text-2xl flex items-center gap-x-5">
                  <TbTruckDelivery
                    size={32}
                    className={dark ? "text-white" : "text-themePurple"}
                  />
                  <span>Delivery Details</span>
                </h1>
                <div className="flex gap-x-5 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-fit border border-themeOrange rounded-fullest p-1">
                      <div className="w-4 h-4 rounded-fullest bg-themeOrange"></div>
                    </div>
                    <img
                      src={`${imgURL}line${dark ? "D" : ""}.webp`}
                      alt="line"
                    />
                    <div className="w-fit border border-themeOrange p-1">
                      <div className="w-4 h-4 bg-themeOrange"></div>
                    </div>
                    <img
                      src={`${imgURL}line${dark ? "D" : ""}.webp`}
                      alt="line"
                    />
                    <div className="w-fit border border-themeOrange p-1">
                      <div className="w-4 h-4 bg-themeOrange"></div>
                    </div>
                    <img
                      src={`${imgURL}line${dark ? "D" : ""}.webp`}
                      alt="line"
                    />
                    <div className="w-fit border border-themeOrange rounded-fullest p-1">
                      <div className="w-4 h-4 rounded-fullest bg-themeOrange"></div>
                    </div>
                  </div>
                  <div className="space-y-6 w-full">
                    <div className="flex justify-between min-h-[44px]">
                      <div>
                        <p className="font-medium text-base">Pickup</p>
                        <p
                          className={`font-normal text-sm ${
                            dark ? "text-white" : "text-black"
                          } text-opacity-60`}
                        >
                          {data?.data?.deliveryDetails?.pickupCode}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <p
                          className={`font-normal text-sm ${
                            dark ? "text-white" : "text-black"
                          } text-opacity-60`}
                        >
                          {data?.data?.deliveryDetails?.pickupTime}
                        </p>
                        <p
                          className={`font-normal text-sm ${
                            dark ? "text-white" : "text-black"
                          } text-opacity-60`}
                        >
                          {data?.data?.deliveryDetails?.pickupDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between min-h-[44px]">
                      <div>
                        <p className="font-medium text-base">
                          Receiving Warehouse
                        </p>
                        <p
                          className={`font-normal text-sm ${
                            dark ? "text-white" : "text-black"
                          } text-opacity-60`}
                        >
                          {data?.data?.receivingWarehouse &&
                            `${data?.data?.receivingWarehouse?.addressDB?.PostalCode} ${data?.data?.receivingWarehouse?.addressDB?.secondPostalCode}`}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <p
                          className={`font-normal text-sm ${
                            dark ? "text-white" : "text-black"
                          } text-opacity-60`}
                        >
                          {data?.data?.receivingWarehouse &&
                            data?.data?.receivingWarehouse?.name}
                        </p>
                        <p
                          className={`font-normal text-sm ${
                            dark ? "text-white" : "text-black"
                          } text-opacity-60`}
                        >
                          {data?.data?.receivingWarehouse &&
                            data?.data?.receivingWarehouse?.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between min-h-[44px]">
                      <div>
                        <p className="font-medium text-base">
                          Delivery Warehouse
                        </p>
                        <p
                          className={`font-normal text-sm ${
                            dark ? "text-white" : "text-black"
                          } text-opacity-60`}
                        >
                          {data?.data?.deliveryWarehouse &&
                            `${data?.data?.deliveryWarehouse?.addressDB?.PostalCode} ${data?.data?.deliveryWarehouse?.addressDB?.secondPostalCode}`}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <p
                          className={`font-normal text-sm ${
                            dark ? "text-white" : "text-black"
                          } text-opacity-60`}
                        >
                          {data?.data?.deliveryWarehouse &&
                            data?.data?.deliveryWarehouse?.name}
                        </p>
                        <p
                          className={`font-normal text-sm ${
                            dark ? "text-white" : "text-black"
                          } text-opacity-60`}
                        >
                          {data?.data?.deliveryWarehouse &&
                            data?.data?.deliveryWarehouse?.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between min-h-[44px]">
                      <div>
                        <p className="font-medium text-base">Drop off</p>
                        <p
                          className={`font-normal text-sm ${
                            dark ? "text-white" : "text-black"
                          } text-opacity-60`}
                        >
                          {data?.data?.deliveryDetails?.dropoffCode}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <p
                          className={`font-normal text-sm ${
                            dark ? "text-white" : "text-black"
                          } text-opacity-60`}
                        >
                          {data?.data?.deliveryDetails?.dropoffTime}
                        </p>
                        <p
                          className={`font-normal text-sm ${
                            dark ? "text-white" : "text-black"
                          } text-opacity-60`}
                        >
                          {data?.data?.deliveryDetails?.dropoffDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h1 className="font-medium text-2xl flex items-center gap-x-5">
                  <BsBoxSeam
                    size={32}
                    className={dark ? "text-white" : "text-themePurple"}
                  />
                  <span>Parcel Details</span>
                </h1>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="font-medium text-base">
                      Type of shipment
                    </span>
                    <span
                      className={`font-normal text-base ${
                        dark ? "text-white" : "text-black"
                      } text-opacity-60`}
                    >
                      {data?.data?.parcelDetails?.shipmentType}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium text-base">Category</span>
                    <span
                      className={`font-normal text-base ${
                        dark ? "text-white" : "text-black"
                      } text-opacity-60`}
                    >
                      {data?.data?.parcelDetails?.category}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium text-base">Size</span>
                    <span
                      className={`font-normal text-base ${
                        dark ? "text-white" : "text-black"
                      } text-opacity-60`}
                      dangerouslySetInnerHTML={{
                        __html: data?.data?.parcelDetails?.size,
                      }}
                    />
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium text-base">Weight</span>
                    <span
                      className={`font-normal text-base ${
                        dark ? "text-white" : "text-black"
                      } text-opacity-60`}
                    >
                      {data?.data?.parcelDetails?.weight}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium text-base">Distance</span>
                    <span
                      className={`font-normal text-base ${
                        dark ? "text-white" : "text-black"
                      } text-opacity-60`}
                    >
                      {data?.data?.parcelDetails?.distance}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium text-base">Pickup Date</span>
                    <span
                      className={`font-normal text-base ${
                        dark ? "text-white" : "text-black"
                      } text-opacity-60`}
                    >
                      {data?.data?.parcelDetails?.pickupDate}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium text-base">ETA</span>
                    <span
                      className={`font-normal text-base ${
                        dark ? "text-white" : "text-black"
                      } text-opacity-60`}
                    >
                      {data?.data?.parcelDetails?.ETA}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium text-base">Order Amount</span>
                    <span
                      className={`font-normal text-base ${
                        dark ? "text-white" : "text-black"
                      } text-opacity-60`}
                    >
                      {data?.data?.parcelDetails?.orderTotal}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className={`xl:col-span-4 col-span-6 ${
                dark ? "bg-themeBlack2 text-white" : "bg-white text-black"
              } py-8 px-10 rounded-lg space-y-5 relative 2xl:h-auto min-h-[200px]`}
            >
              <h1 className="font-medium text-2xl">
                Delivery Guy{" "}
                <span className="font-normal text-sm text-opacity-40">
                  (Pickup Driver)
                </span>
              </h1>
              {Object.keys(data?.data?.receivingDriver).length === 0 ? (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center">
                  <h3 className="bg-themeYellow bg-opacity-50 w-fit text-lg rounded-lg px-10 py-2">
                    Not Assigned Yet
                  </h3>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-x-3 mb-3">
                    <div
                      className={`w-fit rounded-fullest ${
                        dark
                          ? "bg-white text-black"
                          : "bg-themePurple text-white"
                      } p-4`}
                    >
                      <FaUser size={28} />
                    </div>
                    <div className="space-y-1">
                      <h5
                        className={`font-bold text-xl ${
                          dark ? "text-white" : "text-themePurple"
                        }`}
                      >
                        {data?.data?.receivingDriver?.name}
                      </h5>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="font-normal text-sm text-opacity-60">
                        Email
                      </span>
                      <p className="font-normal text-base">
                        {data?.data?.receivingDriver?.email}
                      </p>
                    </div>
                    <div>
                      <span className="font-normal text-sm text-opacity-60">
                        Phone no
                      </span>
                      <p className="font-normal text-base">
                        {data?.data?.receivingDriver?.phone}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div
              className={`xl:col-span-4 col-span-6 ${
                dark ? "bg-themeBlack2 text-white" : "bg-white text-black"
              } py-8 px-10 rounded-lg space-y-5 relative 2xl:h-auto min-h-[200px]`}
            >
              <h1 className="font-medium text-2xl">Transporter guy</h1>
              {Object.keys(data?.data?.transporterGuy).length === 0 ? (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center">
                  <h3 className="bg-themeYellow bg-opacity-50 w-fit text-lg rounded-lg px-10 py-2">
                    Not Assigned Yet
                  </h3>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-x-3 mb-3">
                    <div
                      className={`w-fit rounded-fullest ${
                        dark
                          ? "bg-white text-black"
                          : "bg-themePurple text-white"
                      } p-4`}
                    >
                      <FaUser size={28} />
                    </div>
                    <div className="space-y-1">
                      <h5
                        className={`font-bold text-xl ${
                          dark ? "text-white" : "text-themePurple"
                        }`}
                      >
                        {data?.data?.transporterGuy?.name}
                      </h5>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="font-normal text-sm text-opacity-60">
                        Email
                      </span>
                      <p className="font-normal text-base">
                        {data?.data?.transporterGuy?.email}
                      </p>
                    </div>
                    <div>
                      <span className="font-normal text-sm text-opacity-60">
                        Phone no
                      </span>
                      <p className="font-normal text-base">
                        {data?.data?.transporterGuy?.phone}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div
              className={`xl:col-span-4 col-span-6 ${
                dark ? "bg-themeBlack2 text-white" : "bg-white text-black"
              } py-8 px-10 rounded-lg space-y-5 relative 2xl:h-auto min-h-[200px]`}
            >
              <h1 className="font-medium text-2xl">
                Delivery Guy{" "}
                <span className="font-normal text-sm text-opacity-40">
                  (Dropoff Driver)
                </span>
              </h1>
              {Object.keys(data?.data?.deliveryDriver).length === 0 ? (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center">
                  <h3 className="bg-themeYellow bg-opacity-50 w-fit text-lg rounded-lg px-10 py-2">
                    Not Assigned Yet
                  </h3>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-x-3 mb-3">
                    <div
                      className={`w-fit rounded-fullest ${
                        dark
                          ? "bg-white text-black"
                          : "bg-themePurple text-white"
                      } p-4`}
                    >
                      <FaUser size={28} />
                    </div>
                    <div className="space-y-1">
                      <h5
                        className={`font-bold text-xl ${
                          dark ? "text-white" : "text-themePurple"
                        }`}
                      >
                        {data?.data?.deliveryDriver?.name}
                      </h5>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="font-normal text-sm text-opacity-60">
                        Email
                      </span>
                      <p className="font-normal text-base">
                        {data?.data?.deliveryDriver?.email}
                      </p>
                    </div>
                    <div>
                      <span className="font-normal text-sm text-opacity-60">
                        Phone no
                      </span>
                      <p className="font-normal text-base">
                        {data?.data?.deliveryDriver?.phone}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </section>
      }
    />
  );
}
