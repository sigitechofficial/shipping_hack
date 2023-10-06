import React from "react";
import Loader from "../../components/Loader";
import Layout from "../../components/Layout";
import HomeCard from "../../components/HomeCard";
import GetAPI from "../../utilities/GetAPI";

export default function Home() {
  const { data } = GetAPI("homepage");
  return data.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      title="Dashboard"
      content={
        <section>
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-5">
            <HomeCard
              icon="1"
              title="All Users"
              quantity={
                data?.data?.numOfUsers ?? (
                  <div className="text-lg">No Data Available</div>
                )
              }
            />
            <HomeCard
              icon="2"
              title="All Warehouses"
              quantity={
                data?.data?.numOfWarehouses ?? (
                  <div className="text-lg">No Data Available</div>
                )
              }
            />
            <HomeCard
              icon="3"
              title="All Drivers"
              quantity={
                data?.data?.numOfDrivers ?? (
                  <div className="text-lg">No Data Available</div>
                )
              }
            />
            <HomeCard
              icon="4"
              title="All Orders"
              quantity={
                data?.data?.numOfBookings ?? (
                  <div className="text-lg">No Data Available</div>
                )
              }
            />
            <HomeCard
              icon="5"
              title="Total Earnings"
              quantity={
                data?.data?.earnings ?? (
                  <div className="text-lg">No Data Available</div>
                )
              }
            />
            <HomeCard
              icon="6"
              title="Available Balance"
              quantity={
                data?.data?.balance ?? (
                  <div className="text-lg">No Data Available</div>
                )
              }
            />
            <HomeCard
              icon="7"
              title="Driver's Earnings"
              quantity={
                data?.data?.driverEarnings ?? (
                  <div className="text-lg">No Data Available</div>
                )
              }
            />
            <HomeCard
              icon="8"
              title="Today's Earnings"
              quantity={
                data?.data?.todayEarnings ?? (
                  <div className="text-lg">No Data Available</div>
                )
              }
            />
          </div>
        </section>
      }
    />
  );
}
