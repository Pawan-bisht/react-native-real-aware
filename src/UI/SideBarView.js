import React, { Component } from "react";
import { View, StyleSheet, TouchableNativeFeedback } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  SimpleLineIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";

import Ralogo from "../images/ra-logo.png";

export default class SideBarView extends Component {
  render() {
    console.log(this.props);
    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...this.props}>
          <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <Avatar.Image
                  source={Ralogo}
                  style={{ backgroundColor: "#ffffff00" }}
                  size={50}
                />
                <View style={{ marginLeft: 15, flexDirection: "column" }}>
                  <Title style={styles.title}>real-aware</Title>
                  <Caption style={styles.caption}>Tracks anything </Caption>
                </View>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="view-dashboard-outline"
                  size={24}
                  color="#44607c"
                />
              )}
              labelStyle={styles.labelStyle}
              label="Dashboard"
              onPress={() => {
                this.props.navigation.navigate("Dashboard");
              }}
              activeTintColor="red"
              activeBackgroundColor="#e0efff"
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="ios-map-outline" size={24} color="#44607c" />
              )}
              // activeBackgroundColor="#E0EFFF"
              // inactiveBackgroundColor="#E0EFFF"
              labelStyle={styles.labelStyle}
              label="Map"
              onPress={() => {
                this.props.navigation.navigate("SecondPage");
              }}
            />
            <DrawerItem
              labelStyle={styles.labelStyle}
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="ticket-outline"
                  size={24}
                  color="#44607c"
                />
              )}
              label="All tickets"
              onPress={() => {
                this.props.navigation.navigate("ThirdPage");
              }}
            />
          </Drawer.Section>
        </DrawerContentScrollView>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={({ color, size, focused }) => (
              <SimpleLineIcons
                name="logout"
                size={24}
                color={focused ? "black" : "#4c4c4c"}
              />
            )}
            label="Sign Out"
            onPress={() => {
              signOut();
            }}
          />
        </Drawer.Section>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f4f4f4",
  },
  labelStyle: {
    color: "#44607c",
  },
  title: {
    fontSize: 20,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 10,
  },
  bottomDrawerSection: {
    borderTopWidth: 1,
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
