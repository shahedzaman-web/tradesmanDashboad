import React from 'react';
import SimpleHeader from "../../../components/Headers/SimpleHeader";
import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    Col,
    Container,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane, UncontrolledTooltip
} from "reactstrap";
import classnames from "classnames";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import {deleteBranch} from "../../../network/branch/loadBranch";
import ReactToPrint from "react-to-print";
import BootstrapTable from "react-bootstrap-table-next";
import {defaultPage, defaultSearchTerm, defaultShowPerPage} from "../../../constants/defaultTableHelper.json";
import NotifyContext from "../../../context/NotifyContext";
import paginationFactory from "react-bootstrap-table2-paginator";
import AddSession from "./AddSession";
import {deleteSession, getAllSession, getOneSession} from "../../../network/manageSession/apiManageSession";
import EditSession from "./EditSession";
import moment from "moment";

const {SearchBar} = Search;

const ManageSession = () => {
    const [showPerPage, setShowPerPage] = React.useState(defaultShowPerPage);
    const [page, setPage] = React.useState(defaultPage);
    const [searchTerm, setSearchTerm] = React.useState(defaultSearchTerm);
    const [totalSize, setTotalSize] = React.useState(10);
    const [allSession, setAllSession] = React.useState([]);
    const [editStatus, setEditStatus] = React.useState(false);
    const [tabs, setTabs] = React.useState(1);
    const [editableSession, setEditableSession] = React.useState([]);
    const componentRef = React.useRef(null);
    const {Notify} = React.useContext(NotifyContext);
    const pagination = paginationFactory({
        page,
        totalSize,
        showTotal: true,
        sizePerPage: showPerPage,
        alwaysShowAllBtns: true,
        withFirstAndLast: true,
        onPageChange: (page) => {
            setPage(page);
        },
        onSizePerPageChange: (_, size) => {
            setShowPerPage(size);
        },
        sizePerPageRenderer: ({
                                  options,
                                  currSizePerPage,
                                  onSizePerPageChange,
                              }) => (
            <div className="dataTables_length" id="datatable-basic_length">
                <label>
                    Show{" "}
                    {
                        <select
                            value={currSizePerPage}
                            name="datatable-basic_length"
                            aria-controls="datatable-basic"
                            className="form-control form-control-sm"
                            onChange={(e) => onSizePerPageChange(e.target.value)}
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                            <option value="all">all</option>
                        </select>
                    }{" "}
                    entries.
                </label>
            </div>
        ),
    });

    React.useEffect(() => {
        async function fetchData() {
            const data = await getAllSession(page, showPerPage, searchTerm);
            await setAllSession(data?.data);
            await setTotalSize(data?.total);
        }

        fetchData();
    }, [page, showPerPage, searchTerm, tabs]);
    return (
        <div>
            <SimpleHeader name="Session List" parentName="Session"/>
            <Container className="mt--6" fluid>
                <Card>
                    <Container fluid>
                        <div className="nav-wrapper">
                            <Nav
                                className="nav-fill flex-column flex-md-row"
                                id="tabs-icons-text"
                                pills
                                role="tablist"
                            >
                                <NavItem>
                                    <NavLink
                                        aria-selected={tabs === 1}
                                        className={classnames("mb-sm-3 mb-md-0", {
                                            active: tabs === 1,
                                        })}
                                        onClick={() => {
                                            setEditStatus(false);
                                            setTabs(1);
                                        }}
                                        role="tab"
                                        style={{cursor: "pointer"}}
                                    >
                                        <i className="ni ni-cloud-download-95 mr-2"/>
                                        Session List
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        aria-selected={tabs === 2}
                                        className={classnames("mb-sm-3 mb-md-0", {
                                            active: tabs === 2,
                                        })}
                                        onClick={() => setTabs(2)}
                                        role="tab"
                                        style={{cursor: "pointer"}}
                                    >
                                        <i className="ni ni-cloud-download-95 mr-2"/>
                                        {editStatus === false ? "Add" : "Edit"} Session
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                    </Container>
                    <Container fluid>
                        <Card className="shadow">
                            <CardBody>
                                <TabContent activeTab={"tabs" + tabs}>
                                    <TabPane tabId="tabs1">
                                        <ToolkitProvider
                                            data={allSession}
                                            keyField="sessionName"
                                            columns={[
                                                {
                                                    dataField: "#",
                                                    text: "SL",
                                                    formatter: (cell, row, rowIndex) => {
                                                        return rowIndex + 1;
                                                    },
                                                },
                                                {
                                                    dataField: "branchName",
                                                    text: "Branch Name",
                                                    sort: true,
                                                },
                                                {
                                                    dataField: "sessionName",
                                                    text: "Session Name",
                                                    sort: true,
                                                },
                                                {
                                                    dataField: "startDate",
                                                    text: "Start Date",
                                                    sort: true,
                                                    formatter: (cell => {
                                                        return moment(new Date(cell)).format("yyyy-MM-DD");
                                                    })
                                                },
                                                {
                                                    dataField: "endDate",
                                                    text: "End Date",
                                                    sort: true,
                                                    formatter: (cell => {
                                                        return moment(new Date(cell)).format("yyyy-MM-DD");
                                                    })
                                                },
                                                {
                                                    dataField: "status",
                                                    text: "Status",
                                                    sort: true,
                                                },
                                                {
                                                    dataField: "_id",
                                                    text: "Action",
                                                    formatter: (cell) => {
                                                        const handleEdit = async () => {
                                                            await setEditStatus(true);
                                                            const editAble = await getOneSession(cell);
                                                            await setEditableSession(editAble);
                                                            await setTabs(2);
                                                        };
                                                        const handleDelete = async () => {
                                                            const response = await deleteSession(cell);
                                                            await setAllSession(response?.allSession);
                                                            await Notify("success", response?.deleteStatus, "Session");
                                                        };
                                                        return (
                                                            <div>
                                                                <Button className="btn-icon" color="info"
                                                                        onClick={handleEdit}>
                                                                    <span className="btn-inner--icon">
                                                                        <i className="ni ni-ruler-pencil"/>
                                                                    </span>
                                                                </Button>
                                                                <Button
                                                                    onClick={handleDelete}
                                                                    color="danger"
                                                                    className="btn-icon"
                                                                >
                                                                    <span className="btn-inner--icon">
                                                                        <i className="ni ni-basket"/>
                                                                    </span>
                                                                </Button>
                                                            </div>
                                                        );
                                                    },
                                                },
                                            ]}
                                            search
                                        >
                                            {(props) => (
                                                <div className="py-4 table-responsive">
                                                    <Container fluid>
                                                        <Row>
                                                            <Col xs={4} sm={4}>
                                                                <div>
                                                                    <select
                                                                        name="datatable-basic_length"
                                                                        aria-controls="datatable-basic"
                                                                        className="form-control form-control-sm w-25"
                                                                        onChange={(e) => setShowPerPage(e.target.value)}
                                                                    >
                                                                        <option
                                                                            selected={showPerPage === 10 && true}
                                                                            value={10}
                                                                        >
                                                                            10
                                                                        </option>
                                                                        <option
                                                                            selected={showPerPage === 25 && true}
                                                                            value={25}
                                                                        >
                                                                            25
                                                                        </option>
                                                                        <option
                                                                            selected={showPerPage === 50 && true}
                                                                            value={50}
                                                                        >
                                                                            50
                                                                        </option>
                                                                        <option
                                                                            selected={showPerPage === 100 && true}
                                                                            value={100}
                                                                        >
                                                                            100
                                                                        </option>
                                                                        <option
                                                                            selected={showPerPage === "all" && true}
                                                                            value="all"
                                                                        >
                                                                            all
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                            </Col>
                                                            <Col xs={4} sm={4}>
                                                                <ButtonGroup>
                                                                    <Button
                                                                        className="buttons-copy buttons-html5"
                                                                        color="warning"
                                                                        size="sm"
                                                                        id="copy-tooltip"
                                                                    >
                                                                        <span>CSV</span>
                                                                    </Button>
                                                                    <ReactToPrint
                                                                        trigger={() => (
                                                                            <Button
                                                                                color="warning"
                                                                                size="sm"
                                                                                className="buttons-copy buttons-html5"
                                                                                id="print-tooltip"
                                                                            >
                                                                                Print
                                                                            </Button>
                                                                        )}
                                                                        content={() => componentRef.current}
                                                                    />
                                                                </ButtonGroup>
                                                                <UncontrolledTooltip
                                                                    placement="top"
                                                                    target="print-tooltip"
                                                                >
                                                                    This will open a print page with the visible rows of
                                                                    the table.
                                                                </UncontrolledTooltip>
                                                                <UncontrolledTooltip
                                                                    placement="top"
                                                                    target="copy-tooltip"
                                                                >
                                                                    This will Download Outlet Setting As CSV.
                                                                </UncontrolledTooltip>
                                                            </Col>
                                                            <Col xs={4} sm={4}>
                                                                <div
                                                                    id="datatable-basic_filter"
                                                                    className="dataTables_filter px-4 pb-1 float-right"
                                                                >
                                                                    <label>
                                                                        Search:
                                                                        <SearchBar
                                                                            className="form-control-sm"
                                                                            placeholder=""
                                                                            {...props.searchProps}
                                                                        />
                                                                    </label>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                    <BootstrapTable
                                                        remote
                                                        ref={componentRef}
                                                        {...props.baseProps}
                                                        bootstrap4={true}
                                                        pagination={pagination}
                                                        bordered={false}
                                                        id="react-bs-table"
                                                        onTableChange={(type, {searchText}) => {
                                                            setSearchTerm(searchText);
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </ToolkitProvider>

                                    </TabPane>
                                    <TabPane tabId="tabs2">
                                        {editStatus === false ? <AddSession/> :
                                            <EditSession data={editableSession[0]}/>}
                                    </TabPane>
                                </TabContent>
                            </CardBody>
                        </Card>
                    </Container>
                </Card>
            </Container>
        </div>
    );
};

export default ManageSession;
