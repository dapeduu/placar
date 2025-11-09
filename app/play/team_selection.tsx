import Button from "@/components/button";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function TeamSelection() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Text>Team Selection</Text>

      <Button onPress={() => router.navigate("./game")} title="Jogar" />
    </View>
  );
}
