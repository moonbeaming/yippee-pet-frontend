import { Dialog, Button, TextField, Alert, Snackbar } from "@mui/material";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect } from "react";

const LoadDialog = (props) => {
  const { setIsStartingModalOpen, setIsLoadPet, setPetData } = props;
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

  const onLoadPet = () => {
    // api post call to check for name
    // if
    setIsStartingModalOpen(false);

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
    <div className="load-dialog">
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
            That pet does not exist yet. Did you mean to create it?
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
          <TextField />
          <Button
            onClick={() => {
              onLoadPet();
            }}
          >
            Load
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default LoadDialog;
