import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, AsyncStorage} from 'react-native';
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

    async componentWillMount() {
        let username = 'zzhu41';
        if (this.props.navigation.state.params) {
            username = this.props.navigation.state.params.user;
        }
        userInfo.getFollowers(username).then((async (res) => {
            this.setState({
                followers: res
            })
            let followerlist = '';
            res.map((item) => {
                followerlist += item.login.toString() + '@';
            })
            try {
                await AsyncStorage.setItem('followers', followerlist);
            } catch (error) {
                console.log(error);
            }
        }))
    }

    render() {
        const swipeSettings = {
            autoClose: true,
            right: [
                {
                    onPress : () => {

                    },
                    text : 'DDD', type: 'delete'
                }
            ]
        }
        return (
            <ScrollView>
                <View>
                    {
                        this.state.followers.map((item, i) => (
                            <ListItem onPress = {
                                    () => {
                                        this.props.navigation.push('Profile', {login: item.login})
                                    }
                                }
                                onLongPress = {
                                    () => {
                                        Alert.alert(
                                            'User',
                                            undefined,
                                            [
                                                {text: 'Follow', onPress: async() => await userInfo.followUser(item.login)},
                                                {text: 'Unfollow', onPress: async () => await userInfo.unfollowUser(item.login)},
                                                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                            ],
                                            { cancelable: false }
                                          )
                                    }
                                }
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
            </ScrollView>
        );
    }
}