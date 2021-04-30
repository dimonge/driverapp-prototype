import React from "react"
import PropTypes from "prop-types"

import { Avatar } from "./avatar"

function ProfileImage({ size, uri, color, label, ...props }: any) {
  if (!uri || !label) {
    console.error("Profile image url or label is missing. You need to add one of those.")
  }
  if (!uri && !!label) {
    return <Avatar rounded title={label} color={color} {...props} />
  }
  return <Avatar size={size} source={{ uri: uri }} {...props} />
}

ProfileImage.propTypes = {
  size: PropTypes.number,
  uri: PropTypes.string,
  color: PropTypes.string,
  label: PropTypes.string,
}

ProfileImage.defaultProps = {
  size: 24,
  uri: null,
  color: "blue",
  label: "",
}
export default ProfileImage
