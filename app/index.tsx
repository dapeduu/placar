import { useState } from "react";
import {
  Dimensions,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Get the full screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

export default function Index() {
  const [leftCounter, setLeftCounter] = useState(0);
  const [rightCounter, setRightCounter] = useState(0);

  return (
    <>
      <StatusBar hidden={true} />

      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          flex: 1,
          width: screenWidth,
          height: screenHeight,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            height: "100%",
            backgroundColor: "blue",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setLeftCounter(leftCounter + 1)}
          activeOpacity={0.8}
        >
          <Text style={{ color: "white", fontSize: 24, marginBottom: 20 }}>
            Time azul
          </Text>
          <Text style={{ color: "white", fontSize: 48, fontWeight: "bold" }}>
            {leftCounter}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            height: "100%",
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setRightCounter(rightCounter + 1)}
          activeOpacity={0.8}
        >
          <Text style={{ color: "white", fontSize: 24, marginBottom: 20 }}>
            Time vermelho
          </Text>
          <Text style={{ color: "white", fontSize: 48, fontWeight: "bold" }}>
            {rightCounter}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
