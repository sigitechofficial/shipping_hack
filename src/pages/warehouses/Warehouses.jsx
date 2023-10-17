import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { Link, useNavigate } from "react-router-dom";
import GetAPI from "../../utilities/GetAPI";
import { PutAPI } from "../../utilities/PutAPI";
import MyDataTable from "../../components/MyDataTable";
import Loader, { MiniLoader } from "../../components/Loader";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../utilities/Toaster";
import { DTDel, DTEdit, DTView, ModalButtons } from "../../utilities/Buttons";
import { inputStyle, labelStyle, style } from "../../utilities/Input";
import { BASE_URL } from "../../utilities/URL";
import Layout from "../../components/Layout";

export default function Warehouses() {
  const remover = (str) => {
    if (str[0] === "+") {
      var result = str.slice(1);
    } else {
      result = str;
    }
    return result;
  };
  const navigate = useNavigate();
  const { data, reFetch } = GetAPI("allwarehouses");
  const [loader, setLoader] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [warehouseId, setWarehouseId] = useState("");
  const [updateWarehouse, setupdateWarehouse] = useState({
    warehouseId: "",
    email: "",
    countryCode: "",
    phoneNum: "",
    companyName: "",
  });
  const [updateModal, setUpdateModal] = useState(false);
  const closeUpdateModal = () => {
    setUpdateModal(false);
    setupdateWarehouse({
      warehouseId: "",
      email: "",
      countryCode: "",
      phoneNum: "",
      companyName: "",
    });
  };
  const [deleteModal, setDeleteModal] = useState(false);
  const closeDeleteModal = () => {
    setWarehouseId("");
    setDeleteModal(false);
  };
  const onChange = (e) => {
    setupdateWarehouse({ ...updateWarehouse, [e.target.name]: e.target.value });
  };
  const updateWarehouseFunc = async (e) => {
    e.preventDefault();
    if (updateWarehouse.companyName === "") {
      info_toaster("Please enter Warehouse's Name");
    } else if (updateWarehouse.email === "") {
      info_toaster("Please enter Warehouse's Email");
    } else if (updateWarehouse.phoneNum === "") {
      info_toaster("Please enter Warehouse's Phone");
    } else {
      setLoader(true);
      let res = await PutAPI("updatewarehouse", {
        warehouseId: updateWarehouse.warehouseId,
        email: updateWarehouse.email,
        countryCode: "+" + remover(updateWarehouse.countryCode),
        phoneNum: updateWarehouse.phoneNum,
        companyName: updateWarehouse.companyName,
      });
      if (res?.data?.status === "1") {
        reFetch();
        setLoader(false);
        success_toaster(res?.data?.message);
        setUpdateModal(false);
        setupdateWarehouse({
          warehouseId: "",
          email: "",
          countryCode: "",
          phoneNum: "",
          companyName: "",
        });
      } else {
        setLoader(false);
        error_toaster(res?.data?.message);
      }
    }
  };
  const deleteWarehouseFunc = async () => {
    setDisabled(true);
    let res = await PutAPI("deletewarehouse", {
      warehouseId: warehouseId,
    });
    if (res?.data?.status === "1") {
      reFetch();
      setWarehouseId("");
      setDeleteModal(false);
      success_toaster(res?.data?.message);
      setDisabled(false);
    } else {
      error_toaster(res?.data?.message);
      setDisabled(false);
    }
  };
  const warehouseDetailsFunc = async (id) => {
    setDisabled(true);
    var config = {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    };
    try {
      axios.get(BASE_URL + `warehousedetails/${id}`, config).then((dat) => {
        if (dat.data?.status === "1") {
          navigate("/warehouse-details", {
            state: { wareDetails: dat?.data?.data },
          });
          info_toaster(dat?.data?.message);
        } else {
          error_toaster(dat?.data?.message);
        }
        setDisabled(false);
      });
    } catch (err) {
      setDisabled(false);
    }
  };
  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
    },
    {
      name: "Warehouse Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone # ",
      selector: (row) => row.phone,
    },
    {
      name: "Location",
      selector: (row) => row.located,
    },
    {
      name: "Action",
      selector: (row) => row.action,
    },
  ];
  const datas = [];
  data?.data?.map((ware, index) => {
    return datas.push({
      id: index + 1,
      name: ware?.companyName,
      email: ware?.email,
      phone: ware?.countryCode + " " + ware?.phoneNum,
      located: ware?.located,
      action: (
        <div className="flex gap-x-2">
          <DTView
            view={() => warehouseDetailsFunc(ware?.id)}
            disabled={disabled}
          />
          <DTEdit
            edit={() => {
              setUpdateModal(true);
              setupdateWarehouse({
                warehouseId: ware?.id,
                email: ware?.email,
                countryCode: ware?.countryCode,
                phoneNum: ware?.phoneNum,
                companyName: ware?.companyName,
              });
            }}
          />
          <DTDel
            del={() => {
              setWarehouseId(ware?.id);
              setDeleteModal(true);
            }}
            disabled={disabled}
          />
        </div>
      ),
    });
  });
  return data.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      title="Warehouses"
      content={
        <>
          <style>{style}</style>
          <Modal
            onClose={closeUpdateModal}
            isOpen={updateModal}
            size="xl"
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <form>
                <ModalHeader>
                  <h1 className="text-center">Update Warehouse</h1>
                </ModalHeader>
                <ModalCloseButton />
                {loader ? (
                  <div className="h-[264px]">
                    <MiniLoader />
                  </div>
                ) : (
                  <ModalBody>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="companyName">
                          Warehouse Name
                        </label>
                        <input
                          value={updateWarehouse.companyName}
                          onChange={onChange}
                          type="text"
                          name="companyName"
                          id="companyName"
                          placeholder="Enter your Warehouse's Name"
                          className={inputStyle}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="email">
                          Warehouse Email
                        </label>
                        <input
                          value={updateWarehouse.email}
                          onChange={onChange}
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Enter your Warehouse's Email"
                          className={inputStyle}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="phoneNum">
                          Warehouse Phone
                        </label>
                        <div className="flex gap-x-1">
                          <PhoneInput
                            inputStyle={{
                              display: "block",
                              width: "88px",
                              paddingTop: "22px",
                              paddingBottom: "22px",
                              background: "#F4F5FA",
                              color: "black",
                              border: "none",
                            }}
                            inputProps={{ id: "code", name: "code" }}
                            value={updateWarehouse.countryCode}
                            onChange={(e) =>
                              setupdateWarehouse({
                                ...updateWarehouse,
                                countryCode: e,
                              })
                            }
                          />
                          <input
                            value={updateWarehouse.phoneNum}
                            onChange={onChange}
                            type="text"
                            name="phoneNum"
                            id="phoneNum"
                            placeholder="Enter your Warehouse's phoneNum"
                            className={inputStyle}
                          />
                        </div>
                      </div>
                    </div>
                  </ModalBody>
                )}
                <ModalFooter>
                  <ModalButtons
                    text="Update"
                    close={closeUpdateModal}
                    action={updateWarehouseFunc}
                  />
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
          <Modal
            onClose={closeDeleteModal}
            isOpen={deleteModal}
            size="xl"
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <h1 className="text-center">Delete Warehouse</h1>
              </ModalHeader>
              <ModalBody>
                <p className="text-lg">
                  Are you sure, you want to delete Warehouse?
                </p>
              </ModalBody>
              <ModalFooter>
                <ModalButtons
                  text="Delete"
                  close={closeDeleteModal}
                  action={deleteWarehouseFunc}
                  disabled={disabled}
                />
              </ModalFooter>
            </ModalContent>
          </Modal>
          <section className="space-y-3">
            <div className="flex justify-end">
              <Link
                to={"/create-warehouse"}
                className="py-2.5 px-12 rounded bg-themeBlue font-medium text-base text-white border border-themeBlue hover:bg-transparent hover:text-themeBlue"
              >
                Create Warehouse
              </Link>
            </div>
            <MyDataTable columns={columns} data={datas} dependancy={data} />
          </section>
        </>
      }
    />
  );
}
