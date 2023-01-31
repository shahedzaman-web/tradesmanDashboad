/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Table,
  Container,
  Row,
  Col,
  Input,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";

import { onSnapshot, collection, updateDoc, doc, query, getDocs, where } from "firebase/firestore";
import Modals from "./Modal/Modals";
import ReportsModals from "./ReportsModal/ReportsModal";
import { db } from "Firebase/firebase.config";
import NotifyContext from "context/NotifyContext";
import sendPushNotification from "utility/notification";
import Loader from "utility/Loader";

function Tradesman() {

  // States for Modals **********
  const { Notify } = React.useContext(NotifyContext);

  const [users, setUsers] = React.useState([]);
  const [search, setSearch] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [exampleModal, setExampleModal] = React.useState(false)
  const [userDetails, setUserDetails] = React.useState(null)
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage, setPostsPerPage] = React.useState(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFastPost = indexOfLastPost - postsPerPage;

  const currentUsers = users.slice(indexOfFastPost, indexOfLastPost);

  const lastPageNumber = Math.ceil(users.length / postsPerPage);


  const [reportModal, setReportModal] = React.useState(false)
  const [reports, setReports] = React.useState(null)

  const openModal = (user) => {
    setExampleModal(!exampleModal)
    setUserDetails(user);
  }


  const openreports = (reports) => {
    setReportModal(!reportModal)
    setReports(reports);
  }

  // States for Modals **********

  // Database call to read Data ***************



  const approve = "Approved";
  const disapprove = "Disapproved";
  const pending = "Pending";

  // const q = query();

  const collectionRef = collection(db, "/usersList/provider/children");

  React.useLayoutEffect(() => {
    const unSub = onSnapshot(collectionRef, (QuerySnapshot) => {
      const items = [];
      QuerySnapshot.forEach((doc) => {

        items.push({ id: doc.id, ...doc.data() });
      });
      setUsers(items);
      setLoading(false);
    });

    return () => {
      unSub();
    };
  }, [])

  // Database call to read Data ***************


  // Function to update data in database **************

  const update = async (user, status) => {
    const updated = {
      profileVerified: status
    };
    const id = user.id;
    const notificationToken = user.notificationToken;
    try {
      const userRef = doc(db, `/usersList/provider/children/${id}`);
      await updateDoc(userRef, updated);
      Notify("success", `Profile ${status} successfully.`, "Profile Status Update");
      await sendPushNotification(notificationToken, status);
      setSearch([]);
    } catch (error) {
      console.error(error);
    }
  };

  // Serach function **************

  const handleSearch = React.useCallback(async (event) => {
    event.preventDefault();
    const id = event.target.search.value;
    try {
      setLoading(true);
      const ref = collection(db, "usersList/provider/children");
      const q = query(ref, where("email", "==", id));
      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setSearch(data);
      setLoading(false);
    } catch (error) {
      console.log({ error });
    }

  }, []);



  if (search.length === 1) {
    return (
      <>
        <>
          {loading ? <Loader></Loader> : <>
            <SimpleHeader name="Tradesman" parentName="Users" />
            <Container className="mt--6" fluid>

              <Card>
                <CardHeader className="border-0">
                  <Row>
                    <Col xs="6">
                      <h3 className="mb-0">Tradesman</h3>
                    </Col>
                    <Col className="text-right" xs="6">
                      <form onSubmit={(event) => handleSearch(event)}>
                        <div className="d-flex justify-content-end">
                          <Input placeholder="Enter email" className="w-50" type="text" name="search" bsSize="sm" id="" />
                          <Button className="py-0 rounded-end" color="info" type="submit">Search</Button>
                          <Button className="py-0" color="default" onClick={() => setSearch([])}>
                            View All
                          </Button>
                        </div>
                      </form>
                    </Col>
                  </Row>
                </CardHeader>

                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th>Name</th>
                      <th>Service Category</th>
                      <th>Business Location</th>
                      <th>Profile Status</th>
                      <th>Reports</th>
                      <th>Verification Status</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={search[0]?.id}>
                      <td className="table-user">
                        <img
                          alt="..."
                          className="avatar rounded-circle mr-3"
                          src={search[0]?.profilePhoto}
                        />
                        <b>{search[0]?.name}</b>
                      </td>
                      <td>
                        <span className="text-muted">{search[0]?.category}</span>
                      </td>
                      <td>
                        <button
                          aria-label="Close"
                          className="border-0 rounded-lg px-2 primary"
                          data-dismiss="modal"
                          type="button"
                          onClick={() => openreports(search[0]?.reports)}
                        >
                          <h3 className="text-muted  fs-4">{search[0]?.reports?.length}</h3>
                        </button>
                      </td>
                      <td>
                        <span className="text-muted">{search[0]?.businessLocation}</span>
                      </td>
                      <td>
                        <Badge color={search[0]?.profileStatus === "Complete" ? "success" : "warning"} className="text-muted">{search[0]?.profileStatus}</Badge>
                      </td>
                      <td>
                        <a
                          className="font-weight-bold"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <UncontrolledDropdown>
                            <DropdownToggle caret color="secondary">
                              {search[0]?.profileVerified}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                href="#pablo"
                                onClick={() => update(search[0], approve)}
                              >
                                Approve
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={() => update(search[0], disapprove)}
                              >
                                Disapprove
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={() => update(search[0], pending)}
                              >
                                Pending
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </a>
                      </td>
                      <td className="table-actions">
                        <button
                          aria-label="Close"
                          className="close"
                          data-dismiss="modal"
                          type="button"
                          onClick={() => openModal(search[0])}
                        >
                          <span aria-hidden={true}><i className="fas fa-eye" /></span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Container>
            {exampleModal && <Modals setExampleModal={setExampleModal} exampleModal={exampleModal} userDetails={userDetails}></Modals>}
            {
              reportModal && <ReportsModals setReportModal={setReportModal} reportModal={reportModal} reports={reports}></ReportsModals>
            }
          </>}
        </>

      </>
    );
  }

  else {
    return (
      <>
        <>
          {loading ? <Loader></Loader> : <>
            <SimpleHeader name="Tradesman" parentName="Users" />
            <Container className="mt--6" fluid>

              <Card>
                <CardHeader className="border-0">
                  <Row>
                    <Col xs="6">
                      <h3 className="mb-0">Tradesman</h3>
                    </Col>
                    <Col className="text-right" xs="6">
                      <form onSubmit={(event) => handleSearch(event)}>
                        <div className="d-flex justify-content-end">
                          <Input placeholder="Enter email" className="w-50" type="text" name="search" bsSize="sm" id="" />
                          <Button className="py-0 rounded-end" color="info" type="submit">Search</Button>
                        </div>
                      </form>
                    </Col>
                  </Row>
                </CardHeader>

                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th>Name</th>
                      <th>Service Category</th>
                      <th>Business Location</th>
                      <th>Profile Status</th>
                      <th>Reports</th>
                      <th>Verification Status</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="table-user">
                          <img
                            alt="..."
                            className="avatar rounded-circle mr-3"
                            src={user?.profilePhoto}
                          />
                          <b>{user?.name}</b>
                        </td>
                        <td>
                          <span className="text-muted">{user?.category}</span>
                        </td>
                        <td>
                          <span className="text-muted">{user?.businessLocation}</span>
                        </td>
                        <td>
                          <Badge color={user?.profileStatus === "Complete" ? "success" : "warning"} className="text-muted">{user?.profileStatus}</Badge>
                        </td>
                        <td>
                          {
                            user?.reports === undefined ?
                              <>
                                <span className="text-muted">0</span>
                              </> :
                              <>
                                <span className="text-muted">{user?.reports?.length}</span>
                                <Button
                                  className="px-1"
                                  color="secondary"
                                  outline
                                  type="button"
                                  onClick={() => openreports(user?.reports)}>
                                  <i className="fas fa-eye" />
                                </Button>
                              </>
                          }
                        </td>
                        <td>
                          <a
                            className="font-weight-bold"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <UncontrolledDropdown>
                              <DropdownToggle caret color="secondary">
                                {user?.profileVerified}
                              </DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem
                                  href="#pablo"
                                  onClick={() => update(user, approve)}
                                >
                                  Approve
                                </DropdownItem>
                                <DropdownItem
                                  href="#pablo"
                                  onClick={() => update(user, disapprove)}
                                >
                                  Disapprove
                                </DropdownItem>
                                <DropdownItem
                                  href="#pablo"
                                  onClick={() => update(user, pending)}
                                >
                                  Pending
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </a>
                        </td>
                        <td className="table-actions">
                          <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => openModal(user)}
                          >
                            <span aria-hidden={true}><i className="fas fa-eye" /></span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <hr className="my-2" />
            <div className="d-flex px-2 w-100 justify-content-between align-items-center">
            <h4>Showing {indexOfFastPost + 1} to {indexOfLastPost} from {users.length} posts</h4>
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
                  <form  onSubmit={(event) => {
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
            {exampleModal && <Modals setExampleModal={setExampleModal} exampleModal={exampleModal} userDetails={userDetails}></Modals>}
            {
              reportModal && <ReportsModals setReportModal={setReportModal} reportModal={reportModal} reports={reports}></ReportsModals>
            }
          </>}
        </>

      </>
    );
  }
}

export default Tradesman;