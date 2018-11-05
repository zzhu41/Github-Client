import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Stars from './Components/AppTabNavigators/Stars';
import Repository from './Components/AppTabNavigators/Repository';
import { Container } from 'native-base';
import ProfileTab from './Components/AppTabNavigators/ProfileTab';
import ActivityTab from './Components/AppTabNavigators/ActivityTab';
import Follower from './Components/Follower';
import Following from './Components/Following';
import Web from './Components/WebView';
import SearchUserPage from './Components/SearchUserPage';
import VisualizationPage from './Components/VisualizationPage';
export default class App extends React.Component {
  render() {
    return (
      <TabNavigator />
    );
  }
}

const Activity = createStackNavigator({
  Activity: {
    screen: ActivityTab
  },
  Web: {
    screen: Web
  }
})

const Profile = createStackNavigator({
  Profile: {
    screen: ProfileTab
  },
  Stars: {
    screen: Stars
  },
  Repository: {
    screen: Repository
  },
  Followers: {
    screen: Follower
  },
  Following: {
    screen: Following
  },
  Web: {
    screen: Web
  },
  SearchUser: {
    screen: SearchUserPage
  },
  Visual: {
    screen: VisualizationPage
  }
})

// to hide tab bar
Profile.navigationOptions = ({ navigation }) => {
  if(navigation.state.index==1){
      return {
          tabBarVisible: false,
      };
  }
  return {
      tabBarVisible: true,
  };
};

const TabNavigator = createBottomTabNavigator({
  Search: Activity,
  Profile: Profile
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
