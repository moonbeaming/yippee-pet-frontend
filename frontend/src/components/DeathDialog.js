import { Dialog, Button } from "@mui/material";
import React, { useState } from "react";

const DeathDialog = (props) => {
  // setIsResettingGame={setIsResettingGame}
  const { setIsDeathDialogOpen, setIsResettingGame } = props;
  return (
    <div>
      <Dialog open>
        Your yippee yipped its last pee. &#128128; Wanna try again?
        <Button
          onClick={() => {
            setIsDeathDialogOpen(false);
            setIsResettingGame(true);
          }}
        >
          Reset Game
        </Button>
      </Dialog>
    </div>
  );
};

export default DeathDialog;
