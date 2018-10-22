import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Body, Container, Header, Content } from 'native-base';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

export default class Stars extends React.Component {
    static navigationOptions = {
        title: 'starred repositories'
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>This Tab is for starred repositories</Text>
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
