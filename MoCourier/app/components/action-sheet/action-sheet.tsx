import React from "react"
import PropTypes from "prop-types"
import RNActionSheet from "react-native-actions-sheet"
import { ReactNode } from "react"

type ActionSheetProps = {
  actionSheetRef: any
  onPositionChanged: (onReachedTop: boolean) => void
  children: ReactNode
}
// https://github.com/ammarahm-ed/react-native-actions-sheet
function ActionSheet({ actionSheetRef, onPositionChanged, children, ...props }: ActionSheetProps) {
  return (
    <RNActionSheet ref={actionSheetRef} {...props} onPositionChanged={onPositionChanged}>
      {children}
    </RNActionSheet>
  )
}

ActionSheet.propTypes = {
  children: PropTypes.element.isRequired,
  actionSheetRef: PropTypes.func,
}

ActionSheet.defaultProps = {
  actionSheetRef: null,
}

export default ActionSheet
