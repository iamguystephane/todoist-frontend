import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function TabBar({ state, descriptors, navigation }) {
  return (
    <View>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        return (
            <TouchableOpacity key={route.key} onPress={onPress}>

            </TouchableOpacity>
        )
      })}
    </View>
  );
}
