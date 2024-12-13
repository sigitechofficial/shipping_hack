import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GetAPI from "../../utilities/GetAPI";
import MyDataTable from "../../components/MyDataTable";
import Loader from "../../components/Loader";
import { DTView } from "../../utilities/Buttons";
import Layout from "../../components/Layout";

export default function Bookings() {
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const { data } = GetAPI("bookings");
  const bookingDetails = async (id) => {
    setDisabled(true);
    localStorage.setItem("orderId", id);
    localStorage.removeItem("trackId")
    navigate("/booking-details");
  };
  const columns = [ 
    {
      name: "#",
      selector: (row) => row.id,
    },
    {
      name: "Tracking Id",
      selector: (row) => row.trackingId,
    },
    {
      name: "Distance",
      selector: (row) => row.distance,
    },
    {
      name: "Weight",
      selector: (row) => row.weight,
    },
    {
      name: "Total",
      selector: (row) => row.total,
    },
    {
      name: "Drop off",
      selector: (row) => row.dropoff,
    },
    {
      name: "Action",
      selector: (row) => row.action,
      minWidth: "160px",
    },
  ];
  const datas = [];
  data?.data?.map((det, index) => {
    return datas.push({
      id: index + 1,
      // id: det?.bookingData && det?.bookingData?.id,
      trackingId: det?.bookingData && det?.bookingData?.trackingId,
      distance: det?.bookingData && det?.bookingData?.distance,
      weight: det?.bookingData && det?.bookingData?.totalWeight,
      total: det?.bookingData && det?.bookingData?.total,
      dropoff: det?.dropoffAddress && det?.dropoffAddress?.streetAddress,
      action: (
        <DTView
          view={() => bookingDetails(det?.bookingData?.id)}
          disabled={disabled}
        />
      ),
    });
  });
  return data.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      title="Bookings"
      content={
        <>
          <MyDataTable columns={columns} data={datas} dependancy={data} />
        </>
      } 
    />
  );
}
