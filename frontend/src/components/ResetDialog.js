import { Dialog, Button } from "@mui/material";
import React, { useState } from "react";

const ResetDialog = (props) => {
  const setIsResettingGame = props.setIsResettingGame;
  //   const onReset = () => {
  //     setIsResettingGame(true);
  //     setName("");
  //     setAge(0);
  //     setHealth(0);
  //     setHunger(0);
  //     setHappiness(0);
  //     setSpeed(1);
  //   };
  return (
    <div>
      <Dialog open>
        Are you sure you want to reset the game? All your progress will be lost!
        <Button>Reset Game</Button>
        <Button
          onClick={() => {
            setIsResettingGame(false);
          }}
        >
          Go Back
        </Button>
      </Dialog>
    </div>
  );
};

export default ResetDialog;
