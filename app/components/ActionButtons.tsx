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
        <FontAwesome6 name="retweet" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: "white", padding: 10, borderRadius: 10 }}
        onPress={undoLastEvent}
      >
        <FontAwesome6 name="rotate-left" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
