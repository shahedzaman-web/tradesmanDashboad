import React from "react";
// reactstrap components
import {
  Button,
  Modal,
} from "reactstrap";

import {
  Table
} from "reactstrap";

function Modals ({exampleModal, setExampleModal, userDetails}) {
  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={exampleModal}
        toggle={() => setExampleModal(!exampleModal)}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            USER DETAILS
          </h5>
        </div>
        <div className="mt-2">
          <div className="d-flex mb-1 justify-content-center">
            <img className="avatar avatar-xl rounded-circle" src={userDetails.photoURL} alt="" />
          </div>
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
              <td>{userDetails?.name}</td>
            </tr>
            <tr>
              <th scope="row">
                    <span className="mb-0 text-sm">
                    email: 
                    </span>
              </th>
              <td>{userDetails?.email}</td>
            </tr>
            <tr>
              <th scope="row">
                    <span className="mb-0 text-sm">
                      Location: 
                    </span>
              </th>
              <td>{userDetails?.location?.houseNumber}, {userDetails?.location?.street}, {userDetails?.location?.city}</td>
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