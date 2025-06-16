import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@/context/themeProvider";
import { BellIcon, FileText, X, Hourglass } from "lucide-react-native";
import TimeCard from "@/components/reusable/time-card";

export default function HomePage() {
  const cardColors = {
    fileText: {
      background: "#fbefdf",
      color: "#f9cd86",
    },
    hourglass: {
      background: "#f3f4ef",
      color: "#8db6ca",
    },
    x: {
      background: "#fdd7d6",
      color: "#933b3a",
    },
  };
  const { theme, colorScheme } = useTheme();
  const styles = stylings(theme, colorScheme);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}> Hello, Daniel </Text>
          <TouchableOpacity>
            <BellIcon color={theme.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.timeCardContainer}>
          <TimeCard Icon={FileText} colors={cardColors.fileText} />
          <TimeCard Icon={Hourglass} colors={cardColors.hourglass} />
          <TimeCard Icon={X} colors={cardColors.x} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const stylings = (theme, colorScheme) => {
  return StyleSheet.create({
    container: {
      minHeight: "100%",
      width: "100%",
      backgroundColor: theme.background,
    },
    text: {
      color: theme.text,
    },
    welcomeContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    welcomeText: {
      fontSize: 23,
      fontWeight: 600,
    },
    timeCardContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 5,
      paddingHorizontal: 10,
    },
  });
};
