import { Dialog, Button } from "@mui/material";
import React, { useState } from "react";

const ResetDialog = (props) => {
  const setIsResettingGame = props.setIsResettingGame;
  const setIsCreatePet = props.setIsCreatePet;

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
        <Button>Go Back</Button>
        <Button
          onClick={() => {
            setIsResettingGame(false);
            setIsCreatePet(true);
          }}
        >
          Reset Game
        </Button>
      </Dialog>
    </div>
  );
};

export default ResetDialog;
