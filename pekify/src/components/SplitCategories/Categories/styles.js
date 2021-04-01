import React, { StyleSheet, Dimensions } from "react-native";
import { Color, Constants, Styles, AppConfig } from "@common";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container:{
    flexDirection:'row',
    backgroundColor: AppConfig.MainColor,
    width: width - 120*2 - 15*3
  }
});
