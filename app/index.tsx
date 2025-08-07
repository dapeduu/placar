import React from "react";
import { Dimensions, StatusBar, View } from "react-native";
import Clock from "./components/Clock";
import TeamScore from "./components/TeamScore";
import { getCurrentStreak, getSetScore } from "@/helpers/gameLogic";
import { useGameStoreV2 } from "@/stores/useGameStoreV2";
import ActionButtons from "./components/ActionButtons";
import SetScore from "./components/SetScore";

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

export default function Index() {
  const { teams, sets, incrementScore } = useGameStoreV2();

  const leftTeam = teams[0];
  const rightTeam = teams[1];
  const leftTeamScore =
    sets[sets.length - 1]?.events.filter(
      (event) => event.team.id === leftTeam.id
    ).length ?? 0;
  const rightTeamScore =
    sets[sets.length - 1]?.events.filter(
      (event) => event.team.id === rightTeam.id
    ).length ?? 0;

  const incrementTeamAScore = () => {
    incrementScore(leftTeam.id);
  };
  const incrementTeamBScore = () => {
    incrementScore(rightTeam.id);
  };

  const streak = getCurrentStreak(sets);

  return (
    <>
      <StatusBar hidden={true} />

      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          flex: 1,
          width: screenWidth,
          height: screenHeight,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TeamScore
          name={leftTeam.name}
          score={leftTeamScore}
          onPress={incrementTeamAScore}
          style={{ backgroundColor: "red" }}
          streak={streak.teamId === leftTeam.id ? streak.streak : 0}
        />

        <TeamScore
          name={rightTeam.name}
          score={rightTeamScore}
          onPress={incrementTeamBScore}
          style={{ backgroundColor: "blue" }}
          streak={streak.teamId === rightTeam.id ? streak.streak : 0}
        />

        <Clock />
        <ActionButtons />
        <SetScore />
      </View>
    </>
  );
}
