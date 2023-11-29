import React, { useEffect, useState } from "react";
import { Button, Dialog } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import ResetDialog from "./ResetDialog";
import axios from "axios";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [age, setAge] = useState(0);
  const [ageUpDuration, setAgeUpDuration] = useState(2000);
  const [health, setHealth] = useState(100);
  const [healthPenalty, setHealthPenalty] = useState(0);
  const [hunger, setHunger] = useState(0);
  const [hungerPenalty, setHungerPenalty] = useState(0);
  const [happiness, setHappiness] = useState(100);
  const [happinessPenaltyMultiplier, setHappinessPenaltyMultiplier] =
    useState(1);
  const [speed, setSpeed] = useState(1);
  const [isResettingGame, setIsResettingGame] = useState(false);

  const increaseAge = () => {
    setHealthPenalty((prevPenalty) => {
      return prevPenalty + 2;
    });
    setHungerPenalty((prevPenalty) => {
      return prevPenalty + 2;
    });
    setHappinessPenaltyMultiplier((prevPenalty) => {
      return prevPenalty + 0.1;
    });
    setHealth((prevHealth) => {
      return prevHealth - healthPenalty;
    });
    setHunger((prevHunger) => {
      return prevHunger + hungerPenalty;
    });
    setHappiness((prevHappiness) => {
      return (
        prevHappiness - Math.random() * 20 * (1 / happinessPenaltyMultiplier)
      );
    });
    setAge((prevAge) => {
      return prevAge + 1;
    });
  };

  switch (health) {
    case health >= 0 && health < 20:
      console.log("lowest health");
      setHappinessPenaltyMultiplier(0.5);
      break;
    case health >= 20 && health < 50:
      console.log("medium health");
      setHappinessPenaltyMultiplier(0.75);
      break;
    case health >= 50 && health <= 100:
      console.log("highest health");
      setHappinessPenaltyMultiplier(1);
      break;
    default:
      console.log("this is default ig");
  }

  switch (happiness) {
    case happiness >= 0 && happiness < 20:
      console.log("lowest happiness");
      setHungerPenalty(20);
      break;
    case happiness >= 20 && happiness < 50:
      console.log("medium happiness");
      setHungerPenalty(10);
      break;
    case happiness >= 50 && happiness < 100:
      console.log("highest happiness");
      setHungerPenalty(0);
      break;
    default:
      console.log("this is default ig");
  }

  if (happiness > hunger * 2 && happiness >= 50) {
    console.log("hap and hunger still ideal");
    setHealthPenalty(0);
  } else if (happiness > hunger && happiness >= 50) {
    console.log("hap and hunger are only acceptable");
    setHealthPenalty(10);
  } else {
    console.log("hap and hunger are terrible");
    setHealthPenalty(20);
  }

  useEffect(() => {
    console.log("starting to fetch name");
    axios
      .get("/whatever")
      .then((res) => console.log(res, "fetched name is here"))
      .catch((err) => console.log("issue with fetching name"));
  }, []);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      age > 9 ? onDeath(timeoutID) : increaseAge();
    }, ageUpDuration);
  }, [age]);

  useEffect(() => {
    health <= 0 ? onDeath() : console.log("staying alive :)");
  }, [health]);

  const onDeath = (timeoutID) => {
    clearTimeout(timeoutID);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onClickClean = () => {
    console.log("onClickClean");
    setHealth((prevHealth) => prevHealth - healthPenalty + 15);
  };

  const onClickFeed = () => {
    console.log("onClickFeed");
    setHunger((prevHunger) => prevHunger + hungerPenalty - 15);
  };

  const onClickPlay = () => {
    console.log("onClickPlay");
    setHappiness(
      (prevHappiness) => prevHappiness + 15 * happinessPenaltyMultiplier
    );
  };

  const speedGrowth = () => {
    setAgeUpDuration((prevDuration) => {
      return prevDuration - 100;
    });
  };

  const onDecSpeed = () => {
    if (speed > 1) {
      setSpeed((prevCount) => prevCount - 1);
      setAgeUpDuration((prevDuration) => prevDuration - 100);
    } else {
      alert("You can't go any slower!");
    }
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

  const checkOverUnder = (value) => {
    if (value <= 0) {
      return (value = 0);
    } else if (value >= 100) {
      return (value = 100);
    } else {
      return value;
    }
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
        <Button onClick={() => onClickClean()} />
        <div>feed</div>
        <Button onClick={() => onClickFeed()} />
        <div>play</div>
        <Button onClick={() => onClickPlay()} />
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
