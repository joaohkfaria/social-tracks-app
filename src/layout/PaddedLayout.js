import { View } from 'react-native';
import styled from 'styled-components';
import { isIphoneX, getBottomSpace } from 'react-native-iphone-x-helper';

const defaultPadding = 15;

const PaddedLayout = styled(View)`
  padding: ${defaultPadding}px;
  flex: 1;
  padding-bottom: ${isIphoneX() ? `${getBottomSpace()}px` : `${defaultPadding}px`};
  background-color: #111;
`;

export default PaddedLayout;
