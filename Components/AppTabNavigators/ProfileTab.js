import React from 'react';
import { StyleSheet, View, Image, ScrollView, Dimensions, Button } from 'react-native';
import { Container, Header, Body, Text, Grid, Row, Col, Content, Separator } from 'native-base';
import { Avatar, ListItem, List } from 'react-native-elements';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Repository from './Repository';
import Stars from './Stars';

export default class ProfileTab extends React.Component {
    static navigationOptions = {
        title: 'Profile User Name'
    }

    render() {
        const { width } = Dimensions.get('window');
        return (
            <Container>
                <Content>
                    <View style = {{ paddingTop: 20, paddingLeft: 10}}>
                        <View style={{flexDirection: 'row'}}>
                            <View style = {{ flex:1}}>
                                <Image
                                    style={{width: width*0.3, height: width*0.3, borderRadius: width*0.15}}
                                    source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}
                                    />
                            </View>
                            <View style = {{ flex:2 }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        alignItems: 'flex-end'
                                    }}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text onPress = {()=>{
                                            this.props.navigation.navigate('Follower');
                                        }}>4</Text>
                                        <Text style={{ fontSize: 10, color: 'grey' }}>Followers</Text>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text onPress={()=>{
                                            this.props.navigation.navigate('Following');
                                        }}>4</Text>
                                        <Text style={{ fontSize: 10, color: 'grey' }}>Following</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>      
                        <List>
                            <ListItem
                                title="Name"
                                rightTitle={'Zhanyan Zhu'}
                                hideChevron
                            />
                            <ListItem
                                title="Username"
                                rightTitle={'zzhu41'}
                                hideChevron
                            />
                            <ListItem
                                title="Website"
                                rightTitle={''}
                                hideChevron
                            />
                            <ListItem
                                title="Email"
                                rightTitle={'zhuzhanyan97@gmail.com'}
                                hideChevron
                            />
                            <ListItem
                                title="Location"
                                rightTitle={'Champaign'}
                                hideChevron
                            />
                            <ListItem
                                title="Company"
                                rightTitle={'UIUC'}
                                hideChevron
                            />
                            <ListItem
                                title="Create date"
                                hideChevron
                            />
                        </List>
                    </View>
                    <View>
                        <List>
                            <ListItem
                                onPress = {() => {
                                    this.props.navigation.navigate('Repository');
                                }}
                                title = "Repositories"
                                hideChevron
                            />
                            <ListItem
                                onPress = {() => {
                                    this.props.navigation.navigate('Stars');
                                }}
                                title="Stars"
                                hideChevron
                            />
                        </List>
                    </View>
                </Content>
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
