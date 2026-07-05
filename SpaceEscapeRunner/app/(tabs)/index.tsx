import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Red Ball Rush</Text>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/play")}
      >
        <Text style={styles.buttonText}>Start Game</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "red",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 40,
  },

  button: {
    backgroundColor: "#1e90ff",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});