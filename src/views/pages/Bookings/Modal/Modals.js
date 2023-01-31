import React from "react";
// reactstrap components

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Modal,
  Row,
  Col
} from "reactstrap";

function Modals({ exampleModal, setExampleModal, bookingsDetails }) {

  console.log(bookingsDetails);

  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={exampleModal}
        toggle={() => setExampleModal(!exampleModal)}
      >
        <Row>
          <Col>
            <Card>
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Booking Timeline</h3>
              </CardHeader>
              <CardBody>
                <div
                  className="timeline timeline-one-side"
                  data-timeline-axis-style="dashed"
                  data-timeline-content="axis"
                >
                  {
                    bookingsDetails.map(step => <div className="timeline-block">
                    <span className="timeline-step badge-success">
                      <i className="ni ni-check-bold" />
                    </span>
                    <div className="timeline-content">
                      <small className="text-muted font-weight-bold">
                        {step?.time?.content}
                      </small>
                      <h5 className="mt-3 mb-0">{step?.description?.content}</h5>
                    </div>
                  </div>)
                  }
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <div className="modal-footer">
          <Button
            color="secondary"
            data-dismiss="modal"
            type="button"
            onClick={() => setExampleModal(!exampleModal)}
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
}
export default Modals;