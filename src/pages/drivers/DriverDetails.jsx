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
import React, { useEffect, useState } from "react";
import { AiFillCar } from "react-icons/ai";
import { BsBank, BsFillCreditCard2BackFill } from "react-icons/bs";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { TbLicense } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import { PostAPI } from "../../utilities/PostAPI";
import MyDataTable from "../../components/MyDataTable";
import { MiniLoader } from "../../components/Loader";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../utilities/Toaster";
import {
  BackButton,
  DTApproved,
  DTPending,
  DTView,
  ModalButtons,
  TabButton,
} from "../../utilities/Buttons";
import { inputStyle, labelStyle } from "../../utilities/Input";
import { BASE_URL, BASE_URL2 } from "../../utilities/URL";
import Layout from "../../components/Layout";
import DetailsCard from "../../components/DetailsCard";

export default function DriverDetails() {
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [modalType, setModalType] = useState("");
  const [wallet, setWallet] = useState({});
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const driDetails = location?.state?.driDetails?.userData1;
  const driId = location?.state?.driverId;
  const bookingDetails = async (id) => {
    setDisabled(true);
    var config = {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    };
    try {
      axios.get(BASE_URL + `bookingdetails?id=${id}`, config).then((dat) => {
        if (dat.data?.status === "1") {
          localStorage.setItem("orderId", dat?.data?.data?.id);
          navigate("/booking-details");
          info_toaster(dat?.data?.message);
          setDisabled(false);
        } else {
          error_toaster(dat?.data?.message);
          setDisabled(false);
        }
      });
    } catch (err) {}
  };
  const walletDetails = async () => {
    var config = {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    };
    try {
      axios.get(BASE_URL + `driver/wallet?id=${driId}`, config).then((dat) => {
        if (dat.data?.status === "1") {
          setWallet(dat?.data?.data);
        } else {
          error_toaster(dat?.data?.message);
        }
      });
    } catch (err) {}
  };
  useEffect(() => {
    walletDetails();
  }, []);
  const payout = async () => {
    if (amount === "") {
      info_toaster("Please enter Amount");
    } else {
      setLoader(true);
      let res = await PostAPI("driver/pay", {
        driverId: driId,
        amount: amount,
      });
      if (res?.data?.status === "1") {
        setLoader(false);
        success_toaster(res?.data?.message);
        setModal(false);
        setModalType("");
        setAmount("");
      } else {
        setLoader(false);
        error_toaster(res?.data?.message);
      }
    }
  };
  const transColumns = [
    {
      name: "#",
      selector: (row) => row.id,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Type",
      selector: (row) => row.type,
    },
    {
      name: "Date",
      selector: (row) => row.date,
    },
  ];
  const transData = [];
  wallet?.transactions?.map((trans, index) => {
    return transData.push({
      id: index + 1,
      amount: trans?.amount,
      type: trans?.type,
      date: trans?.date,
    });
  });
  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
    },
    {
      name: "Order #",
      selector: (row) => row.orderId,
    },
    {
      name: "Pickup DBS #",
      selector: (row) => row.pickUp,
    },
    {
      name: "Drop off DBS #",
      selector: (row) => row.dropOff,
    },
    {
      name: "Date",
      selector: (row) => row.date,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Action",
      selector: (row) => row.action,
      minWidth: "160px",
    },
  ];
  const datas = [];
  driDetails?.receivingDriver?.map((det, index) =>
    datas.push({
      id: index + 1,
      orderId: det?.trackingId,
      pickUp:
        det?.pickupAddress?.postalCode + det?.pickupAddress?.secondPostalCode,
      dropOff:
        det?.dropoffAddress?.postalCode + det?.dropoffAddress?.secondPostalCode,
      date: det?.pickupDate,
      status: det?.bookingStatus?.title,
      action: <DTView view={() => bookingDetails(det?.id)} />,
    })
  );
  return (
    <Layout
      title="Driver Details"
      content={
        <>
          <Modal
            onClose={() => setModal(false)}
            isOpen={modal}
            size={modalType === "Transactions" ? "3xl" : "xl"}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <h1 className="text-center">
                  {modalType === "License"
                    ? "License Details"
                    : modalType === "Vehicle"
                    ? "Vehicle Details"
                    : modalType === "Earnings"
                    ? "Earnings"
                    : modalType === "Bank"
                    ? "Bank Details"
                    : modalType === "Transactions"
                    ? "Transactions"
                    : modalType === "Payout"
                    ? "Pay to Driver"
                    : ""}
                </h1>
              </ModalHeader>
              <ModalCloseButton />
              {loader && modalType === "Payout" ? (
                <div className="h-[176px]">
                  <MiniLoader />
                </div>
              ) : (
                <ModalBody>
                  {modalType === "License" ? (
                    <div className="space-y-4">
                      <div>
                        Expiry:{" "}
                        <span className="font-bold">
                          {driDetails?.driverDetail?.licExpiryDate}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-x-2">
                        <div className="space-y-2">
                          <h4>Front Image</h4>
                          <div>
                            <img
                              src={
                                BASE_URL2 +
                                driDetails?.driverDetail?.licFrontImage
                              }
                              alt="front"
                              className="w-full h-40 object-cover"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4>Back Image</h4>
                          <div>
                            <img
                              src={
                                BASE_URL2 +
                                driDetails?.driverDetail?.licBackImage
                              }
                              alt="back"
                              className="w-full h-40 object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : modalType === "Vehicle" ? (
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                      <div>
                        Vehcile Type:{" "}
                        <span className="font-bold">
                          {driDetails?.driverDetail?.vehicleType?.title}
                        </span>
                      </div>
                      <div>
                        Vehcile Company:{" "}
                        <span className="font-bold">
                          {driDetails?.driverDetail?.vehicleMake}
                        </span>
                      </div>
                      <div>
                        Vehcile Model:{" "}
                        <span className="font-bold">
                          {driDetails?.driverDetail?.vehicleModel}
                        </span>
                      </div>
                      <div>
                        Vehcile Color:{" "}
                        <span className="font-bold">
                          {driDetails?.driverDetail?.vehicleColor}
                        </span>
                      </div>
                      <div>
                        Registration Year:{" "}
                        <span className="font-bold">
                          {driDetails?.driverDetail?.vehicleYear}
                        </span>
                      </div>
                      <div className="col-span-2 space-y-2">
                        <h2>Vehicle Images: </h2>
                        <div className="grid grid-cols-2 gap-2">
                          {driDetails?.vehicleImages?.map((veh, index) => (
                            <div className="border border-black border-opacity-20 rounded-lg overflow-hidden">
                              <img
                                src={BASE_URL2 + veh?.image}
                                alt={`vehicle ${index}`}
                                className="w-full h-40 object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : modalType === "Earnings" ? (
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1 pb-4">
                      <div>
                        Total Earnings:{" "}
                        <span className="font-bold">
                          {wallet?.currencyUnit + wallet?.totalEarning}
                        </span>
                      </div>
                      <div>
                        Available Balance:{" "}
                        <span className="font-bold">
                          {wallet?.currencyUnit + wallet?.availableBalance}
                        </span>
                      </div>
                    </div>
                  ) : modalType === "Bank" ? (
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1 pb-4">
                      <div>
                        Bank:{" "}
                        <span className="font-bold">
                          {wallet?.bank?.bankName}
                        </span>
                      </div>
                      <div>
                        Account Title:{" "}
                        <span className="font-bold">
                          {wallet?.bank?.accountName}
                        </span>
                      </div>
                      <div>
                        Account No.:{" "}
                        <span className="font-bold">
                          {wallet?.bank?.accountNumber}
                        </span>
                      </div>
                    </div>
                  ) : modalType === "Transactions" ? (
                    <section className="max-h-[540px] overflow-auto">
                      <MyDataTable columns={transColumns} data={transData} />
                    </section>
                  ) : modalType === "Payout" ? (
                    <div className="h-40 pt-5">
                      <label className={labelStyle} htmlFor="amount">
                        Amount
                      </label>
                      <input
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        type="number"
                        name="amount"
                        id="amount"
                        placeholder="Enter Amount"
                        className={inputStyle}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </ModalBody>
              )}
              {modalType === "Payout" && (
                <ModalFooter>
                  <ModalButtons
                    text="Pay"
                    close={() => {
                      setModal(false);
                      setModalType("");
                      setAmount("");
                    }}
                    action={payout}
                  />
                </ModalFooter>
              )}
            </ModalContent>
          </Modal>
          <section className="2xl:space-y-4 space-y-8">
            <div>
              <BackButton />
            </div>
            <section className="2xl:grid 2xl:grid-cols-12 gap-x-5 flex flex-col gap-y-5">
              <div className="2xl:col-span-9 2xl:order-1 order-2">
                <MyDataTable columns={columns} data={datas} />
              </div>
              <div
                className={`2xl:col-span-3 2xl:order-2 order-1 bg-white text-black rounded-lg space-y-5 py-12 px-12`}
              >
                <div className="pb-5">
                  <img
                    src={BASE_URL2 + driDetails?.image}
                    alt="profile"
                    className="w-20 h-20 object-cover rounded-fullest block mx-auto"
                  />
                </div>
                <div className="space-y-2">
                  <h2 className="font-bold text-xl text-themeBlue">
                    {driDetails?.firstName + " " + driDetails?.lastName}
                  </h2>
                  <p className="font-normal text-base text-themeBlue text-opacity-60">
                    Member Since: {driDetails?.joinedOn}
                  </p>
                </div>
                <hr className="border-none h-0.5 bg-black bg-opacity-20" />
                <div className="space-y-2">
                  <h2 className="font-normal text-sm text-black text-opacity-60">
                    Email
                  </h2>
                  <p className="font-normal text-base">{driDetails?.email}</p>
                </div>
                <hr className="border-none h-0.5 bg-black bg-opacity-20" />
                <div className="space-y-2">
                  <h2 className="font-normal text-sm text-black text-opacity-60">
                    Phone no
                  </h2>
                  <p className="font-normal text-base">
                    {driDetails?.countryCode + " " + driDetails?.phoneNum}
                  </p>
                </div>
                <hr className="border-none h-0.5 bg-black bg-opacity-20" />
                <div className="space-y-2">
                  <h2 className="font-normal text-sm text-black text-opacity-60">
                    Vehicle
                  </h2>
                  <p className="font-normal text-base">
                    {driDetails?.driverDetail?.vehicleType?.title}
                  </p>
                </div>
                <hr className="border-none h-0.5 bg-black bg-opacity-20" />
                <div className="space-y-2">
                  <h2 className="font-normal text-sm text-black text-opacity-60">
                    Status
                  </h2>
                  <p className="font-normal text-base">
                    {driDetails?.driverDetail?.approvedByAdmin ? (
                      <DTApproved />
                    ) : (
                      <DTPending />
                    )}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <DetailsCard
                    onClick={() => {
                      setModal(true);
                      setModalType("License");
                    }}
                    Icon={TbLicense}
                    text="License Details"
                  />
                  <DetailsCard
                    onClick={() => {
                      setModal(true);
                      setModalType("Vehicle");
                    }}
                    Icon={AiFillCar}
                    text="Vehicle Details"
                  />
                  <DetailsCard
                    onClick={() => {
                      setModal(true);
                      setModalType("Earnings");
                    }}
                    Icon={FaMoneyCheckAlt}
                    text="Earnings"
                  />
                  <DetailsCard
                    onClick={() => {
                      setModal(true);
                      setModalType("Bank");
                    }}
                    Icon={BsBank}
                    text="Bank Details"
                  />
                  <DetailsCard
                    onClick={() => {
                      setModal(true);
                      setModalType("Transactions");
                    }}
                    Icon={BsFillCreditCard2BackFill}
                    text="Transactions"
                  />
                  <DetailsCard
                    onClick={() => {
                      setModal(true);
                      setModalType("Payout");
                    }}
                    Icon={RiMoneyDollarBoxLine}
                    text="Pay to Driver"
                  />
                </div>
              </div>
            </section>
          </section>
        </>
      }
    />
  );
}
