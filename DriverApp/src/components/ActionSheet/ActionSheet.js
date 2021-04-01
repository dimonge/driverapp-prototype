import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import RNActionSheet from 'react-native-actions-sheet';

// https://github.com/ammarahm-ed/react-native-actions-sheet
function ActionSheet({actionSheetRef, children, ...props}) {
  return (
    <RNActionSheet ref={actionSheetRef} {...props}>
      {children}
    </RNActionSheet>
  );
}

ActionSheet.propTypes = {
  children: PropTypes.element.isRequired,
  actionSheetRef: PropTypes.func,
};

ActionSheet.defaultProps = {
  actionSheetRef: null,
};

export default ActionSheet;
