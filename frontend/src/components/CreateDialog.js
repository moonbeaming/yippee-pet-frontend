import { Dialog, Button, TextField, Alert, Snackbar } from "@mui/material";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect } from "react";
import axios from "axios";

const CreateDialog = (props) => {
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
    <div className="create-dialog">
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

      <Dialog open>
        <div>
          <IconButton
            onClick={() => {
              onClickBack();
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <TextField
            value={nameInCreation}
            onChange={(e) => {
              onCreatePetName(e);
            }}
          />
          <Button onClick={() => onCreatePet()}>Create</Button>
        </div>
      </Dialog>
    </div>
  );
};

export default CreateDialog;
