import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "../../redux/axios/axios.js";
const PrivacyAccordion = ({ isErr, mainContainErr }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [accordiongData, setAccordionData] = React.useState([]);
  const [err, setErr] = React.useState(null);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  React.useEffect(() => {
    async function getAccordionData() {
      try {
        const resp = await axios.get("/getPrivacyAccordionData");
        setAccordionData(resp?.data?.data);
        setErr(null);
      } catch (error) {
        console.log(error);
        // setErr("Failed to get Data.");
        setErr("Something went wrong");
      }
    }
    getAccordionData();
  }, []);

  return (
    <div>
      {accordiongData?.length > 0
        ? accordiongData?.map((ele, index) => (
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
                <Typography
                  sx={{ width: "100%", flexShrink: 0 }}
                  component={"div"}
                >
                  <p className="text-brand_text text-lg md:text-xl">
                    {ele?.title}
                  </p>
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="bg-normal_bg">
                <div dangerouslySetInnerHTML={{ __html: ele?.content }}></div>
              </AccordionDetails>
            </Accordion>
          ))
        : mainContainErr
        ? err === null && (
            <div>
              <h1 className="text-5xl text-center text-brand_text font-extrabold mt-10">
                Oops!
              </h1>
              <h1 className="text-2xl text-center blink">No data found</h1>
            </div>
          )
        : null}
      {err && !isErr && (
        <div>
          <h1 className="text-5xl text-center text-brand_text font-extrabold mt-10">
            Oops!
          </h1>
          <h1 className="text-2xl text-center blink">{err}</h1>
        </div>
      )}
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
            <p className="text-brand_text text-lg md:text-xl">
              What information do we collect ?
            </p>
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="bg-normal_bg">
          <div>
            <p className="mt-6 text-sm md:text-base font-roboto tracking-wider text-gray-500">
              Personal information you disclose to us
            </p>

            <p className="italic mt-2 mb-7 text-sm md:text-base font-roboto tracking-wider text-gray-500 text-justify">
              {" "}
              <span className=" not-italic text-black font-semibold font-roboto tracking-wider">
                In Short:
              </span>{" "}
              We collect personal information that you provide to us.
            </p>

            <p className="text-justify my-7 text-sm md:text-base font-roboto tracking-wider text-gray-500">
              We collect personal information that you voluntarily provide to us
              when you register on the Services, express an interest in
              obtaining information about us or our products and Services, when
              you participate in activities on the Services (such as by posting
              messages in our online forums or entering competitions, contests
              or giveaways) or otherwise when you contact us.
            </p>

            <p className="text-justify my-7 italic text-sm md:text-base font-roboto tracking-wider text-gray-500">
              The personal information that we collect depends on the context of
              your interactions with us and the Services, the choices you make
              and the products and features you use. The personal information we
              collect may include the following:
            </p>

            <p className="text-justify mt-7 mb-2 text-sm md:text-base font-roboto tracking-wide text-gray-500">
              <span className=" not-italic text-black font-semibold font-roboto tracking-wide">
                Personal Information Provided by You.
              </span>{" "}
              We collect names; phone numbers; email addresses; usernames;
              passwords; mailing addresses; and other similar information.
            </p>

            <p className="my-2 text-justify text-sm md:text-base font-roboto tracking-wide text-gray-500">
              <span className=" not-italic text-black font-semibold font-roboto tracking-wide">
                Social Media Login Data.{" "}
              </span>{" "}
              We may provide you with the option to register with us using your
              existing social media account details, like your Facebook, Twitter
              or other social media account. If you choose to register in this
              way, we will collect the information described in the section
              called "HOW DO WE HANDLE YOUR SOCIAL LOGINS?" below.
            </p>

            <p className=" text-justify mt-2 italic text-sm md:text-base font-roboto tracking-wide text-gray-500">
              All personal information that you provide to us must be true,
              complete and accurate, and you must notify us of any changes to
              such personal information.
            </p>

            <p className="text-justify mt-8 text-black font-semibold font-roboto tracking-wide ">
              Information automatically collected
            </p>

            <p className=" text-justify italic mt-3 mb-2 text-sm md:text-base font-roboto tracking-wide text-gray-500">
              {" "}
              <span className=" not-italic text-black font-semibold font-roboto tracking-wide">
                In Short:
              </span>{" "}
              Some information — such as your Internet Protocol (IP) address
              and/or browser and device characteristics — is collected
              automatically when you visit our Services.
            </p>

            <p className="text-justify mb-7 text-sm md:text-base font-roboto tracking-wide text-gray-500">
              We automatically collect certain information when you visit, use
              or navigate the Services. This information does not reveal your
              specific identity (like your name or contact information) but may
              include device and usage information, such as your IP address,
              browser and device characteristics, operating system, language
              preferences, referring URLs, device name, country, location,
              information about how and when you use our Services and other
              technical information. This information is primarily needed to
              maintain the security and operation of our Services, and for our
              internal analytics and reporting purposes.
            </p>

            <p className="text-justify mt-10 text-black font-semibold font-roboto tracking-wide ">
              The information we collect includes:
            </p>
            <p className="text-justify mt-3 mb-6 text-sm md:text-base font-roboto tracking-wide text-gray-500">
              Log and Usage Data. Log and usage data is service-related,
              diagnostic, usage and performance information our servers
              automatically collect when you access or use our Services and
              which we record in log files. Depending on how you interact with
              us, this log data may include your IP address, device information,
              browser type and settings and information about your activity in
              the Services (such as the date/time stamps associated with your
              usage, pages and files viewed, searches and other actions you take
              such as which features you use), device event information (such as
              system activity, error reports (sometimes called 'crash dumps')
              and hardware settings).
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
            <p className="text-brand_text text-lg md:text-xl">
              How do we use your information ?
            </p>
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="bg-normal_bg">
          <div>
            <p className="italic mt-7 mb-7 text-sm md:text-base font-roboto tracking-wider text-gray-500 text-justify">
              {" "}
              <span className=" not-italic text-black font-semibold font-roboto tracking-wider">
                In Short:
              </span>{" "}
              We process your information for purposes based on legitimate
              business interests, the fulfillment of our contract with you,
              compliance with our legal obligations, and/or your consent.
            </p>

            <p className="text-justify my-7 text-sm md:text-base font-roboto tracking-wider text-gray-500">
              We use personal information collected via our Services for a
              variety of business purposes described below. We process your
              personal information for these purposes in reliance on our
              legitimate business interests, in order to enter into or perform a
              contract with you, with your consent, and/or for compliance with
              our legal obligations. We indicate the specific processing grounds
              we rely on next to each purpose listed below.
            </p>

            <p className="italic text-justify mt-8 text-black font-semibold font-roboto tracking-wide">
              We use the information we collect or receive:
            </p>

            <ul className="my-5 list-disc pl-5 lg:pl-8">
              <li className="">
                <p className="text-justify my-2 text-sm md:text-base font-roboto tracking-wide text-gray-500">
                  <span className=" not-italic text-black font-semibold font-roboto tracking-wide">
                    To facilitate account creation and logon process.{" "}
                  </span>{" "}
                  If you choose to link your account with us to a third-party
                  account (such as your Google or Facebook account), we use the
                  information you allowed us to collect from those third parties
                  to facilitate account creation and logon process for the
                  performance of the contract. See the section below headed{" "}
                  <span className="underline">
                    "HOW DO WE HANDLE YOUR SOCIAL LOGINS?"
                  </span>{" "}
                  for further information.
                </p>
              </li>
              <li className="">
                <p className="text-justify my-2 text-sm md:text-base font-roboto tracking-wide text-gray-500">
                  <span className=" not-italic text-black font-semibold font-roboto tracking-wide">
                    To post testimonials.{" "}
                  </span>{" "}
                  We post testimonials on our Services that may contain personal
                  information. Prior to posting a testimonial, we will obtain
                  your consent to use your name and the content of the
                  testimonial. If you wish to update, or delete your
                  testimonial, please contact us at privacy@schooldekho.co.in
                  and be sure to include your name, testimonial location, and
                  contact information.
                </p>
              </li>
              <li className="">
                <p className="text-justify my-2 text-sm md:text-base font-roboto tracking-wide text-gray-500">
                  <span className=" not-italic text-black font-semibold font-roboto tracking-wide">
                    Request feedback.{" "}
                  </span>{" "}
                  We may use your information to request feedback and to contact
                  you about your use of our Services.
                </p>
              </li>
              <li className="">
                <p className="text-justify my-2 text-sm md:text-base font-roboto tracking-wide text-gray-500">
                  <span className=" not-italic text-black font-semibold font-roboto tracking-wide">
                    To enable user-to-user communications.{" "}
                  </span>{" "}
                  We may use your information in order to enable user-to-user
                  communications with each user's consent.
                </p>
              </li>
              <li className="">
                <p className="text-justify my-2 text-sm md:text-base font-roboto tracking-wide text-gray-500">
                  <span className=" not-italic text-black font-semibold font-roboto tracking-wide">
                    To manage user accounts.{" "}
                  </span>{" "}
                  We may use your information for the purposes of managing our
                  account and keeping it in working order.
                </p>
              </li>
              <li className="">
                <p className="text-justify my-2 text-sm md:text-base font-roboto tracking-wide text-gray-500">
                  <span className=" not-italic text-black font-semibold font-roboto tracking-wide">
                    Fulfill and manage your orders.{" "}
                  </span>{" "}
                  We may use your information to fulfill and manage your orders,
                  payments, returns, and exchanges made through the Services.
                </p>
              </li>
              <li className="">
                <p className="text-justify my-2 text-sm md:text-base font-roboto tracking-wide text-gray-500">
                  <span className=" not-italic text-black font-semibold font-roboto tracking-wide">
                    Administer prize draws and competitions.{" "}
                  </span>{" "}
                  We may use your information to administer prize draws and
                  competitions when you elect to participate in our
                  competitions.
                </p>
              </li>
              <li className="">
                <p className="text-justify my-2 text-sm md:text-base font-roboto tracking-wide text-gray-500">
                  <span className=" not-italic text-black font-semibold font-roboto tracking-wide">
                    To deliver and facilitate delivery of services to the user.{" "}
                  </span>{" "}
                  We may use your information to provide you with the requested
                  service.
                </p>
              </li>
              <li className="">
                <p className="text-justify my-2 text-sm md:text-base font-roboto tracking-wide text-gray-500">
                  <span className=" not-italic text-black font-semibold font-roboto tracking-wide">
                    To respond to user inquiries/offer support to users.{" "}
                  </span>
                  We may use your information to respond to your inquiries and
                  solve any potential issues you might have with the use of our
                  Services.
                </p>
              </li>
              <li className="">
                <p className="text-justify my-2 text-sm md:text-base font-roboto tracking-wide text-gray-500">
                  <span className=" not-italic text-black font-semibold font-roboto tracking-wide">
                    To send you marketing and promotional communications.{" "}
                  </span>
                  We and/or our third-party marketing partners may use the
                  personal information you send to us for our marketing
                  purposes, if this is in accordance with your marketing
                  preferences. For example, when expressing an interest in
                  obtaining information about us or our Services, subscribing to
                  marketing or otherwise contacting us, we will collect personal
                  information from you. You can opt-out of our marketing emails
                  at any time (see the "WHAT ARE YOUR PRIVACY RIGHTS?" below).
                </p>
              </li>
              <li className="">
                <p className="text-justify my-2 text-sm md:text-base font-roboto tracking-wide text-gray-500">
                  <span className=" not-italic text-black font-semibold font-roboto tracking-wide">
                    Deliver targeted advertising to you.{" "}
                  </span>
                  We may use your information to develop and display
                  personalized content and advertising (and work with third
                  parties who do so) tailored to your interests and/or location
                  and to measure its effectiveness.
                </p>
              </li>
            </ul>
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
            <p className="text-brand_text text-lg md:text-xl">
              Will your information be shared with anyone ?
            </p>
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="bg-normal_bg">
          <div>
            <p className="italic mt-7 mb-7 text-sm md:text-base font-roboto tracking-wider text-gray-500 text-justify">
              {" "}
              <span className=" not-italic text-black font-semibold font-roboto tracking-wider">
                In Short:
              </span>{" "}
              We only share information with your consent, to comply with laws,
              to provide you with services, to protect your rights, or to
              fulfill business obligations.
            </p>

            <p className="text-justify mt-8 text-black font-semibold font-roboto tracking-wide">
              We may process or share your data that we hold based on the
              following legal basis:
            </p>

            <ul className="my-5 list-disc pl-5 lg:pl-8">
              <li className="">
                <p className="text-justify my-2 text-sm md:text-base font-roboto tracking-wide text-gray-500">
                  <span className=" not-italic text-black font-semibold font-roboto tracking-wide">
                    Consent:{" "}
                  </span>{" "}
                  We may process your data if you have given us specific consent
                  to use your personal information for a specific purpose.
                </p>
              </li>
              <li className="">
                <p className="text-justify my-2 text-sm md:text-base font-roboto tracking-wide text-gray-500">
                  <span className=" not-italic text-black font-semibold font-roboto tracking-wide">
                    Legitimate Interests:{" "}
                  </span>{" "}
                  We may process your data when it is reasonably necessary to
                  achieve our legitimate business interests.
                </p>
              </li>
              <li className="">
                <p className="text-justify my-2 text-sm md:text-base font-roboto tracking-wide text-gray-500">
                  <span className=" not-italic text-black font-semibold font-roboto tracking-wide">
                    Performance of a Contract:{" "}
                  </span>{" "}
                  Where we have entered into a contract with you, we may process
                  your personal information to fulfill the terms of our
                  contract.
                </p>
              </li>
              <li className="">
                <p className="text-justify my-2 text-sm md:text-base font-roboto tracking-wide text-gray-500">
                  <span className=" not-italic text-black font-semibold font-roboto tracking-wide">
                    Legal Obligations:{" "}
                  </span>{" "}
                  We may disclose your information where we are legally required
                  to do so in order to comply with applicable law, governmental
                  requests, a judicial proceeding, court order, or legal
                  process, such as in response to a court order or a subpoena
                  (including in response to public authorities to meet national
                  security or law enforcement requirements).
                </p>
              </li>
              <li className="">
                <p className="text-justify my-2 text-sm md:text-base font-roboto tracking-wide text-gray-500">
                  <span className=" not-italic text-black font-semibold font-roboto tracking-wide">
                    Vital Interests:{" "}
                  </span>{" "}
                  We may disclose your information where we believe it is
                  necessary to investigate, prevent, or take action regarding
                  potential violations of our policies, suspected fraud,
                  situations involving potential threats to the safety of any
                  person and illegal activities, or as evidence in litigation in
                  which we are involved.
                </p>
              </li>
            </ul>
            <p className="text-justify mt-8 text-black font-semibold font-roboto tracking-wide">
              More specifically, we may need to process your data or share your
              personal information in the following situations:
            </p>

            <ul className="my-5 list-disc pl-5 lg:pl-8">
              <li className="">
                <p className="text-justify my-2 text-sm md:text-base font-roboto tracking-wide text-gray-500">
                  <span className=" not-italic text-black font-semibold font-roboto tracking-wide">
                    Business Transfers:{" "}
                  </span>
                  We may share or transfer your information in connection with,
                  or during negotiations of, any merger, sale of company assets,
                  financing, or acquisition of all or a portion of our business
                  to another company.
                </p>
              </li>
            </ul>
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
            <p className="text-brand_text text-lg md:text-xl">
              How do we handle your social logins ?
            </p>
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="bg-normal_bg">
          <div>
            <p className="italic mt-7 mb-7 text-sm md:text-base font-roboto tracking-wider text-gray-500 text-justify">
              {" "}
              <span className=" not-italic text-black font-semibold font-roboto tracking-wider">
                In Short:
              </span>
              If you choose to register or log in to our services using a social
              media account, we may have access to certain information about
              you.
            </p>

            <p className="text-justify my-7 text-sm md:text-base font-roboto tracking-wider text-gray-500">
              Our Services offers you the ability to register and login using
              your third-party social media account details (like your Facebook
              or Twitter logins). Where you choose to do this, we will receive
              certain profile information about you from your social media
              provider. The profile information we receive may vary depending on
              the social media provider concerned, but will often include your
              name, email address, friends list, profile picture as well as
              other information you choose to make public on such social media
              platform. If you login using Facebook, we may also request access
              to other permissions related to your account, such as your
              friends, check-ins, and likes, and you may choose to grant or deny
              us access to each individual permission.
            </p>

            <p className="text-justify my-7 text-sm md:text-base font-roboto tracking-wider text-gray-500">
              We will use the information we receive only for the purposes that
              are described in this privacy notice or that are otherwise made
              clear to you on the relevant Services. Please note that we do not
              control, and are not responsible for, other uses of your personal
              information by your third-party social media provider. We
              recommend that you review their privacy notice to understand how
              they collect, use and share your personal information, and how you
              can set your privacy preferences on their sites and apps.
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
            <p className="text-brand_text text-lg md:text-xl">
              How long do we keep your information?
            </p>
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="bg-normal_bg">
          <div>
            <p className="italic mt-7 mb-7 text-sm md:text-base font-roboto tracking-wider text-gray-500 text-justify">
              {" "}
              <span className=" not-italic text-black font-semibold font-roboto tracking-wider">
                In Short:
              </span>
              We keep your information for as long as necessary to fulfill the
              purposes outlined in this privacy notice unless otherwise required
              by law.
            </p>

            <p className="text-justify my-7 text-sm md:text-base font-roboto tracking-wider text-gray-500">
              We will only keep your personal information for as long as it is
              necessary for the purposes set out in this privacy notice, unless
              a longer retention period is required or permitted by law (such as
              tax, accounting or other legal requirements). No purpose in this
              notice will require us keeping your personal information for
              longer than the period of time in which users have an account with
              us.
            </p>

            <p className="text-justify my-7 text-sm md:text-base font-roboto tracking-wider text-gray-500">
              When we have no ongoing legitimate business need to process your
              personal information, we will either delete or anonymize such
              information, or, if this is not possible (for example, because
              your personal information has been stored in backup archives),
              then we will securely store your personal information and isolate
              it from any further processing until deletion is possible.
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
            <p className="text-brand_text text-lg md:text-xl">
              How do we keep your information safe?
            </p>
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="bg-normal_bg">
          <div>
            <p className="italic mt-7 mb-7 text-sm md:text-base font-roboto tracking-wider text-gray-500 text-justify">
              {" "}
              <span className=" not-italic text-black font-semibold font-roboto tracking-wider">
                In Short:
              </span>
              We aim to protect your personal information through a system of
              organizational and technical security measures.
            </p>

            <p className="text-justify my-7 text-sm md:text-base font-roboto tracking-wider text-gray-500">
              We have implemented appropriate technical and organizational
              security measures designed to protect the security of any personal
              information we process. However, despite our safeguards and
              efforts to secure your information, no electronic transmission
              over the Internet or information storage technology can be
              guaranteed to be 100% secure, so we cannot promise or guarantee
              that hackers, cybercriminals, or other unauthorized third parties
              will not be able to defeat our security, and improperly collect,
              access, steal, or modify your information. Although we will do our
              best to protect your personal information, transmission of
              personal information to and from our Services is at your own risk.
              You should only access the Services within a secure environment.
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
            <p className="text-brand_text text-lg md:text-xl">
              What are your privacy rights?
            </p>
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="bg-normal_bg">
          <div>
            <p className="italic mt-7 mb-7 text-sm md:text-base font-roboto tracking-wider text-gray-500 text-justify">
              {" "}
              <span className=" not-italic text-black font-semibold font-roboto tracking-wider">
                In Short:
              </span>
              We aim to protect your personal information through a system of
              organizational and technical security measures.
            </p>

            <p className="text-justify mt-7 text-sm md:text-base font-roboto tracking-wider text-gray-500">
              If you are a resident in the EEA or UK and you believe we are
              unlawfully processing your personal information, you also have the
              right to complain to your local data protection supervisory
              authority. You can find their contact details here:
            </p>

            <p className="text-justify my-2 text-sm md:text-base font-roboto tracking-wider text-gray-500 hover:text-brand_text">
              <a
                target="_blank"
                href="https://ec.europa.eu/newsroom/article29/items/612080"
              >
                http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm.
              </a>
            </p>

            <p className="text-justify mt-7 text-sm md:text-base font-roboto tracking-wider text-gray-500">
              If you are a resident in Switzerland, the contact details for the
              data protection authorities are available here:
            </p>
            <p className="text-justify my-2 text-sm md:text-base font-roboto tracking-wider text-gray-500 hover:text-brand_text">
              <a
                target="_blank"
                href="https://www.edoeb.admin.ch/edoeb/en/home.html"
              >
                https://www.edoeb.admin.ch/edoeb/en/home.html.
              </a>
            </p>

            <p className="text-justify mt-7 text-sm md:text-base font-roboto tracking-wider text-gray-500">
              If you have questions or comments about your privacy rights, you
              may email us at{" "}
              <span className="hover:text-brand_text">
                <a href="contact@schooldekho.co.in" target="_blank">
                  contact@schooldekho.co.in.
                </a>
              </span>
            </p>
            <p className="text-justify my-7 text-sm md:text-base font-roboto tracking-wider text-black font-semibold">
              Account Information
            </p>

            <p className="text-justify mt-8 text-gray-500 font-semibold font-roboto tracking-wide">
              MIf you would at any time like to review or change the information
              in your account or terminate your account, you can:
            </p>

            <ul className="my-5 list-disc pl-5 lg:pl-8">
              <li className="">
                <p className="text-justify my-2 text-sm md:text-base font-roboto tracking-wide text-gray-500">
                  Contact us using the contact information provided.
                </p>
              </li>
              <li className="">
                <p className="text-justify my-2 text-sm md:text-base font-roboto tracking-wide text-gray-500">
                  Log in to your account settings and update your user account.
                </p>
              </li>
            </ul>

            <p className="text-justify my-7 text-gray-500 font-roboto tracking-wide">
              MIf you Upon your request to terminate your account, we will
              deactivate or delete your account and information from our active
              databases. However, we may retain some information in our files to
              prevent fraud, troubleshoot problems, assist with any
              investigations, enforce our Terms of Use and/or comply with
              applicable legal requirements.
            </p>

            <p className="text-justify my-7 text-gray-500 font-roboto tracking-wide">
              {" "}
              <span className="text-justify text-black font-semibold font-roboto tracking-wide">
                Opting out of email marketing:
              </span>{" "}
              You can unsubscribe from our marketing email list at any time by
              clicking on the unsubscribe link in the emails that we send or by
              contacting us using the details provided below. You will then be
              removed from the marketing email list — however, we may still
              communicate with you, for example to send you service-related
              emails that are necessary for the administration and use of your
              account, to respond to service requests, or for other
              non-marketing purposes.{" "}
            </p>

            <p className="text-justify mt-8   font-roboto tracking-wide">
              To otherwise opt-out, you may:
            </p>

            <ul className="my-5 list-disc pl-5 lg:pl-8">
              <li className="">
                <p className="text-justify my-2 text-sm md:text-base font-roboto tracking-wide text-gray-500">
                  Access your account settings and update your preferences.
                </p>
              </li>
              <li className="">
                <p className="text-justify my-2 text-sm md:text-base font-roboto tracking-wide text-gray-500">
                  Contact us using the contact information provided.
                </p>
              </li>
            </ul>
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
            <p className="text-brand_text text-lg md:text-xl">
              Controls for do-not-track features{" "}
            </p>
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="bg-normal_bg">
          <div>
            <p className="text-justify my-7 text-sm md:text-base font-roboto tracking-wider text-gray-500">
              Most web browsers and some mobile operating systems and mobile
              applications include a Do-Not-Track ("DNT") feature or setting you
              can activate to signal your privacy preference not to have data
              about your online browsing activities monitored and collected. At
              this stage no uniform technology standard for recognizing and
              implementing DNT signals has been finalized. As such, we do not
              currently respond to DNT browser signals or any other mechanism
              that automatically communicates your choice not to be tracked
              online. If a standard for online tracking is adopted that we must
              follow in the future, we will inform you about that practice in a
              revised version of this privacy notice.
            </p>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel9"}
        onChange={handleChange("panel9")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: "100%", flexShrink: 0 }}>
            <p className="text-brand_text text-lg md:text-xl">
              Do california residents have specific privacy rights?{" "}
            </p>
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="bg-normal_bg">
          <div>
            <p className="italic mt-7 mb-7 text-sm md:text-base font-roboto tracking-wider text-gray-500 text-justify">
              {" "}
              <span className=" not-italic text-black font-semibold font-roboto tracking-wider">
                In Short:
              </span>
              Yes, if you are a resident of California, you are granted specific
              rights regarding access to your personal information.
            </p>

            <p className="text-justify my-7 text-sm md:text-base font-roboto tracking-wider text-gray-500">
              California Civil Code Section 1798.83, also known as the "Shine
              The Light" law, permits our users who are California residents to
              request and obtain from us, once a year and free of charge,
              information about categories of personal information (if any) we
              disclosed to third parties for direct marketing purposes and the
              names and addresses of all third parties with which we shared
              personal information in the immediately preceding calendar year.
              If you are a California resident and would like to make such a
              request, please submit your request in writing to us using the
              contact information provided below.
            </p>
            <p className="text-justify my-7 text-sm md:text-base font-roboto tracking-wider text-gray-500">
              If you are under 18 years of age, reside in California, and have a
              registered account with a Service, you have the right to request
              removal of unwanted data that you publicly post on the Services.
              To request removal of such data, please contact us using the
              contact information provided below, and include the email address
              associated with your account and a statement that you reside in
              California. We will make sure the data is not publicly displayed
              on the Services, but please be aware that the data may not be
              completely or comprehensively removed from all our systems (e.g.
              backups, etc.).
            </p>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel10"}
        onChange={handleChange("panel10")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: "100%", flexShrink: 0 }}>
            <p className="text-brand_text text-lg md:text-xl">
              Do we make updates to this notice?
            </p>
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="bg-normal_bg">
          <div>
            <p className="italic mt-7 mb-7 text-sm md:text-base font-roboto tracking-wider text-gray-500 text-justify">
              {" "}
              <span className=" not-italic text-black font-semibold font-roboto tracking-wider">
                In Short:
              </span>
              Yes, we will update this notice as necessary to stay compliant
              with relevant laws.
            </p>

            <p className="text-justify my-7 text-sm md:text-base font-roboto tracking-wider text-gray-500">
              We may update this privacy notice from time to time. The updated
              version will be indicated by an updated "Revised" date and the
              updated version will be effective as soon as it is accessible. If
              we make material changes to this privacy notice, we may notify you
              either by prominently posting a notice of such changes or by
              directly sending you a notification. We encourage you to review
              this privacy notice frequently to be informed of how we are
              protecting your information.
            </p>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel11"}
        onChange={handleChange("panel11")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: "100%", flexShrink: 0 }}>
            <p className="text-brand_text text-lg md:text-xl">
              How can you contact us about this notice ?
            </p>
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="bg-normal_bg">
          <div>
            <p className="text-justify my-7 text-sm md:text-base font-roboto tracking-wider text-gray-500">
              If you have questions or comments about this notice, you may email
              us at privacy@schooldekho.co.in or by post to:
            </p>
            <ul className="my-5 list-disc pl-5 lg:pl-8">
              <li className="">
                <p className="text-justify my-2 text-sm md:text-base font-roboto tracking-wide text-gray-500 font-bold">
                  School Dekho
                </p>
                <p className="text-justify text-sm md:text-base font-roboto tracking-wider text-gray-500">
                  1st Floor, Sati Plaza, Barrackpore Chiriamore Crossing, North
                  24 Parganas
                </p>
                <p className="text-justify mt-2 text-sm md:text-base font-roboto tracking-wider text-gray-500">
                  Kolkata, West Bengal 700120, India
                </p>
              </li>
            </ul>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel12"}
        onChange={handleChange("panel12")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: "100%", flexShrink: 0 }}>
            <p className="text-brand_text text-lg md:text-xl">
              How can you review, update, or delete the data we collect from you
              ?
            </p>
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="bg-normal_bg">
          <div>
            <p className="text-justify my-7 text-sm md:text-base font-roboto tracking-wider text-gray-500">
              Based on the applicable laws of your country, you may have the
              right to request access to the personal information we collect
              from you, change that information, or delete it in some
              circumstances. To request to review, update, or delete your
              personal information, please visit:{" "}
              <a
                href="http://www.schooldekho.co.in"
                className="hover:text-brand_text"
              >
                http://www.schooldekho.co.in
              </a>
            </p>
          </div>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
};

export default PrivacyAccordion;
