import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/context/themeProvider";

function TimeCard({ Icon, colors }) {
  const { theme, colorScheme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      width: 140,
      height: 180,
      backgroundColor: theme.background,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      shadowOffset: { width: 1, height: 2 },
      elevation: 5,
      shadowOpacity: 0.04,
      shadowColor: theme.text,
      gap: 20,
      borderRadius: 10,
    },
    iconContainer: {
      width: 65,
      height: 65,
      backgroundColor: colors.background,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 50,
    },
    text: {
      fontSize: 16,
      color: theme.text
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon color={colors.color} size={40} />
      </View>
      <Text style={styles.text}> Task today </Text>
      <Text style={styles.text}>
        <Text style={{ fontSize: 25, fontWeight: 600, color: theme.text }}>10</Text> tasks
      </Text>
    </View>
  );
}

export default TimeCard;
