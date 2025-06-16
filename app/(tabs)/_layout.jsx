import { Tabs } from "expo-router";
import { Plus, FileText, House, History, UserRound } from "lucide-react-native";
import { useTheme } from "@/context/themeProvider";

export default function TabsLayout() {
  const { theme, colorScheme } = useTheme();

  const tabBarStyle = {
    backgroundColor: theme.background,
    height: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  };
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: tabBarStyle,
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
          title: "Create",
          tabBarIcon: ({ color }) => <Plus color={theme.text} size={27} />,
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
