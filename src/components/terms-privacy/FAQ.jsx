import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import axios from "../../redux/axios/axios";
import {
  clearBlogFilter,
  resetBlogPagination,
  resetPaginationStep,
} from "../../redux/schoolFilterSlice";
import { useDispatch } from "react-redux";
const FAQ = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState(false);
  const [faqData, setFaqData] = React.useState([]);
  const [faqDataErr, setFaqDataErr] = React.useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  React.useEffect(() => {
    async function fetchFaq() {
      try {
        let resp = await axios.get("/fetchFaq");
        setFaqData(resp?.data);
        setFaqDataErr(null);
      } catch (error) {
        setFaqDataErr("Something went wrong.");
      }
    }
    fetchFaq();
    dispatch(clearBlogFilter());
    dispatch(resetBlogPagination());
    dispatch(resetPaginationStep());
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

        <div className="px-3 py-10 bg-normal_bg">
          <h1 className="text-2xl text-center md:text-3xl lg:text-4xl xl:text-5xl font-roboto text-brand_text">
            Frequently Asked Questions
          </h1>
        </div>

        <div className="mt-16 mb-10">
          {faqData?.data?.length
            ? faqData?.data.map((ele, index) => (
                <Accordion
                  key={ele?._id}
                  expanded={expanded === ele?._id}
                  onChange={handleChange(ele?._id)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography sx={{ width: "100%", flexShrink: 0 }}>
                      <p className="text-base font-normal tracking-wide text-brand_text md:text-lg font-roboto">
                        {ele?.question}
                      </p>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="bg-normal_bg">
                    <div>
                      <p className="text-sm tracking-wider text-justify text-gray-500 my-7 md:text-base font-roboto">
                        {ele?.answer}
                      </p>
                    </div>
                  </AccordionDetails>
                </Accordion>
              ))
            : faqDataErr === null && (
                <>
                  <h1 className="text-5xl text-center text-brand_text font-extrabold ">
                    Oops!
                  </h1>
                  <h1 className="text-2xl text-center mt-3 blink">
                    No data found
                  </h1>
                </>
              )}
          {faqDataErr && (
            <div className="text-center my-10">
              <h1 className="text-5xl text-center text-brand_text font-extrabold mt-10">
                Oops!
              </h1>
              <p className="text-center blink">{faqDataErr}</p>
            </div>
          )}
          {/* {faqDataErr && <h1 className="text-2xl text-center">{faqDataErr}</h1>} */}

          {/* <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                <p className="text-base font-normal tracking-wide text-brand_text md:text-lg font-roboto">
                  What Is School Dekho?
                </p>
              </Typography>
             
            </AccordionSummary>
            <AccordionDetails className="bg-normal_bg">
              <div>
                <p className="text-sm tracking-wider text-justify text-gray-500 my-7 md:text-base font-roboto">
                  School Dekho is an online platform that helps parents and
                  students find the best schools for their educational needs. It
                  provides detailed information about schools, including their
                  infrastructure, faculty, courses offered, fees, admission
                  process, and other relevant details.
                </p>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                <p className="text-base font-normal tracking-wide text-brand_text md:text-lg font-roboto">
                  Is School Dekho A Free Service?
                </p>
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-normal_bg">
              <div>
                <p className="text-sm tracking-wider text-justify text-gray-500 mt-7 mb-7 md:text-base font-roboto">
                  Yes, School Dekho is completely free to use. You can search
                  for schools, compare them, and get all the information you
                  need without any charges.
                </p>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                <p className="text-base font-normal tracking-wide text-brand_text md:text-lg font-roboto">
                  How Can I Find Schools On School Dekho?
                </p>
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-normal_bg">
              <div>
                <p className="text-sm tracking-wider text-justify text-gray-500 mt-7 mb-7 md:text-base font-roboto">
                  You can use the search bar on the homepage to look for schools
                  based on location, board, or other criteria. You can also use
                  the filters to narrow down your search and find schools that
                  meet your specific requirements.
                </p>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                <p className="text-base font-normal tracking-wide text-brand_text md:text-lg font-roboto">
                  Can I Apply To Schools Through School Dekho?
                </p>
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-normal_bg">
              <div>
                <p className="text-sm tracking-wider text-justify text-gray-500 mt-7 mb-7 md:text-base font-roboto">
                  No, School Dekho does not offer application services. However,
                  it provides all the information you need to make an informed
                  decision about which schools to apply to.
                </p>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel5"}
            onChange={handleChange("panel5")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                <p className="text-base font-normal tracking-wide text-brand_text md:text-lg font-roboto">
                  Can I Get Help With The Admission Process Through School
                  Dekho?
                </p>
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-normal_bg">
              <div>
                <p className="text-sm tracking-wider text-justify text-gray-500 my-7 md:text-base font-roboto">
                  Yes, School Dekho provides guidance and support for the
                  admission process. You can get in touch with their experts for
                  advice on filling out applications, preparing for interviews,
                  and other related queries.
                </p>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel6"}
            onChange={handleChange("panel6")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                <p className="text-base font-normal tracking-wide text-brand_text md:text-lg font-roboto">
                  Is School Dekho Only For Indian Schools?
                </p>
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-normal_bg">
              <div>
                <p className="text-sm tracking-wider text-justify text-gray-500 my-7 md:text-base font-roboto">
                  Yes, School Dekho is primarily focused on schools in India.
                  You can find information about schools in all major cities and
                  towns across the country.
                </p>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel7"}
            onChange={handleChange("panel7")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                <p className="text-base font-normal tracking-wide text-brand_text md:text-lg font-roboto">
                  Can I Review Schools On School Dekho?
                </p>
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-normal_bg">
              <div>
                <p className="text-sm tracking-wider text-justify text-gray-500 my-7 md:text-base font-roboto">
                  Yes, you can leave reviews and ratings for schools on School
                  Dekho. This can help other parents and students make informed
                  decisions about which schools to consider.
                </p>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel8"}
            onChange={handleChange("panel8")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                <p className="text-base font-normal tracking-wide text-brand_text md:text-lg font-roboto">
                  How Accurate Is The Information On School Dekho?
                </p>
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-normal_bg">
              <div>
                <p className="text-sm tracking-wider text-justify text-gray-500 my-7 md:text-base font-roboto">
                  School Dekho makes every effort to ensure that the information
                  provided on its platform is accurate and up-to-date. However,
                  it is important to note that some details, such as fees and
                  admission criteria, may change over time. It is always a good
                  idea to verify the information with the school directly before
                  making any decisions.
                </p>
              </div>
            </AccordionDetails>
          </Accordion> */}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
