import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BurgerIcon from "../UI/BurgerIcon";
import Map from "../screens/Map";

const Stack = createStackNavigator();
export default class MapNavStack extends Component {
  render() {
    return (
      <Stack.Navigator
        initialRouteName="map"
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
          name="map"
          component={Map}
          options={{
            title: "Map", //Set Header Title
          }}
        />
      </Stack.Navigator>
    );
  }
}
