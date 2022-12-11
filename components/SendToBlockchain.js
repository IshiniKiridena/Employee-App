import { useState } from "react";
import { View, Text } from "react-native";
import {
  Keypair,
  Server,
  TransactionBuilder,
  Networks,
  Memo,
  Operation,
} from "stellar-sdk";

export default function SendToBlockchain({ navigation }) {
  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);
  const [place, setPlace] = useState(null);
  const PK = "GAXSUU4KYQP7WPDBAIWXSB7MUXJV5PH3RLH5YMIYLEO7MKBUIR7BC6UE";
  const SK = "SBAZD34SSVXMMDWEYEAT66V56CTNFXWEJJX4SDP54VDTG4YVSDHY3QHO";

  //get key pair
  const sourceKeyPair = Keypair.fromSecret(SK);
  const sourcePublicKey = sourceKeyPair.publicKey();
  const server = new Server("https://horizon-testnet.stellar.org");

  const onSubmit = async () => {
    const account = await server.loadAccount(sourcePublicKey);
    const fee = await server.fetchBaseFee();
    const transaction = new TransactionBuilder(account, {
      fee,
      networkPassphrase: Networks.TESTNET,
    })
      .addMemo(Memo.text("Employee Add"))
      .addOperation(
        Operation.manageData({
          name: "Employee Name",
          value: name,
        })
      )
      .addOperation(
        Operation.manageData({
          name: "Employee Age",
          value: age,
        })
      )
      .addOperation(
        Operation.manageData({
          name: "Employee Place",
          value: place,
        })
      )
      .setTimeout(30)
      .build();

    transaction.sign(sourceKeyPair);
    console.log("Transaction XDR : ", transaction.toEnvelope().toXDR("base64"));

    try {
      const transactionResult = await server.submitTransaction(transaction);
      console.log(JSON.stringify(transactionResult, null, 2));
      console.log(
        "\nData added to blockchain successfully, Hash : ",
        transactionResult.hash
      );
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
      <Text style={styles.label}>Age</Text>
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
