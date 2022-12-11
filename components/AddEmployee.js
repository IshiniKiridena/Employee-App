import { useState } from "react";
import { View, StyleSheet, TextInput, Button, Text } from "react-native";

export default function AddEmployee() {
  const [name, onChangeName] = useState(null);
  const [salary, onChangeSalary] = useState(null);
  const [age, onChangeAge] = useState(null);

  const onSubmit = async () => {
    const data = [name, salary, age];
    console.log(data);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        salary: data.salary,
        age: data.age,
      }),
    };
    try {
      const response = await fetch(
        "https://dummy.restapiexample.com/api/v1/create",
        requestOptions
      );
      const json = await response.text();
      console.log("Data added : ", json);
    } catch (error) {
      console.error("An error occurred : ", error);
    }

    //!Can do like this as well
    // fetch("https://dummy.restapiexample.com/api/v1/create", requestOptions)
    //   .then((response) => {
    //     console.log("Data added ", response.text());
    //   })
    //   .catch((error) => {
    //     console.log("An error occurred : ", error);
    //   });
  };

  return (
    <View style={styles.appContainer}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => onChangeName(value)}
        value={name}
      ></TextInput>
      <Text style={styles.label}>Salary</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => onChangeSalary(value)}
        value={salary}
      ></TextInput>
      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => onChangeAge(value)}
        value={age}
      ></TextInput>
      <View style={styles.button}>
        <Button title="Add Employee" onPress={onSubmit}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    padding: 10,
  },
  label: {
    color: "black",
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: "white",
    height: 40,
    backgroundColor: "white",
    borderRadius: 4,
  },
  input: {
    backgroundColor: "white",
    borderColor: "none",
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});
