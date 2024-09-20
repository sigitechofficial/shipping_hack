import React, { useState } from "react";
import { BsBoxSeam, BsChevronDown, BsChevronUp } from "react-icons/bs";
import { IoMdPaper } from "react-icons/io";
import { BackButton } from "../../utilities/Buttons";
import Layout from "../../components/Layout";
import StatusPill from "../../components/StatusPill";
import GetAPI from "../../utilities/GetAPI";
import { PutAPI } from "../../utilities/PutAPI";
import Loader from "../../components/Loader";
import { BASE_URL2 } from "../../utilities/URL";
import { error_toaster, success_toaster } from "../../utilities/Toaster";
import Select from "react-select";

export default function BookingDetails({ datas }) {
  const bookingId = localStorage.getItem("orderId");
  const trackingId = localStorage.getItem("trackId");
  const { data, reFetch } =
    bookingId !== null
      ? GetAPI(`orderDetails?id=${parseInt(bookingId)}`)
      : GetAPI(`trackorder?s=${trackingId}`);
  const statuses = GetAPI("all-booking-statuses");
  const allStatus = [];
  statuses?.data?.data?.map((sta, index) => {
    return allStatus.push({
      value: sta?.id,
      label: sta?.title,
    });
  });
  const [parcelOpenStates, setParcelOpenStates] = useState(
    Array(datas?.packages.length).fill(false)
  );
  const toggleParcelOpen = (index) => {
    const newParcelOpenStates = [...parcelOpenStates];
    newParcelOpenStates[index] = !newParcelOpenStates[index];
    setParcelOpenStates(newParcelOpenStates);
  };
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
    let res = await PutAPI("update-booking-status", {
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
                <div className="font-semibold text-lg text-themeBlue border border-themeBlue py-2 px-4 rounded">
                  {data?.data?.bookingStatus &&
                    data?.data?.bookingStatus?.title}
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
            <div className={`col-span-12 bg-white py-8 px-10 rounded-lg`}>
              <div className="flex gap-5 [&>div]:min-w-[12.5%] overflow-auto pb-5">
                {data?.data?.bookingHistories?.map((booking, index) => (
                  <StatusPill
                    key={index}
                    title={booking?.statusText}
                    pillStatus={booking?.status ? "completed" : "inProcess"}
                    date={booking?.date}
                    time={convertTo12Hour(booking?.time)}
                  />
                ))}
              </div>
            </div>
            <div
              className={`2xl:col-span-4 xl:col-span-6 col-span-12 text-black bg-white py-8 px-10 rounded-lg space-y-8`}
            >
              <h1 className="font-medium text-2xl">
                Order#
                <span className={`text-black text-opacity-60 ml-2`}>
                  {data?.data?.trackingId}
                </span>
              </h1>
              {/* <h1 className="font-medium text-2xl">
                Scheduled By
                <span className={`text-black text-opacity-60 ml-2`}>
                  {data?.data?.scheduleSetBy
                    ? (data?.data?.scheduleSetBy).charAt(0).toUpperCase() +
                      (data?.data?.scheduleSetBy).slice(1)
                    : "No Data"}
                </span>
              </h1> */}
              <div className={`space-y-4`}>
                <h1 className="font-medium text-2xl">Sender Details</h1>
                <div className="space-y-2">
                  <h5 className={`font-bold text-xl text-themeBlue`}>
                    {data?.data?.senderName}
                  </h5>
                  <div>
                    <span
                      className={`font-normal text-sm text-black text-opacity-60`}
                    >
                      Email
                    </span>
                    <p className="font-normal text-base">
                      {data?.data?.senderEmail}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`font-normal text-sm text-black text-opacity-60`}
                    >
                      Phone no
                    </span>
                    <p className="font-normal text-base">
                      {data?.data?.senderPhone}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h1 className="font-medium text-2xl">Recipient Details</h1>
                <div className="space-y-2">
                  <h5 className={`font-bold text-xl text-themeBlue`}>
                    {data?.data?.receiverName}
                  </h5>
                  <div>
                    <span
                      className={`font-normal text-sm text-black text-opacity-60`}
                    >
                      Email
                    </span>
                    <p className="font-normal text-base">
                      {data?.data?.receiverEmail}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`font-normal text-sm text-black text-opacity-60`}
                    >
                      Phone
                    </span>
                    <p className="font-normal text-base">
                      {data?.data?.receiverPhone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`2xl:col-span-4 xl:col-span-6 col-span-12 bg-white text-black py-8 px-10 rounded-lg space-y-12`}
            >
              <div className="space-y-4">
                <h1 className="font-medium text-2xl flex items-center gap-x-5">
                  <BsBoxSeam size={32} className="text-themeBlue" />
                  <span>Parcel Details</span>
                </h1>
                {data?.data?.packages?.map((parcel, index) => (
                  <ul
                    key={index}
                    className="space-y-2 border border-black border-opacity-20 rounded py-4 px-2"
                  >
                    <li className="flex justify-between items-center">
                      <span className="font-medium text-base">
                        Package {index + 1}
                      </span>
                      <button
                        onClick={() => toggleParcelOpen(index)}
                        class="flex justify-center w-fit"
                      >
                        {parcelOpenStates[index] ? (
                          <BsChevronUp />
                        ) : (
                          <BsChevronDown />
                        )}
                      </button>
                    </li>
                    {parcelOpenStates[index] ? (
                      <>
                        <li className="flex justify-between">
                          <span className="font-medium text-base">
                            Category
                          </span>
                          <span
                            className={`font-normal text-base text-black text-opacity-60`}
                          >
                            {parcel?.category}
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span className="font-medium text-base">Width</span>
                          <span
                            className={`font-normal text-base text-black text-opacity-60`}
                          >
                            {parcel?.actualWidth} inch
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span className="font-medium text-base">Height</span>
                          <span
                            className={`font-normal text-base text-black text-opacity-60`}
                          >
                            {parcel?.actualHeight} inch
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span className="font-medium text-base">Length</span>
                          <span
                            className={`font-normal text-base text-black text-opacity-60`}
                          >
                            {parcel?.actualLength} inch
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span className="font-medium text-base">Weight</span>
                          <span
                            className={`font-normal text-base text-black text-opacity-60`}
                          >
                            {parcel?.actualWeight} lbs
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span className="font-medium text-base">Company</span>
                          <span
                            className={`font-normal text-base text-black text-opacity-60`}
                          >
                            {parcel?.ecommerceCompany}
                          </span>
                        </li>
                      </>
                    ) : (
                      <></>
                    )}
                  </ul>
                ))}
              </div>
            </div>
            <div
              className={`2xl:col-span-4 xl:col-span-6 col-span-12 bg-white text-black py-8 px-10 rounded-lg space-y-8 relative 2xl:h-auto min-h-[200px]`}
            >
              <div className="space-y-5">
                <h1 className="font-medium text-2xl">Shipping Company</h1>
                <div className="border border-black border-opacity-20 rounded-md p-5 flex justify-between items-center">
                  <div className="flex items-center gap-x-5">
                    <IoMdPaper size={32} />
                    <div>
                      <h4 className="font-medium text-base">Tracking Number</h4>
                      <div className="font-normal text-sm text-black text-opacity-60">
                        N/A
                      </div>
                    </div>
                  </div>
                  <div className="font-medium text-xl capitalize">
                    {data?.data?.logisticCompany &&
                      data?.data?.logisticCompany?.title}
                  </div>
                </div>
              </div>
              <div className="space-y-5">
                <h1 className="font-medium text-2xl">
                  Delivery Guy{" "}
                  <span className="font-normal text-sm text-opacity-40">
                    (Dropoff Driver)
                  </span>
                </h1>
                {data?.data?.deliveryDriver === null ? (
                  <div className="w-full flex justify-center mt-4">
                    <h3 className="bg-themeYellow bg-opacity-50 w-fit text-lg rounded-lg px-10 py-2">
                      Not Assigned Yet
                    </h3>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-x-4 mb-3">
                      <div>
                        <img
                          src={`${BASE_URL2}${data?.data?.deliveryDriver?.image}`}
                          className={`w-20 h-20 bg-cover rounded-fullest`}
                          alt="user"
                        />
                      </div>
                      <div className="pt-2">
                        <h5 className={`font-bold text-xl text-themeBlue`}>
                          {`${data?.data?.deliveryDriver?.firstName}${data?.data?.deliveryDriver?.lastName}`}
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
                          {data?.data?.deliveryDriver?.countryCode &&
                            data?.data?.deliveryDriver?.phoneNum}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </section>
      }
    />
  );
}
