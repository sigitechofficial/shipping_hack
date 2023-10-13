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
} from "../../utilities/Buttons";
import { inputStyle, labelStyle } from "../../utilities/Input";
import { BASE_URL2 } from "../../utilities/URL";
import Layout from "../../components/Layout";

export default function Banners() {
  const { data, reFetch } = GetAPI("getallbanners");
  const [loader, setLoader] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [addBanner, setAddBanner] = useState({
    description: "",
    image: "",
  });
  const [updateBanner, setUpdateBanner] = useState({
    updateDescription: "",
    updateImage: "",
    currentImage: "",
    bannerId: "",
    imageUpdate: false,
  });
  const [addModal, setAddModal] = useState(false);
  const closeAddModal = () => {
    setAddModal(false);
    setAddBanner({ description: "", image: "" });
  };
  const [updateModal, setUpdateModal] = useState(false);
  const closeUpdateModal = () => {
    setUpdateModal(false);
    setUpdateBanner({
      updateDescription: "",
      updateImage: "",
      currentImage: "",
      bannerId: "",
      imageUpdate: false,
    });
  };
  const addBannerFunc = async (e) => {
    e.preventDefault();
    if (addBanner.description === "") {
      info_toaster("Please enter your Banner's Description");
    } else if (addBanner.image === "") {
      info_toaster("Please enter your Banner's Image");
    } else {
      setLoader(true);
      const formData = new FormData();
      formData.append("description", addBanner.description);
      formData.append("image", addBanner.image);
      let res = await PostAPI("addbanner", formData);
      if (res?.data?.status === "1") {
        reFetch();
        setLoader(false);
        success_toaster(res?.data?.message);
        setAddModal(false);
        setAddBanner({ description: "", image: "" });
      } else {
        setLoader(false);
        error_toaster(res?.data?.message);
      }
    }
  };
  const updateBannerFunc = async (e) => {
    e.preventDefault();
    if (updateBanner.updateDescription === "") {
      info_toaster("Please enter your Banner's title");
    } else if (updateBanner.imageUpdate && updateBanner.updateImage === "") {
      info_toaster("Please enter your Banner's Image");
    } else {
      setLoader(true);
      const formData = new FormData();
      formData.append("description", updateBanner.updateDescription);
      formData.append("image", updateBanner.updateImage);
      formData.append("updateImage", updateBanner.imageUpdate);
      formData.append("bannerId", updateBanner.bannerId);
      let res = await PutAPI("updatebanner", formData);
      if (res?.data?.status === "1") {
        reFetch();
        setLoader(false);
        success_toaster(res?.data?.message);
        setUpdateModal(false);
        setUpdateBanner({
          updateDescription: "",
          updateImage: "",
          currentImage: "",
          bannerId: "",
          imageUpdate: false,
        });
      } else {
        setLoader(false);
        error_toaster(res?.data?.message);
      }
    }
  };
  const changeBannerFunc = async (status, bannerId) => {
    setDisabled(true);
    let res = await PutAPI("bannerstatus", {
      status: status,
      bannerId: bannerId,
    });
    if (res?.data?.status === "1") {
      reFetch();
      success_toaster(res?.data?.message);
      setDisabled(false);
    } else {
      error_toaster(res?.data?.message);
      setDisabled(false);
    }
  };
  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
    },
    {
      name: "Description",
      selector: (row) => row.desc,
    },
    {
      name: "Image",
      selector: (row) => row.image,
    },
    {
      name: "Action",
      selector: (row) => row.action,
    },
  ];
  const datas = [];
  data?.data?.map((ban, index) =>
    datas.push({
      id: index + 1,
      desc: ban?.description,
      image: (
        <img
          src={BASE_URL2 + ban?.image}
          alt="img"
          className="w-20 h-20 object-contain"
        />
      ),
      action: (
        <div className="flex gap-x-2">
          <DTEdit
            edit={() => {
              setUpdateModal(true);
              setUpdateBanner({
                updateDescription: ban?.description,
                bannerId: ban?.id,
                currentImage: BASE_URL2 + ban?.image,
                imageUpdate: false,
              });
            }}
          />
          <DTDel
            del={() => changeBannerFunc(false, ban?.id)}
            disabled={disabled}
          />
        </div>
      ),
    })
  );
  return data.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      title="Banners"
      content={
        <>
          <Modal onClose={closeAddModal} isOpen={addModal} size="xl" isCentered>
            <ModalOverlay />
            <ModalContent>
              <form>
                <ModalHeader>
                  <h1 className="text-center">Add Banner</h1>
                </ModalHeader>
                <ModalCloseButton />
                {loader ? (
                  <div className="h-[182px]">
                    <MiniLoader />
                  </div>
                ) : (
                  <ModalBody>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="description">
                          Banner Description
                        </label>
                        <input
                          value={addBanner.description}
                          onChange={(e) =>
                            setAddBanner({
                              ...addBanner,
                              [e.target.name]: e.target.value,
                            })
                          }
                          type="text"
                          name="description"
                          id="description"
                          placeholder="Enter your Banner's Description"
                          className={inputStyle}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="image">
                          Banner Image
                        </label>
                        <input
                          onChange={(e) =>
                            setAddBanner({
                              ...addBanner,
                              [e.target.name]: e.target.files[0],
                            })
                          }
                          type="file"
                          name="image"
                          id="image"
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
                    action={addBannerFunc}
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
                  <h1 className="text-center">Update Banner</h1>
                </ModalHeader>
                <ModalCloseButton />
                {loader ? (
                  <div
                    className={
                      updateBanner.imageUpdate ? "h-[346px]" : "h-[252px]"
                    }
                  >
                    <MiniLoader />
                  </div>
                ) : (
                  <ModalBody>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label
                          className={labelStyle}
                          htmlFor="updateDescription"
                        >
                          Banner Description
                        </label>
                        <input
                          value={updateBanner.updateDescription}
                          onChange={(e) =>
                            setUpdateBanner({
                              ...updateBanner,
                              [e.target.name]: e.target.value,
                            })
                          }
                          type="text"
                          name="updateDescription"
                          id="updateDescription"
                          placeholder="Enter your Banner's Description"
                          className={inputStyle}
                        />
                      </div>
                      <div className="flex items-center gap-x-4">
                        <label className={labelStyle} htmlFor="changePassword">
                          Do you want to upload new image,?
                        </label>
                        <input
                          value={updateBanner.imageUpdate}
                          onChange={() =>
                            setUpdateBanner({
                              ...updateBanner,
                              imageUpdate: !updateBanner.imageUpdate,
                            })
                          }
                          type="checkbox"
                          name="changePassword"
                          id="changePassword"
                        />
                      </div>
                      {updateBanner.imageUpdate && (
                        <div className="space-y-1">
                          <label className={labelStyle} htmlFor="updateImage">
                            Banner Image
                          </label>
                          <input
                            onChange={(e) =>
                              setUpdateBanner({
                                ...updateBanner,
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
                      <div>
                        <img
                          src={updateBanner.currentImage}
                          alt="Current"
                          className="block mx-auto w-1/2 h-28 object-contain rounded-md"
                        />
                      </div>
                    </div>
                  </ModalBody>
                )}
                <ModalFooter>
                  <ModalButtons
                    text="Update"
                    close={closeUpdateModal}
                    action={updateBannerFunc}
                  />
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
          <section className="space-y-3">
            <div className="flex justify-end">
              <AddButton text="Banner" modal={setAddModal} />
            </div>
            <MyDataTable columns={columns} data={datas} dependancy={data} />
          </section>
        </>
      }
    />
  );
}
