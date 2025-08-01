import useGameStore from "@/stores/useGameStore";
import {
  Dimensions,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ActionButtons from "./components/ActionButtons";
import Clock from "./components/Clock";

// Get the full screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

export default function Index() {
  const { teams, sets, incrementTeamAScore, incrementTeamBScore } =
    useGameStore();

  const leftTeam = teams[0];
  const rightTeam = teams[1];

  const leftTeamScore = sets[sets.length - 1].teamAScore;
  const rightTeamScore = sets[sets.length - 1].teamBScore;

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
        <TouchableOpacity
          style={{
            flex: 1,
            height: "100%",
            backgroundColor: "blue",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={incrementTeamAScore}
          activeOpacity={0.8}
        >
          <Text style={{ color: "white", fontSize: 24, marginBottom: 20 }}>
            {leftTeam.name}
          </Text>
          <Text style={{ color: "white", fontSize: 48, fontWeight: "bold" }}>
            {leftTeamScore}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            height: "100%",
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={incrementTeamBScore}
          activeOpacity={0.8}
        >
          <Text style={{ color: "white", fontSize: 24, marginBottom: 20 }}>
            {rightTeam.name}
          </Text>
          <Text style={{ color: "white", fontSize: 48, fontWeight: "bold" }}>
            {rightTeamScore}
          </Text>
        </TouchableOpacity>

        <Clock />
        <ActionButtons />
      </View>
    </>
  );
}
