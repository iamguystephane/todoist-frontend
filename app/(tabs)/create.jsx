import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Switch,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useTheme } from "@/context/themeProvider";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function CreateTask() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onsubmit = (data) => {
    console.log("Data to be submitted: ", data);
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      title: "",
      activity: "",
      category: "",
      dailyReminder: false,
      date: new Date(),
    },
  });

  const date = watch("date");

  const { theme, colorScheme } = useTheme();
  const styles = stylings(theme, colorScheme);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <ThemedText> Task Title </ThemedText>
            <Controller
              rules={{ required: "Task title is required" }}
              control={control}
              name="title"
              render={({ field: { onBlur, onChange, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.inputField}
                  placeholder="Enter task title"
                  placeholderTextColor="#000"
                />
              )}
            />
          </View>
          <View style={styles.inputContainer}>
            <ThemedText> Task Activity </ThemedText>
            <Controller
              rules={{ required: "Task activity is required" }}
              control={control}
              name="activity"
              render={({ field: { onBlur, onChange, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.inputField}
                  placeholder="Enter task activity"
                  placeholderTextColor="#000"
                />
              )}
            />
          </View>
          <View style={styles.dateContainer}>
            <View style={styles.dateTimeInputContainer}>
              <ThemedText> Date </ThemedText>
              <TouchableOpacity
                style={[styles.inputField, styles.dateInput]}
                onPress={() => setShowDatePicker((prev) => !prev)}
              >
                <ThemedText style={{ color: theme.background }}>
                  {new Date(date).toDateString()}
                </ThemedText>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  onChange={(e, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) setValue("date", selectedDate);
                  }}
                />
              )}
            </View>
            <View style={styles.dateTimeInputContainer}>
              <ThemedText> Time </ThemedText>
              <TouchableOpacity
                style={[styles.inputField, styles.dateInput]}
                onPress={() => setShowTimePicker((prev) => !prev)}
              >
                <ThemedText style={{ color: theme.background }}>
                  {new Date(date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </ThemedText>
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  value={date}
                  mode="time"
                  onChange={(e, selectedDate) => {
                    setShowTimePicker(false);
                    if (selectedDate) setValue("date", selectedDate);
                  }}
                />
              )}
            </View>
          </View>
          <View style={styles.switchRow}>
            <ThemedText style={styles.label}>Remind me daily</ThemedText>
            <Controller
              control={control}
              name="remindDaily"
              render={({ field: { onChange, value } }) => (
                <Switch
                  value={value}
                  onValueChange={onChange}
                  trackColor={{ false: "#ccc", true: theme.primary }}
                />
              )}
            />
          </View>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSubmit(onsubmit)}
          >
            <ThemedText style={styles.saveThemedText}>Save Task</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const stylings = (theme, colorScheme) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      minHeight: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.background,
    },
    formContainer: {
      width: "95%",
      alignSelf: "center",
    },
    inputContainer: {
      marginBottom: 20,
    },
    inputField: {
      width: "100%",
      height: 55,
      borderRadius: 10,
      paddingHorizontal: 10,
      color: colorScheme === "light" ? theme.text : "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.15,
      shadowRadius: 1.84,
      elevation: 1,
      backgroundColor:
        colorScheme === "light" ? theme.background : theme.primary,
      borderColor: theme.background,
    },
    dateContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      gap: 8,
    },
    dateTimeInputContainer: {
      width: "50%",
    },
    dateInput: {
      width: "95%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    switchRow: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: 10,
    },
    saveButton: {
      marginTop: 30,
      backgroundColor: theme.primary,
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
    },
    saveThemedText: {
      color: theme.background,
      fontSize: 16,
    },
  });
};
