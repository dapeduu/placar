import { View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
      }}
    >
      <View style={{ flex: 1, backgroundColor: "red" }} />
      <View style={{ flex: 1, backgroundColor: "green" }} />
      <View style={{ flex: 1, backgroundColor: "blue" }} />
    </View>
  );
}
