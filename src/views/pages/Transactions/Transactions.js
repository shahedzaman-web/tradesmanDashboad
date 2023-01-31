/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
// reactstrap components
import {
  Badge,
  Card,
  Container,
  CardHeader,
  Row,
  Col,
  Table,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip
} from "reactstrap";
import { onSnapshot, collection, getDocs } from "firebase/firestore";
import SimpleHeader from "components/Headers/SimpleHeader";
import { db } from "Firebase/firebase.config";
import Modals from "./Modal/Modals";
import Loader from "utility/Loader";

function Transactions() {

  // All states and paths********************
  
  const [exampleModal, setExampleModal] = React.useState(false)
  const [transactioDetails, setTransactioDetails] = React.useState(null);
  const [amount, setAmount] = React.useState(null)

  const openModal = (transaction) => {
    setExampleModal(!exampleModal);
    setTransactioDetails(transaction);
    setAmount(transaction?.amount);
  }
  
  const [transactions, setTransactions] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [providers, setProviders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [serviceFee, setServiceFee] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage, setPostsPerPage] = React.useState(10);

  // All states and paths********************

  // Pagination setup************
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFastPost = indexOfLastPost - postsPerPage;
  
  const currentTransactions = transactions.slice(indexOfFastPost, indexOfLastPost);
  
  const lastPageNumber = Math.ceil(transactions.length / postsPerPage);

  // Pagination setup************

  // Loading data from db***********
  
  const userRef = collection(db, "/usersList/user/children");
  const tradesmanRef = collection(db, "/usersList/provider/children");


  const serviceFeeRef = collection(db, "serviceFee");

  // Service fee*************

  React.useLayoutEffect(() => {
    const unSub = onSnapshot(serviceFeeRef, (QuerySnapshot) => {
      const items = [];
      QuerySnapshot.forEach((doc) => {

        items.push({ id: doc.id, ...doc.data() });
      });
      setServiceFee(items);
      setLoading(false);
    });

    return () => {
      unSub();
    };
  }, [])

  // Users data ***********

  React.useLayoutEffect(() => {
    const unSub = onSnapshot(userRef, (QuerySnapshot) => {
      const items = [];
      QuerySnapshot.forEach((doc) => {

        items.push({ uid: doc.id, ...doc.data() });
      });
      setUsers(items);
      setLoading(false);
    });

    return () => {
      unSub();
    };
  }, []);

  // Providers Data **************

  React.useLayoutEffect(() => {
    const unSub = onSnapshot(tradesmanRef, (QuerySnapshot) => {
      const items = [];
      QuerySnapshot.forEach((doc) => {

        items.push({ uid: doc.id, ...doc.data() });
      });
      setProviders(items);
      setLoading(false);
    });

    return () => {
      unSub();
    };
  }, []);

  // Transactions details ***************

  React.useLayoutEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "transactions"));
      let dataList = [];

      querySnapshot.forEach(async (x) => {
        const userId = x.data().userUid;
        const providerId = x.data().providerUid;

        const user = users?.find(user => user.uid === userId);
        const provider = providers?.find(provider => provider.uid === providerId);

        dataList.push({
          id: x.id,
          ...x.data(),
          ...user,
          ...{ provider },
        });
      });
      setTransactions(dataList);
      setLoading(false);
    };
    getData();
  }, [users, providers, serviceFee]);

  const time = (date) => {
    const formatDate = new Date(
      date.seconds * 1000 + date.nanoseconds / 1000000
    );
    return formatDate.toLocaleTimeString('en-us', { day: 'numeric', month: 'long', });
  }


    return (
      <>
      {
        loading ?
        <Loader></Loader>
        :
        <>
        <SimpleHeader name="Transactions" parentName="Transactions" />
        <Container className="mt--6" fluid>
          <Card>
            <CardHeader className="border-0">
              <Row>
                <Col xs="6">
                  <h3 className="mb-0">TRANSACTIONS</h3>
                </Col>
              </Row>
            </CardHeader>

            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">User</th>
                  <th scope="col">Tradesman</th>
                  <th scope="col">Time</th>
                  <th scope="col">Transaction ID</th>
                  <th scope="col">Booking ID</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {
                  currentTransactions.map(transaction => <tr key={transaction?._id}>
                    <th scope="row" className="d-flex align-items-center">
                      <img className="avatar rounded-circle" alt="..." src={transaction?.photURL} />
                      <div className="d-flex flex-column">
                        <span className="mb-0 ml-2 text-sm">{transaction?.name}</span>
                        <span className="mb-0 ml-2 text-sm">{transaction?.email}</span>
                      </div>

                    </th>
                    <td>
                      <div className="d-flex align-items-center">
                        <img className="avatar rounded-circle" alt="..." src={transaction?.provider?.profilePhoto} />
                        <div className="d-flex flex-column">
                          <span className="ml-2 text-sm">
                            {transaction?.provider?.name}
                          </span>
                          <span className="ml-2">{transaction?.provider?.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        {time(transaction?.time)}
                      </Badge>
                    </td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        {
                          transaction?.trxID.length > 20 ?
                            <>
                              <span id={transaction?.id}>{transaction?.trxID.slice(0, 14)}...</span>
                              <UncontrolledTooltip
                                delay={0}
                                placement="top"
                                target={transaction?.id}
                              >
                                {transaction?.trxID}
                              </UncontrolledTooltip>
                            </>
                            :
                            <span>{transaction?.trxID}</span>
                        }
                      </Badge>
                    </td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        {transaction?.bookingId}
                      </Badge>
                    </td>
                    <td>
                      <span color="" className="badge-dot mr-2">
                        ${transaction?.amount}
                      </span>
                      <Button
                        className="px-1"
                        color="secondary"
                        outline
                        type="button"
                        onClick={() => openModal(transaction)}>
                        <i className="fas fa-eye" />
                      </Button>
                    </td>
                  </tr>)
                }
              </tbody>
            </Table>
            <hr className="my-2" />
            <div className="d-flex px-2 w-100 justify-content-between align-items-center">
              <h4>Showing {indexOfFastPost + 1} to {indexOfLastPost} from {transactions.length} posts</h4>
              <Pagination>
                {
                  currentPage - 1 !== 0 && <>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={e => {
                          e.preventDefault()
                          setCurrentPage(currentPage - 1)
                        }}
                      >
                        <i className="fa fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#pablo"
                        onClick={e => {
                          e.preventDefault()
                          setCurrentPage(currentPage - 1)
                        }}
                      >
                        {currentPage - 1}
                      </PaginationLink>
                    </PaginationItem></>
                }
                <PaginationItem className="active">
                  <PaginationLink href="#pablo" onClick={e => {
                    e.preventDefault()
                    setCurrentPage(currentPage)
                  }}
                  >
                    {currentPage} <span className="sr-only">(current)</span>
                  </PaginationLink>
                </PaginationItem>
                {
                  currentPage < lastPageNumber &&
                  <>
                    <PaginationItem>
                      <PaginationLink href="#pablo" onClick={e => {
                        e.preventDefault()
                        setCurrentPage(currentPage + 1)
                      }}
                      >
                        {currentPage + 1}
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#pablo" onClick={e => {
                        e.preventDefault()
                        setCurrentPage(currentPage + 1)
                      }}
                      >
                        <i className="fa fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </>
                }
              </Pagination>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <h4 className="mr-1 mb-0">Go to page: </h4>
                  <form onSubmit={(event) => {
                    event.preventDefault();
                    setCurrentPage(parseInt(event.target.page.value));
                  }}>
                    <input className="py-0" style={{ width: "25%" }} type="text" name="page" id="" />
                    <Button className="py-0 px-2 ml-1" color="primary" type="submit">
                      Go
                    </Button>
                  </form>
                </div>
                <div className="d-flex align-items-center">
                  <h4>Posts per page</h4>
                  <UncontrolledDropdown className="py-2" size="sm" group>
                    <DropdownToggle caret color="secondary">
                      {postsPerPage}
                    </DropdownToggle>
                    <DropdownMenu className="py-2" >
                      <DropdownItem className="py-2" href="#pablo" onClick={e => {
                        e.preventDefault();
                        setPostsPerPage(10);
                        setCurrentPage(1);
                      }}>
                        10
                      </DropdownItem>
                      <DropdownItem href="#pablo" onClick={e => {
                        e.preventDefault();
                        setPostsPerPage(25);
                        setCurrentPage(1);
                      }}>
                        25
                      </DropdownItem>
                      <DropdownItem href="#pablo" onClick={e => {
                        e.preventDefault();
                        setPostsPerPage(50);
                        setCurrentPage(1);
                      }}>
                        50
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </div>
            </div>
          </Card>
        </Container>
        {
          exampleModal && <Modals key={transactioDetails?._id} serviceFee={serviceFee} setExampleModal={setExampleModal} exampleModal={exampleModal} amount={amount}></Modals>
        }
      </>
      }
      </>
    );
  }

export default Transactions