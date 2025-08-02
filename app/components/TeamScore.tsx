import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type TeamScoreProps = TouchableOpacityProps & {
  name: string;
  score: number;
  onPress: () => void;
};

export default function TeamScore(props: TeamScoreProps) {
  const { name, score, onPress, style, ...rest } = props;

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
      <Text style={{ color: "white", fontSize: 24, marginBottom: 20 }}>
        {name}
      </Text>
      <Text style={{ color: "white", fontSize: 48, fontWeight: "bold" }}>
        {score}
      </Text>
    </TouchableOpacity>
  );
}
