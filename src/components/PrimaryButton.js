import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, View, Text } from 'react-native';
import styled from 'styled-components';
import Colors from '../constants/Colors';
import Icon from './Icon';

const InsideContainer = styled(View)`
  align-items: center;
  justify-content: center;
  padding: 7px;
  flex-direction: row;
  background-color: ${({ bgColor }) => Colors[bgColor]};
  border-radius: 3px;
  padding-left: 10px;
  padding-right: 20px;
`;

const Label = styled(Text)`
  color: white;
  font-size: 14px;
  font-weight: 500;
  margin-left: 10px;
`;

const PrimaryButton = ({
  iconName, title,
  backgroundColor, onPress,
}) => (
  <TouchableHighlight
    title={title}
    onPress={onPress}
    underlayColor="#fff"
    activeOpacity={0.9}
    style={{ borderRadius: 3 }}
  >
    <InsideContainer
      bgColor={backgroundColor}
    >
      {
        iconName
        && (
          <Icon
            name={iconName}
            color="white"
            size={25}
          />
        )
      }
      <Label>
        {title}
      </Label>
    </InsideContainer>
  </TouchableHighlight>
);

PrimaryButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  backgroundColor: PropTypes.string,
  iconName: PropTypes.string,
};

PrimaryButton.defaultProps = {
  title: '',
  onPress: () => null,
  backgroundColor: 'default',
  iconName: null,
};

export default PrimaryButton;
