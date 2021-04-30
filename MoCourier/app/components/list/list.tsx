import React from 'react';
import PropTypes from 'prop-types';
import {FlatList, View, StyleSheet} from 'react-native';

const List = ({data, renderItem}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

List.propTypes = {
  data: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
});
export default List;
