import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Text } from 'react-native';
import styled from 'styled-components';
import Colors from '../constants/Colors';

const StyledInput = styled(TextInput)`
  background-color: ${Colors.white};
  padding: 15px;
`;

const Label = styled(Text)`
  font-size: 14px;
  color: ${Colors.white};
  margin-bottom: 5px;
`;

const Input = ({ label, ...props }) => (
  <View style={{ flexDirection: 'column' }}>
    {
      label && (
        <Label>
          {`${label}:`}
        </Label>
      )
    }
    <StyledInput {...props} />
  </View>
);

Input.propTypes = {
  label: PropTypes.string,
};

Input.defaultProps = {
  label: null,
};

export default Input;
