import useGameStore from "@/stores/useGameStore";
import { Text, TouchableOpacity, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function ActionButtons() {
  const { undoLastEvent } = useGameStore();

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 20,
        position: "absolute",
        bottom: 20,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity onPress={undoLastEvent}>
        <FontAwesome6 name="rotate-left" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
