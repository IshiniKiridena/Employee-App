import { useEffect, useState } from "react";
import { StyleSheet, FlatList, Text, View } from "react-native";
import { ActivityIndicator } from "react-native";

export default function EmployeeView() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getEmployees = async () => {
    try {
      const response = await fetch(
        "https://dummy.restapiexample.com/api/v1/" + "employees"
      );
      const json = await response.json();
      setData(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <View style={styles.appContainer}>
      {isLoading ? (
        <ActivityIndicator></ActivityIndicator>
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>
              {item.employee_name}, {item.employee_salary},{item.employee_name},
              {item.employee_age}
            </Text>
          )}
        ></FlatList>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    padding: 50,
  },
});
