import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import Stars from './Stars'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

export default class ActivityTab extends React.Component {

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>This Tab is for activity</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
