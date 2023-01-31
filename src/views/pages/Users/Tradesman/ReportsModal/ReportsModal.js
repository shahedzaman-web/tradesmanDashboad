import React from "react";
// reactstrap components
import {
  Button,
  Modal,
  Table,
} from "reactstrap";

function ReportsModals({ setReportModal, reportModal, reports }) {
  console.log(reports);
  return (
    <>
      <Modal
        className="modal-dialog-centered"
        size="lg"
        isOpen={reportModal}
        toggle={() => setReportModal(!reportModal)}
      >
        <div className="modal-header mt-2">
          <h2 className="modal-title" id="exampleModalLabel">
            Tradesman Reports
          </h2>
        </div>
        <div className="mt-2">
        <Table className="align-items-center" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {
              reports.map(report => <tr>
                <th scope="row">
                      <span className="mb-0 text-sm">
                      {report?.title}
                      </span>
                </th>
                <td>{report?.description}</td>
                </tr>)
            }
          </tbody>
        </Table>
        </div>
        <div className="modal-footer">
          <Button
            color="secondary"
            data-dismiss="modal"
            type="button"
            onClick={() => setReportModal(!reportModal)}
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
}
export default ReportsModals;