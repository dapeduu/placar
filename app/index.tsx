import Button from "@/components/button";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ 
        justifyContent: "center",
        alignItems: "stretch",
        width: "20%",
        gap: 10, 
      }
        }>
        <Button onPress={() => router.navigate("./play/team_selection")} title="Jogar" />
        <Button onPress={() => router.navigate("./history")} title="Histórico" />
        <Button onPress={() => router.navigate("./about")} title="Sobre" />
      </View>
    </View>
  );
}
