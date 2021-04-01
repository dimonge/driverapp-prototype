import React from 'react';
import PropTypes from 'prop-types';
import BottomSheet from 'reanimated-bottom-sheet';
import {View, StyleSheet} from 'react-native';

function RenderHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );
}
function CustomBottomSheet({content, header, ...props}) {
  const bottomRef = React.createRef();
  return (
    <BottomSheet
      ref={bottomRef}
      renderContent={content}
      renderHeader={header}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    shadowColor: '#000000',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
});

CustomBottomSheet.propTypes = {
  header: PropTypes.func,
  content: PropTypes.element.isRequired,
};

CustomBottomSheet.defaultProps = {
  header: RenderHeader,
};

export default CustomBottomSheet;
