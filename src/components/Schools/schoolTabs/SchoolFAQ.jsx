import React, { useEffect, useState, useRef } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SchoolFAQ = ({ faq }) => {
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div>
      {/*  */}
      {faq?.length ? (
        faq?.map((ele, index) => {
          return (
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
                  <p className="text-brand_text text-base md:text-lg">
                    {" "}
                    {/* 1. Where exactly is the Shree Vaishnav Academy located? */}
                    {index + 1}. {ele?.question}
                  </p>
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="">
                <div className="">
                  <p className="text-sm md:text-base font-roboto tracking-wider text-gray-500 text-justify">
                    {ele?.answer}
                  </p>
                </div>
              </AccordionDetails>
            </Accordion>
          );
        })
      ) : (
        <h3 className="text-center blink">No data found</h3>
      )}

      {/*  */}
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
            <p className="text-brand_text text-base md:text-lg">
              {" "}
              1. Where exactly is the Shree Vaishnav Academy located?
            </p>
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="">
          <div className="">
            <p className="text-sm md:text-base font-roboto tracking-wider text-gray-500 text-justify">
              Shree Vaishnav Academy is located at 177, South Raj Mohalla,
              Jawahar Marg, Madhya Pradesh - 452002.
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
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "100%", flexShrink: 0 }}>
            <p className="text-brand_text text-base md:text-lg">
              {" "}
              2. Which educational board is the school affiliated with?
            </p>
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="">
          <div className="">
            <p className="text-sm md:text-base font-roboto tracking-wider text-gray-500 text-justify">
              Shree Vaishnav Academy is affiliated with CBSE.
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
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "100%", flexShrink: 0 }}>
            <p className="text-brand_text text-base md:text-lg">
              {" "}
              3.What is the fee structure for the academic year?
            </p>
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="">
          <div className="">
            <p className="text-sm md:text-base font-roboto tracking-wider text-gray-500 text-justify">
              Shree Vaishnav Academy is located at 177, South Raj Mohalla,
              Jawahar Marg, Madhya Pradesh - 452002.
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
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "100%", flexShrink: 0 }}>
            <p className="text-brand_text text-base md:text-lg">
              {" "}
              4. What is the admission process at Shree Vaishnav Academy?
            </p>
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="">
          <div className="">
            <p className="text-sm md:text-base font-roboto tracking-wider text-gray-500 text-justify">
              Shree Vaishnav Academy is located at 177, South Raj Mohalla,
              Jawahar Marg, Madhya Pradesh - 452002.
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
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "100%", flexShrink: 0 }}>
            <p className="text-brand_text text-base md:text-lg">
              5. Does the school provide transportation facilities?
            </p>
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="">
          <div className="">
            <p className="text-sm md:text-base font-roboto tracking-wider text-gray-500 text-justify">
              Shree Vaishnav Academy is located at 177, South Raj Mohalla,
              Jawahar Marg, Madhya Pradesh - 452002.
            </p>
          </div>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
};

export default SchoolFAQ;
