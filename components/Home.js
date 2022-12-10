import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.appContainer}>
      <View>
        <Text>Employee App</Text>
      </View>
      <View style={styles.btnContainer}>
        <Button
          style={styles.btn}
          title="View all employees"
          onPress={() => navigation.navigate("Employees")}
        ></Button>
        <Text>{"\n"}</Text>
        <Button style={styles.btn} title="Add new employee"></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    padding: 50,
  },
  btnContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    margin: 12,
  },
  btn: {
    paddingBottom: 5,
    paddingTop: 5,
  },
});
