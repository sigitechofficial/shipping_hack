import React from "react";
import Layout from "../../components/Layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { info_toaster } from "../../utilities/Toaster";

export default function Tracking() {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [trackId, setTrackId] = useState("");
  const trackingFunc = async () => {
    setDisabled(true);
    if (trackId === "") {
      info_toaster("Please enter Tracking Id");
    } else {
      localStorage.removeItem("orderId");
      localStorage.setItem("trackId", trackId);
      navigate("/booking-details");
    }
  };
  return (
    <Layout
      title="Track Order"
      content={
        <>
          <div className="flex items-center">
            <input
              value={trackId}
              onChange={(e) => setTrackId(e.target.value)}
              type="text"
              name="trackingId"
              id="trackID"
              placeholder="Enter order id to track"
              className="text-base font-normal rounded-l-md border border-transparent w-96 px-4 py-3 focus:outline-none"
            />
            <button
              onClick={trackingFunc}
              disabled={disabled}
              className="text-lg font-light text-white bg-themeBlue rounded-r-md px-4 py-2.5 border border-themeBlue"
            >
              Track
            </button>
          </div>
        </>
      }
    />
  );
}
