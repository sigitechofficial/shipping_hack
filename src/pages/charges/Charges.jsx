import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import GetAPI from "../../utilities/GetAPI";
import { PostAPI } from "../../utilities/PostAPI";
import { PutAPI } from "../../utilities/PutAPI";
import MyDataTable from "../../components/MyDataTable";
import Loader, { MiniLoader } from "../../components/Loader";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../utilities/Toaster";
import AddButton, {
  DTDel,
  DTEdit,
  ModalButtons,
  TabButton,
} from "../../utilities/Buttons";
import { inputStyle, labelStyle } from "../../utilities/Input";
import Layout from "../../components/Layout";
import ChargesCard from "../../components/ChargesCard";
import Select from "react-select";

export default function Charges() {
  const [tab, setTab] = useState("General");
  const [loader, setLoader] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const gen = GetAPI("getgencharges");
  console.log("🚀 ~ Charges ~ gen:", gen?.data?.data);
  const dist = GetAPI("getdistancecharge");
  const weight = GetAPI("getweightcharge");
  const vol = GetAPI("getvolweicharge");
  const log = GetAPI("getLogCharges");
  const activeLog = GetAPI("activeLog");
  const [genCharge, setGenCharge] = useState({
    value: "",
    cId: "",
  });
  const [addCharge, setAddCharge] = useState({
    title: "",
    startValue: "",
    endValue: "",
    price: "",
  });
  const [updateCharge, setUpdateCharge] = useState({
    updateTitle: "",
    updateStartValue: "",
    updateEndValue: "",
    updatePrice: "",
    chargeId: "",
  });
  const [addLogCharge, setAddLogCharge] = useState({
    startValue: "",
    endValue: "",
    charges: "",
    flash: false,
    logisticCompanyId: "",
  });
  const [updateLogCharge, setUpdateLogCharge] = useState({
    id: "",
    updateStartValue: "",
    updateEndValue: "",
    updateCharges: "",
    updateFlash: false,
  });
  const [genModal, setGenModal] = useState(false);
  const closeGenModal = () => {
    setGenModal(false);
    setGenCharge({
      value: "",
      cId: "",
    });
  };
  const [addModal, setAddModal] = useState(false);
  const closeAddModal = () => {
    setAddModal(false);
    setAddCharge({
      title: "",
      startValue: "",
      endValue: "",
      price: "",
    });
  };
  const [updateModal, setUpdateModal] = useState(false);
  const closeUpdateModal = () => {
    setUpdateModal(false);
    setUpdateCharge({
      updateTitle: "",
      updateStartValue: "",
      updateEndValue: "",
      updatePrice: "",
      chargeId: "",
    });
  };
  const [addLogModal, setAddLogModal] = useState(false);
  const closeAddLogModal = () => {
    setAddLogModal(false);
    setAddLogCharge({
      startValue: "",
      endValue: "",
      charges: "",
      flash: false,
      logisticCompanyId: "",
    });
  };
  const [updateLogModal, setUpdateLogModal] = useState(false);
  const closeUpdateLogModal = () => {
    setUpdateLogModal(false);
    setUpdateLogCharge({
      id: "",
      updateStartValue: "",
      updateEndValue: "",
      updateCharges: "",
      updateFlash: false,
    });
  };
  const onChange = (e) => {
    setAddCharge({ ...addCharge, [e.target.name]: e.target.value });
  };
  const onChange2 = (e) => {
    setUpdateCharge({ ...updateCharge, [e.target.name]: e.target.value });
  };
  const onChange3 = (e) => {
    setAddLogCharge({ ...addLogCharge, [e.target.name]: e.target.value });
  };
  const onChange4 = (e) => {
    setUpdateLogCharge({ ...updateLogCharge, [e.target.name]: e.target.value });
  };
  const addChargeFunc = async (e) => {
    e.preventDefault();
    if (addCharge.title === "") {
      info_toaster("Please enter your Charge's Title");
    } else if (addCharge.startValue === "") {
      info_toaster("Please enter your Charge's Min Range");
    } else if (addCharge.endValue === "") {
      info_toaster("Please enter your Charge's Max Range");
    } else if (addCharge.price === "") {
      info_toaster("Please enter your Charge's Price");
    } else {
      setLoader(true);
      let res = await PostAPI(
        tab === "Distance"
          ? "adddistancecharge"
          : tab === "Weight"
          ? "addweightcharge"
          : tab === "Vol-Weight"
          ? "addvolweicharge"
          : "",
        {
          title: addCharge.title,
          startValue: addCharge.startValue,
          endValue: addCharge.endValue,
          price: addCharge.price,
        }
      );
      if (res?.data?.status === "1") {
        if (tab === "Distance") {
          dist.reFetch();
        } else if (tab === "Weight") {
          weight.reFetch();
        } else if (tab === "Vol-Weight") {
          vol.reFetch();
        }
        setLoader(false);
        success_toaster(res?.data?.message);
        setAddModal(false);
        setAddCharge({
          title: "",
          startValue: "",
          endValue: "",
          price: "",
        });
      } else {
        setLoader(false);
        error_toaster(res?.data?.message);
      }
    }
  };
  const addLogChargeFunc = async (e) => {
    e.preventDefault();
    if (addLogCharge.startValue === "") {
      info_toaster("Please enter your Charge's Min Range");
    } else if (addLogCharge.endValue === "") {
      info_toaster("Please enter your Charge's Max Range");
    } else if (addLogCharge.charges === "") {
      info_toaster("Please enter your Charge's Price");
    } else if (addLogCharge.logisticCompanyId === "") {
      info_toaster("Please select your Logistic Company");
    } else {
      setLoader(true);
      let res = await PostAPI("addChargesForLog", {
        startValue: addLogCharge.startValue,
        endValue: addLogCharge.endValue,
        charges: addLogCharge.charges,
        flash: addLogCharge.flash,
        logisticCompanyId:
          addLogCharge.logisticCompanyId &&
          addLogCharge.logisticCompanyId.value,
      });
      if (res?.data?.status === "1") {
        log.reFetch();
        setLoader(false);
        success_toaster(res?.data?.message);
        setAddLogModal(false);
        setAddLogCharge({
          startValue: "",
          endValue: "",
          charges: "",
          flash: false,
          logisticCompanyId: "",
        });
      } else {
        setLoader(false);
        error_toaster(res?.data?.message);
      }
    }
  };
  const updateGenChargeFunc = async (e) => {
    e.preventDefault();
    if (genCharge.value === "") {
      info_toaster("Please enter your Charge's Value");
    } else {
      setLoader(true);
      let res = await PutAPI("updategencharges", {
        value: genCharge.value,
        cId: genCharge.cId,
      });
      if (res?.data?.status === "1") {
        gen.reFetch();
        setLoader(false);
        success_toaster(res?.data?.message);
        setGenModal(false);
        setGenCharge({
          value: "genCharge.",
          cId: "",
        });
      } else {
        setLoader(false);
        error_toaster(res?.data?.message);
      }
    }
  };
  const updateChargeFunc = async (e) => {
    e.preventDefault();
    if (updateCharge.updateTitle === "") {
      info_toaster("Please enter your Charge's Title");
    } else if (updateCharge.updateStartValue === "") {
      info_toaster("Please enter your Charge's Min Range");
    } else if (updateCharge.updateEndValue === "") {
      info_toaster("Please enter your Charge's Max Range");
    } else if (updateCharge.updatePrice === "") {
      info_toaster("Please enter your Charge's Price");
    } else {
      setLoader(true);
      let res = await PutAPI(
        tab === "Distance"
          ? "updatedistancecharge"
          : tab === "Weight"
          ? "updateweightcharge"
          : tab === "Vol-Weight"
          ? "updatevolweicharge"
          : "",
        {
          title: updateCharge.updateTitle,
          startValue: updateCharge.updateStartValue,
          endValue: updateCharge.updateEndValue,
          price: updateCharge.updatePrice,
          chargeId: updateCharge.chargeId,
        }
      );
      if (res?.data?.status === "1") {
        if (tab === "Distance") {
          dist.reFetch();
        } else if (tab === "Weight") {
          weight.reFetch();
        } else if (tab === "Vol-Weight") {
          vol.reFetch();
        }
        setLoader(false);
        success_toaster(res?.data?.message);
        setUpdateModal(false);
        setUpdateCharge({
          updateTitle: "",
          updateStartValue: "",
          updateEndValue: "",
          updatePrice: "",
          chargeId: "",
        });
      } else {
        setLoader(false);
        error_toaster(res?.data?.message);
      }
    }
  };
  const updateLogChargeFunc = async (e) => {
    e.preventDefault();
    if (updateLogCharge.updateStartValue === "") {
      info_toaster("Please enter your Charge's Min Range");
    } else if (updateLogCharge.updateEndValue === "") {
      info_toaster("Please enter your Charge's Max Range");
    } else if (updateLogCharge.updateCharges === "") {
      info_toaster("Please enter your Charge's Price");
    } else {
      setLoader(true);
      let res = await PutAPI("updateLogCharges", {
        id: updateLogCharge.id,
        startValue: updateLogCharge.updateStartValue,
        endValue: updateLogCharge.updateEndValue,
        charges: updateLogCharge.updateCharges,
        flash: updateLogCharge.updateFlash,
      });
      if (res?.data?.status === "1") {
        log.reFetch();
        setLoader(false);
        success_toaster(res?.data?.message);
        setUpdateLogModal(false);
        setUpdateLogCharge({
          id: "",
          updateStartValue: "",
          updateEndValue: "",
          updateCharges: "",
          updateFlash: false,
        });
      } else {
        setLoader(false);
        error_toaster(res?.data?.message);
      }
    }
  };
  const deleteChargeFunc = async (url, chargeId) => {
    setDisabled(true);
    let res = await PutAPI(url, {
      chargeId: chargeId,
    });
    if (res?.data?.status === "1") {
      if (url === "deletedistancecharge") {
        dist.reFetch();
      } else if (url === "deleteweightcharge") {
        weight.reFetch();
      } else if (url === "deletevolweicharge") {
        vol.reFetch();
      } else if (url === "deleteChargesForLog") {
        log.reFetch();
      }
      success_toaster(res?.data?.message);
      setDisabled(false);
    } else {
      error_toaster(res?.data?.message);
      setDisabled(false);
    }
  };
  const options = [];
  activeLog?.data?.data?.data?.map((ele, index) => {
    return options.push({
      value: ele?.id,
      label: ele?.title,
    });
  });
  const columns = [];
  if (tab === "Shipping Company") {
    columns.push(
      {
        name: "#",
        selector: (row) => row.id,
      },
      {
        name: "Min Value (lbs)",
        selector: (row) => row.min,
      },
      {
        name: "Max Value (lbs)",
        selector: (row) => row.max,
      },
      {
        name: `Price ($)`,
        selector: (row) => row.price,
      },
      {
        name: "Flash",
        selector: (row) => row.flash,
      },
      {
        name: "Logistic Company",
        selector: (row) => row.company,
      },
      {
        name: "Action",
        selector: (row) => row.action,
      }
    );
  } else {
    columns.push(
      {
        name: "#",
        selector: (row) => row.id,
      },
      {
        name: "Title",
        selector: (row) => row.title,
      },
      {
        name: "Min Value (lbs)",
        selector: (row) => row.min,
      },
      {
        name: "Max Value (lbs)",
        selector: (row) => row.max,
      },
      {
        name: `Price ($)`,
        selector: (row) => row.price,
      },
      {
        name: "Action",
        selector: (row) => row.action,
      }
    );
  }
  const datas = [];
  if (tab === "Distance") {
    dist?.data?.data?.distCharData?.map((dist, index) =>
      datas.push({
        id: index + 1,
        title: dist?.title,
        min: dist?.startValue,
        max: dist?.endValue,
        price: dist?.price,
        action: (
          <div className="flex gap-x-2">
            <DTEdit
              edit={() => {
                setUpdateModal(true);
                setUpdateCharge({
                  updateTitle: dist?.title,
                  updateStartValue: dist?.startValue,
                  updateEndValue: dist?.endValue,
                  updatePrice: dist?.price,
                  chargeId: dist?.id,
                });
              }}
            />
            <DTDel
              del={() => deleteChargeFunc("deletedistancecharge", dist?.id)}
              disabled={disabled}
            />
          </div>
        ),
      })
    );
  } else if (tab === "Weight") {
    weight?.data?.data?.weightCharData?.map((weight, index) =>
      datas.push({
        id: index + 1,
        title: weight?.title,
        min: weight?.startValue,
        max: weight?.endValue,
        price: weight?.price,
        action: (
          <div className="flex gap-x-2">
            <DTEdit
              edit={() => {
                setUpdateModal(true);
                setUpdateCharge({
                  updateTitle: weight?.title,
                  updateStartValue: weight?.startValue,
                  updateEndValue: weight?.endValue,
                  updatePrice: weight?.price,
                  chargeId: weight?.id,
                });
              }}
            />
            <DTDel
              del={() => deleteChargeFunc("deleteweightcharge", weight?.id)}
              disabled={disabled}
            />
          </div>
        ),
      })
    );
  } else if (tab === "Vol-Weight") {
    vol?.data?.data?.weightCharData?.map((vol, index) =>
      datas.push({
        id: index + 1,
        title: vol?.title,
        min: vol?.startValue,
        max: vol?.endValue,
        price: vol?.price,
        action: (
          <div className="flex gap-x-2">
            <DTEdit
              edit={() => {
                setUpdateModal(true);
                setUpdateCharge({
                  updateTitle: vol?.title,
                  updateStartValue: vol?.startValue,
                  updateEndValue: vol?.endValue,
                  updatePrice: vol?.price,
                  chargeId: vol?.id,
                });
              }}
            />
            <DTDel
              del={() => deleteChargeFunc("deletevolweicharge", vol?.id)}
              disabled={disabled}
            />
          </div>
        ),
      })
    );
  } else if (tab === "Shipping Company") {
    log?.data?.data?.charges?.map((log, index) =>
      datas.push({
        id: index + 1,
        min: log?.startValue,
        max: log?.endValue,
        price: log?.charges,
        flash: log?.flash ? "Yes" : "No",
        company: log?.logisticCompany && log?.logisticCompany?.title,
        action: (
          <div className="flex gap-x-2">
            <DTEdit
              edit={() => {
                setUpdateLogModal(true);
                setUpdateLogCharge({
                  id: log?.id,
                  updateStartValue: log?.startValue,
                  updateEndValue: log?.endValue,
                  updateCharges: log?.charges,
                  updateFlash: log?.flash ? true : false,
                });
              }}
            />
            <DTDel
              del={() => deleteChargeFunc("deleteChargesForLog", log?.id)}
              disabled={disabled}
            />
          </div>
        ),
      })
    );
  }
  return gen?.data.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      title="Charges Management"
      content={
        <>
          <Modal onClose={closeGenModal} isOpen={genModal} size="xl" isCentered>
            <ModalOverlay />
            <ModalContent>
              <form>
                <ModalHeader>
                  <h1 className="text-center">Update Charge</h1>
                </ModalHeader>
                <ModalCloseButton />
                {loader ? (
                  <div className="h-[176px]">
                    <MiniLoader />
                  </div>
                ) : (
                  <ModalBody>
                    <div className="h-40 pt-5">
                      <label className={labelStyle} htmlFor="value">
                        Value
                      </label>
                      <input
                        value={genCharge.value}
                        onChange={(e) =>
                          setGenCharge({
                            ...genCharge,
                            [e.target.name]: e.target.value,
                          })
                        }
                        type="text"
                        name="value"
                        id="value"
                        placeholder="Enter your Charge's Value"
                        className={inputStyle}
                      />
                    </div>
                  </ModalBody>
                )}
                <ModalFooter>
                  <ModalButtons
                    text="Update"
                    close={closeGenModal}
                    action={updateGenChargeFunc}
                  />
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
          <Modal onClose={closeAddModal} isOpen={addModal} size="xl" isCentered>
            <ModalOverlay />
            <ModalContent>
              <form>
                <ModalHeader>
                  <h1 className="text-center">Add Charge</h1>
                </ModalHeader>
                <ModalCloseButton />
                {loader ? (
                  <div className="h-[352px]">
                    <MiniLoader />
                  </div>
                ) : (
                  <ModalBody>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="title">
                          Title
                        </label>
                        <input
                          value={addCharge.title}
                          onChange={onChange}
                          type="text"
                          name="title"
                          id="title"
                          placeholder="Enter your Charge's Title"
                          className={inputStyle}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="startValue">
                          Min Range
                        </label>
                        <input
                          value={addCharge.startValue}
                          onChange={onChange}
                          type="number"
                          name="startValue"
                          id="startValue"
                          placeholder="Enter your Charge's Min Range"
                          className={inputStyle}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="endValue">
                          Max Range
                        </label>
                        <input
                          value={addCharge.endValue}
                          onChange={onChange}
                          type="number"
                          name="endValue"
                          id="endValue"
                          placeholder="Enter your Charge's Max Range"
                          className={inputStyle}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="endVapricelue">
                          Price
                        </label>
                        <input
                          value={addCharge.price}
                          onChange={onChange}
                          type="number"
                          name="price"
                          id="price"
                          placeholder="Enter your Charge's Price"
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
                    action={addChargeFunc}
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
                  <h1 className="text-center">Update Charge</h1>
                </ModalHeader>
                <ModalCloseButton />
                {loader ? (
                  <div className="h-[352px]">
                    <MiniLoader />
                  </div>
                ) : (
                  <ModalBody>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="updateTitle">
                          Title
                        </label>
                        <input
                          value={updateCharge.updateTitle}
                          onChange={onChange2}
                          type="text"
                          name="updateTitle"
                          id="updateTitle"
                          placeholder="Enter your Charge's Title"
                          className={inputStyle}
                        />
                      </div>
                      <div className="space-y-1">
                        <label
                          className={labelStyle}
                          htmlFor="updateStartValue"
                        >
                          Min Range
                        </label>
                        <input
                          value={updateCharge.updateStartValue}
                          onChange={onChange2}
                          type="number"
                          name="updateStartValue"
                          id="updateStartValue"
                          placeholder="Enter your Charge's Min Range"
                          className={inputStyle}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="updateEndValue">
                          Max Range
                        </label>
                        <input
                          value={updateCharge.updateEndValue}
                          onChange={onChange2}
                          type="number"
                          name="updateEndValue"
                          id="updateEndValue"
                          placeholder="Enter your Charge's Max Range"
                          className={inputStyle}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="updatePrice">
                          Price
                        </label>
                        <input
                          value={updateCharge.updatePrice}
                          onChange={onChange2}
                          type="number"
                          name="updatePrice"
                          id="updatePrice"
                          placeholder="Enter your Charge's Price"
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
                    action={updateChargeFunc}
                  />
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
          <Modal
            onClose={closeAddLogModal}
            isOpen={addLogModal}
            size="xl"
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <form>
                <ModalHeader>
                  <h1 className="text-center">Add Charge</h1>
                </ModalHeader>
                <ModalCloseButton />
                {loader ? (
                  <div className="h-[390px]">
                    <MiniLoader />
                  </div>
                ) : (
                  <ModalBody>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="startValue">
                          Min Range
                        </label>
                        <input
                          value={addLogCharge.startValue}
                          onChange={onChange3}
                          type="number"
                          name="startValue"
                          id="startValue"
                          placeholder="Enter your Charge's Min Range"
                          className={inputStyle}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="endValue">
                          Max Range
                        </label>
                        <input
                          value={addLogCharge.endValue}
                          onChange={onChange3}
                          type="number"
                          name="endValue"
                          id="endValue"
                          placeholder="Enter your Charge's Max Range"
                          className={inputStyle}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="charges">
                          Price
                        </label>
                        <input
                          value={addLogCharge.charges}
                          onChange={onChange3}
                          type="number"
                          name="charges"
                          id="charges"
                          placeholder="Enter your Charge's Price"
                          className={inputStyle}
                        />
                      </div>
                      <div className="flex items-center gap-x-2">
                        <label className={labelStyle} htmlFor="flash">
                          Flash Delivery
                        </label>
                        <input
                          value={addLogCharge.flash}
                          onChange={(e) =>
                            setAddLogCharge({
                              ...addLogCharge,
                              [e.target.name]: !addLogCharge.flash,
                            })
                          }
                          type="checkbox"
                          name="flash"
                          id="flash"
                        />
                      </div>
                      <div className="space-y-1">
                        <label
                          className={labelStyle}
                          htmlFor="logisticCompanyId"
                        >
                          Logistic Company
                        </label>
                        <Select
                          value={addLogCharge.logisticCompanyId}
                          onChange={(e) =>
                            setAddLogCharge({
                              ...addLogCharge,
                              logisticCompanyId: e,
                            })
                          }
                          options={options}
                          inputId="logisticCompanyId"
                        />
                      </div>
                    </div>
                  </ModalBody>
                )}
                <ModalFooter>
                  <ModalButtons
                    text="Add"
                    close={closeAddLogModal}
                    action={addLogChargeFunc}
                  />
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
          <Modal
            onClose={closeUpdateLogModal}
            isOpen={updateLogModal}
            size="xl"
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <form>
                <ModalHeader>
                  <h1 className="text-center">Update Charge</h1>
                </ModalHeader>
                <ModalCloseButton />
                {loader ? (
                  <div className="h-[300px]">
                    <MiniLoader />
                  </div>
                ) : (
                  <ModalBody>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label
                          className={labelStyle}
                          htmlFor="updateStartValue"
                        >
                          Min Range
                        </label>
                        <input
                          value={updateLogCharge.updateStartValue}
                          onChange={onChange4}
                          type="number"
                          name="updateStartValue"
                          id="updateStartValue"
                          placeholder="Enter your Charge's Min Range"
                          className={inputStyle}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="updateEndValue">
                          Max Range
                        </label>
                        <input
                          value={updateLogCharge.updateEndValue}
                          onChange={onChange4}
                          type="number"
                          name="updateEndValue"
                          id="updateEndValue"
                          placeholder="Enter your Charge's Max Range"
                          className={inputStyle}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="updateCharges">
                          Price
                        </label>
                        <input
                          value={updateLogCharge.updateCharges}
                          onChange={onChange4}
                          type="number"
                          name="updateCharges"
                          id="updateCharges"
                          placeholder="Enter your Charge's Price"
                          className={inputStyle}
                        />
                      </div>
                      <div className="flex items-center gap-x-2">
                        <label className={labelStyle} htmlFor="updateFlash">
                          Flash Delivery
                        </label>
                        <input
                          value={updateLogCharge.updateFlash}
                          onChange={(e) =>
                            setUpdateLogCharge({
                              ...updateLogCharge,
                              [e.target.name]: !updateLogCharge.updateFlash,
                            })
                          }
                          defaultChecked={
                            updateLogCharge.updateFlash ? true : false
                          }
                          type="checkbox"
                          name="updateFlash"
                          id="updateFlash"
                        />
                      </div>
                    </div>
                  </ModalBody>
                )}
                <ModalFooter>
                  <ModalButtons
                    text="Update"
                    close={closeUpdateLogModal}
                    action={updateLogChargeFunc}
                  />
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
          <section className="space-y-12">
            <div className="flex">
              <TabButton text="General" set={setTab} tab={tab} width="w-40" />
              <TabButton text="Distance" set={setTab} tab={tab} width="w-40" />
              <TabButton text="Weight" set={setTab} tab={tab} width="w-40" />
              <TabButton
                text="Vol-Weight"
                set={setTab}
                tab={tab}
                width="w-40"
              />
              <TabButton
                text="Shipping Company"
                set={setTab}
                tab={tab}
                width="w-60"
              />
            </div>
            {tab === "General" ? (
              gen?.data?.status === "1" ? (
                <section className="grid grid-cols-4 gap-8">
                  {gen?.data?.data?.map((gen, index) => (
                    <ChargesCard
                      info={gen?.information}
                      value={gen?.value}
                      textColor="text-purple-400"
                      onClick={() => {
                        setGenModal(true);
                        setGenCharge({
                          value: gen?.value,
                          cId: gen?.id,
                        });
                      }}
                    />
                  ))}
                </section>
              ) : (
                <h1 className="my-4 text-center">
                  You are not authorized to access it
                </h1>
              )
            ) : (
              <section className="space-y-3">
                <div className="flex justify-end">
                  <AddButton
                    text="Charge"
                    modal={
                      tab === "Shipping Company" ? setAddLogModal : setAddModal
                    }
                  />
                </div>
                <MyDataTable
                  columns={columns}
                  data={datas}
                  dependancy={
                    tab === "Distance"
                      ? dist?.data
                      : tab === "Weight"
                      ? weight?.data
                      : vol?.data
                  }
                />
              </section>
            )}
          </section>
        </>
      }
    />
  );
}
