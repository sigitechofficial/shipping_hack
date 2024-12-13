import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GetAPI from "../../utilities/GetAPI";
import { PutAPI } from "../../utilities/PutAPI";
import { active, block } from "../../utilities/CustomStyles";
import MyDataTable from "../../components/MyDataTable";
import Loader from "../../components/Loader";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../utilities/Toaster";
import { DTView } from "../../utilities/Buttons";
import { BASE_URL } from "../../utilities/URL";
import Layout from "../../components/Layout";

export default function Customers() {
  const userType = localStorage.getItem("userType");
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [loader, setLoader] = useState(false);
  const [searchData, setSearchData] = useState("");
  console.log("🚀 ~ Customers ~ searchData:", searchData);

  const { data, reFetch } = GetAPI(
    userType === "Admin" ? "allcustomers" : "allcustomers/?featureId=4"
  );

  const changeCustomerStatus = async (status, userId) => {
    setDisabled(true);
    let change = await PutAPI("userstatus", {
      status: status,
      userId: userId,
    });
    if (change?.data?.status === "1") {
      reFetch();
      if (status) {
        success_toaster(change?.data?.message);
      } else {
        info_toaster(change?.data?.message);
      }
      setDisabled(false);
    } else {
      error_toaster(change?.data?.message);
      setDisabled(false);
    }
  };
  const customerDetails = async (id) => {
    setDisabled(true);
    setLoader(true);
    var config = {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    };
    try {
      axios.get(BASE_URL + `customerdetails?id=${id}`, config).then((dat) => {
        if (dat.data?.status === "1") {
          navigate("/customer-details", {
            state: {
              cusDetails: dat?.data?.data,
            },
          });
          info_toaster(dat?.data?.message);
        } else {
          error_toaster(dat?.data?.message);
        }
        setDisabled(false);
        setLoader(false);
      });
    } catch (err) {
      setDisabled(false);
      setLoader(false);
    }
  };

  const filterData = data?.data?.filter((cust, index) => {
    return (
      searchData === "" ||
      (cust?.virtualBox &&
        cust?.virtualBox.toLowerCase().includes(searchData.toLowerCase())) ||
      (cust?.firstName &&
        cust?.firstName.toLowerCase().includes(searchData.toLowerCase())) ||
      (cust?.lastName &&
        cust?.lastName.toLowerCase().includes(searchData.toLowerCase())) ||
      (cust?.email &&
        cust?.email.toLowerCase().includes(searchData.toLowerCase()))
    );
  });

  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "VBN",
      selector: (row) => row.vbn,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      minWidth: "140px",
    },
    {
      name: "Action",
      selector: (row) => row.action,
      minWidth: "160px",
    },
  ];
  const datas = [];
  filterData?.map((cust, index) => {
    return datas.push({
      id: index + 1,
      vbn: cust?.virtualBox,
      name: cust?.firstName + " " + cust?.lastName,
      email: cust?.email,
      phone: cust?.countryCode + " " + cust?.phoneNum,
      status: cust?.status ? (
        <button
          onClick={() => changeCustomerStatus(false, cust?.id)}
          className={active}
          disabled={disabled}
        >
          Active
        </button>
      ) : (
        <button
          onClick={() => changeCustomerStatus(true, cust?.id)}
          className={block}
          disabled={disabled}
        >
          Inactive
        </button>
      ),
      action: (
        <DTView view={() => customerDetails(cust?.id)} disabled={disabled} />
      ),
    });
  });

  return data.length === 0 || loader ? (
    <Loader />
  ) : (
    <Layout
      title="Customers"
      showSearchBar={true}
      setSearchData={setSearchData}
      searchData={searchData}
      content={
        <>
          <MyDataTable columns={columns} data={datas} dependancy={data} />
        </>
      }
    />
  );
}
