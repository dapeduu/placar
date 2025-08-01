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

  const formatTime = (time: number) => {
    return String(time).padStart(2, "0");
  };

  const hours = Math.floor(elapsedTimeInSeconds / 3600);
  const remainingAfterHours = elapsedTimeInSeconds % 3600;
  const minutes = Math.floor(remainingAfterHours / 60);
  const seconds = remainingAfterHours % 60;

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
        width: 140,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        {formatTime(hours)} : {formatTime(minutes)} : {formatTime(seconds)}
      </Text>
    </View>
  );
}
