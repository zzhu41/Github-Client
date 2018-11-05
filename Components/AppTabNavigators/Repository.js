import React from 'react';
import { StyleSheet, Text, View, ScrollView, WebView, Alert, AsyncStorage} from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Avatar, ListItem, List } from 'react-native-elements';
import { Content, Container } from 'native-base';
import { userInfo } from '../../API/UserInfo';
export default class Repository extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            repoList : []
        }
    }

    static navigationOptions = {
        title: 'Repositories'
    }

    /**
     * fetch repository info from github api
     */
    async componentWillMount() {
        let username = 'zzhu41';
        if (this.props.navigation.state.params) {
            username = this.props.navigation.state.params.user;
        }
        userInfo.getRepoInfo(username).then((async (res) => {
            this.setState({
                repoList: res
            })
            let rlist = '';
            res.map((item) => {
                rlist += `${item.owner.login}/${item.name}` + '@';
            })
            try {
                await AsyncStorage.setItem('repositories', rlist);
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
                        this.state.repoList.map((l, i) => (
                            <ListItem onPress = {
                                    () => {
                                        this.props.navigation.navigate('Web', {url: l.html_url})
                                    }
                                }
                                onLongPress = {
                                    () => {
                                        Alert.alert(
                                            'Repo',
                                            undefined,
                                            [
                                                {text: 'Star', onPress: async() => await userInfo.starRepo(l.owner.login,l.name)},
                                                {text: 'Unstar', onPress: async () => await userInfo.unstarRepo(l.owner.login,l.name)},
                                                {text: 'Data', onPress:() =>  this.props.navigation.push('Visual')}, 
                                                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                            ],
                                            { cancelable: false }
                                          )
                                    }
                                }
                                key = {i}
                                title={`${l.owner.login}/${l.name}`}
                                subtitle={l.description}
                                hideChevron
                            />
                        ))
                    }
                </View>
            </ScrollView>
        );
    }
}
