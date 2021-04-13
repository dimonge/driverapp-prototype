import * as React from "react"
import { BottomSheetProps } from "./bottom-sheet.props"
import { BottomSheet as RNEBottomSheet } from "react-native-elements"

export function BottomSheet(props: BottomSheetProps) {
  return <RNEBottomSheet {...props} />
}

BottomSheet.defaultProps = {
  isVisible: false,
  modalProps: {},
}
