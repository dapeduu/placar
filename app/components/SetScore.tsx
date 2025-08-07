import { getAllSetScores } from "@/helpers/gameLogic";
import { useGameStoreV2 } from "@/stores/useGameStoreV2";
import { Text, View, ViewProps } from "react-native";

export default function SetScore(props: ViewProps) {
  const { sets, teams, pointsToWin } = useGameStoreV2();
  const { teamA, teamB } = getAllSetScores(
    sets,
    teams[0],
    teams[1],
    pointsToWin
  );

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        position: "absolute",
        top: "50%",
        transform: [{ translateY: -50 }],
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        {teamA} - {teamB}
      </Text>
    </View>
  );
}
