import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./components/Home";
import EmployeeView from "./components/Employees";
import AddEmployee from "./components/AddEmployee";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Employees" component={EmployeeView} />
        <Stack.Screen
          name="Add Employee"
          component={AddEmployee}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
