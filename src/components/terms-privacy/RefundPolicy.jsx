import * as React from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  clearFilters,
  clearBlogFilter,
  resetBlogPagination,
  resetPaginationStep,
} from "../../redux/schoolFilterSlice";
const RefundPolicy = () => {
  const location = useLocation();
  const { baseUrl } = useSelector((state) => state?.data);
  const [data, setData] = React.useState();
  const dispatch = useDispatch();
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // http://192.168.0.239:6800/fetchRefundPolicy
        const response = await axios.get(`${baseUrl}/fetchRefundPolicy`);
        setData(response.data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    dispatch(resetPaginationStep());
    dispatch(resetBlogPagination());
    dispatch(clearBlogFilter());
    dispatch(clearFilters());

    fetchData();
  }, [baseUrl]);
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
            Refund Policy
          </h1>
        </div>

        {data && Object.keys(data)?.length ? (
          <div
          className="mt-10 prose md:prose-md font-roboto  w-full max-w-full"
          dangerouslySetInnerHTML={{ __html: data?.content }}
        ></div>
        ) : (
          <div>
            <h1 className="text-5xl text-center text-brand_text font-extrabold mt-10">
              Oops!
            </h1>
            <h1 className="text-2xl text-center blink">No data found</h1>
          </div>
        )}

      

      </div>
    </div>
  );
};

export default RefundPolicy;
