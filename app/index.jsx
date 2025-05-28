import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import { useTheme } from "@/context/themeProvider";

const MainScreen = () => {
  const { theme, colorScheme } = useTheme();
  const styles = stylings(theme, colorScheme);
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.text}>
          <Text style={{ color: theme.primary }}>To</Text>doist
        </Text>
        <Text style={[styles.text, { marginTop: 30, fontSize: 35, fontWeight: 600}]}>
          Manage your Team & Everything with
          <Text style={{ color: theme.primary }}>Todoist</Text>
        </Text>
      </SafeAreaView>
    </View>
  );
};

export default MainScreen;

const stylings = (theme, colorScheme) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      minHeight: "100%",
      backgroundColor: theme.background,
      padding: 10,
      paddingHorizontal: 20,
    },
    text: {
      color: theme.text,
      fontSize: 20,
      fontWeight: 600,
    },
  });
};
