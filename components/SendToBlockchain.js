import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function SendToBlockchain({ navigation }) {
  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);
  const [place, setPlace] = useState(null);
  const PK = "GAXSUU4KYQP7WPDBAIWXSB7MUXJV5PH3RLH5YMIYLEO7MKBUIR7BC6UE";
  const SK = "SBAZD34SSVXMMDWEYEAT66V56CTNFXWEJJX4SDP54VDTG4YVSDHY3QHO";

  //request sent to BE to send to BC
  const onSubmit = async () => {
    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        age: age,
        place: place,
        privatekey: SK,
      }),
    };
    try {
      console.log(reqOptions);
      const response = await fetch(
        "http://192.168.8.117:4000/bc/addtobc",
        reqOptions
      );
      const json = await response.json();
      console.log("Added to BC : ", json.hash);
    } catch (error) {
      console.error("An error occurred : ", error);
    }
  };

  return (
    <View>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setName(value)}
        value={name}
      ></TextInput>
      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setAge(value)}
        value={age}
      ></TextInput>
      <Text style={styles.label}>Place</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setPlace(value)}
        value={place}
      ></TextInput>
      <View style={styles.button}>
        <Button title="Add to blockchain" onPress={onSubmit}></Button>
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
