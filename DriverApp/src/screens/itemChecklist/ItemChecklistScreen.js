import React, { useState } from "react";
import PropTypes from "prop-types";
import { TouchableHighlight } from "react-native";
import { List as PaperList, Checkbox } from "react-native-paper";

import List from "../../components/List/List";

const ItemChecklistScreen = ({ orderItems, onSelect }) => {
  const [selectedItemId, setSelectedItemId] = useState([]);
  const handleCheckItem = item => {
    setSelectedItemId([...selectedItemId, item.id]);
    onSelect([...selectedItemId, item.id]);
  };

  const isItemChecked = ({ id }) =>
    selectedItemId.indexOf(id) !== -1 ? true : false;

  const renderList = (
    <List
      data={orderItems}
      renderItem={item => (
        <TouchableHighlight onPress={() => handleCheckItem(item)}>
          <PaperList
            title={`${item.quantity} x ${item.name}`}
            left={props => <Checkbox {...props} status={isItemChecked} />}
          />
        </TouchableHighlight>
      )}
    />
  );
  return renderList;
};

ItemChecklistScreen.propTypes = {
  orderItems: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default ItemChecklistScreen;
