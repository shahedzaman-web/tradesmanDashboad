/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
// reactstrap components
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Container,
    Input,
    Row,
} from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader";
import Loader from "utility/Loader";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "Firebase/firebase.config";
import NotifyContext from "context/NotifyContext";

function ServicesFee() {

    // all states *********************
    
    const { Notify } = React.useContext(NotifyContext);
    
    const [update, setUpdate] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [serviceFee, setServiceFee] = React.useState([]);
    
    // all states *********************

    // fetch data from fire store ***************
    
    const collectionRef = collection(db, "serviceFee");
    
    React.useLayoutEffect(() => {
        const unSub = onSnapshot(collectionRef, (QuerySnapshot) => {
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

    const updateServiceFee = async (event, id) => {
        event.preventDefault();
        const fee = event.target.service.value;
        const updated = {
            fee: fee
        };
        try {
            const userRef = doc(db, `serviceFee/${id}`);
            await updateDoc(userRef, updated);
            setUpdate(!update);
            Notify("success", `Service Fee Updated successfully.`, "Service Fee Update");
            
        } catch (error) {
            console.error(error);
        }
    }
    
    // fetch data from fire store ***************
    
    if (loading) {
        return <Container>
            <Loader></Loader>
        </Container>
    }


    else {
        return (
            <>
                <SimpleHeader name="Service Fee" />
                <Container className="mt--6" fluid>
                    <Card>
                        <CardHeader className="border-0">
                            <Row>
                                <Col xs="6">
                                    <h3 className="mb-0">SERVICE FEE</h3>
                                </Col>
                            </Row>
                        </CardHeader>

                        <Row className="mb-4 mt-4 mx-4">
                            <Col lg="12">
                                <Card className="card-stats">

                                    <CardBody>
                                        <Row className="d-flex align-items-center justify-content-between">
                                            <div className="col">
                                                <CardTitle className="text-uppercase text-muted mb-0">
                                                    <h1 className="text-muted">SERVICE FEE</h1>
                                                </CardTitle>
                                                <h1 className="h2 font-weight-bold mb-0 fs-1">{serviceFee[0]?.fee}%</h1>
                                            </div>
                                            <div className="w-50">
                                                {update && <div className="col">
                                                    <CardTitle className="text-uppercase mb-0">
                                                        <h1 className="text-muted">UPDATE SERVICE FEE</h1>
                                                    </CardTitle>
                                                    <form onSubmit={(event) => updateServiceFee(event, serviceFee[0]?.id)}>
                                                        <div className="d-flex">
                                                            <Input className="w-100 py-3" required placeholder={serviceFee[0]?.fee} type="text" name="service" bsSize="sm" id="" />
                                                            <Button className="py-0 rounded-end" color="info" type="submit">UPDATE</Button>
                                                        </div>
                                                    </form>
                                                </div>}
                                                {
                                                    !update && <div className="px-4 mr-4 w-100 d-flex justify-content-end">
                                                        <Button onClick={() => setUpdate(!update)} className="btn-icon btn-2 px-4 mr-20 py-1" size="sm" color="info" type="button">
                                                            UPDATE
                                                        </Button>
                                                    </div>
                                                }
                                            </div>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                </Container>
            </>
        );
    }
}

export default ServicesFee