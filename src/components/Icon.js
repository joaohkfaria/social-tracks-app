import React from 'react';
import PropTypes from 'prop-types';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../constants/Colors';

const Icon = ({
  name, color,
  size, style,
}) => (
  <FAIcon
    name={name}
    color={color}
    size={size}
    style={style}
  />
);

Icon.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.object,
};

Icon.defaultProps = {
  name: '',
  color: Colors.default,
  size: 12,
  style: {},
};

export default Icon;
