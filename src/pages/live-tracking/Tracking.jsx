import React from "react";
import Layout from "../../components/Layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../utilities/Toaster";
import { PostAPI } from "../../utilities/PostAPI";
import { MiniLoader } from "../../components/Loader";

export default function Tracking() {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [trackId, setTrackId] = useState("");
  const [loader, setLoader] = useState(false);

  const trackingFunc = async () => {
    setDisabled(true);
    setLoader(true);
    if (trackId === "") {
      info_toaster("Please enter Tracking Id");
    } else {
      const res = await PostAPI(`checktrackingNumber/${trackId}`);
      if (res?.data?.status === "1") {
        setDisabled(false);
        setLoader(false);
        if (res?.data?.data) {
          localStorage.removeItem("orderId");
          localStorage.setItem("trackId", trackId);
          localStorage.removeItem("orderId");
          navigate("/booking-details");
          success_toaster("Order track successfully");
        } else {
          error_toaster("Invalid Tracking number");
          setLoader(false);
        }
      } else {
        setDisabled(false);
        error_toaster(res?.data?.error);
      }
    }
  };
  return (
    <Layout
      title="Track Order"
      content={
        loader ? (
          <MiniLoader />
        ) : (
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
        )
      }
    />
  );
}
