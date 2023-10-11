import React, { useEffect } from "react";
import GetAPI from "../../utilities/GetAPI";
import Loader, { MiniLoader } from "../../components/Loader";
import Layout from "../../components/Layout";
import { inputStyle, labelStyle } from "../../utilities/Input";
import { useState } from "react";
import { info_toaster } from "../../utilities/Toaster";
import { PutAPI } from "../../utilities/PutAPI";

export default function PrivacyPolicy() {
  const { data, reFetch } = GetAPI("termsconditions");
  const [loader, setLoader] = useState(false);
  const [terms, setTerms] = useState("");
  const updateTermsFunc = async (e) => {
    e.preventDefault();
    if (terms === "") {
      info_toaster("Please enter Terms & Conditions");
    } else {
      setLoader(true);
      let res = await PutAPI("updatetermsconditions", {
        content: terms,
      });
      if (res?.data?.status === "1") {
        reFetch();
        setLoader(false);
      } else {
        setLoader(false);
      }
    }
  };
  useEffect(() => {
    const termsData = data?.data && data?.data?.value;
    setTerms(termsData);
  }, [data]);
  return data.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      title="Terms & Conditions"
      content={
        <form
          onSubmit={updateTermsFunc}
          className="bg-white p-12 rounded-xl space-y-5 min-h-[calc(100vh-240px)] flex flex-col justify-between relative"
        >
          {loader ? (
            <MiniLoader />
          ) : (
            <>
              <div className="w-1/2">
                <div className="space-y-2">
                  <label className={labelStyle} htmlFor="terms">
                    {data?.data?.title}
                  </label>
                  <textarea
                    value={terms}
                    onChange={(e) => setTerms(e.target.value)}
                    name="terms"
                    id="terms"
                    rows={8}
                    placeholder="Enter Terms & Conditions"
                    className={inputStyle}
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end gap-x-2">
                <button
                  type="button"
                  onClick={() => setTerms(data?.data?.value)}
                  className="py-3 w-40 rounded font-medium text-sm text-themeBlue border border-themeBlue hover:bg-themeBlue hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loader}
                  className="py-3 w-40 rounded font-medium text-sm text-white bg-themeBlue border border-themeBlue hover:bg-transparent hover:text-themeBlue"
                >
                  Save
                </button>
              </div>
            </>
          )}
        </form>
      }
    />
  );
}
