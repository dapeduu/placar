import Button from "@/components/button";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Game() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleReset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(seconds)}</Text>
      <View style={styles.controls}>
        <Button
          title={isRunning ? "Pause" : "Start"}
          onPress={() => setIsRunning(!isRunning)}
        />
        <Button title="Reset" onPress={handleReset} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  timer: {
    fontSize: 64,
    fontWeight: "bold",
  },
  controls: {
    flexDirection: "row",
    gap: 20,
  },
});
