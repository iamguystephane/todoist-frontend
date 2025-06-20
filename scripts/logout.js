import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export const useLogout = () => {
  const router = useRouter();
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      Toast.show({
        position: "top",
        type: "success",
        text1: "Success",
        text2: "Successfully logged out",
      });
      router.replace("/signin");
    } catch (err) {
      console.log(err);
      Toast.show({
        position: "top",
        type: "error",
        text1: "Error",
        text2: "Failed to logout",
      });
    }
  };

  return logout;
};
