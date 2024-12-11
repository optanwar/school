import Home from "./components/home/Home.jsx";
import About from "./components/about/About.jsx";
import Contact from "./components/contact-us/Contact.jsx";
import RegisterSchool from "./components/resister-school/ResisterSchool.jsx";
import School from "./components/Schools/School.jsx";
import Blogs from "./components/blogs/Blog.jsx";
import TermsCondition from "./components/terms-privacy/TermsAndCondition.jsx";
import PrivacyPolicy from "./components/terms-privacy/PrivacyAndPolicy.jsx";
import FAQ from "./components/terms-privacy/FAQ.jsx";
import SingleSchool from "./components/Schools/SingleSchool.jsx";
import AdmissionEnquiry from "./components/form/EnquiryForm.jsx";
import ClaimSchool from "./components/form/ClaimSchool.jsx";
import SchoolCompares from "./components/compare/Compare.jsx";
import RefundPolicy from "./components/terms-privacy/RefundPolicy.jsx";
import Careers from "./components/terms-privacy/Careers.jsx";
import SingleJobs from './components/terms-privacy/SingleJob.jsx'
import SingleBlog from "./components/blogs/SingleBlog.jsx";
import PageNotFound from "./components/pageNotFound/index.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import Demo from "./components/terms-privacy/Demo.jsx";

export const route = [
  {
    id: 1,
    name: "Home",
    path: "/",
    component: <Home />,
  },
  {
    id: 2,
    name: "About Us",
    path: "/about-us",
    component: <About />,
  },
  {
    id: 3,
    name: "Contact Us",
    path: "/contact-us",
    component: <Contact />,
  },
  {
    id: 4,
    name: "Register Your School",
    path: "/register-your-school",
    component: <RegisterSchool />,
  },
  {
    id: 5,
    name: "Schools Near Me ",
    path: "/schools-near-me",
    component: <School />,
  },
  {
    id: 6,
    name: "News & Blogs ",
    path: "/news-and-blogs",
    component: <Blogs />,
  },
  {
    id: 7,
    name: "Terms & Conditions ",
    path: "/terms-and-conditions",
    component: <TermsCondition />,
  },
  {
    id: 8,
    name: "Privacy Policy",
    path: "/privacy-policy",
    component: <PrivacyPolicy />,
  },
  {
    id: 9,
    name: "Frequently Asked Questions",
    path: "/frequently-asked-questions",
    component: <FAQ />,
  },
  {
    id: 10,
    name: "Single School",
    path: "/schools/:slug",
    component: <SingleSchool />,
  },
  {
    id: 11,
    name: "Admission Enquiry",
    path: "admission-enquiry",
    component: <AdmissionEnquiry />,
  },
  {
    id: 12,
    name: "Claim Your School",
    path: "claim-your-school",
    component: <ClaimSchool />,
  },
  {
    id: 13,
    name: "School Compare",
    path: "school/compare",
    component: <SchoolCompares />,
  },
  {
    id: 14,
    name: "Refund Policy",
    path: "refund-policy",
    component: <RefundPolicy />,
  },
  {
    id: 15,
    name: "Careers",
    path: "careers",
    component: <Careers />,
  },
  {
    id: 16,
    name: "Single Blog",
    path: "/blogs/:slug",
    component: <SingleBlog />,
  },
  {
    id: 17,
    name: "Dashboard",
    path: "/dashboard",
    component: <Dashboard />,
  },
  {
    id: 18,
    name: "Dashboard",
    path: "/dashboard/:id",
    component: <Dashboard />,
  },
  {
    id: 19,
    name: "Single Job",
    path: "/jobs/:jobId",
    component: <SingleJobs />,
  },
  {
    id: 25,
    name: "Demo",
    path: "/demo",
    component: <Demo />,
  },

  {
    id: 23,
    name: "Page Not Found",
    path: "*",
    component: <PageNotFound />,
  },
];
