import { Alert } from 'react-native';

export function showOkAlert(title, msg, onPressOk = () => null) {
  Alert.alert(title, `${msg}`, [{ text: 'OK', onPress: onPressOk }], { cancelable: false });
}

export function showYesNoAlert(title, msg, onPressYes = () => null, onPressNo = () => null) {
  Alert.alert(
    title,
    `${msg}`,
    [
      { text: 'No', onPress: onPressNo },
      { text: 'Yes', onPress: onPressYes },
    ],
    { cancelable: false },
  );
}
