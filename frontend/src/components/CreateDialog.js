import { Dialog, Button, TextField, Alert, Snackbar } from "@mui/material";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect } from "react";

const CreateDialog = (props) => {
  const { setIsStartingModalOpen } = props;
  const [isCreatePet, setIsCreatePet] = useState(false);
  const [isLoadPet, setIsLoadPet] = useState(false);
  const [isCreateLoadUI, setIsCreateLoadUI] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

  const onClickCreatePet = () => {
    setIsCreatePet(true);
  };

  const onClickLoadPet = () => {
    setIsLoadPet(true);
  };

  const onCreatePet = () => {
    // api post call to send name
    // if name exists, small text below input to ask if wanna load
    // if
    setIsStartingModalOpen(false);

    // else
    setIsSnackBarOpen(true);
    setErrorMessage("That pet already exists. Did you mean to load it?");
  };

  const onLoadPet = () => {
    // api post call to check for name
    // if
    setIsStartingModalOpen(false);

    // else
    setIsSnackBarOpen(true);
    setErrorMessage("That pet does not exist yet. Did you mean to create it?");
  };

  const onClickClose = () => {
    setIsSnackBarOpen(false);
  };

  const onClickBack = () => {
    setIsCreatePet(false);
    setIsLoadPet(false);
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
            {errorMessage}
          </Alert>
        </Snackbar>
      ) : (
        <div />
      )}

      <Dialog open>
        <div>
          {isCreateLoadUI ? (
            <div>
              <Button onClick={() => onClickCreatePet()}>Create Pet</Button>
              <Button onClick={() => onClickLoadPet()}>Load Pet</Button>
            </div>
          ) : (
            <div />
          )}
          {isCreatePet ? (
            () => {
              // so long as both are
              setIsLoadPet(false);
              return (
                <div>
                  <IconButton>
                    <ArrowBackIcon
                      onClick={() => {
                        onClickBack();
                      }}
                    />
                  </IconButton>
                  <TextField />
                  <Button onClick={() => onCreatePet()}>Create</Button>
                </div>
              );
            }
          ) : (
            <div>
              <Button onClick={() => onClickCreatePet()}>Create Pet</Button>
              <Button onClick={() => onClickLoadPet()}>Load Pet</Button>
            </div>
          )}

          {isLoadPet
            ? () => {
                setIsCreatePet(false);
                return (
                  <div>
                    <IconButton>
                      <ArrowBackIcon
                        onClick={() => {
                          onClickBack();
                        }}
                      />
                    </IconButton>
                    <TextField />
                    <Button>Load</Button>
                  </div>
                );
              }
            : console.log("i be loading pet")}
        </div>
      </Dialog>
    </div>
  );
};

export default CreateDialog;
