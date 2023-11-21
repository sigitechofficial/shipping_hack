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
import { active, block } from "../../utilities/CustomStyles";

export default function Restricted() {
  const { data, reFetch } = GetAPI("restricteditem");
  const [loader, setLoader] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [addItem, setAddItem] = useState({
    title: "",
    image: "",
  });
  const [updateItem, setUpdateItem] = useState({
    updateTitle: "",
    updateImage: "",
    currentImage: "",
    id: "",
    imageUpdate: false,
  });
  const [addModal, setAddModal] = useState(false);
  const closeAddModal = () => {
    setAddModal(false);
    setAddItem({ title: "", image: "" });
  };
  const [updateModal, setUpdateModal] = useState(false);
  const closeUpdateModal = () => {
    setUpdateModal(false);
    setUpdateItem({
      updateTitle: "",
      updateImage: "",
      currentImage: "",
      id: "",
      imageUpdate: false,
    });
  };
  const addItemFunc = async (e) => {
    e.preventDefault();
    if (addItem.title === "") {
      info_toaster("Please enter your Item's Title");
    } else if (addItem.image === "") {
      info_toaster("Please enter your Item's Image");
    } else {
      setLoader(true);
      const formData = new FormData();
      formData.append("title", addItem.title);
      formData.append("image", addItem.image);
      let res = await PostAPI("restricteditem", formData);
      if (res?.data?.status === "1") {
        reFetch();
        setLoader(false);
        success_toaster(res?.data?.message);
        setAddModal(false);
        setAddItem({ title: "", image: "" });
      } else {
        setLoader(false);
        error_toaster(res?.data?.message);
      }
    }
  };
  const updateItemFunc = async (e) => {
    e.preventDefault();
    if (updateItem.updateTitle === "") {
      info_toaster("Please enter your Item's title");
    } else if (updateItem.imageUpdate && updateItem.updateImage === "") {
      info_toaster("Please enter your Item's Image");
    } else {
      setLoader(true);
      const formData = new FormData();
      formData.append("title", updateItem.updateTitle);
      formData.append("image", updateItem.updateImage);
      formData.append("updateImage", updateItem.imageUpdate);
      formData.append("id", updateItem.id);
      let res = await PutAPI("restricteditem", formData);
      if (res?.data?.status === "1") {
        reFetch();
        setLoader(false);
        success_toaster(res?.data?.message);
        setUpdateModal(false);
        setUpdateItem({
          updateTitle: "",
          updateImage: "",
          currentImage: "",
          id: "",
          imageUpdate: false,
        });
      } else {
        setLoader(false);
        error_toaster(res?.data?.message);
      }
    }
  };
  const changeItemStatus = async (status, id) => {
    setDisabled(true);
    let change = await PutAPI("changestatusrestricteditem", {
      status: status,
      id: id,
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
  const deleteItemFunc = async (id) => {
    setDisabled(true);
    let res = await PutAPI("deleterestricteditem", {
      id: id,
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
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Image",
      selector: (row) => row.image,
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
  data?.data?.map((res, index) =>
    datas.push({
      id: index + 1,
      title: res?.title,
      image: (
        <img
          src={BASE_URL2 + res?.image}
          alt="img"
          className="w-16 h-16 object-contain"
        />
      ),
      status: res?.status ? (
        <button
          onClick={() => changeItemStatus(false, res?.id)}
          className={active}
          disabled={disabled}
        >
          Active
        </button>
      ) : (
        <button
          onClick={() => changeItemStatus(true, res?.id)}
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
              setUpdateModal(true);
              setUpdateItem({
                ...updateItem,
                updateTitle: res?.title,
                id: res?.id,
                currentImage: BASE_URL2 + res?.image,
                imageUpdate: false,
              });
            }}
          />
          <DTDel del={() => deleteItemFunc(res?.id)} disabled={disabled} />
        </div>
      ),
    })
  );
  return data.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      title="Restricted Items"
      content={
        <>
          <Modal onClose={closeAddModal} isOpen={addModal} size="xl" isCentered>
            <ModalOverlay />
            <ModalContent>
              <form>
                <ModalHeader>
                  <h1 className="text-center">Add Item</h1>
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
                          Item's Title
                        </label>
                        <input
                          value={addItem.title}
                          onChange={(e) =>
                            setAddItem({
                              ...addItem,
                              [e.target.name]: e.target.value,
                            })
                          }
                          type="text"
                          name="title"
                          id="title"
                          placeholder="Enter your Item's Title"
                          className={inputStyle}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="image">
                          Image
                        </label>
                        <input
                          onChange={(e) =>
                            setAddItem({
                              ...addItem,
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
                    action={addItemFunc}
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
                  <h1 className="text-center">Update Item</h1>
                </ModalHeader>
                <ModalCloseButton />
                {loader ? (
                  <div
                    className={
                      updateItem.imageUpdate ? "h-[346px]" : "h-[252px]"
                    }
                  >
                    <MiniLoader />
                  </div>
                ) : (
                  <ModalBody>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className={labelStyle} htmlFor="updateTitle">
                          Item's Title
                        </label>
                        <input
                          value={updateItem.updateTitle}
                          onChange={(e) =>
                            setUpdateItem({
                              ...updateItem,
                              [e.target.name]: e.target.value,
                            })
                          }
                          type="text"
                          name="updateTitle"
                          id="updateTitle"
                          placeholder="Enter your Item's Description"
                          className={inputStyle}
                        />
                      </div>
                      <div className="flex items-center gap-x-4">
                        <label className={labelStyle} htmlFor="imageUpdate">
                          Do you want to upload new image,?
                        </label>
                        <input
                          value={updateItem.imageUpdate}
                          onChange={() =>
                            setUpdateItem({
                              ...updateItem,
                              imageUpdate: !updateItem.imageUpdate,
                            })
                          }
                          type="checkbox"
                          name="imageUpdate"
                          id="imageUpdate"
                        />
                      </div>
                      {updateItem.imageUpdate && (
                        <div className="space-y-1">
                          <label className={labelStyle} htmlFor="updateImage">
                            Banner Image
                          </label>
                          <input
                            onChange={(e) =>
                              setUpdateItem({
                                ...updateItem,
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
                          src={updateItem.currentImage}
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
                    action={updateItemFunc}
                  />
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
          <section className="space-y-3">
            <div className="flex justify-end">
              <AddButton text="Item" modal={setAddModal} />
            </div>
            <MyDataTable columns={columns} data={datas} dependancy={data} />
          </section>
        </>
      }
    />
  );
}
