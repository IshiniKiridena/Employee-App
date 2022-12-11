import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function OneEmployee({ route, navigation }) {
  const userId = route.params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getEmployee = async () => {
    console.log("User ID : ", userId);
    try {
      const response = await fetch(
        `https://dummy.restapiexample.com/api/v1/employee/${JSON.stringify(
          userId
        )}`
      );
      const json = await response.text();
      setData(json);
      console.log("Data received : ", data);
    } catch (error) {
      console.error("An error occurred : ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmployee();
  }, []);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator></ActivityIndicator>
      ) : (
        <Text>{data}</Text>
      )}
    </View>
  );
}
