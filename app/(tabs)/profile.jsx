import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";

export default function Profile() {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text style={{ color: "black" }}> Profile page! </Text>
    </SafeAreaView>
  );
}
