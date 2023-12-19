import { Button, Modal, Zoom } from "@mui/material";
import React, { useState } from "react";
import "../App.css";

const StartingModal = (props) => {
  const { setIsCreatePet, setIsLoadPet, setIsStartingModalOpen } = props;
  const onClickCreatePet = () => {
    setIsCreatePet(true);
    setIsStartingModalOpen(false);
    // document
    //   .getElementsByClassName("starting-modal")[0]
    //   .classList.add("closing");
  };

  const onClickLoadPet = () => {
    setIsLoadPet(true);
    setIsStartingModalOpen(false);
  };

  return (
    // <div className="mmm">
    <Modal open hideBackdrop className="starting-modal-parent">
      <Zoom in={true}>
        <div className={"starting-modal"}>
          {/* <div className="starting-modal-shine"></div> */}
          {/* <div className="starting-modal-shine-negative"></div> */}
          <div className="starting-modal-content">
            <Button
              className="starting-modal-button"
              onClick={() => onClickCreatePet()}
            >
              <div className="starting-modal-button-content">Create Pet</div>
            </Button>
            <Button
              className="starting-modal-button"
              onClick={() => onClickLoadPet()}
            >
              <div className="starting-modal-button-content">Load Pet</div>
            </Button>
          </div>
        </div>
      </Zoom>
    </Modal>
    // </div>
  );
};

export default StartingModal;
