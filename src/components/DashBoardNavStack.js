import { createStackNavigator } from "@react-navigation/stack";
import React, { Component } from "react";
import Dashboard from "../screens/Dashboard";
import BurgerIcon from "../UI/BurgerIcon";

const Stack = createStackNavigator();
export default class DashBoardNavStack extends Component {
  render() {
    return (
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          title: "Dashboard", //Set Header Title
          headerRight: () => (
            <BurgerIcon navigationProps={this.props.navigation} />
          ),
          headerStyle: {
            backgroundColor: "#2c3e50", //Set Header color,
          },
          headerTintColor: "#fff", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      >
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    );
  }
}
