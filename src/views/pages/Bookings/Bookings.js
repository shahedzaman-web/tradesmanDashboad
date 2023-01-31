/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
// reactstrap components
import {
  Card,
  Container,
  CardHeader,
  Row,
  Col,
  Table,
  UncontrolledDropdown,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { onSnapshot, collection, getDocs } from "firebase/firestore";
import SimpleHeader from "components/Headers/SimpleHeader";
import Modals from "./Modal/Modals";
import { db } from "Firebase/firebase.config";
import Loader from "utility/Loader";

function Bookings() {

  // All states and DB paths ****************
  
  const userRef = collection(db, "/usersList/user/children");
  const tradesmanRef = collection(db, "/usersList/provider/children");
  
  const [bookings, setBookings] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [providers, setProviders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);


  // All states and DB paths ****************

  // State to open Modal************
  
  const [exampleModal, setExampleModal] = React.useState(false)
  const [bookingsDetails, setBookingsDetails] = React.useState(null)
  
  const openModal= (user) => {
    setExampleModal(!exampleModal)
    setBookingsDetails(user);
  }
  
  
  // State to open Modal************

  // Pagination setup*************
  
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage, setPostsPerPage] = React.useState(10);
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFastPost = indexOfLastPost - postsPerPage;
  
  const currentBookings = bookings.slice(indexOfFastPost, indexOfLastPost);
  
  const lastPageNumber = Math.ceil(bookings.length / postsPerPage);
  
  // Pagination setup*************

  // Fetch Data from firestore ******************
  
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


  React.useLayoutEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "bookingRequest"));
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
          ...{provider},
        });
      });
      setBookings(dataList);
      setLoading(false)
    };
    getData();
  }, [users, providers]);
  
  // Fetch Data from firestore ******************
  
  return (
    <>
      {
        loading ? 
        <Loader></Loader>
        :
        <>
        <SimpleHeader name="Job Posts" parentName="Job Posts" />
        <Container className="mt--6" fluid>
          <Card>
            <CardHeader className="border-0">
              <Row>
                <Col xs="6">
                  <h3 className="mb-0">BOOKINGS DETAILS</h3>
                </Col>
              </Row>
            </CardHeader>

            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">User</th>
                  <th scope="col">Tradesman</th>
                  <th scope="col">Title</th>
                  <th scope="col">Starting Date</th>
                  <th scope="col">End Date</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {
                  currentBookings.map(booking => <tr key={booking._id}>
                    <th scope="row">
                      <img className="avatar rounded-circle" alt="..." src={booking?.photURL} />
                      <span className="mb-0 ml-2 text-sm">
                        {booking?.name}
                      </span>
                    </th>
                    <td>
                      <img className="avatar rounded-circle" alt="..." src={booking?.provider?.profilePhoto} />
                      <span className="ml-2 text-sm">
                        {booking?.provider?.name}
                      </span>
                    </td>
                    <td>
                      <span>{booking?.title}</span>
                    </td>
                    <td>
                      <span>{booking?.startDate}</span>
                    </td>
                    <td>
                      <span>{booking?.endDate}</span>
                    </td>
                    <td className="table-actions">
                      <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => openModal(booking?.status)}
                      >
                        <span aria-hidden={true}><i className="fas fa-eye" /></span>
                      </button>
                    </td>
                  </tr>)
                }
              </tbody>
            </Table>
            <hr className="my-2" />
            <div className="d-flex px-2 w-100 justify-content-between align-items-center">
            <h4>Showing {indexOfFastPost + 1} to {indexOfLastPost} from {bookings.length} bookings</h4>
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
                  <h4 className="mb-0 mr-1">Go to page: </h4>
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
        {exampleModal && <Modals setExampleModal={setExampleModal} exampleModal={exampleModal} bookingsDetails={bookingsDetails}></Modals>}
      </>
      }
      </>
    );
  }

export default Bookings