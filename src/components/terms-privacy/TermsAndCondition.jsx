import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import TermsAccordion from "./TermsAccordion";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import {
  clearBlogFilter,
  clearFilters,
  resetBlogPagination,
  resetPaginationStep,
} from "../../redux/schoolFilterSlice";
import { useDispatch } from "react-redux";
import axios from "../../redux/axios/axios";
const TermsAndCondition = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [termsData, setTermsData] = useState({});
  const [err, setErr] = useState(null);
  useEffect(() => {
    dispatch(clearBlogFilter());
    dispatch(resetBlogPagination());
    dispatch(clearFilters());
    dispatch(resetPaginationStep());
    async function getTermsData() {
      try {
        const resp = await axios.get("/fetchSingleTerms");
        setErr(null);
        setTermsData(resp?.data?.data);
      } catch (error) {
        setErr("Something went wrong");
      }
    }
    getTermsData();
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
            Terms & Conditions
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
        {termsData && Object.keys(termsData)?.length === 0 ? (
          <div className="text-center my-10">
            <h1 className="text-5xl text-center text-brand_text font-extrabold mt-10">
              Oops!
            </h1>
            <p className="text-center blink">No data Found</p>
          </div>
        ) : (
          <div
            className="my-10 "
            dangerouslySetInnerHTML={{ __html: termsData?.content }}
          >
            {/* <p className="font-roboto tracking-wide text-justify text-sm md:text-base xl:text-[17px] text-gray-500">
            These Terms of Use constitute a legally binding agreement made
            between you, whether personally or on behalf of an entity (“you”)
            and School Dekho, doing business as School Dekho{" "}
            <span className="font-semibold text-black">
              ("School Dekho", “we”, “us”, or “our”)
            </span>{" "}
            , concerning your access to and use of the schooldekho.org website
            as well as any other media form, media channel, mobile website or
            mobile application related, linked, or otherwise connected thereto
            (collectively, the “Site”). You agree that by accessing the Site,
            you have read, understood, and agreed to be bound by all of these
            Terms of Use. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE,
            THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST
            DISCONTINUE USE IMMEDIATELY.
          </p>
          <p className="my-5 font-roboto tracking-wide text-justify text-sm md:text-base xl:text-[17px] text-gray-500">
            Supplemental terms and conditions or documents that may be posted on
            the Site from time to time are hereby expressly incorporated herein
            by reference. We reserve the right, in our sole discretion, to make
            changes or modifications to these Terms of Use at any time and for
            any reason. We will alert you about any changes by updating the
            “Last updated” date of these Terms of Use, and you waive any right
            to receive specific notice of each such change. It is your
            responsibility to periodically review these Terms of Use to stay
            informed of updates. You will be subject to, and will be deemed to
            have been made aware of and to have accepted, the changes in any
            revised Terms of Use by your continued use of the Site after the
            date such revised Terms of Use are posted.
          </p>
          <p className="my-5 font-roboto tracking-wide text-justify text-sm md:text-base xl:text-[17px]  text-gray-500">
            The information provided on the Site is not intended for
            distribution to or use by any person or entity in any jurisdiction
            or country where such distribution or use would be contrary to law
            or regulation or which would subject us to any registration
            requirement within such jurisdiction or country. Accordingly, those
            persons who choose to access the Site from other locations do so on
            their own initiative and are solely responsible for compliance with
            local laws, if and to the extent local laws are applicable.
          </p>
          <p className="my-5 font-roboto tracking-wide text-justify text-sm md:text-base xl:text-[17px]  text-gray-500">
            All users who are minors in the jurisdiction in which they reside
            (generally under the age of 18) must have the permission of, and be
            directly supervised by, their parent or guardian to use the Site. If
            you are a minor, you must have your parent or guardian read and
            agree to these Terms of Use prior to you using the Site.
          </p> */}
          </div>
        )}

        <div>
          <TermsAccordion isErr={Object.keys(termsData).length} />
        </div>
      </div>
    </div>
  );
};

export default TermsAndCondition;
