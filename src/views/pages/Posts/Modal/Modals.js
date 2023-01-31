import React from "react";
// reactstrap components
import {
  Button,
  Modal,
} from "reactstrap";

import {
  Table
} from "reactstrap";

function Modals({ exampleModal, setExampleModal, postDetails }) {

  console.log(postDetails);
  const dateObj = postDetails?.jobPostedDate;
  function formatDate(date) {
    const formatDate = new Date(
        date.seconds * 1000 + date.nanoseconds / 1000000
    );
    return formatDate.toLocaleTimeString('en-us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

  const date = formatDate(dateObj);


  return (
    <>
      <Modal
        className="modal-dialog-centered"
        size="lg"
        isOpen={exampleModal}
        toggle={() => setExampleModal(!exampleModal)}
      >
        <div className="modal-header mt-2">
          <h2 className="modal-title" id="exampleModalLabel">
            POST DETAILS
          </h2>
        </div>
        <Table className="align-items-center" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                    <span className="mb-0 text-sm">
                    Name: 
                    </span>
              </th>
              <td>{postDetails?.name}</td>
            </tr>
            <tr>
              <th scope="row">
                    <span className="mb-0 text-sm">
                    Title: 
                    </span>
              </th>
              <td>{postDetails?.title}</td>
            </tr>
            <tr>
              <th scope="row">
                    <span className="mb-0 text-sm">
                    Address: 
                    </span>
              </th>
              <td>{postDetails?.address?.houseNumber}, {postDetails?.address?.street}, {postDetails?.address?.city}</td>
            </tr>
            <tr>
              <th scope="row">
                    <span className="mb-0 text-sm">
                    Description: 
                    </span>
              </th>
              <td>{postDetails?.description}</td>
            </tr>
            <tr>
              <th scope="row">
                    <span className="mb-0 text-sm">
                    Category: 
                    </span>
              </th>
              <td>{postDetails?.category}</td>
            </tr>
            <tr>
              <th scope="row">
                    <span className="mb-0 text-sm">
                    Speciality: 
                    </span>
              </th>
              <td>{postDetails?.specialties}</td>
            </tr>
            <tr>
              <th scope="row">
                    <span className="mb-0 text-sm">
                    Job Type: 
                    </span>
              </th>
              <td>{postDetails?.jobType}</td>
            </tr>
            <tr>
              <th scope="row">
                    <span className="mb-0 text-sm">
                    Job Post Date:
                    </span>
              </th>
              <td>{date}</td>
            </tr>
            <tr>
              <th scope="row">
                    <span className="mb-0 text-sm">
                    Pay Type: 
                    </span>
              </th>
              <td>{postDetails?.payType}</td>
            </tr>
            <tr>
              <th scope="row">
                    <span className="mb-0 text-sm">
                    Budget: 
                    </span>
              </th>
              <td>${postDetails?.minimumBudget} - ${postDetails?.maximumBudget}</td>
            </tr>
            <tr>
              <th scope="row">
                    <span className="mb-0 text-sm">
                    Availability: 
                    </span>
              </th>
              <td>{postDetails?.selectedTimeSlot}</td>
            </tr>
          </tbody>
        </Table>
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