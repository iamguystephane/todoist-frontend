import { Tabs } from "expo-router";
import { Plus, FileText, House, History, UserRound } from "lucide-react-native";
import { useTheme } from "@/context/themeProvider";
import { View, Text } from "react-native";

export default function TabsLayout() {
  const { theme, colorScheme } = useTheme();

  const styles = {
    tabBarStyle: {
      backgroundColor: theme.background,
      height: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      borderTopWidth: 0,
      shadowOffset: { width: 1, height: 2 },
      elevation: 5,
      shadowOpacity: 0.4,
      shadowColor: theme.text,
    },
    addTaskStyle: {
      width: 60,
      height: 60,
      borderRadius: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.background,
      shadowOffset: { width: 1, height: 2 },
      elevation: 5,
      shadowOpacity: 0.1,
      shadowColor: theme.text,
    },
    headerStyle: {
      backgroundColor: theme.background,
      shadowOffset: { width: 0, height: 1 },
      shadowColor: theme.text,
      shadowOpacity: 0.09,
    },
  };
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerStyle: styles.headerStyle,
        headerTintColor: theme.text,
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.text,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <House color={color} size={27} />,
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: "Tasks",
          tabBarIcon: ({ color }) => <FileText color={color} size={27} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          headerShown: true,
          tabBarLabel: () => null,
          title: "Create a new task",
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.addTaskStyle,
                focused && { backgroundColor: theme.primary },
              ]}
            >
              <Plus
                color={
                  colorScheme === "light" ? (focused ? "#fff" : "#000") : "#fff"
                }
                size={27}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => <History color={color} size={27} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <UserRound color={color} size={27} />,
        }}
      />
    </Tabs>
  );
}
