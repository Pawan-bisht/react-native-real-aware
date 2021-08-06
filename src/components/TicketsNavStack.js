import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Tickets from "../screens/Tickets";
import BurgerIcon from "../UI/BurgerIcon";

const Stack = createStackNavigator();
export default class TicketsNavStack extends Component {
  render() {
    return (
      <Stack.Navigator
        initialRouteName="tickets"
        screenOptions={{
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
        <Stack.Screen
          name="tickets"
          component={Tickets}
          options={{
            title: "All Tickets", //Set Header Title
          }}
        />
      </Stack.Navigator>
    );
  }
}
