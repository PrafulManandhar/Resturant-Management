import React from "react";
import { Modal, Button } from "react-bootstrap";

export default props => {
  let type = props.type;


  return (
    <Modal show={props.show} onHide={props.close}>
      <Modal.Header className="bg-danger" style={{ color: "white" }} closeButton>
        <Modal.Title style={{ fontSize: "18px"}}>
        Are you Sure you want to Delete {type} ? 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "10" }} style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Button variant="success" style={{width:"100px"}} onClick={props.close}>Cancel</Button>
          <Button variant="danger" style={{width:"100px",marginLeft:"10px"}} onClick={props.Confirmdelete}>Ok</Button>

      </Modal.Body>
    </Modal>
  );
};
