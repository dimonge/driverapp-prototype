import React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  return navigateRef.current?.navigate(name, params);
}
