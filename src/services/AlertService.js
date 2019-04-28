import { Alert } from 'react-native';

export function showOkAlert(title, msg, onPressOk = () => null) {
  Alert.alert(title, `${msg}`, [{ text: 'OK', onPress: onPressOk }], { cancelable: false });
}
