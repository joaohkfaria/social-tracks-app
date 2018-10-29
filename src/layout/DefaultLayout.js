import { View } from 'react-native';
import styled from 'styled-components';
import { isIphoneX, getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import Colors from '../constants/Colors';

const defaultPadding = 15;

const DefaultLayout = styled(View)`
  padding: ${({ padded }) => (padded ? defaultPadding : 0)}px;
  flex: 1;
  padding-bottom: ${({ padded }) => (padded && isIphoneX() ? `${getBottomSpace()}px` : `${defaultPadding}px`)};
  background-color: ${Colors.defaultBackground};
  paddingTop: ${({ paddingBar }) => (paddingBar ? (getStatusBarHeight() + defaultPadding + 20) : 0)}px;
`;
export default DefaultLayout;
