import React, { Component } from "react";
// import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
// import SideBarView from "./src/UI/SideBarView";
import TempView from "./src/UI/TempView";
// import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TicketsNavStack from "./src/components/TicketsNavStack";
import MapNavStack from "./src/components/MapNavStack";
import DashBoardNavStack from "./src/components/DashBoardNavStack";
// import AuthProvider from "./AuthProvider";
const Drawer = createDrawerNavigator();

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("-----running-----");
    console.log(this.props);
    // if (this.props.isAuthenticated) {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          // initialRouteName="FirstPage"
          drawerContent={(props) => (
            <TempView
              // userName={this.props.userAccount.userName}
              // name={this.props.userAccount.name}
              // logout={this.props.logout}
              // getAccessToken={this.props.getAccessToken}
              // accessToken={this.props.accessToken}
              {...props}
            />
          )}
          drawerContentOptions={{
            activeBackgroundColor: "#e0efff",
            activeTintColor: "#e91e63",
            itemStyle: { marginVertical: 5 },
          }}
        >
          <Drawer.Screen
            name="FirstPage"
            options={{ drawerLabel: "Dashboard" }}
            component={DashBoardNavStack}
          />
          <Drawer.Screen
            name="SecondPage"
            options={{ drawerLabel: "Map" }}
            component={MapNavStack}
          />
          <Drawer.Screen
            name="ThirdPage"
            options={{ drawerLabel: "All Tickets" }}
            component={TicketsNavStack}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
    // } else {
    //   return (
    //     <View>
    //       <Text>Loading .....</Text>
    //     </View>
    //   );
    // }
  }
}
export default App;
