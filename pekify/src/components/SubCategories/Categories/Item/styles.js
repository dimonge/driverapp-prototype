/** @format */

import { StyleSheet } from "react-native";
import {Constants, AppConfig} from '@common'

export default StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  text: (text) => ({
    fontSize: 20,
    fontWeight: '100',
    color: text,
    opacity: 0.4,
    fontFamily: Constants.fontFamily
  }),
  selectedText: (text) => ({
    fontWeight: "bold",
    color: AppConfig.MainColor,
    opacity: 1
  }),
});
