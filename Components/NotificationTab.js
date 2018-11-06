import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Alert, RefreshControl} from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { SearchBar } from 'react-native-elements';
import Search from 'react-native-search-box';
import { Container, Header, Content, Body, Right, Left } from 'native-base';
import { Avatar, ListItem, List } from 'react-native-elements';
import { userInfo } from '../API/UserInfo';

export default class NotificationTab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notification : [],
            refreshing: false
        }
    }

    componentWillMount() {
        userInfo.getNotifications().then(((res) => {
            if (res.length === 0) {
                this.setState({
                notification: [],
                refreshing: false
            })
            } else {
                this.setState({
                    notification: res,
                    refreshing: false
                })
            }
        }))
    }

    _onRefresh = () => {
        this.setState(
            {notification : [],
            refreshing: true}
        );
        userInfo.getNotifications().then(((res) => {
            if (res.length === 0) {
                this.setState({
                notification: [],
                refreshing: false
            })
            } else {
                this.setState({
                    notification: res,
                    refreshing: false
                })
            }
        }))
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
        <Container>
            <Header>
                <Body>
                    <Text>
                        Notification
                    </Text>
                </Body>
            </Header>
            <ScrollView>
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }
                <View>
                {
                    this.state.notification.map((l, i) => (
                    <ListItem 
                        onPress = {
                            async () => {
                                console.log(l);
                                let d = new Date();
                                let time = d.toISOString();
                                await userInfo.putNotifications(time);
                                this.props.navigation.navigate('Web', {url: l.repository.html_url})
                            }
                        }
                        key = {i}
                        title={`${l.subject.title}`}
                        rightSubtitle = {`Type:${l.subject.type}`}
                        subtitle = {`reason: ${l.reason}`}
                        rightTitle={l.unread === true ? 'unread' : 'read'}
                        hideChevron
                    />
                    ))
                }
                </View>
            </ScrollView>
        </Container>
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
