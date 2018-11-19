import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Text } from 'react-native';
import styled from 'styled-components';
import Colors from '../constants/Colors';

const StyledInput = styled(TextInput)`
  padding: 12px;
  background: transparent;
`;

const InputView = styled(View)`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 3px;
`;

const Label = styled(Text)`
  font-size: 12px;
  font-weight: 600;
  color: ${Colors.white};
  margin-bottom: 5px;
`;

const Input = ({ label, ...props }) => (
  <View style={{ flexDirection: 'column', marginBottom: 5 }}>
    {
      label && (
        <Label>
          {`${label.toUpperCase()}:`}
        </Label>
      )
    }
    <InputView>
      <StyledInput {...props} />
    </InputView>
  </View>
);

Input.propTypes = {
  label: PropTypes.string,
};

Input.defaultProps = {
  label: null,
};

export default Input;
