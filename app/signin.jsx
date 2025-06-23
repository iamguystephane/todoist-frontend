import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useTheme } from "@/context/themeProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { API_URL } from "../API";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/context/authProvider";

const SignIn = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { theme, colorScheme } = useTheme();
  const { setUser } = useAuth();
  const styles = stylings(theme, colorScheme);
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/auth/login`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (res.ok) {
        const { message, token, user } = resData;
        await AsyncStorage.setItem("authToken", token);
        setUser(user);
        Toast.show({
          position: "top",
          text1: "Success",
          text2: message,
          type: "success",
        });
        router.push("/(tabs)/home");
        return;
      }
      const { message } = resData;
      Toast.show({
        position: "top",
        text1: "Could not log in",
        text2: message,
        type: "info",
      });
    } catch (err) {
      console.log(err);
      Toast.show({
        position: "top",
        text1: "Failed to log in",
        text2: err.message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ width: "100%" }}
        >
          <ScrollView
            contentContainerStyle={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              minHeight: "100%",
            }}
          >
            <Text style={styles.heading}> Hello, again! </Text>
            <Text style={{ textAlign: "center", color: "gray" }}>
              Log into your account
            </Text>
            <View style={styles.formContainer}>
              <View style={styles.formFieldContainer}>
                <Text style={styles.text}> Email </Text>
                <Controller
                  rules={{
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                    required: "Email is required",
                  }}
                  control={control}
                  name="email"
                  render={({ field: { onBlur, onChange, value } }) => (
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Enter your password"
                      style={styles.inputField}
                      placeholderTextColor="#000"
                    />
                  )}
                />
                {errors.email && (
                  <Text style={styles.errMsg}> {errors.email.message}</Text>
                )}
              </View>
              <View style={styles.formFieldContainer}>
                <Text style={styles.text}> Password </Text>
                <Controller
                  rules={{ required: "Password is required!" }}
                  control={control}
                  name="password"
                  render={({ field: { onBlur, onChange, value } }) => (
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Enter your password"
                      style={styles.inputField}
                      placeholderTextColor="#000"
                      secureTextEntry={true}
                    />
                  )}
                />
                {errors.password && (
                  <Text style={styles.errMsg}> {errors.password.message} </Text>
                )}
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 3,
                  alignItems: "center",
                }}
              >
                <Text style={styles.text}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => router.push("/signup")}>
                  <Text
                    style={{
                      backgroundColor: theme.primary,
                      paddingHorizontal: 9,
                      paddingVertical: 5,
                      color: colorScheme === "light" ? "#f9f9f9" : "#000",
                      borderRadius: 5,
                    }}
                  >
                    Sign up
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.btn}
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={{ color: theme.background }}>
                  {loading ? "LOGGING IN..." : "LOGIN"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default SignIn;

const stylings = (theme, colorScheme) => {
  return StyleSheet.create({
    container: {
      minHeight: "100%",
      width: "100%",
      backgroundColor: theme.background,
    },
    heading: {
      textAlign: "center",
      fontSize: 30,
      color: theme.text,
    },
    text: {
      color: theme.text,
    },
    formContainer: {
      width: "90%",
      minHeight: "40%",
      display: "flex",
      justifyContent: "center",
      gap: 20,
      borderRadius: 10,
      alignSelf: "center",
      padding: 20,
      marginTop: 50,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.25,
      shadowRadius: 1.84,
      elevation: 1,
      backgroundColor: colorScheme === "dark" ? "#222831" : theme.background,
    },
    formFieldContainer: {
      display: "flex",
      justifyContent: "center",
      gap: 4,
    },
    inputField: {
      width: "100%",
      height: 50,
      borderRadius: 10,
      paddingHorizontal: 10,
      color: colorScheme === "light" ? theme.text : "#000",
      borderWidth: 1,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 1.84,
      elevation: 1,
      backgroundColor:
        colorScheme === "light" ? theme.background : theme.primary,
      borderColor: theme.background,
    },
    errMsg: {
      color: "red",
      fontSize: 12,
      marginTop: 5,
      textAlign: "left",
    },
    btn: {
      backgroundColor: theme.primary,
      width: "100%",
      height: 50,
      borderRadius: 40,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });
};
