import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, AsyncStorage} from 'react-native';
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

    async componentWillMount() {
        let username = 'zzhu41';
        if (this.props.navigation.state.params) {
            username = this.props.navigation.state.params.user;
        }
        userInfo.getFollowing(username).then((async (res) => {
            this.setState({
                following: res
            })
            let followinglist = '';
            res.map((item) => {
                followinglist += item.login.toString() + '@';
            })
            try {
                await AsyncStorage.setItem('following', followinglist);
            } catch (error) {
                console.log(error);
            }
        }))  
    }

    render() {
        return (
            <ScrollView>
                <View>
                    {
                        this.state.following.map((item, i) => (
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