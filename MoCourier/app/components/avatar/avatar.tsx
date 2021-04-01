import * as React from "react"

import { Avatar as RNAvatar } from "react-native-elements"

export interface AvatarProps {
  /**
   * An optional style override useful for padding & margin.
   */
  title: string
}

/**
 * Describe your component here
 */
export function Avatar(props: AvatarProps) {
  const { title } = props

  return <RNAvatar title={title} {...props} />
}
