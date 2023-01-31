import React from "react";
// reactstrap components
import {
  Button,
  Modal,
} from "reactstrap";

import {
  Table
} from "reactstrap";

function Modals({ exampleModal, setExampleModal, amount, serviceFee }) {


  
  const { fee } = serviceFee[0];

  const localityGets = parseFloat(amount) * (parseFloat(fee)/100);
  const providerGets = parseFloat(amount) - localityGets;;

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
            TRANSACTION DETAILS
          </h2>
        </div>
        <Table className="align-items-center" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                    <span className="mb-0 text-sm">
                    Provider will get: 
                    </span>
              </th>
              <td>{100-fee}%</td>
              <td><h4>${providerGets}</h4></td>
            </tr>
            <tr>
              <th scope="row">
                    <span className="mb-0 text-sm">
                    Locality will get: 
                    </span>
              </th>
              
              <td>{fee}%</td>
              <td><h4>${localityGets}</h4></td>
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