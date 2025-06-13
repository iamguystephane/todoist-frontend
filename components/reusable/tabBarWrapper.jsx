import TabBar from "./tabBar";
import { useTheme } from "@/context/themeProvider";

export default function TabBarWrapper(props) {
  const { theme, colorScheme } = useTheme();
  return <TabBar {...props} theme={theme} colorScheme={colorScheme} />;
}
