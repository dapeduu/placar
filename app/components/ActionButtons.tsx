import { TouchableOpacity, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useGameStoreV2 } from "@/stores/useGameStoreV2";

export default function ActionButtons() {
  const { undoLastEvent } = useGameStoreV2();

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
