import Color from 'color';

const black = '#000000';
const tintColor = '#2f95dc';

export default {
  primary: '#3DB24B',
  secondary: '#f6a512',
  black: '#000',
  grey: '#F1F2F6',
  blue: '#3369FF',
  tintColor,
  tabIconDefault: '#ccc',
  tabIconSelected: tintColor,
  tabBar: '#fefefe',
  errorBackground: 'red',
  background: '#fff',
  errorText: '#fff',
  warningBackground: '#EAEB5E',
  warningText: '#666804',
  noticeBackground: tintColor,
  noticeText: '#fff',
  polyLineStrokeColor: 'rgba(255,140,0,0.8)',
  cream: '#f7f5eee8',
  success: '#4caf50',
  white: '#FFFFFF',
  loadingColor: '#3F51B5',
  disabled: Color(black)
    .alpha(0.26)
    .rgb()
    .string(),
  placeholder: Color(black)
    .alpha(0.54)
    .rgb()
    .string(),
  backdrop: Color(black)
    .alpha(0.5)
    .rgb()
    .string(),
};
