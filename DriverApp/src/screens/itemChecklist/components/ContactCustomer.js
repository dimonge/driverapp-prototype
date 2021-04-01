import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import {
  Button,
  Subheading,
  IconButton,
  Colors,
  Headline,
  Title
} from "react-native-paper";

function ContactCustomer({ t, onCallConsumer }) {
  return (
    <View style={styles.container}>
      <Title>{t("headerContactCustomer")}</Title>
      <View style={styles.contactAction}>
        <Button icon="phone" mode="outlined" onPress={() => onCallConsumer()}>
          {t("buttonCall")}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 20
  },
  contactAction: {
    marginTop: 40
  }
});
ContactCustomer.propTypes = {
  t: PropTypes.func.isRequired,
  onCallConsumer: PropTypes.func.isRequired
};
export default ContactCustomer;
