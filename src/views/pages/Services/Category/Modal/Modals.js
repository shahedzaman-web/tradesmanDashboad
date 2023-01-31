import NotifyContext from "context/NotifyContext";
import { db } from "Firebase/firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import React from "react";
// reactstrap components
import {
  Button,
  Modal,
} from "reactstrap";

function Modals({ exampleModal, setExampleModal, serviceDetails }) {

  const { Notify } = React.useContext(NotifyContext);

  // Edit any service from db function ***************
  
  const editService = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const updated = {
      title: title
    };
    const id = serviceDetails.id;
    try {
      const serviceRef = doc(db, `serviceCategory/${id}`);
      await updateDoc(serviceRef, updated);
      Notify("success", `Service title updated successfully.`, "Service Title Update");
      setExampleModal(!exampleModal);
    } catch (error) {
      console.error(error);
    }
  };
  

  // Edit any service from db function ***************

  
  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={exampleModal}
        toggle={() => setExampleModal(!exampleModal)}
      >
        <div className="modal-header w-100 d-flex p-4">
          <form className="w-100" onSubmit={(event) => editService(event)}>
            <div className="d-flex flex-column align-items-center mb-3">
              <h2 className="modal-title mb-2 w-100" id="exampleModalLabel">
                Edit Service Title:
              </h2>
              <input className="w-100" style={{height: "43px"}} placeholder={serviceDetails.title} type="text" name="title" required id="" />
            </div>
            <div className="d-flex py-0 justify-content-end">
            <Button className="w-100" color="primary" type="submit">
              Update
            </Button>
            <Button
            className="w-100" outlined
            color="secondary"
            data-dismiss="modal"
            type="button"
            onClick={() => setExampleModal(!exampleModal)}
          >
            Close
          </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
export default Modals;