import React from 'react';
import { StyleSheet, Text, View, ScrollView, WebView } from 'react-native';
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
    componentWillMount() {
        userInfo.getRepoInfo().then(((res) => {
            this.setState({
                repoList: res
            })
        }))
    } 

    render() {
        return (
            <Container>
                <View>
                    {
                        this.state.repoList.map((l, i) => (
                            <ListItem onPress = {
                                () => {
                                    this.props.navigation.navigate('Web', {url: l.html_url})
                                }
                            }
                                key = {i}
                                title={`${l.owner.login}/${l.name}`}
                                subtitle={l.description}
                                chevronColor="white"
                            />
                        ))
                    }
                </View>
            </Container>
        );
    }
}
