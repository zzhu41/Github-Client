import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Avatar, ListItem, List } from 'react-native-elements';
import { Content, Container } from 'native-base';
import { userInfo } from '../API/UserInfo';

export default class Follower extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            followers : []
        }
    }

    static navigationOptions = {
        title: 'Followers'
    }

    componentWillMount() {
        userInfo.getFollowers().then(((res) => {
            this.setState({
                followers: res
            })
        }))
    }

    render() {
        return (
            <Container>
                <View>
                    {
                        this.state.followers.map((item, i) => (
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