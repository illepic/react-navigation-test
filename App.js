import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import {
  StackNavigator,
  TabNavigator,
  DrawerNavigator,
} from 'react-navigation';

class Wrapper extends React.Component {
  render() {
    return (
      <View style={styles.top}>
        { this.props.children }

        <Button
          onPress={() => this.props.navigation.navigate('DrawerOpen')}
          title="Open drawer"
        />
      </View>
    );
  }
}

class LoginScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Login</Text>
        <Button
          onPress={() => this.props.navigation.navigate('HomeTab')}
          title="Go to HomeTab"
        />
      </View>
    );
  }
}

class Home1Screen extends React.Component {
  static navigationOptions = {
    title: 'Home1',
  };

  render() {
    return (
      <Wrapper navigation={this.props.navigation}>
        <Text>Home1</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Home2')}
          title="Go to Home2"
        />
      </Wrapper>
    );
  }
}
class Home2Screen extends React.Component {
  static navigationOptions = {
    title: 'Home2',
  };

  render() {
    return (
      <Wrapper navigation={this.props.navigation}>
        <Text>Home2</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Home3')}
          title="Go to Home3"
        />
      </Wrapper>
    );
  }
}
class Home3Screen extends React.Component {
  static navigationOptions = {
    title: 'Home3',
  };

  render() {
    return (
      <Wrapper navigation={this.props.navigation}>
        <Text>Home3</Text>
      </Wrapper>
    );
  }
}

class Doctors1Screen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'DoctorsDrawer',
    title: 'Doctors',
  };

  render() {
    return (
      <Wrapper navigation={this.props.navigation}>
        <Text>Doctors1</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Doctors2')}
          title="Go to Doctors2"
        />
      </Wrapper>
    );
  }
}
class Doctors2Screen extends React.Component {
  static navigationOptions = {
    title: 'Doctors2',
  };

  render() {
    return (
      <Wrapper navigation={this.props.navigation}>
        <Text>Doctors2</Text>
      </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  top: {
    marginTop: 50,
  },
});

const HomeStack = StackNavigator({
  Home1: {
    screen: Home1Screen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
          <Text>Menu</Text>
        </TouchableOpacity>
      ),
      headerStyle: { paddingLeft: 10, paddingRight: 10 },
    })
  },
  Home2: {
    screen: Home2Screen,
  },
  Home3: {
    screen: Home3Screen,
  }
});

const DoctorsStack = StackNavigator({
  Doctors1: {
    screen: Doctors1Screen,
    navigationOptions: ({ navigation }) => ({
      title: 'Doctors',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
          <Text>Menu</Text>
        </TouchableOpacity>
      ),
      headerStyle: { paddingLeft: 10, paddingRight: 10 },
    })
  },
  Doctors2: {
    screen: Doctors2Screen,
  }
});

const TabNav = TabNavigator({
  HomeTab: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: 'HomeTab',
    }
  },
  DoctorsTab: {
    screen: DoctorsStack,
    navigationOptions: {
      tabBarLabel: 'DoctorsTab',
    }
  }
}, {
  initialRouteName: 'HomeTab',
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: '#222',
  }
});

const DrawerNav = DrawerNavigator({
  HomeDrawerTab: {
    screen: TabNav,
  },
  DoctorsDrawerTab: {
    screen: Doctors1Screen,
  }
});

const StartStack = StackNavigator({
  Login: {
    screen: LoginScreen,
  },
  LoggedInApp: {
    screen: DrawerNav,
  }
}, {
  headerMode: 'none',
});

export default StartStack;
