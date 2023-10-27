import React, { useState } from "react";
import GetAPI from "../../utilities/GetAPI";
import MyDataTable from "../../components/MyDataTable";
import Loader, { MiniLoader } from "../../components/Loader";
import AddButton, { DTEdit, ModalButtons } from "../../utilities/Buttons";
import Layout from "../../components/Layout";
import { active, block } from "../../utilities/CustomStyles";
import { PutAPI } from "../../utilities/PutAPI";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../utilities/Toaster";
import { BASE_URL2 } from "../../utilities/URL";
import { PostAPI } from "../../utilities/PostAPI";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { inputStyle, labelStyle } from "../../utilities/Input";

export default function Logistics() {
  const { data, reFetch } = GetAPI("getLogCompanies");
  const [loader, setLoader] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [addLogistic, setAddLogistic] = useState({
    title: "",
    description: "",
    flashCharges: "",
    standardCharges: "",
    image: "",
  });
  const [updateLogistic, setUpdateLogistic] = useState({
    cId: "",
    updateTitle: "",
    updateDescription: "",
    updateFlashCharges: "",
    updateStandardCharges: "",
    updateImage: "",
    newImage: false,
  });
  const [addModal, setAddModal] = useState(false);
  const closeAddModal = () => {
    setAddModal(false);
    setAddLogistic({
      title: "",
      description: "",
      flashCharges: "",
      standardCharges: "",
      image: "",
    });
  };
  const [updateModal, setUpdateModal] = useState(false);
  const closeUpdateModal = () => {
    setUpdateModal(false);
    setUpdateLogistic({
      cId: "",
      updateTitle: "",
      updateDescription: "",
      updateFlashCharges: "",
      updateStandardCharges: "",
      updateImage: "",
      newImage: false,
    });
  };
  const onChange = (e) => {
    setAddLogistic({ ...addLogistic, [e.target.name]: e.target.value });
  };
  const onChange2 = (e) => {
    setUpdateLogistic({ ...updateLogistic, [e.target.name]: e.target.value });
  };
  const addLogisticFunc = async (e) => {
    e.preventDefault();
    if (addLogistic.title === "") {
      info_toaster("Please enter your Company's Title");
    } else if (addLogistic.image === "") {
      info_toaster("Please upload your Company's Logo");
    } else if (addLogistic.standardCharges === "") {
      info_toaster("Please enter Standard Charges");
    } else if (addLogistic.flashCharges === "") {
      info_toaster("Please enter Flash Charges");
    } else if (addLogistic.description === "") {
      info_toaster("Please enter your Company's Description");
    } else {
      setLoader(true);
      const formData = new FormData();
      formData.append("title", addLogistic.title);
      formData.append("description", addLogistic.description);
      formData.append("standardCharges", addLogistic.standardCharges);
      formData.append("flashCharges", addLogistic.flashCharges);
      formData.append("image", addLogistic.image);
      let res = await PostAPI("addLogCompany", formData);
      if (res?.data?.status === "1") {
        reFetch();
        setLoader(false);
        success_toaster(res?.data?.message);
        setAddModal(false);
        setAddLogistic({
          title: "",
          description: "",
          flashCharges: "",
          standardCharges: "",
          image: "",
        });
      } else {
        setLoader(false);
        error_toaster(res?.data?.message);
      }
    }
  };
  const updateLogisticFunc = async (e) => {
    e.preventDefault();
    if (updateLogistic.updateTitle === "") {
      info_toaster("Please enter your Company's Title");
    } else if (updateLogistic.updateStandardCharges === "") {
      info_toaster("Please enter Standard Charges");
    } else if (updateLogistic.updateFlashCharges === "") {
      info_toaster("Please enter Flash Charges");
    } else if (updateLogistic.updateDescription === "") {
      info_toaster("Please enter your Company's Description");
    } else if (updateLogistic.newImage && updateLogistic.updateImage === "") {
      info_toaster("Please upload your Company's Logo");
    } else {
      setLoader(true);
      const formData = new FormData();
      formData.append("cId", updateLogistic.cId);
      formData.append("title", updateLogistic.updateTitle);
      formData.append("description", updateLogistic.updateDescription);
      formData.append("standardCharges", updateLogistic.updateStandardCharges);
      formData.append("flashCharges", updateLogistic.updateFlashCharges);
      formData.append("updateImage", updateLogistic.newImage);
      formData.append("image", updateLogistic.updateImage);
      let res = await PutAPI("updateLogCompany", formData);
      if (res?.data?.status === "1") {
        reFetch();
        setLoader(false);
        success_toaster(res?.data?.message);
        setUpdateModal(false);
        setUpdateLogistic({
          cId: "",
          updateTitle: "",
          updateDescription: "",
          updateFlashCharges: "",
          updateStandardCharges: "",
          updateImage: "",
          newImage: false,
        });
      } else {
        setLoader(false);
        error_toaster(res?.data?.message);
      }
    }
  };
  const changeLogisticStatus = async (status, companyId) => {
    setDisabled(true);
    let change = await PutAPI("changeCompanyStatus", {
      status: status,
      companyId: companyId,
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
  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
    },
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Image",
      selector: (row) => row.image,
    },
    {
      name: "Description",
      selector: (row) => row.desc,
    },
    {
      name: "Flash Charge (lbs)",
      selector: (row) => row.flash,
    },
    {
      name: "Standard Charge (lbs)",
      selector: (row) => row.standard,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Action",
      selector: (row) => row.action,
    },
  ];
  const datas = [];
  data?.data?.map((log, index) =>
    datas.push({
      id: index + 1,
      title: log?.title,
      image: (
        <img
          src={BASE_URL2 + log?.logo}
          alt={`company${index}`}
          className="w-20 h-20 object-contain"
        />
      ),
      desc: log?.description,
      flash: log?.flashCharges,
      standard: log?.standardCharges,
      status: log?.status ? (
        <button
          onClick={() => changeLogisticStatus(false, log?.id)}
          className={active}
          disabled={disabled}
        >
          Active
        </button>
      ) : (
        <button
          onClick={() => changeLogisticStatus(true, log?.id)}
          className={block}
          disabled={disabled}
        >
          Inactive
        </button>
      ),
      action: (
        <div className="flex gap-x-2">
          <DTEdit
            edit={() => {
              setUpdateLogistic({
                ...updateLogistic,
                cId: log?.id,
                updateTitle: log?.title,
                updateDescription: log?.description,
                updateFlashCharges: log?.flashCharges,
                updateStandardCharges: log?.standardCharges,
              });
              setUpdateModal(true);
            }}
          />
        </div>
      ),
    })
  );
  return data.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      title="Logistic Companies"
      content={
        <>
          <Modal onClose={closeAddModal} isOpen={addModal} size="xl" isCentered>
            <ModalOverlay />
            <ModalContent>
              <form>
                <ModalHeader>
                  <h1 className="text-center">Add Logistic</h1>
                </ModalHeader>
                <ModalCloseButton />
                {loader ? (
                  <div className="h-[516px]">
                    <MiniLoader />
                  </div>
                ) : (
                  <ModalBody>
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="title">
                          Company Title
                        </label>
                        <input
                          value={addLogistic.title}
                          onChange={onChange}
                          type="text"
                          name="title"
                          id="title"
                          placeholder="Enter your Company's Title"
                          className={inputStyle}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="image">
                          Company Logo
                        </label>
                        <input
                          onChange={(e) =>
                            setAddLogistic({
                              ...addLogistic,
                              [e.target.name]: e.target.files[0],
                            })
                          }
                          type="file"
                          name="image"
                          id="image"
                          className={inputStyle}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="standardCharges">
                          Standard Charges
                        </label>
                        <input
                          value={addLogistic.standardCharges}
                          onChange={onChange}
                          type="number"
                          name="standardCharges"
                          id="standardCharges"
                          placeholder="Enter Standard Charges"
                          className={inputStyle}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="flashCharges">
                          Flash Charges
                        </label>
                        <input
                          value={addLogistic.flashCharges}
                          onChange={onChange}
                          type="number"
                          name="flashCharges"
                          id="flashCharges"
                          placeholder="Enter Flash Charges"
                          className={inputStyle}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="description">
                          Description
                        </label>
                        <textarea
                          value={addLogistic.description}
                          onChange={onChange}
                          name="description"
                          id="description"
                          placeholder="Enter description"
                          rows={5}
                          className={inputStyle}
                        ></textarea>
                      </div>
                    </div>
                  </ModalBody>
                )}
                <ModalFooter>
                  <ModalButtons
                    text="Add"
                    close={closeAddModal}
                    action={addLogisticFunc}
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
                  <h1 className="text-center">Update Logistic</h1>
                </ModalHeader>
                <ModalCloseButton />
                {loader ? (
                  <div
                    className={
                      updateLogistic.newImage ? "h-[544px]" : "h-[458px]"
                    }
                  >
                    <MiniLoader />
                  </div>
                ) : (
                  <ModalBody>
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="updateTitle">
                          Company Title
                        </label>
                        <input
                          value={updateLogistic.updateTitle}
                          onChange={onChange2}
                          type="text"
                          name="updateTitle"
                          id="updateTitle"
                          placeholder="Enter your Company's Title"
                          className={inputStyle}
                        />
                      </div>
                      <div className="space-y-1">
                        <label
                          className={labelStyle}
                          htmlFor="updateStandardCharges"
                        >
                          Standard Charges
                        </label>
                        <input
                          value={updateLogistic.updateStandardCharges}
                          onChange={onChange2}
                          type="number"
                          name="updateStandardCharges"
                          id="updateStandardCharges"
                          placeholder="Enter Standard Charges"
                          className={inputStyle}
                        />
                      </div>
                      <div className="space-y-1">
                        <label
                          className={labelStyle}
                          htmlFor="updateFlashCharges"
                        >
                          Flash Charges
                        </label>
                        <input
                          value={updateLogistic.updateFlashCharges}
                          onChange={onChange2}
                          type="number"
                          name="updateFlashCharges"
                          id="updateFlashCharges"
                          placeholder="Enter Flash Charges"
                          className={inputStyle}
                        />
                      </div>
                      <div className="space-y-1">
                        <label
                          className={labelStyle}
                          htmlFor="updateDescription"
                        >
                          Description
                        </label>
                        <textarea
                          value={updateLogistic.updateDescription}
                          onChange={onChange2}
                          name="updateDescription"
                          id="updateDescription"
                          placeholder="Enter description"
                          rows={5}
                          className={inputStyle}
                        ></textarea>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <label className={labelStyle} htmlFor="newImage">
                          Do you want to upload new Logo,?
                        </label>
                        <input
                          value={updateLogistic.newImage}
                          onChange={(e) =>
                            setUpdateLogistic({
                              ...updateLogistic,
                              newImage: !updateLogistic.newImage,
                            })
                          }
                          type="checkbox"
                          name="newImage"
                          id="newImage"
                        />
                      </div>
                      {updateLogistic.newImage && (
                        <div className="space-y-1">
                          <label className={labelStyle} htmlFor="updateImage">
                            Company Logo
                          </label>
                          <input
                            onChange={(e) =>
                              setUpdateLogistic({
                                ...updateLogistic,
                                [e.target.name]: e.target.files[0],
                              })
                            }
                            type="file"
                            name="updateImage"
                            id="updateImage"
                            className={inputStyle}
                          />
                        </div>
                      )}
                    </div>
                  </ModalBody>
                )}
                <ModalFooter>
                  <ModalButtons
                    text="Update"
                    close={closeUpdateModal}
                    action={updateLogisticFunc}
                  />
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
          <section className="space-y-3">
            <div className="flex justify-end">
              <AddButton text="Logistic" modal={setAddModal} />
            </div>
            <MyDataTable columns={columns} data={datas} dependancy={data} />
          </section>
        </>
      }
    />
  );
}
