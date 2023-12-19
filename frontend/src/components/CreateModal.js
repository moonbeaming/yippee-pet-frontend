import { Modal, Button, TextField, Alert, Snackbar, Zoom } from "@mui/material";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect } from "react";
import axios from "axios";

const CreateModal = (props) => {
  const { setIsStartingModalOpen, setIsCreatePet, setPetData } = props;
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [nameInCreation, setNameInCreation] = useState("");

  const onCreatePetName = (e) => {
    setNameInCreation(e.target.value);
  };

  const onCreatePet = async () => {
    // api post call to send name
    try {
      const response = await axios.post("http://localhost:3001/createload", {
        name: nameInCreation,
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
    setIsCreatePet(false);
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
                      value={nameInCreation}
                      onChange={(e) => {
                        onCreatePetName(e);
                      }}
                    />
                  </div>
                  <Button
                    className="create-button"
                    onClick={() => onCreatePet()}
                  >
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

export default CreateModal;
