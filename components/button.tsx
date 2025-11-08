import { Pressable, PressableProps, Text } from "react-native";

interface ButtonProps extends PressableProps {
  title: string;
}

export default function Button(props: ButtonProps) {
  return (
      <Pressable style={{ 
        backgroundColor: "white", 
        padding: 10, 
        borderRadius: 10, 
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)", 
        alignItems: "center",
         }} {...props}>
        <Text>{props.title}</Text>
      </Pressable>
  );
}
