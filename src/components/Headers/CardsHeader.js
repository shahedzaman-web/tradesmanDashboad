/* eslint-disable react-hooks/exhaustive-deps */
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
// nodejs library to set properties for components
import { db } from "Firebase/firebase.config";
import { collection, onSnapshot } from "firebase/firestore";
import PropTypes from "prop-types";
import React from "react";
// reactstrap components
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
} from "reactstrap";
import Loader from "utility/Loader";

function CardsHeader({ name, parentName }) {

  // All states and db paths ******************

  const userRef = collection(db, "/usersList/user/children");
  const tradesmanRef = collection(db, "/usersList/provider/children");
  const postsRef = collection(db, "/jobPosts");
  const transactionRef = collection(db, "/transactions");

  const [tradesman,setTradesman] = React.useState(null);
  const [users, setUsers] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [posts, setPosts] = React.useState(null);
  const [amount, setAmount] = React.useState(0);
  const [transactions, setTransactions] = React.useState([]);

    // All states and db paths ******************


    // Fetching Data from firestore ********************

  // Tradesmans data *****************

  React.useLayoutEffect(() => {
    const unSub = onSnapshot(tradesmanRef, (QuerySnapshot) => {
      const items = [];
      QuerySnapshot.forEach((doc) => {

        items.push({ uid: doc.id, ...doc.data() });
      });
      setTradesman(items.length);
      setLoading(false);
    });

    return () => {
      unSub();
    };
  }, []);

  // users data **********************

  React.useLayoutEffect(() => {
    const unSub = onSnapshot(userRef, (QuerySnapshot) => {
      const items = [];
      QuerySnapshot.forEach((doc) => {

        items.push({ uid: doc.id, ...doc.data() });
      });
      setUsers(items.length);
      setLoading(false);
    });

    return () => {
      unSub();
    };
  }, []);

  // Posts data *********************


  React.useLayoutEffect(() => {
    const unSub = onSnapshot(postsRef, (QuerySnapshot) => {
      const items = [];
      QuerySnapshot.forEach((doc) => {

        items.push({ uid: doc.id, ...doc.data() });
      });
      setPosts(items.length);
      setLoading(false);
    });

    return () => {
      unSub();
    };
  }, []);

  // Transactions data ***************

  React.useLayoutEffect(() => {
    const unSub = onSnapshot(transactionRef, (QuerySnapshot) => {
      const items = [];
      QuerySnapshot.forEach((doc) => {

        items.push({ amount: doc.amount, ...doc.data() });
      });
      setTransactions(items);
      setLoading(false);
    });

    return () => {
      unSub();
    };
  }, []);

  React.useLayoutEffect(() => {
    let sum = 0;
    transactions.map(transaction => {
      sum  = sum + parseInt(transaction?.amount)
      return sum;
    })
    setAmount(sum);
  },[transactions])


      // Fetching Data from firestore ********************

  return (
    <>
      {
        loading ?
        <Loader></Loader>
        :
        <>
      <div className="header bg-info pb-6">
        <Container fluid>
          <div className="header-body">
            <Row className="align-items-center py-4">
              <Col lg="6" xs="7">
                <h6 className="h2 text-white d-inline-block mb-0">{name}</h6>{" "}
                <Breadcrumb
                  className="d-none d-md-inline-block ml-md-4"
                  listClassName="breadcrumb-links breadcrumb-dark"
                >
                  <BreadcrumbItem>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <i className="fas fa-home" />
                    </a>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      {parentName}
                    </a>
                  </BreadcrumbItem>
                  <BreadcrumbItem aria-current="page" className="active">
                    {name}
                  </BreadcrumbItem>
                </Breadcrumb>
              </Col>
            </Row>
            <Row>
              <Col md="6" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Users
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {users}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                          <i className="ni ni-active-40" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total tradesman
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{tradesman}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                          <i className="ni ni-chart-pie-35" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Number of posts
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{posts}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                          <i className="ni ni-money-coins" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Amount
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">${amount}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-primary text-white rounded-circle shadow">
                          <i className="ni ni-chart-bar-32" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
      }
    </>
  );
}

CardsHeader.propTypes = {
  name: PropTypes.string,
  parentName: PropTypes.string,
};

export default CardsHeader;
