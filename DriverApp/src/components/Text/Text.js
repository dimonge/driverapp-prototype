import React from 'react';
import {Text as NativeText} from 'native-base';
import {Headline, Title, Subheading, Text as RNText} from 'react-native-paper';

export const Text = ({children, ...props}) => (
  <NativeText {...props}>{children}</NativeText>
);

export const Header = ({children, ...props}) => (
  <NativeText {...props}>{children}</NativeText>
);

export const SubHeader = ({children, ...props}) => (
  <NativeText {...props}>{children}</NativeText>
);

export const MDHeadline = ({children, ...props}) => (
  <Headline {...props}>{children}</Headline>
);

export const MDTitle = ({children, ...props}) => (
  <Title {...props}>{children}</Title>
);
export const MDSubheading = ({children, ...props}) => (
  <Subheading {...props}>{children}</Subheading>
);

export const MDText = ({children, ...props}) => (
  <RNText {...props}>{children}</RNText>
);
