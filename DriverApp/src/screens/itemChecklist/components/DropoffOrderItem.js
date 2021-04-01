import React from "react";
import PropTypes from "prop-types";
import { List as PaperList } from "react-native-paper";

import { ORDER_ITEM } from "@modeliver_admin/models-util";

import List from "../../../components/List/List";

function DropoffOrderItem({ items }) {
  return (
    <List
      data={items}
      renderItem={item => (
        <PaperList.Item title={ORDER_ITEM.renderOrderItem(item)} />
      )}
    />
  );
}

DropoffOrderItem.propTypes = {
  items: PropTypes.array.isRequired
};
export default DropoffOrderItem;
