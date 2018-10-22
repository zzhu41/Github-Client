import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Content } from 'native-base';

export default class Following extends React.Component {
    static navigationOptions = {
        title: 'Profile User Name'
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>This Tab is the following page</Text>
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
