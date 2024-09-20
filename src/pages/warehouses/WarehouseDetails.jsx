import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import MyDataTable from "../../components/MyDataTable";
import { BackButton, TabButton } from "../../utilities/Buttons";
import Layout from "../../components/Layout";

export default function WarehouseDetails() {
  const location = useLocation();
  const [tab, setTab] = useState("Incoming");
  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
    },
    {
      name: "Tracking Id",
      selector: (row) => row.tracking,
    },
    // {
    //   name: tab === "Incoming" ? "Pickup Date" : "ETA",
    //   selector: (row) => (tab === "Incoming" ? row.date : row.eta),
    // },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
  ];
  const datas = [];
  if (tab === "Incoming") {
    location?.state?.wareDetails?.receivingWarehouse?.map((ware, index) =>
      datas.push({
        id: index + 1,
        tracking: ware?.trackingId,
        // date: ware?.pickupDate ?? "No Data",
        amount: ware?.total,
        status: ware?.bookingStatus?.title,
      })
    );
  } else if (tab === "Outgoing") {
    location?.state?.wareDetails?.deliveryWarehouse?.map((ware, index) =>
      datas.push({
        id: index + 1,
        tracking: ware?.trackingId,
        // eta: ware?.ETA ?? "No Data",
        amount: ware?.total,
        status: ware?.bookingStatus?.title,
      })
    );
  }
  return (
    <Layout
      title="Warehouse Details"
      content={
        <section className="space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <BackButton />
            </div>
            <div className="flex">
              <TabButton text="Incoming" set={setTab} tab={tab} width="w-40" />
              <TabButton text="Outgoing" set={setTab} tab={tab} width="w-40" />
            </div>
          </div>
          <MyDataTable columns={columns} data={datas} />
        </section>
      }
    />
  );
}
