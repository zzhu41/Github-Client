import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Alert} from 'react-native';
import Stars from './Stars'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { SearchBar } from 'react-native-elements';
import Search from 'react-native-search-box';
import { Container, Header, Content, Body, Right, Left } from 'native-base';
import { userInfo } from '../../API/UserInfo';
import { Avatar, ListItem, List } from 'react-native-elements';

export default class ActivityTab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      repo : [],
      loading: false
    }
  }

  searchRepo = async(text) => {
    this.setState({ loading: true});
    userInfo.repoSearch(text).then(((res) => {
      if (res.length === 0) {
        this.setState({
          repo: [],
          loading: false
      })
      } else {
        this.setState({
            repo: res.items,
            loading: false
        })
      }
  }))
  }
  
  /**
   * this is the tab to search repo
   */
  static navigationOptions = {
    title: 'Search'
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content>
          <View style={{ flex: 1}}>
            <Search
              loading = {this.state.loading}
              ref="search for repositories"
              onChangeText = {
                (text) => {
                  console.log(`TEXT: ${text} CHANGED [DEBUG]`)
                }
              }
              onSearch = {
                (text) => {
                  this.searchRepo(text);
                }
              }
            />
            <ScrollView>
                  <View>
                    {
                      this.state.repo.map((l, i) => (
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
                                          {text: 'Data', onPress:() =>  this.props.navigation.push('Visual', {user: l.owner.login, repo: l.name})}, 
                                          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                      ],
                                      { cancelable: false }
                                    )
                              }
                            }
                            key = {i}
                            title={l.full_name}
                            subtitle={`Star:${l.stargazers_count}   Fork:${l.forks_count}`}
                            hideChevron
                        />
                      ))
                    }
                  </View>
            </ScrollView>
          </View>
        </Content>
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
