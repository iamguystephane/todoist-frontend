import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import { useTheme } from "@/context/themeProvider";
import home from "@/assets/images/home.jpg";

const MainScreen = () => {
  const { theme, colorScheme } = useTheme();
  const styles = stylings(theme, colorScheme);
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.text}>
          <Text style={{ color: theme.primary }}>To</Text>doists
        </Text>
        <Text
          style={[
            styles.text,
            { marginTop: 30, fontSize: 35, fontWeight: 600 },
          ]}
        >
          Manage your Team & Everything with
          <Text style={{ color: theme.primary }}>Todoist</Text>
        </Text>

        <View style={styles.imageContainer}>
          <Image
            source={home}
            width={1000}
            height={1000}
            alt="Todoist image"
            style={styles.image}
          />
        </View>
        <Text
          style={{
            color: theme.text,
            textAlign: "center",
            fontSize: 15,
            marginTop: 10,
          }}
        >
          Easily create to-do lists, or to-do lists with friends, coworkers, or
          for personal use with todoist
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={{ color: theme.background, textAlign: "center" }}>
            Get Started
          </Text>
        </TouchableOpacity>
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
    imageContainer: {
      marginTop: 40,
      width: "100%",
    },
    image: {
      width: 250,
      height: 250,
      alignSelf: "center",
    },
    button: {
      width: "70%",
      backgroundColor: theme.primary,
      borderRadius: 40,
      alignSelf: "center",
      marginTop: 100,
      paddingVertical: 15,
    },
  });
};
