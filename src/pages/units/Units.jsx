import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useLayoutEffect } from "react";
import GetAPI from "../../utilities/GetAPI";
import MyDataTable from "../../components/MyDataTable";
import Loader, { MiniLoader } from "../../components/Loader";
import AddButton, { DTEdit, ModalButtons } from "../../utilities/Buttons";
import Layout from "../../components/Layout";
import { useState } from "react";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../utilities/Toaster";
import { PutAPI } from "../../utilities/PutAPI";
import { PostAPI } from "../../utilities/PostAPI";
import { inputStyle, labelStyle } from "../../utilities/Input";
import Select from "react-select";

export default function Units() {
  const { data, reFetch } = GetAPI("getallunits");
  const unitTypes = GetAPI("getunitstypes");
  const [loader, setLoader] = useState(false);
  const [tab, setTab] = useState("");
  const [addUnit, setAddUnit] = useState({
    type: "",
    name: "",
    symbol: "",
    conversionRate: "",
  });
  const [updateUnit, setUpdateUnit] = useState({
    updateUnitId: "",
    updateType: "",
    updateName: "",
    updateSymbol: "",
    updateConversionRate: "",
  });
  const [addModal, setAddModal] = useState(false);
  const closeAddModal = () => {
    setAddModal(false);
    setAddUnit({
      type: "",
      name: "",
      symbol: "",
      conversionRate: "",
    });
  };
  const [updateModal, setUpdateModal] = useState(false);
  const closeUpdateModal = () => {
    setUpdateModal(false);
    setUpdateUnit({
      updateUnitId: "",
      updateType: "",
      updateName: "",
      updateSymbol: "",
      updateConversionRate: "",
    });
  };
  const onChange = (e) => {
    setAddUnit({ ...addUnit, [e.target.name]: e.target.value });
  };
  const onChange2 = (e) => {
    setUpdateUnit({ ...updateUnit, [e.target.name]: e.target.value });
  };
  const options = [];
  unitTypes?.data?.data?.map((type, index) => {
    return options.push({
      value: index + 1,
      label: type,
    });
  });
  const addUnitFunc = async (e) => {
    e.preventDefault();
    if (addUnit.name === "") {
      info_toaster("Please enter Unit Title");
    } else if (addUnit.type === "") {
      info_toaster("Please enter Unit Type");
    } else if (addUnit.symbol === "") {
      info_toaster("Please enter Unit Symbol");
    } else if (addUnit.conversionRate === "") {
      info_toaster("Please enter Unit Conversion Rate");
    } else {
      setLoader(true);
      let res = await PostAPI("addunit", {
        type: addUnit.type?.label,
        name: addUnit.name,
        symbol: addUnit.symbol,
        conversionRate: addUnit.conversionRate,
      });
      if (res?.data?.status === "1") {
        setAddModal(false);
        setLoader(false);
        reFetch();
        success_toaster(res?.data?.message);
        setAddUnit({
          type: "",
          name: "",
          symbol: "",
          conversionRate: "",
        });
      } else {
        setLoader(false);
        error_toaster(res?.data?.message);
      }
    }
  };
  const updateUnitFunc = async (e) => {
    e.preventDefault();
    if (updateUnit.updateName === "") {
      info_toaster("Please enter Unit Title");
    } else if (updateUnit.updateType === "") {
      info_toaster("Please enter Unit Type");
    } else if (updateUnit.updateSymbol === "") {
      info_toaster("Please enter Unit Symbol");
    } else if (updateUnit.updateConversionRate === "") {
      info_toaster("Please enter Unit Conversion Rate");
    } else {
      setLoader(true);
      let res = await PutAPI("updateunit", {
        unitId: updateUnit.updateUnitId,
        type: updateUnit.updateType?.label,
        name: updateUnit.updateName,
        symbol: updateUnit.updateSymbol,
        conversionRate: updateUnit.updateConversionRate,
      });
      if (res?.data?.status === "1") {
        setUpdateModal(false);
        setLoader(false);
        reFetch();
        success_toaster(res?.data?.message);
        setUpdateUnit({
          updateUnitId: "",
          updateType: "",
          updateName: "",
          updateSymbol: "",
          updateConversionRate: "",
        });
      } else {
        setLoader(false);
        error_toaster(res?.data?.message);
      }
    }
  };
  useLayoutEffect(() => {
    const activeTab = unitTypes?.data?.data && unitTypes?.data?.data[0];
    setTab(activeTab);
  }, [unitTypes?.data]);
  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
    },
    {
      name: "Unit Name",
      selector: (row) => row.name,
    },
    {
      name: "Type",
      selector: (row) => row.type,
    },
    {
      name: "Symbol",
      selector: (row) => row.symbol,
    },
    {
      name: "Conversion Rate",
      selector: (row) => row.conversionRate,
    },
    {
      name: "Action",
      selector: (row) => row.action,
    },
  ];
  const datas = [];
  if (data && tab && data?.data && data?.data[tab]) {
    const matchedArray = data?.data[tab];
    matchedArray?.map((unit, key) => {
      return datas.push({
        id: key + 1,
        name: unit?.name,
        type: unit?.type,
        symbol: unit?.symbol,
        conversionRate: unit?.conversionRate,
        action: (
          <div>
            <DTEdit
              edit={() => {
                setUpdateUnit({
                  updateUnitId: unit?.id,
                  updateType: { value: "", label: unit?.type },
                  updateName: unit?.name,
                  updateSymbol: unit?.symbol,
                  updateConversionRate: unit?.conversionRate,
                });
                setUpdateModal(true);
              }}
              disabled={loader}
            />
          </div>
        ),
      });
    });
  }
  return data.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      title="Units"
      content={
        <>
          <Modal onClose={closeAddModal} isOpen={addModal} size="xl" isCentered>
            <ModalOverlay />
            <ModalContent>
              <form>
                <ModalHeader>
                  <h1 className="text-center">Add Unit</h1>
                </ModalHeader>
                <ModalCloseButton />
                {loader ? (
                  <div className="h-[340px]">
                    <MiniLoader />
                  </div>
                ) : (
                  <ModalBody>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="name">
                          Unit Title
                        </label>
                        <input
                          value={addUnit.name}
                          onChange={onChange}
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Enter Unit's title"
                          className={inputStyle}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="type">
                          Type
                        </label>
                        <Select
                          value={addUnit.type}
                          onChange={(e) => setAddUnit({ ...addUnit, type: e })}
                          options={options}
                          inputId="type"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="symbol">
                          Symbol
                        </label>
                        <input
                          value={addUnit.symbol}
                          onChange={onChange}
                          type="text"
                          name="symbol"
                          id="symbol"
                          placeholder="Enter Unit's Symbol"
                          className={inputStyle}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="conversionRate">
                          Conversion Rate
                        </label>
                        <input
                          value={addUnit.conversionRate}
                          onChange={onChange}
                          type="text"
                          name="conversionRate"
                          id="conversionRate"
                          placeholder="Enter Unit's Conversion Rate"
                          className={inputStyle}
                        />
                      </div>
                    </div>
                  </ModalBody>
                )}
                <ModalFooter>
                  <ModalButtons
                    text="Add"
                    close={closeAddModal}
                    action={addUnitFunc}
                  />
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
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
                  <h1 className="text-center">Update Unit</h1>
                </ModalHeader>
                <ModalCloseButton />
                {loader ? (
                  <div className="h-[340px]">
                    <MiniLoader />
                  </div>
                ) : (
                  <ModalBody>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="updateName">
                          Unit Title
                        </label>
                        <input
                          value={updateUnit.updateName}
                          onChange={onChange2}
                          type="text"
                          name="updateName"
                          id="updateName"
                          placeholder="Enter Unit's title"
                          className={inputStyle}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="updateType">
                          Type
                        </label>
                        <Select
                          value={updateUnit.updateType}
                          onChange={(e) =>
                            setUpdateUnit({ ...updateUnit, type: e })
                          }
                          options={options}
                          inputId="updateType"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="updateSymbol">
                          Symbol
                        </label>
                        <input
                          value={updateUnit.updateSymbol}
                          onChange={onChange2}
                          type="text"
                          name="updateSymbol"
                          id="updateSymbol"
                          placeholder="Enter Unit's Symbol"
                          className={inputStyle}
                        />
                      </div>
                      <div className="space-y-1">
                        <label
                          className={labelStyle}
                          htmlFor="updateConversionRate"
                        >
                          Conversion Rate
                        </label>
                        <input
                          value={updateUnit.updateConversionRate}
                          onChange={onChange2}
                          type="text"
                          name="updateConversionRate"
                          id="updateConversionRate"
                          placeholder="Enter Unit's Conversion Rate"
                          className={inputStyle}
                        />
                      </div>
                    </div>
                  </ModalBody>
                )}
                <ModalFooter>
                  <ModalButtons
                    text="Update"
                    close={closeUpdateModal}
                    action={updateUnitFunc}
                  />
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
          <section className="space-y-3">
            <div className="flex justify-end">
              <AddButton text="Unit" modal={setAddModal} />
            </div>
            <div className="grid grid-cols-6 gap-5">
              {unitTypes?.data?.data?.map((type, index) => (
                <button
                  onClick={() => setTab(type)}
                  className={`rounded-md py-12 flex justify-center items-center ${
                    tab === type ? "bg-themeBlue" : "bg-white"
                  }`}
                >
                  <h6
                    className="font-semibold text-xl text-[#8D99AE] text-center capitalize"
                    key={index}
                  >
                    {type} <br /> Unit
                  </h6>
                </button>
              ))}
            </div>
            <div className="pt-5">
              <MyDataTable columns={columns} data={datas} dependancy={data} />
            </div>
          </section>
        </>
      }
    />
  );
}
