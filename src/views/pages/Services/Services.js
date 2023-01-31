import React from "react";
// reactstrap components
import {
    Card,
    Row,
    Col
} from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader";
import Category from "./Category/Category";
import SubCategory from "./SubCategory/SubCategory";

const Services = () => {

    const [loading, setLoading] = React.useState(true);

    const [toggle, setToggle] = React.useState(true);

    return (
        <>
            <SimpleHeader name="Services" />
            <Row className="mb-4 mt--6 mx-4">
            <Col lg="6">
                    <Card onClick={() => setToggle(true)} className="card-stats text-center">
                                <h2 className="my-2">Categories</h2>
                    </Card>
                </Col>
                <Col lg="6">
                    <Card onClick={() => setToggle(false)} className="card-stats text-center">
                                <h2 className="my-2">SubCategories</h2>
                    </Card>
                </Col>
            </Row>
            {
                toggle && <Category loading={loading} setLoading={setLoading}></Category>
            }

            {
                !toggle && <SubCategory setLoading={setLoading}></SubCategory>
            }
        </>
    );
}

export default Services;