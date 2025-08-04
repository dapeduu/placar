import useGameStore from "@/stores/useGameStore";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, ViewProps } from "react-native";

export default function Clock(props: ViewProps) {
  const {
    getElapsedTime,
    startMatch,
    pauseMatch,
    resumeMatch,
    resetMatch,
    status,
  } = useGameStore();
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
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          if (status === "idle") {
            startMatch();
          } else if (status === "running") {
            pauseMatch();
          } else {
            resumeMatch();
          }
        }}
      >
        {status === "running" ? (
          <FontAwesome6 name="pause" size={24} color="black" />
        ) : (
          <FontAwesome6 name="play" size={24} color="black" />
        )}
      </TouchableOpacity>

      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        {formatTime(hours)} : {formatTime(minutes)} : {formatTime(seconds)}
      </Text>

      <TouchableOpacity onPress={resetMatch}>
        <FontAwesome6 name="retweet" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
