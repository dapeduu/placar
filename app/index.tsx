import useGameStore from "@/stores/useGameStore";
import { Dimensions, StatusBar, View } from "react-native";
import ActionButtons from "./components/ActionButtons";
import Clock from "./components/Clock";
import TeamScore from "./components/TeamScore";

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

export default function Index() {
  const {
    teams,
    sets,
    incrementTeamAScore,
    incrementTeamBScore,
    getCurrentStreak,
  } = useGameStore();

  const leftTeam = teams[0];
  const rightTeam = teams[1];

  const leftTeamScore = sets[sets.length - 1].events.filter(
    (event) => event.team === leftTeam
  ).length;
  const rightTeamScore = sets[sets.length - 1].events.filter(
    (event) => event.team === rightTeam
  ).length;

  const streak = getCurrentStreak();

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
      </View>
    </>
  );
}
