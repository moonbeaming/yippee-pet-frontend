import { Dialog, Button, TextField, Alert, Snackbar } from "@mui/material";
import React, { useState } from "react";

const StartingDialog = (props) => {
  const { setIsCreatePet, setIsLoadPet, setIsStartingModalOpen } = props;
  const onClickCreatePet = () => {
    setIsCreatePet(true);
    setIsStartingModalOpen(false);
  };

  const onClickLoadPet = () => {
    setIsLoadPet(true);
    setIsStartingModalOpen(false);
  };

  return (
    <div className="starting-dialog">
      <Dialog open>
        yooooo
        <Button onClick={() => onClickCreatePet()}>Create Pet</Button>
        <Button onClick={() => onClickLoadPet()}>Load Pet</Button>
      </Dialog>
    </div>
  );
};

export default StartingDialog;
