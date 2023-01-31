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
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

function IndexNavbar() {
  return (
    <>
      <Navbar
        className="navbar-horizontal navbar-main navbar-dark bg-info"
        expand="lg"
        id="navbar-main"
      >
        <Container>
          <NavbarBrand to="/" tag={Link}>
            <img
              alt="..."
              src={require("assets/img/brand/argon-react-white.png").default}
            />
          </NavbarBrand>
          <button
            aria-controls="navbar-collapse"
            aria-expanded={false}
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-target="#navbar-collapse"
            data-toggle="collapse"
            id="navbar-collapse"
            type="button"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse
            className="navbar-custom-collapse"
            navbar
            toggler="#navbar-collapse"
          >
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/admin/dashboard">
                    <img
                      alt="..."
                      src={require("assets/img/brand/blue.png").default}
                    />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button
                    aria-controls="navbar-collapse"
                    aria-expanded={false}
                    aria-label="Toggle navigation"
                    className="navbar-toggler"
                    data-target="#navbar-collapse"
                    data-toggle="collapse"
                    id="navbar-collapse"
                    type="button"
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink to="/admin/dashboard" tag={Link}>
                  <span className="nav-link-inner--text">Home</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <UncontrolledDropdown  nav inNavbar>
                  <DropdownToggle caret nav >
                    About School
                  </DropdownToggle>

                  <DropdownMenu
                    className="dropdown-menu-arrow bg-gradient-secondary"
                    right
                  >
                    <DropdownItem to="/home/message" tag={Link}>
                      Message of the Principle
                    </DropdownItem>
                    <DropdownItem to="/home/about" tag={Link}>
                      About St. Joseph's
                    </DropdownItem>
                    <DropdownItem
                      to="/home/vision" tag={Link}
                    >
                      Vision and Goals
                    </DropdownItem>
                    <DropdownItem
                      to="/home/history" tag={Link}
                    >
                      History
                    </DropdownItem>
                    <DropdownItem
                      to="/home/institute-at-a-glance" tag={Link}
                    >
                      Institute at a glance
                    </DropdownItem>
                    <DropdownItem
                      to="/home/administration" tag={Link}
                    >
                      Administration
                    </DropdownItem>
                    <DropdownItem
                      to="/home/brothers" tag={Link}
                    >
                      Brothers
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </NavItem>
              <NavItem>
                 <UncontrolledDropdown  nav inNavbar>
                  <DropdownToggle caret nav>
                    Teachers And Stuff
                  </DropdownToggle>

                  <DropdownMenu
                    className="dropdown-menu-arrow bg-gradient-secondary"
                    right
                  >
                    <DropdownItem
                      to="/home/bangla" tag={Link}
                    >
                      Bangla
                    </DropdownItem>
                    <DropdownItem
                      to="/home/english" tag={Link}
                    >
                      English
                    </DropdownItem>
                    <DropdownItem
                      to="/home/science" tag={Link}
                    >
                      Science
                    </DropdownItem>
                    <DropdownItem
                      to="/home/business" tag={Link}
                    >
                      Business
                    </DropdownItem>
                    <DropdownItem
                      to="/home/arts" tag={Link}
                    >
                      Arts
                    </DropdownItem>
                    <DropdownItem
                      to="/home/ict" tag={Link}
                    >
                      ICT
                    </DropdownItem>
                    <DropdownItem
                      to="/home/arts-and-crafts" tag={Link}
                    >
                      Arts and Crafts
                    </DropdownItem>
                    <DropdownItem
                      to="/home/physical-education" tag={Link}
                    >
                      Physical Education
                    </DropdownItem>
                    <DropdownItem
                      to="/home/demonstration" tag={Link}
                    >
                      Demonstration
                    </DropdownItem>
                    <DropdownItem
                      to="/home/lab-assistance" tag={Link}
                    >
                      Lab Assistance
                    </DropdownItem>
                    <DropdownItem
                      to="/home/librarian" tag={Link}
                    >
                      Librarian
                    </DropdownItem>
                    <DropdownItem
                      to="/home/office-staff" tag={Link}
                    >
                      Office Staff
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </NavItem>
              <NavItem>
                 <UncontrolledDropdown  nav inNavbar>
                  <DropdownToggle caret nav>
                    Academic
                  </DropdownToggle>

                  <DropdownMenu
                    className="dropdown-menu-arrow bg-gradient-secondary"
                    right
                  >
                    <DropdownItem
                      to="/home/class-test" tag={Link}
                    >
                      Class Test
                    </DropdownItem>
                    <DropdownItem
                      to="/home/term-exam" tag={Link}
                    >
                      Term Exam
                    </DropdownItem>
                    <DropdownItem
                      to="/home/syllabus" tag={Link}
                    >
                      Syllabus
                    </DropdownItem>
                    <DropdownItem
                      to="/home/discipline" tag={Link}
                    >
                      Discipline
                    </DropdownItem>
                    <DropdownItem
                      to="/home/results" tag={Link}
                    >
                      Results
                    </DropdownItem>
                    <DropdownItem
                      to="/home/fees" tag={Link}
                    >
                      Fees
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </NavItem>
              <NavItem>
                 <UncontrolledDropdown  nav inNavbar>
                  <DropdownToggle caret nav>
                    Clubs
                  </DropdownToggle>

                  <DropdownMenu
                    className="dropdown-menu-arrow bg-gradient-secondary"
                    right
                  >
                    <DropdownItem
                      to="/home/scintilla-science-club" tag={Link}
                    >
                      Scintilla Science Club
                    </DropdownItem>
                    <DropdownItem
                      to="/home/st-joseph-scout-group" tag={Link}
                    >
                      St. Joseph Scouts Group
                    </DropdownItem>
                    <DropdownItem
                      to="/home/josephite-debating-club" tag={Link}
                    >
                      Josephite Debating Club
                    </DropdownItem>
                    <DropdownItem
                      to="/home/josephite-interact-club" tag={Link}
                    >
                      Josephite Interact Club
                    </DropdownItem>
                    <DropdownItem
                      to="/home/math-club" tag={Link}
                    >
                      Math Club
                    </DropdownItem>
                    <DropdownItem
                      to="/home/josephite-chess-club" tag={Link}
                    >
                      Josephite Chess Club
                    </DropdownItem>
                    <DropdownItem
                      to="/home/ycs-report" tag={Link}
                    >
                      YCS Report
                    </DropdownItem>
                    <DropdownItem
                      to="/home/josephite-cultural-forum" tag={Link}
                    >
                      Josephite Cultural Forum
                    </DropdownItem>
                    <DropdownItem
                      to="/home/josephite-film-and-drama-group" tag={Link}
                    >
                      Josephite Film and Drama Group
                    </DropdownItem>
                    <DropdownItem
                      to="/home/language-and-reading-club" tag={Link}
                    >
                      Language and Reading Club
                    </DropdownItem>
                    <DropdownItem
                      to="/home/business-club" tag={Link}
                    >
                      Business Club
                    </DropdownItem>
                    <DropdownItem
                      to="/home/wall-magazine-club" tag={Link}
                    >
                      Wall Magazine Club
                    </DropdownItem>
                    <DropdownItem
                      to="/home/eco-earth-club" tag={Link}
                    >
                      Eco-Earth Club
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </NavItem>
              <NavItem>
                 <UncontrolledDropdown  nav inNavbar>
                  <DropdownToggle caret nav>
                    Facilities
                  </DropdownToggle>

                  <DropdownMenu
                    className="dropdown-menu-arrow bg-gradient-secondary"
                    right
                  >
                    <DropdownItem
                      to="/home/library" tag={Link}
                    >
                      Library
                    </DropdownItem>
                    <DropdownItem
                      to="/home/laboratory" tag={Link}
                    >
                      Laboratory
                    </DropdownItem>
                    <DropdownItem
                      to="/home/sports" tag={Link}
                    >
                      Sports
                    </DropdownItem>
                    <DropdownItem
                      to="/home/canteen" tag={Link}
                    >
                      Canteen
                    </DropdownItem>
                    <DropdownItem
                      to="/home/boys-hostel" tag={Link}
                    >
                      Boy's Hostel
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </NavItem>
              <NavItem>
                 <UncontrolledDropdown  nav inNavbar>
                  <DropdownToggle caret nav>
                    Services
                  </DropdownToggle>

                  <DropdownMenu
                    className="dropdown-menu-arrow bg-gradient-secondary"
                    right
                  >
                    <DropdownItem
                      to="/home/literacy-school" tag={Link}
                    >
                      Literacy School
                    </DropdownItem>
                    <DropdownItem
                      to="/home/outreach" tag={Link}
                    >
                      Outreach
                    </DropdownItem>
                    <DropdownItem
                      to="/home/student-counseling" tag={Link}
                    >
                      Student Counseling
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </NavItem>
              <NavItem>
                 <UncontrolledDropdown  nav inNavbar>
                  <DropdownToggle caret nav>
                    Gallery
                  </DropdownToggle>

                  <DropdownMenu
                    className="dropdown-menu-arrow bg-gradient-secondary"
                    right
                  >
                    <DropdownItem
                      to="/home/21-february" tag={Link}
                    >
                      21 February
                    </DropdownItem>
                    <DropdownItem
                      to="/home/bengali-new-year" tag={Link}
                    >
                      Bengali New Year
                    </DropdownItem>
                    <DropdownItem
                      to="/home/class-picnic" tag={Link}
                    >
                      Class Picnic
                    </DropdownItem>
                    <DropdownItem
                      to="/home/teachers-picnic" tag={Link}
                    >
                      Teachers Picnic
                    </DropdownItem>
                    <DropdownItem
                      to="/home/freshers-reception" tag={Link}
                    >
                      Fresher's Reception
                    </DropdownItem>
                    <DropdownItem
                      to="/home/farewell" tag={Link}
                    >
                      Farewell
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
}

export default IndexNavbar;
