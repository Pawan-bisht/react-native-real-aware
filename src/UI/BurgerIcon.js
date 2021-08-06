import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default class BurgerIcon extends Component {
  constructor(props) {
    super(props);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    this.props.navigationProps.toggleDrawer();
  }
  render() {
    // console.log(this.props.navigation);
    return (
      <View style={styling.container}>
        <SafeAreaView style={{ flex: 1, marginRight: 25 }}>
          <TouchableOpacity
            onPress={(e) => {
              this.props.navigationProps.toggleDrawer();
            }}
          >
            <FontAwesome5 name="bars" size={24} color="#fff" />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }
}

const styling = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#161924",
    fontSize: 20,
    fontWeight: "bold",
  },
});
