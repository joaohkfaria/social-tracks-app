import { View } from 'react-native';
import styled from 'styled-components';
import { isIphoneX, getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import Colors from '../constants/Colors';

const defaultPadding = 15;

const DefaultLayout = styled(View)`
  padding: ${({ padded }) => (padded ? defaultPadding : 0)}px;
  flex: 1;
  padding-bottom: ${({ padded }) => {
    if (padded && isIphoneX()) return `${getBottomSpace()}px`;
    if (padded) return `${defaultPadding}px`;
    return 0;
  }};
  background-color: ${Colors.defaultBackground};
  padding-top: ${({ padded, paddingBar }) => {
    if (paddingBar && isIphoneX()) {
      return getStatusBarHeight() + defaultPadding + 20;
    }
    if (padded) return defaultPadding;

    return 0;
  }}px;
`;
export default DefaultLayout;
