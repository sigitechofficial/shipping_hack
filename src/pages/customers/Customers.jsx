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
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [loader, setLoader] = useState(false);
  const { data, reFetch } = GetAPI("allcustomers");
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
  const getCustomers = () => {
    const filteredArray =
      data?.status === "1"
        ? data?.data?.filter(
            (cust) =>
              search === "" ||
              select === null ||
              ((
                (cust?.firstName).toLowerCase() +
                " " +
                (cust?.lastName).toLowerCase()
              ).includes(search.toLowerCase()) &&
                select.value === "1") ||
              ((cust?.email).toLowerCase().includes(search.toLowerCase()) &&
                select.value === "2") ||
              ((cust?.countryCode + " " + cust?.phoneNum)
                .toString()
                .includes(search) &&
                select.value === "3") ||
              ((cust?.countryCode + cust?.phoneNum)
                .toString()
                .includes(search) &&
                select.value === "3") ||
              (cust?.status && search === "Active" && select.value === "4") ||
              (cust?.status === false &&
                search === "Inactive" &&
                select.value === "5")
          )
        : [];
    return filteredArray;
  };
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
  getCustomers()?.map((cust, index) => {
    return datas.push({
      id: index + 1,
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
      search={true}
      value={search}
      onChange={(e) => setSearch(e.target.value.replace(/\+/g, ""))}
      options={[
        { value: "1", label: "Name" },
        { value: "2", label: "Email" },
        { value: "3", label: "Phone" },
        { value: "4", label: "Active" },
        { value: "5", label: "Inactive" },
      ]}
      selectValue={select}
      selectOnChange={(e) => {
        setSelect(e);
        e === null && setSearch("");
        e && e.value === "4" && setSearch("Active");
        e && e.value === "5" && setSearch("Inactive");
      }}
      title="Customers"
      content={
        <>
          <MyDataTable columns={columns} data={datas} dependancy={data} />
        </>
      }
    />
  );
}
