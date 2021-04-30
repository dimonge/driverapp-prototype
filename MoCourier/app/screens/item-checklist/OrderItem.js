import React from 'react';
import PropTypes from 'prop-types';
import {TouchableHighlight, Text} from 'react-native';
import {List as PaperList} from 'react-native-paper';
import {ORDER_ITEM} from '@modeliver_admin/models-util';

import {Checkbox, CHECKBOX_TYPE} from '../../components';

function OrderItem({item, onPicked}) {
  const itemPicked = item.picked
    ? CHECKBOX_TYPE.CHECKED
    : CHECKBOX_TYPE.UNCHECKED;
  return (
    <TouchableHighlight
      underlayColor={'#ff00ff00'}
      onPress={() => {
        onPicked({...item, picked: !item.picked});
      }}>
      <PaperList.Item
        left={item => (
          <PaperList.Icon
            icon={
              itemPicked === CHECKBOX_TYPE.CHECKED
                ? 'checkbox-marked-circle'
                : 'checkbox-blank-circle-outline'
            }
          />
        )}
        title={
          <Text style={{fontWeight: 'bold'}}>
            {ORDER_ITEM.renderOrderItem(item)}
          </Text>
        }
      />
    </TouchableHighlight>
  );
}

OrderItem.propTypes = {
  item: PropTypes.object.isRequired,
  onPicked: PropTypes.func.isRequired,
};

export default OrderItem;
