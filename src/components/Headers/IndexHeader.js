/*!

=========================================================
* Argon Dashboard PRO React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// react library for routing
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledCarousel,
} from "reactstrap";
import BgVideo from "views/pages/front/homePage/components/BgVideo";

function IndexHeader() {
  const items = [
    {
      src: "https://picsum.photos/id/456/1200/600",
      altText: "",
      caption: "",
      header: "",
    },
    {
      src: "https://picsum.photos/id/456/1200/600",
      altText: "",
      caption: "",
      header: "",
    },
  ];
  return (
    <>
      <div className="header  ">
      <BgVideo />
        {/* <UncontrolledCarousel items={items} /> */}

        {/* <div className="separator separator-bottom separator-skew zindex-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon className="fill-default" points="2560 0 2560 100 0 100" />
          </svg>
        </div> */}
      </div>
    </>
  );
}

export default IndexHeader;
