import { getAllSetScores } from "@/helpers/gameLogic";
import useGameStore from "@/stores/useGameStore";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, ViewProps } from "react-native";

export default function SetScore(props: ViewProps) {
  const { sets, teams } = useGameStore();
  const { teamA, teamB } = getAllSetScores(sets, teams[0], teams[1]);

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
