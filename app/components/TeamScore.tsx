import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

type TeamScoreProps = TouchableOpacityProps & {
  name: string;
  score: number;
  streak: number;
  onPress: () => void;
};

export default function TeamScore(props: TeamScoreProps) {
  const { name, score, streak, onPress, style, ...rest } = props;

  return (
    <TouchableOpacity
      style={[
        {
          flex: 1,
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      {...rest}
    >
      <Text style={{ color: "white", fontSize: 24 }}>{name}</Text>
      <Text style={{ color: "white", fontSize: 48, fontWeight: "bold" }}>
        {score}
      </Text>

      <View style={{ flexDirection: "row", gap: 4, height: 5 }}>
        {new Array(streak).fill(0).map((_, index) => (
          <View
            key={index}
            style={{ width: 5, height: 5, backgroundColor: "white" }}
          />
        ))}
      </View>
    </TouchableOpacity>
  );
}
