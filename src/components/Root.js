import React, { Component } from "react";
import Map from "../screens/Map";
import { NavigationContainer } from "@react-navigation/native";
import Tickets from "../screens/Tickets";
import { createDrawerNavigator } from "@react-navigation/drawer";
import NavStack from "./DashBoardNavStack";

export default class Root extends Component {
  render() {
    const Drawer = createDrawerNavigator();
    return (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Dashboard"
          drawerContentOptions={{
            activeTintColor: "#e91e63",
            itemStyle: { marginVertical: 5 },
          }}
        >
          <Drawer.Screen
            name="Dashboard"
            component={NavStack}
            options={{ drawerLabel: "Dashboard" }}
          />
          <Drawer.Screen
            name="Map"
            component={Map}
            options={{ drawerLabel: "Map" }}
          />
          <Drawer.Screen
            name="Tickets"
            component={Tickets}
            options={{ drawerLabel: "Tickets" }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
