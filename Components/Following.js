import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Avatar, ListItem, List } from 'react-native-elements';
import { Content, Container } from 'native-base';
import { userInfo } from '../API/UserInfo';

export default class Following extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            following : []
        }
    }

    static navigationOptions = {
        title: 'Following'
    }

    componentWillMount() {
        userInfo.getFollowing().then(((res) => {
            this.setState({
                following: res
            })
        }))
    }

    render() {
        return (
            <Container>
                <View>
                    {
                        this.state.following.map((item, i) => (
                            <ListItem
                                key = {i}
                                roundAvatar
                                title = { item.login }
                                avatar = {{ uri: item.avatar_url }}
                                chevronColor="white"
                                chevron
                            />
                        ))
                    }
                </View>
            </Container>
        );
    }
}