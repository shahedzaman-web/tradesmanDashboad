/* eslint-disable react-hooks/exhaustive-deps */
import NotifyContext from 'context/NotifyContext';
import { db } from 'Firebase/firebase.config';
import { addDoc, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React from 'react';
import { Button, Card, CardBody, CardHeader, Col,  Form, FormGroup, Input, ListGroup, ListGroupItem, Row } from 'reactstrap';
import Loader from 'utility/Loader';
import Modals from './Modal/Modals';

const SubCategory = ({loading, setLoading}) => {

    // All states and db paths ***********
    const { Notify } = React.useContext(NotifyContext);
    
    const [subservices, setSubservices] = React.useState([]);
    const [services, setServices] = React.useState([]);
    const [service, setService] = React.useState(null);
    const servicesRef = collection(db, "serviceCategory");

    const [serviceDetails, setServiceDetails] = React.useState(null);
    const [exampleModal, setExampleModal] = React.useState(false)
    
    
    const openModal = (service) => {
        setExampleModal(!exampleModal);
        setServiceDetails(service);
    }

    // All states and db paths ***********

    // Fetching data from db***********
    
    React.useLayoutEffect(() => {
        const unSub = onSnapshot(servicesRef, (QuerySnapshot) => {
            const items = [];
            QuerySnapshot.forEach((doc) => {
                
                items.push({ id: doc.id, ...doc.data() });
            });
            setServices(items);
            setLoading(false);
        });
        
        return () => {
            unSub();
        };
    }, [])
    

    // Fetching data from db***********


    // Add any sub service to db function **************
    
    
    const addSubService = async (event) => {
        event.preventDefault();
        const category = event.target.category.value;
        const subService = event.target.subCategory.value;
        const data = {
            key: subService,
            value: subService
        }
        try {
            const subServiceRef = collection(db, `/serviceCategory/${category}/sub/`);
            await addDoc(subServiceRef, data);
            Notify("success", `Service sub category Added successfully.`, "Add Service sub category");
            event.target.reset()
        } catch (error) {
            console.error(error);
        }
    }
    
    // Add any sub service to db function **************


    React.useLayoutEffect(() => {
        const servicesRef = collection(db, `serviceCategory/${service}/sub`);
        const unSub = onSnapshot(servicesRef, (QuerySnapshot) => {
            const items = [];
            QuerySnapshot.forEach((doc) => {

                items.push({ id: doc.id, ...doc.data() });
            });
            setSubservices(items);
            setLoading(false);
        });

        return () => {
            unSub();
        };
    }, [service])

// Delete any sub service from db ***********

    const deleteService = (id) => {
        try {
            deleteDoc(doc(db, `serviceCategory/${service}/sub/${id}`));
            Notify("danger", `Service sub category ${service.title} deleted successfully.`, "Delete service sub category");
        }
        catch (error) {  
            console.error(error);
        }
      };

    return (
        <>
            {
                loading ? <Loader></Loader>
                    :
                    <>
                        <div className='mx-6'>
                            <Card>
                                <CardHeader>
                                    <h3 className="mb-0">Add Service Sub Category</h3>
                                </CardHeader>
                                <CardBody>
                                    <Form onSubmit={(event) => addSubService(event)}>
                                        <Row className="custom-file d-flex align-items-center">
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="exampleFormControlSelect3"
                                                    >
                                                        Select Service Category
                                                    </label>
                                                    <Input id="exampleFormControlSelect3" name='category' type="select">
                                                        {
                                                            services.map(service => <option key={service?.id} value={service?.id}>{service?.title}</option>)
                                                        }
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <Input className="w-100 ml-1 mt-3 py-3 mb-2" placeholder="Name of Category" type="text" name="subCategory" bsSize="sm" id="" required />
                                            </Col>
                                        </Row>
                                        <div className='d-flex justify-content-end mt-5 mr-4'>
                                            <Button color="info" type="submit">
                                                ADD
                                            </Button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <Row>
                                        <Col lg="6">
                                            <CardHeader className='ml--3'>Sub Service Category</CardHeader>
                                        </Col>
                                        <Col lg="6">
                                            <form className='mt-2'>
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="exampleFormControlSelect3"
                                                    >
                                                        Select Service Category
                                                    </label>
                                                    <Input id="exampleFormControlSelect3" name='category' type="select"
                                                        onChange={(event) => setService(event.target.value)}>
                                                        <option>Select Category</option>
                                                        {
                                                            services.map(service => <option key={service?.id} value={service?.id}>{service?.title}</option>)
                                                        }
                                                    </Input>
                                                </FormGroup>
                                            </form>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                {
                                    subservices.length !== 0
                                    &&
                                    <>
                                        <CardBody>
                                            <ListGroup flush>
                                                {
                                                    subservices.map(service =>
                                                        <ListGroupItem key={service.id}
                                                            className="list-group-item-action"
                                                            href="#pablo"
                                                            onClick={e => e.preventDefault()}
                                                            tag="a"
                                                        >
                                                            <div className="align-items-center">
                                                                <div className='d-flex justify-content-between'>
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="col ml-2">
                                                                            <h4 className="mb-0 text-sm">{service?.key}</h4>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <Button color="primary" type="button"
                                                                            onClick={() => openModal(service)}>
                                                                            Edit
                                                                        </Button>
                                                                        <Button onClick={() => deleteService(service?.id)} color="danger" type="button">
                                                                            Delete
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </ListGroupItem>
                                                    )
                                                }
                                            </ListGroup>
                                        </CardBody>
                                    </>
                                }
                            </Card>
                        </div>
                    </>
            }
            {
                exampleModal && <Modals serviceDetails={serviceDetails} setExampleModal={setExampleModal} exampleModal={exampleModal} service={service}></Modals>
            }
        </>
    );
};

export default SubCategory;