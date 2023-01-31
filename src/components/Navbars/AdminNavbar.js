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
// nodejs library that concatenates classes
import classnames from "classnames";
import { signOut } from "firebase/auth";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
// reactstrap components
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  NavItem,
  Nav,
  Container,
} from "reactstrap";
import { auth } from "../../Firebase/firebase.config";

function AdminNavbar({ theme, sidenavOpen, toggleSidenav }) {
  // function that on mobile devices makes the search open
  // const openSearch = () => {
  //   document.body.classList.add("g-navbar-search-showing");
  //   setTimeout(function () {
  //     document.body.classList.remove("g-navbar-search-showing");
  //     document.body.classList.add("g-navbar-search-show");
  //   }, 150);
  //   setTimeout(function () {
  //     document.body.classList.add("g-navbar-search-shown");
  //   }, 300);
  // };
  // function that on mobile devices makes the search close
  // const closeSearch = () => {
  //   document.body.classList.remove("g-navbar-search-shown");
  //   setTimeout(function () {
  //     document.body.classList.remove("g-navbar-search-show");
  //     document.body.classList.add("g-navbar-search-hiding");
  //   }, 150);
  //   setTimeout(function () {
  //     document.body.classList.remove("g-navbar-search-hiding");
  //     document.body.classList.add("g-navbar-search-hidden");
  //   }, 300);
  //   setTimeout(function () {
  //     document.body.classList.remove("g-navbar-search-hidden");
  //   }, 500);
  // };

  const history = useHistory();


  const logOut = () => {
    signOut(auth)
      .then(result => {
        history.push('/home')
      })
      .catch(error => console.error('error: ', error))
  }
  return (
    <>
      <Navbar
        className={classnames(
          "navbar-top navbar-expand border-bottom",
          { "navbar-dark bg-info": theme === "dark" },
          { "navbar-light bg-secondary": theme === "light" }
        )}
      >
        <Container fluid>
          <Collapse navbar isOpen={true}>
            <Nav className="align-items-center ml-md-auto" navbar>
              <NavItem className="d-xl-none">
                <div
                  className={classnames(
                    "pr-3 sidenav-toggler",
                    { active: sidenavOpen },
                    { "sidenav-toggler-dark": theme === "dark" }
                  )}
                  onClick={toggleSidenav}
                >
                  <div className="sidenav-toggler-inner">
                    <i className="sidenav-toggler-line" />
                    <i className="sidenav-toggler-line" />
                    <i className="sidenav-toggler-line" />
                  </div>
                </div>
              </NavItem>
            </Nav>
            <Nav className="align-items-center ml-auto ml-md-0" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="nav-link pr-0" color="" tag="a">
                  <div className="d-flex justify-content-center align-items-center">
                    <h1 className="text-secondary "><i className="ni ni-circle-08"></i><span className="text-secondary text-lg font-weight-bold ml-2">
                      {auth?.currentUser?.displayName}
                    </span></h1>
                    
                  </div>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h4 className="text-overflow m-0">Welcome!</h4>
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span onClick={logOut} color="secondary" type="button">
                      <i className="ni ni-button-power mr-2" />
                      <span>Logout</span>
                    </span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

AdminNavbar.defaultProps = {
  toggleSidenav: () => { },
  sidenavOpen: false,
  theme: "dark",
};
AdminNavbar.propTypes = {
  toggleSidenav: PropTypes.func,
  sidenavOpen: PropTypes.bool,
  theme: PropTypes.oneOf(["dark", "light"]),
};

export default AdminNavbar;
