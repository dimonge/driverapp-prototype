import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {Dialog, Portal, Divider} from 'react-native-paper';

function CustomDialog({title, content, actions}) {
  return (
    <View>
      <Portal>
        <Dialog dismissable={false} style={styles.dialogContainer} visible>
          <Dialog.Title style={styles.dialogTitle}>{title}</Dialog.Title>
          <Divider />
          <Dialog.Content>
            <View style={styles.dialogContent}>{content}</View>
          </Dialog.Content>
          {actions ? (
            <React.Fragment>
              <Divider />
              <Dialog.Actions>{actions}</Dialog.Actions>
            </React.Fragment>
          ) : null}
        </Dialog>
      </Portal>
    </View>
  );
}

CustomDialog.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  content: PropTypes.element.isRequired,
  actions: PropTypes.element,
};

CustomDialog.defaultProps = {
  title: '',
  actions: null,
};

const styles = StyleSheet.create({
  dialogContainer: {
    //flexDirection: "column"
  },
  dialogTitle: {textAlign: 'center'},
  dialogContent: {
    flex: 0,
    alignItems: 'center',
    marginBottom: 30,
  },
});

export default CustomDialog;
