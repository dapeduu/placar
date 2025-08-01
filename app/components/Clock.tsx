import useGameStore from "@/stores/useGameStore";
import { useEffect, useState } from "react";
import { Text, View, ViewProps } from "react-native";

export default function Clock(props: ViewProps) {
  const { getElapsedTime } = useGameStore();
  const [elapsedTimeInSeconds, setElapsedTimeInSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTimeInSeconds(Math.floor(getElapsedTime() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        position: "absolute",
        top: 20,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        {elapsedTimeInSeconds}
      </Text>
    </View>
  );
}
