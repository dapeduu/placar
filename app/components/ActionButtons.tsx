import useGameStore from "@/stores/useGameStore";
import { Text, TouchableOpacity, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function ActionButtons() {
  const { startMatch, finishMatch, resetCurrentSet, undoLastEvent, status } =
    useGameStore();

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
        onPress={resetCurrentSet}
      >
        <Text>Reset Current Set</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: "white", padding: 10, borderRadius: 10 }}
        onPress={undoLastEvent}
      >
        <Text>Undo Last Event</Text>
      </TouchableOpacity>
    </View>
  );
}
