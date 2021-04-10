import React from "react";
import { View, TouchableOpacity, Image } from "react-native";

import { THEME } from "../constants";

export default function ImageIcon({ source, style }) {
  return (
    <View>
      <TouchableOpacity
        style={{ paddingLeft: THEME.padding, ...style }}
        onPress={console.log("Pressed")}
      >
        <Image
          source={source}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
