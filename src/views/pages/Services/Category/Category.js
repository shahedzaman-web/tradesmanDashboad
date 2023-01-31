/* eslint-disable react-hooks/exhaustive-deps */
import NotifyContext from 'context/NotifyContext';
import { db } from 'Firebase/firebase.config';
import { storage } from 'Firebase/firebase.config';
import { addDoc, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React from 'react';
import { Button, Card, CardBody, CardHeader, Col, Form, Input, ListGroup, ListGroupItem, Row } from 'reactstrap';
import Loader from 'utility/Loader';
import Modals from './Modal/Modals';

const Category = ({setLoading, loading}) => {

    // All states *******************
    
    const { Notify } = React.useContext(NotifyContext);
    const servicesRef = collection(db, "serviceCategory");
    const [services, setServices] = React.useState([]);
    const [serviceDetails, setServiceDetails] = React.useState(null);
    const [exampleModal, setExampleModal] = React.useState(false)
    
    
    const openModal = (service) => {
        setExampleModal(!exampleModal);
        setServiceDetails(service);
    }
    
    // All states *******************


    // Adding service to db function ***************
    
    const addDataToFireStore = async (service, url) => {
        const data = {
            title: service,
            imageURL: url
        }
        try {
            const serviceRef = collection(db, "serviceCategory");
            await addDoc(serviceRef, data);
            Notify("success", `Service added successfully.`, "Add Service");
            
        } catch (error) {
            console.error(error);
        }
    }

    const AddService = async (event) => {
        event.preventDefault();
        const service = event.target.service.value;
        const image = event.target.image.files[0];
        try {
            const imageRef = ref(storage, `services/${image.name}`);
            uploadBytes(imageRef, image).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    console.log(url);
                    addDataToFireStore(service, url);
                });
            });
            event.target.reset()
        }
        catch (error) {
            console.error(error);
        }
    }
    
    // Adding service to db function ***************

    // Delete any service from db functiom **************
    
    const deleteService = (service) => {
        try {
            deleteDoc(doc(db, `serviceCategory/${service?.id}`));
            Notify("danger", `Service ${service.title} deleted successfully.`, "Delete Service");
        }
        catch (error) {
            
        }
    };
    
    // Delete any service from db functiom **************

    // Fetch services data from db *************
    
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

    
    // Fetch services data from db *************
    
    return (
        <>
            {
                loading ? <Loader></Loader>
                    :
                    <>
                        <div className='mx-6'>
                            <Card>
                                <CardHeader>
                                    <h3 className="mb-0">ADD CATEGORY</h3>
                                </CardHeader>
                                <CardBody>
                                    <Form onSubmit={(event) => AddService(event)}>
                                        <Row className="custom-file d-flex align-items-center">
                                            <Col lg="6">
                                                <Input className="w-75 py-3 mb-2" placeholder="Name of Category" type="text" name="service" bsSize="sm" id="" required />
                                            </Col>
                                            <Col lg="6">

                                                <div>
                                                    <label
                                                        className="custom-file-label"
                                                        htmlFor="customFileLang"
                                                    >

                                                    </label>
                                                    <input
                                                        className="custom-file-input"
                                                        id="customFileLang"
                                                        name='image'
                                                        lang="en"
                                                        type="file"
                                                        required
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className='d-flex justify-content-end mt-2 mr-3'>
                                            <Button color="info" type="submit">
                                                ADD
                                            </Button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>

                            <Card>
                                <CardHeader>
                                    SERVICES CATEGORY
                                </CardHeader>
                                <CardBody>
                                    <ListGroup flush>
                                        {
                                            services.map(service =>
                                                <ListGroupItem key={service.id}
                                                    className="list-group-item-action"
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                    tag="a"
                                                >
                                                    <div className="align-items-center">
                                                        <div className='d-flex justify-content-between'>
                                                            <div className="d-flex align-items-center">

                                                                <img
                                                                    alt="..."
                                                                    className="avatar rounded-circle"
                                                                    src={service?.imageURL}
                                                                />

                                                                <div className="col ml-2">
                                                                    <h4 className="mb-0 text-sm">{service?.title}</h4>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <Button color="primary" type="button"
                                                                onClick={() => openModal(service)}>
                                                                    Edit
                                                                </Button>
                                                                <Button onClick={() => deleteService(service)} color="danger" type="button">
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
                            </Card>
                        </div>
                    </>
            }
            {
                exampleModal && <Modals serviceDetails={serviceDetails} setExampleModal={setExampleModal} exampleModal={exampleModal}></Modals>
            }
        </>
    );
};

export default Category;