import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import ResetDialog from "./ResetDialog";
import api from "../axiosConfig";
import "../App.css";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import DeathDialog from "./DeathDialog";
import StartingModal from "./StartingModal";
import CreateModal from "./CreateModal";
import LoadModal from "./LoadModal";

const Dashboard = () => {
  const [isStartingModalOpen, setIsStartingModalOpen] = useState(true);
  const [isDeathDialogOpen, setIsDeathDialogOpen] = useState(false);
  const [petData, setPetData] = useState({});
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
  const [isCreatePet, setIsCreatePet] = useState(false);
  const [isLoadPet, setIsLoadPet] = useState(false);

  const customStyles = {
    "& .MuiInputBase-root": {
      border: "2px solid red", // Change the border style and color here
      borderRadius: "8px", // Add border radius if needed
    },
    "& .MuiInputBase-root:hover": {
      border: "2px solid blue", // Change border on hover if desired
    },
  };

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

  useEffect(() => {
    onHealthChange();
  }, [health]);

  const onHealthChange = () => {
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
        break;
    }
  };

  useEffect(() => {
    onHappinessChange();
  }, [happiness]);

  const onHappinessChange = () => {
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
        break;
    }
  };

  useEffect(() => {
    onHapHungerChange();
  }, [happiness, hunger]);

  const onHapHungerChange = () => {
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
  };

  useEffect(() => {
    console.log("starting to fetch name");
    api
      .post("/pet", { petName: "yip" })
      .then((res) => {
        setName(res.data.name);
        setAge(parseInt(res.data.age));
        setHealth(parseInt(res.data.health));
        setHunger(parseInt(res.data.hunger));
        setHappiness(parseInt(res.data.happiness));
        setSpeed(parseInt(res.data.speed));
      })
      .catch((err) => console.log("issue with retrieving info"));
  }, []);

  useEffect(() => {
    const timeoutID =
      name.trim().length > 0
        ? setTimeout(() => {
            console.log("testing");
            age > 9 ? onDeath(timeoutID) : increaseAge();
          }, ageUpDuration)
        : () => {
            return null;
          };
  }, [age]);

  useEffect(() => {
    health <= 0 ? onDeath() : console.log("staying alive :)");
  }, [health]);

  const onDeath = (timeoutID) => {
    clearTimeout(timeoutID);
    setIsDeathDialogOpen(true);
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
    // <div className={name.length !== 0 ? "dashboard" : "empty-dashboard"}>
    <div className="dashboard">
      <div className="name-div">
        <div>name:</div>
        <TextField
          className="name-text-field"
          placeholder="Name"
          onClick={() => onEditingName()}
          onChange={(e) => onChangeName(e)}
          readOnly={!isEditingName}
          inputProps={{
            spellCheck: "false",
            style: {
              fontFamily: "Gaegu",
              // borderRadius: "0px",
              width: "20vw",
              height: "4vh",
              padding: "0px 0px 0px 6px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "red", // Change the border color here
                  borderWidth: "2px", // Change the border width here
                },
                "&:hover fieldset": {
                  borderColor: "blue", // Change border color on hover
                },
              },
            },
          }}
        />
        {isEditingName ? (
          <Button onClick={() => onSaveName()}>
            <SaveOutlinedIcon />
          </Button>
        ) : (
          <IconButton onClick={() => onEditingName()}>
            <EditOutlinedIcon />
          </IconButton>
        )}
      </div>

      <div className="sprite">!!sprite here!!</div>
      <div className="pet-info">
        <div>
          <div>age</div>
          <div>{age}</div>
        </div>
        <div className="pet-stats">
          <div className="stat-div">
            <div className="stat-label">health</div>
            <LinearProgress
              value={health}
              variant="determinate"
              sx={{ height: "20px" }}
              className="stat-bar"
            />
          </div>
          <div className="stat-div">
            <div className="stat-label">hunger</div>
            <LinearProgress
              value={hunger}
              variant="determinate"
              sx={{ height: "20px" }}
              className="stat-bar"
            />
          </div>
          <div className="stat-div">
            <div className="stat-label">happiness</div>
            <LinearProgress
              value={happiness}
              variant="determinate"
              sx={{ height: "20px" }}
              className="stat-bar"
            />
          </div>
        </div>
      </div>
      <div className="action-buttons">
        <div>clean</div>
        <Button onClick={() => onClickClean()} />
        <div>feed</div>
        <Button onClick={() => onClickFeed()} />
        <div>play</div>
        <Button onClick={() => onClickPlay()} />
      </div>
      <div className="game-control">
        <div>speed control</div>
        <Button onClick={() => onDecSpeed()}>-</Button>
        <input placeholder="Speed" value={speed} />
        <Button onClick={() => onIncSpeed()}>+</Button>
      </div>
      <div>
        <Button onClick={() => onClickResetGame()}>Reset Game</Button>
      </div>

      {isResettingGame ? (
        <ResetDialog
          setIsResettingGame={setIsResettingGame}
          setIsCreatePet={setIsCreatePet}
        />
      ) : (
        <div />
      )}
      {/* {isStartingModalOpen ? (
        <StartingModal
          setIsStartingModalOpen={setIsStartingModalOpen}
          setIsCreatePet={setIsCreatePet}
          setIsLoadPet={setIsLoadPet}
        />
      ) : (
        <div />
      )} */}
      {isCreatePet ? (
        <CreateModal
          setIsCreatePet={setIsCreatePet}
          setIsStartingModalOpen={setIsStartingModalOpen}
          setPetData={setPetData}
        />
      ) : (
        <div />
      )}
      {isLoadPet ? (
        <LoadModal
          setIsLoadPet={setIsLoadPet}
          setIsStartingModalOpen={setIsStartingModalOpen}
          setPetData={setPetData}
        />
      ) : (
        <div />
      )}

      {isDeathDialogOpen ? (
        <DeathDialog
          setIsDeathDialogOpen={setIsDeathDialogOpen}
          setIsResettingGame={setIsResettingGame}
        />
      ) : (
        <div />
      )}
    </div>
  );
};

export default Dashboard;
