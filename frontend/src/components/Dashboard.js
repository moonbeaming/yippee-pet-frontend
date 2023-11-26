import React, { useEffect, useState } from "react";
import { Button, Dialog } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import ResetDialog from "./ResetDialog";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [age, setAge] = useState(0);
  const [health, setHealth] = useState(100);
  const [hunger, setHunger] = useState(0);
  const [happiness, setHappiness] = useState(100);
  const [speed, setSpeed] = useState(1);
  const [isResettingGame, setIsResettingGame] = useState(false);

  // const increaseAge = () => {
  //   const timeoutID = setTimeout(() => {
  //     setAge((prevAge) => {
  //       console.log(prevAge);
  //       return prevAge + 1;
  //     });
  //   }, 2000);

  //   age > 9
  //     ? clearTimeout(timeoutID)
  //     : // clearTimeout(timeoutID);
  //     increaseAge();
  // };

  // const timeoutID = setTimeout(() => {
  //   age > 9
  //     ? onDeath()
  //     : setAge((prevAge) => {
  //         console.log(prevAge);
  //         return prevAge + 1;
  //       });
  //   console.log("every 2 sec");
  // }, 2000);

  useEffect(() => {
  const timeoutID = setTimeout(() => {
    age > 9 ?
      // ? onDeath()
    clearTimeout(timeoutID)
      : setAge((prevAge) => {
          console.log(prevAge);
          return prevAge + 1;
        });
    console.log("every 2 sec");
  }, 2000);
  }, [age]);

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onClickClean = () => {
    console.log("ffffff");
  };

  const onClickFeed = () => {
    console.log("ffffff");
  };

  const onClickPlay = () => {
    console.log("ffffff");
  };

  const onDecSpeed = () => {
    speed > 1
      ? setSpeed((prevCount) => prevCount - 1)
      : alert("You can't go any slower!");
  };

  const onIncSpeed = () => {
    speed < 10
      ? setSpeed((prevCount) => prevCount + 1)
      : alert("You can't go any faster!");
  };

  const onEditingName = () => {
    isEditingName ? setIsEditingName(isEditingName) : setIsEditingName(true);
  };

  const onSaveName = () => {
    // setName();
    setIsEditingName(false);
    console.log("we'll save the name in backend later");
  };

  const onClickResetGame = () => {
    setIsResettingGame(true);
  };

  return (
    <div>
      <div>sprite here</div>
      <div>
        pet info
        <div>name</div>
        <div>{name}</div>
        <div>age</div>
        <div>{age}</div>
        <div>health</div>
        <LinearProgress
          value={health}
          variant="determinate"
          sx={{ height: "20px" }}
        />
        <div>hunger</div>
        <LinearProgress
          value={hunger}
          variant="determinate"
          sx={{ height: "20px" }}
        />
        <div>happiness</div>
        <LinearProgress
          value={happiness}
          variant="determinate"
          sx={{ height: "20px" }}
        />
      </div>
      <div>
        interactions
        <div>clean</div>
        <Button />
        <div>feed</div>
        <Button />
        <div>play</div>
        <Button />
      </div>
      <div>
        game control
        <div>speed control</div>
        <Button onClick={() => onDecSpeed()}>-</Button>
        <input placeholder="Speed" value={speed} />
        <Button onClick={() => onIncSpeed()}>+</Button>
        <div>Change pet name</div>
        <input
          placeholder="Name"
          onClick={() => onEditingName()}
          onChange={(e) => onChangeName(e)}
          readOnly={!isEditingName}
        />
        {isEditingName ? (
          <Button onClick={() => onSaveName()}>Save</Button>
        ) : (
          <Button onClick={() => onEditingName()}>Edit Name</Button>
        )}
        <div>game reset button</div>
        <Button onClick={() => onClickResetGame()}>Reset</Button>
      </div>
      {isResettingGame ? (
        <ResetDialog setIsResettingGame={setIsResettingGame} />
      ) : (
        <div />
      )}
    </div>
  );
};

export default Dashboard;
