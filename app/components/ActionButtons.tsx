import useGameStore from "@/stores/useGameStore";
import { Text, TouchableOpacity, View } from "react-native";

export default function ActionButtons() {
  const { startMatch, finishMatch, resetCurrentSet } = useGameStore();

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        position: "absolute",
        bottom: 20,
      }}
    >
      <TouchableOpacity
        style={{ backgroundColor: "white", padding: 10, borderRadius: 10 }}
        onPress={startMatch}
      >
        <Text>Start Match</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: "white", padding: 10, borderRadius: 10 }}
        onPress={finishMatch}
      >
        <Text>Finish Match</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: "white", padding: 10, borderRadius: 10 }}
        onPress={resetCurrentSet}
      >
        <Text>Reset Current Set</Text>
      </TouchableOpacity>
    </View>
  );
}
