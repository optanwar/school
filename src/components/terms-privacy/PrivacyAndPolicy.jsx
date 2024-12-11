import React, { useEffect, useState } from "react";
import PrivacyAccordion from "./PrivacyAccordion";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useDispatch } from "react-redux";
import {
  clearBlogFilter,
  clearFilters,
  resetBlogPagination,
  resetPaginationStep,
} from "../../redux/schoolFilterSlice";
import axios from "../../redux/axios/axios";
const PrivacyAndPolicy = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [privacyData, setPrivacyDate] = useState({});
  const [err, setErr] = useState(null);
  useEffect(() => {
    dispatch(clearBlogFilter());
    dispatch(resetBlogPagination());
    dispatch(resetPaginationStep());
    dispatch(clearFilters());
    async function getPrivacyPolicy() {
      try {
        const resp = await axios.get("/getPrivacyPolicy");
        setPrivacyDate(resp?.data?.data);
        setErr(null);
      } catch (error) {
        console.log(error);
        setErr("Something went wrong");
      }
    }
    getPrivacyPolicy();
  }, []);
  return (
    <div className="pt-5 md:pt-7 lg:pt-9 xl:pt-11 pb-5 md:pb-7 lg:pb-9 xl:pb-11">
      <div className="container">
        <div className="mb-3 flex items-center justify-start">
          <Breadcrumb className="hover:text-brand_text cursor-pointer font-roboto tracking-wide font-medium">
            <Link to="/">
              {" "}
              <p className="flex items-center gap-x-1 ">
                <span>
                  <HiHome />{" "}
                </span>{" "}
                <span>Home </span>
              </p>{" "}
            </Link>
          </Breadcrumb>
          <Breadcrumb.Item className="text-lg font-roboto tracking-wide capitalize">
            {location.pathname.replace(/-/g, " ").substring(1)}
          </Breadcrumb.Item>
        </div>

        <div className="bg-normal_bg py-10 px-3">
          <h1 className="text-2xl text-center md:text-3xl lg:text-4xl xl:text-5xl font-roboto text-brand_text">
            Privacy Policy
          </h1>
        </div>
        {err && (
          <div className="text-center my-10">
            <h1 className="text-5xl text-center text-brand_text font-extrabold mt-10">
              Oops!
            </h1>
            <p className="text-center blink">{err}</p>
          </div>
        )}
        {privacyData && Object.keys(privacyData)?.length === 0 ? (
          <div className="text-center my-10">
            <h1 className="text-5xl text-center text-brand_text font-extrabold mt-10">
              Oops!
            </h1>
            <p className="text-center blink">No data Found</p>
          </div>
        ) : (
          <div
            className="my-10 "
            dangerouslySetInnerHTML={{ __html: privacyData?.content }}
          >
            {/* <p className="font-roboto tracking-wide text-justify text-sm md:text-base xl:text-[17px] text-gray-500">
            Thank you for choosing to be part of our community at School Dekho,
            doing business as School Dekho{" "}
            <span className="font-semibold text-black">
              ( "School Dekho", "we", "us", "our").
            </span>{" "}
            We are committed to protecting your personal information and your
            right to privacy. If you have any questions or concerns about this
            privacy notice, or our practices with regards to your personal
            information, please contact us at info@schooldekho.org.
          </p>
          <p className="my-5 font-roboto tracking-wide text-justify text-sm md:text-base xl:text-[17px] text-gray-500">
            When you visit our website{" "}
            <a className="cursor-pointer" href="https://schooldekho.org/">
              https://schooldekho.org/
            </a>{" "}
            (the <span className="font-semibold text-black">"Website"</span>),
            use our Facebook application, as the case may be (the{" "}
            <span className="font-semibold text-black">"App"</span> ) and more
            generally, use any of our services (the "Services", which include
            the Website and App), we appreciate that you are trusting us with
            your personal information. We take your privacy very seriously. In
            this privacy notice, we seek to explain to you in the clearest way
            possible what information we collect, how we use it and what rights
            you have in relation to it. We hope you take some time to read
            through it carefully, as it is important. If there are any terms in
            this privacy notice that you do not agree with, please discontinue
            use of our Services immediately.
          </p>
          <p className="my-5 font-roboto tracking-wide text-justify text-sm md:text-base xl:text-[17px]  text-gray-500">
            This privacy notice applies to all information collected through our
            Services (which, as described above, includes our Website and App),
            as well as, any related services, sales, marketing or events.
          </p>
          <p className="my-5 font-roboto tracking-wide text-justify text-sm md:text-base xl:text-[17px]  text-black font-semibold">
            Please read this privacy notice carefully as it will help you
            understand what we do with the information that we collect.
          </p> */}
          </div>
        )}

        <div>
          <PrivacyAccordion
            isErr={err}
            mainContainErr={Object.keys(privacyData).length}
          />
        </div>
      </div>
    </div>
  );
};

export default PrivacyAndPolicy;
