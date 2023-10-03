import React from "react";
import { FaUser } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { BackButton } from "../../utilities/Buttons";
import { BASE_URL2 } from "../../utilities/URL";
import Layout from "../../components/Layout";

export default function DBSdetails() {
  const location = useLocation();
  const dbsDetails = location?.state?.dbsDetails;
  return (
    <Layout
      title={
        <>
          DBS{" "}
          <span className="text-black text-opacity-60">
            {dbsDetails?.postalCode + " " + dbsDetails?.secondPostalCode}
          </span>
        </>
      }
      content={
        <section className="space-y-4">
          <div>
            <BackButton />
          </div>
          <section className="bg-white rounded-lg grid grid-cols-12 shadow-md">
            <div className="col-span-9 py-8 px-8 space-y-5 border-r border-r-black border-opacity-10">
              <h1 className="font-medium text-2xl">Postal Code</h1>
              <div className="flex gap-x-3">
                <div className="w-10 h-10 flex justify-center items-center rounded-fullest bg-themePurple">
                  <img
                    src={BASE_URL2 + dbsDetails?.structureType?.icon}
                    alt="icon"
                    className="w-5 h-5 object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-base">
                    {dbsDetails?.postalCode +
                      " " +
                      dbsDetails?.secondPostalCode}
                  </h3>
                  <p className="font-normal text-sm text-black text-opacity-60">
                    {dbsDetails?.structureType?.title}
                  </p>
                  <p className="font-normal text-base text-black text-opacity-60 mt-2">
                    {dbsDetails?.corregimiento?.title +
                      ", " +
                      dbsDetails?.district?.title}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-x-32">
                  <ul className="space-y-2 font-normal text-base text-black text-opacity-60">
                    <li>Structure Type</li>
                    <li>Building Name</li>
                    <li>Province</li>
                    <li>District</li>
                    <li>Corregimiento</li>
                    <li>Latitude</li>
                    <li>Longitude</li>
                    {dbsDetails?.structureType &&
                      dbsDetails?.structureType?.structQuestions?.map(
                        (quest, key) => <li>{quest?.label}</li>
                      )}
                  </ul>
                  <ul className="space-y-2 font-normal text-base text-end">
                    <li>{dbsDetails?.structureType?.title}</li>
                    <li>{dbsDetails?.buildingName}</li>
                    <li>{dbsDetails?.province?.title}</li>
                    <li>{dbsDetails?.district?.title}</li>
                    <li>{dbsDetails?.corregimiento?.title}</li>
                    <li>{dbsDetails?.lat}</li>
                    <li>{dbsDetails?.lng}</li>
                    {dbsDetails?.structureType &&
                      dbsDetails?.structureType?.structQuestions?.map(
                        (quest, key) => (
                          <li>
                            {quest?.value !== "" ? quest?.value : "No data"}
                          </li>
                        )
                      )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-span-3 py-8 px-6 space-y-5">
              <h1 className="font-medium text-2xl">Sender Details</h1>
              <div className="flex gap-x-3">
                <div className="w-12 h-12 flex justify-center items-center rounded-fullest bg-themePurple text-white">
                  <FaUser size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-themePurple">
                    {dbsDetails?.senderDetails?.name}
                  </h3>
                  <p className="font-normal text-sm text-themePurple text-opacity-60">
                    Member Since: {dbsDetails?.senderDetails?.memberSince}
                  </p>
                </div>
              </div>
              <div>
                <h6 className="font-normal text-sm text-black text-opacity-60">
                  Email
                </h6>
                <p className="font-normal text-sm">
                  {dbsDetails?.senderDetails?.email}
                </p>
              </div>
              <div>
                <h6 className="font-normal text-sm text-black text-opacity-60">
                  Phone
                </h6>
                <p className="font-normal text-sm">
                  {dbsDetails?.senderDetails?.phone}
                </p>
              </div>
            </div>
          </section>
        </section>
      }
    />
  );
}
