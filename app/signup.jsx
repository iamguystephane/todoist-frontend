import {
  Text,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/context/themeProvider";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "expo-router";

export default function Signup() {
  const { theme, colorScheme } = useTheme();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    names: "",
    email: "",
    password: "",
  });
  const styles = stylings(theme, colorScheme);

  const onSubmit = (data) => {
    console.log("Form Data: ", data);
  };

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView style={{ width: "100%" }}>
          <ScrollView
            contentContainerStyle={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100%",
            }}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ width: "100%" }}
            >
              <Text style={styles.heading}> Nice to see you! </Text>
              <Text style={styles.createAccount}> Create your account </Text>
              <View style={styles.formContainer}>
                <View style={styles.formFieldContainer}>
                  <Text style={styles.text}> Names </Text>
                  <Controller
                    rules={{ required: "Names is required" }}
                    control={control}
                    name="names"
                    render={({ field: { onBlur, onChange, value } }) => (
                      <TextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        style={styles.inputField}
                        placeholder="e.g John Doe"
                        placeholderTextColor="#000"
                      />
                    )}
                  />
                  {errors.names && (
                    <Text style={styles.errMsg}> Your names is required </Text>
                  )}
                </View>
                <View style={styles.formFieldContainer}>
                  <Text style={styles.text}> Names </Text>
                  <Controller
                    rules={{ required: "Email is required" }}
                    control={control}
                    name="email"
                    render={({ field: { onBlur, onChange, value } }) => (
                      <TextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        style={styles.inputField}
                        placeholder="e.g johndoe@gmail.com"
                        placeholderTextColor="#000"
                      />
                    )}
                  />
                  {errors.email && (
                    <Text style={styles.errMsg}> Email is required </Text>
                  )}
                </View>
                <View style={styles.formFieldContainer}>
                  <Text style={styles.text}> Password </Text>
                  <Controller
                    rules={{
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      required: "Password is required",
                    }}
                    control={control}
                    name="password"
                    render={({ field: { onBlur, onChange, value } }) => (
                      <TextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        style={styles.inputField}
                        placeholder="e.g *********"
                        secureTextEntry={true}
                        placeholderTextColor="#000"
                      />
                    )}
                  />
                  {errors.password && (
                    <Text style={styles.errMsg}> Password is required </Text>
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
                  <Text style={styles.text}>Already have an account?</Text>
                  <TouchableOpacity onPress={() => router.push("/sigin")}>
                    <Text
                      style={{
                        backgroundColor: theme.primary,
                        paddingHorizontal: 9,
                        paddingVertical: 5,
                        color: colorScheme === "light" ? "#f9f9f9" : "#000",
                        borderRadius: 5,
                      }}
                    >
                      Login
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text style={{ color: theme.background }}>
                    Create my account
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
}

const stylings = (theme, colorScheme) => {
  return StyleSheet.create({
    container: {
      minHeight: "100%",
      width: "100%",
      backgroundColor: theme.background,
      alignItems: "center",
      justifyContent: "center",
    },
    heading: {
      fontSize: 30,
      color: theme.text,
      fontWeight: 600,
      textAlign: "center",
    },
    createAccount: {
      textAlign: "center",
      color: colorScheme === "dark" ? "#f9f9f9" : "gray",
    },
    text: {
      color: theme.text,
    },
    formContainer: {
      width: "90%",
      minHeight: "30%",
      display: "flex",
      justifyContent: "center",
      gap: 20,
      borderRadius: 10,
      alignSelf: "center",
      padding: 20,
      marginTop: 50,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
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
      shadowRadius: 3.84,
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
