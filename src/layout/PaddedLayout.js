import { View } from 'react-native';
import styled from 'styled-components';
import { isIphoneX, getBottomSpace } from 'react-native-iphone-x-helper';
import Colors from '../constants/Colors';

const defaultPadding = 15;

const PaddedLayout = styled(View)`
  padding: ${defaultPadding}px;
  flex: 1;
  padding-bottom: ${isIphoneX() ? `${getBottomSpace()}px` : `${defaultPadding}px`};
  background-color: ${Colors.defaultBackground};
`;

export default PaddedLayout;
