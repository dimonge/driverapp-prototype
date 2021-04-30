import React, { useState } from "react";
import PropTypes from "prop-types";
import { ScrollView, View, Alert } from "react-native";
import {
  List as PaperList,
  Title,
  Paragraph,
  Divider,
  Chip,
  withTheme
} from "react-native-paper";

import List from "../../components/List/List";
import ConfirmSlider from "../../components/ConfirmSlider";
import OrderItem from "./OrderItem";
import i18n from "i18n-js";
import { DELIVERY, STORE, ORDER, CUSTOMER } from "@modeliver_admin/models-util";

function OrderScreen({ theme, data }) {
  const orderItems = DELIVERY.getOrderItems(data);

  const [items, setItems] = useState(orderItems);

  function _onItemPicked(newItem) {
    const updateItems = items.map(item => {
      if (item.id === newItem.id) {
        return newItem;
      } else {
        return item;
      }
    });
    console.log("item", updateItems);
    setItems(updateItems);
  }

  const itemCheckedCount = items.reduce((total, item) => {
    if (item.picked) {
      return total + 1;
    }
    return total;
  }, 0);

  const storeName = STORE.getStoreName(DELIVERY.getStore(data));
  const orderNumber = ORDER.getOrderNumber(DELIVERY.getOrder(data));

  const header = (
    <View style={{ margin: 15, flexWrap: "wrap" }}>
      <Paragraph>{i18n.t("headerPickupFrom")}</Paragraph>
      <Title>{storeName}</Title>
      <View style={{ alignItems: "flex-start" }}>
        <Chip
          disabled
          textStyle={{ color: "white" }}
          style={{ backgroundColor: theme.colors.primary }}
        >
          {orderNumber}
        </Chip>
      </View>
    </View>
  );
  const customerName = CUSTOMER.fullName(DELIVERY.getCustomer(data));
  const customer = (
    <PaperList.Item
      title={customerName}
      left={props => <PaperList.Icon {...props} icon="account-circle" />}
    />
  );

  const customerMessage = (
    <PaperList.Item
      title={DELIVERY.getDestinationComments(data)}
      left={props => <PaperList.Icon {...props} icon="message" />}
    />
  );

  const list = (
    <PaperList.Section>
      <PaperList.Subheader>{i18n.t("headerItems")}</PaperList.Subheader>
      <List
        data={items}
        renderItem={item => <OrderItem item={item} onPicked={_onItemPicked} />}
      />
    </PaperList.Section>
  );

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <ScrollView
        style={{
          flexDirection: "column",
          marginTop: 20,
          flexWrap: "wrap"
        }}
      >
        {header}
        <Divider />
        {customer}
        <Divider />
        {customerMessage}
        <Divider />
        {list}
        <Divider />
      </ScrollView>
      <View style={{ flexDirection: "column", justifyContent: "flex-end" }}>
        <ConfirmSlider
          onConfirm={() => Alert.alert("Item has been picked")}
          label={
            itemCheckedCount !== items.length
              ? i18n.t("buttonMarkItems")
              : i18n.t("buttonItemReceived")
          }
          disabled={itemCheckedCount !== items.length}
        />
      </View>
    </View>
  );
}

OrderScreen.propTypes = {
  data: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withTheme(OrderScreen);
