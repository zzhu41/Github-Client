import React from 'react';
import { StyleSheet, View, Image, ScrollView, Dimensions, Button, RefreshControl, AsyncStorage} from 'react-native';
import { Container, Header, Body, Text, Grid, Row, Col, Content, Separator, Left, Right} from 'native-base';
import { Avatar, ListItem, List } from 'react-native-elements';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Repository from './Repository';
import Stars from './Stars';
import { userInfo } from '../../API/UserInfo'
export default class ProfileTab extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            user : {},
            refreshing: false
        }
    }

    /**
     * get basic user informations from github api 
     */
    async componentWillMount() {
        const value = await AsyncStorage.getItem('name');
        console.log(value)
        let username;
        if (this.props.navigation.state.params) {
            username = this.props.navigation.state.params.login
        } else {
            username = 'zzhu41';
        }
        userInfo.getUserInfo(username).then((async (res) => {
            this.setState({
                user: res,
                refreshing: false
            })
            try {
                await AsyncStorage.multiSet([
                    ['username', res.login.toString()], 
                    ['name', res.name],
                    ['followers_num', res.followers.toString()],
                    ['following_num', res.following.toString()],
                    ['company', res.company.toString()],
                    ['location', res.location.toString()],
                    ['bio', res.bio.toString()],
                    ['avatar_url', res.avatar_url.toString()]
                ]);
            } catch (error) {
                console.log(error);
            }
        }))
    }

    /**
     * set the title of profile tab page
     */
    static navigationOptions = {
        //title: 'Profile'
        header: null
    }

    _onRefresh = () => {
        this.setState({user : {},
            refreshing: true});
        let username;
        if (this.props.navigation.state.params) {
            username = this.props.navigation.state.params.login
        } else {
            username = 'zzhu41';
        }
        userInfo.getUserInfo(username).then(((res) => {
            console.log(res.following)
            this.setState({
                user: res,
                refreshing: false
            })
        }))
    }
    
    render() {
        const { width } = Dimensions.get('window');
        return (
            <Container>
                <Header>
                    <Left>
                    </Left>
                    <Body>
                        <Text>
                        Search
                        </Text>
                    </Body>
                    <Right>
                        <Button
                            title="+"
                            onPress = {
                                () => {
                                    this.props.navigation.push('SearchUser');
                                }
                            }
                        />
                    </Right>
                </Header>
                <ScrollView> 
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                    <Content>
                        <View style = {{ paddingTop: 20, paddingLeft: 10}}>
                            <View style={{flexDirection: 'row'}}>
                                <View style = {{ flex:1}}>
                                    <Image
                                        style={{width: width*0.3, height: width*0.3, borderRadius: width*0.15}}
                                        source={{uri: this.state.user.avatar_url}}
                                        />
                                </View>
                                <View style = {{ flex:2 , marginTop: width*0.05}}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-around',
                                            alignItems: 'flex-end'
                                        }}>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text onPress = {()=>{
                                                this.props.navigation.push('Followers', {user: this.state.user.login})
                                            }}>{ this.state.user.followers }</Text>
                                            <Text style={{ fontSize: 10, color: 'grey' }}>Followers</Text>
                                        </View>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text onPress={()=>{
                                                this.props.navigation.push('Following', {user: this.state.user.login})
                                            }}>{ this.state.user.following }</Text>
                                            <Text style={{ fontSize: 10, color: 'grey' }}>Following</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
                                        <Text style={{ fontSize: 15, color: 'grey' }}>{ this.state.user.bio }</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View>      
                            <List>
                                <ListItem
                                    title="Name"
                                    rightTitle={ this.state.user.name }
                                    hideChevron
                                />
                                <ListItem
                                    title="Username"
                                    rightTitle={ this.state.user.login }
                                    hideChevron
                                />
                                <ListItem
                                    title="Website"
                                    rightTitle={''}
                                    hideChevron
                                />
                                <ListItem
                                    title="Email"
                                    rightTitle={ this.state.user.email }
                                    hideChevron
                                />
                                <ListItem
                                    title="Location"
                                    rightTitle= { this.state.user.location }
                                    hideChevron
                                />
                                <ListItem
                                    title="Company"
                                    rightTitle = { this.state.user.company }
                                    hideChevron
                                />
                                <ListItem
                                    title="Create date"
                                    rightTitle = { this.state.user.created_at }
                                    hideChevron
                                />
                            </List>
                        </View>
                        <View>
                            <List>
                                <ListItem
                                    onPress = {() => {
                                        this.props.navigation.push('Repository', {user: this.state.user.login})
                                    }}
                                    title = "Repositories"
                                    hideChevron
                                />
                                <ListItem
                                    onPress = {() => {
                                        this.props.navigation.push('Stars', {user: this.state.user.login})
                                    }}
                                    title="Stars"
                                    hideChevron
                                />
                            </List>
                        </View>
                    </Content>
                </ScrollView> 
            </Container>
        );
    }
}
const RootStack = createStackNavigator(
    {
      Repo: Repository
    }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
