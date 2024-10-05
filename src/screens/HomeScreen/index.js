import React from "react";
import { View, Dimensions, Text } from "react-native";
import HomeMap from "../../components/HomeMap";
import Messages from "../../components/Messages";
import HomeSearch from "../../components/HomeSearch";



const HomeScreen = (props) => {
  return (
    <View>
      <View style={{ height: Dimensions.get('window').height - 360 }}>
        <HomeMap />
      </View>
      {/* <Messages /> */}
      <HomeSearch />

    </View>
  );
};

export default HomeScreen;
