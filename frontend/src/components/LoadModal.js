import { Modal, Button, TextField, Alert, Snackbar, Zoom } from "@mui/material";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useEffect } from "react";

const LoadModal = (props) => {
  const { setIsStartingModalOpen, setIsLoadPet, setPetData } = props;
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [nameToLoad, setNameToLoad] = useState("");

  const onLoadPetName = (e) => {
    onLoadPet(e.target.value);
  };

  const onLoadPet = async () => {
    // if successful in loadgin
    // setIsStartingModalOpen(false);

    try {
      const response = await axios.post("http://localhost:3001/createload", {
        name: nameToLoad,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    // setIsStartingModalOpen(false);

    // else
    setIsSnackBarOpen(true);
  };

  const onClickClose = () => {
    setIsSnackBarOpen(false);
  };

  const onClickBack = () => {
    setIsLoadPet(false);
    setIsStartingModalOpen(true);
  };

  useEffect(() => {
    isSnackBarOpen ? (
      setTimeout(() => {
        setIsSnackBarOpen(false);
      }, 3000)
    ) : (
      <div />
    );
  }, [isSnackBarOpen]);

  return (
    <div className="create-modal">
      {isSnackBarOpen ? (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={3000}
        >
          <Alert
            onClose={() => {
              onClickClose();
            }}
          >
            That pet already exists. Did you mean to load it?
          </Alert>
        </Snackbar>
      ) : (
        <div />
      )}
      <div>
        <Modal open hideBackdrop>
          <Zoom in={true}>
            <div className="starting-modal">
              <div className="starting-modal-content create-modal">
                <div className="back-button-div">
                  <IconButton
                    onClick={() => {
                      onClickBack();
                    }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                </div>
                <div className="create-modal-field-and-btn">
                  <div className="create-textfield">
                    <TextField
                      value={nameToLoad}
                      onChange={(e) => {
                        onLoadPetName(e);
                      }}
                    />
                  </div>
                  <Button className="create-button" onClick={() => onLoadPet()}>
                    <div className="create-button-content">Create Pet</div>
                  </Button>
                </div>
              </div>
            </div>
          </Zoom>
        </Modal>
      </div>
    </div>
  );
};

export default LoadModal;
