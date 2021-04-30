import React from "react"
import PropTypes from "prop-types"
import { View, Image, StyleSheet } from "react-native"

import Slider from "./Slider"
import { Text } from "../text/text"

function ConfirmSlider({ theme, label, onConfirm, ...props }) {
  return (
    <View style={styles.panel}>
      <Slider
        childrenContainer={{
          backgroundColor: theme.colors.primary,
        }}
        onEndReached={onConfirm}
        containerStyle={{
          margin: 8,
          backgroundColor: theme.colors.primary,
          borderRadius: 10,
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
          height: 70,
        }}
        sliderElement={
          <Image
            style={styles.sliderElement}
            source={require("../../assets/images/chevron-right.png")}
          />
        }
        {...props}
      >
        <Text style={styles.sliderLabel}>{label}</Text>
      </Slider>
    </View>
  )
}

ConfirmSlider.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  panel: {
    height: 200,
    padding: 20,
    backgroundColor: "white",
  },
  sliderElement: {
    width: 50,
    margin: 15,
    borderRadius: 5,
    height: 50,
    marginLeft: 30,
  },
  sliderLabel: { color: "white" },
})
export default ConfirmSlider
