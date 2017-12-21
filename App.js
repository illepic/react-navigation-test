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
          onPress={() => this.props.navigation.navigate('Home1')}
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

class Random1Screen extends Component {
  render() {
    return (
      <Wrapper navigation={this.props.navigation}>
        <Text>Random Screen</Text>
      </Wrapper>
    )
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

const RandomStack = StackNavigator({
  Random1: {
    screen: Random1Screen,
    navigationOptions: ({ navigation }) => ({
      title: 'Random',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
          <Text>Menu</Text>
        </TouchableOpacity>
      ),
      headerStyle: { paddingLeft: 10, paddingRight: 10 },
    })
  }
});

const CustomTabs = ({nav, active}) => {
  console.log(nav);
  const drawer = nav.state.index;
  const tab = nav.state.routes[drawer].routeName;

  // const screen = nav.state.routes[drawer].routes[tab].routeName;
  return(
    <View style={{flexDirection: 'row'}}>
      <Text>{tab}</Text>
      <Text> | {active === tab && 'match'}</Text>
      <Button
        onPress={() => nav.navigate('Home1')}
        title="Go to Home1"
        disabled={active === 'HomeTab'}
      />
      <Button
        onPress={() => nav.navigate('Doctors1')}
        title="Go to Doctors1"
        disabled={active === 'DoctorsTab'}
      />
    </View>
  )
};

const HomeTab = TabNavigator({
  HomeTab: {
    screen: HomeStack,
  },
}, {
  tabBarPosition: 'bottom',
  tabBarComponent: ({navigation}) => <CustomTabs nav={navigation} active="HomeTab"/>,
});
const DoctorsTab = TabNavigator({
  DoctorsTab: {
    screen: DoctorsStack,
  }
}, {
  tabBarPosition: 'bottom',
  tabBarComponent: ({navigation}) => <CustomTabs nav={navigation} active="DoctorsTab"/>,
});
const RandomTab = TabNavigator({
  RandomTab: {
    screen: RandomStack,
    navigationOptions: {
      tabBarLabel: 'DoctorsTab',
    }
  }
}, {
  tabBarPosition: 'bottom',
  tabBarComponent: ({navigation}) => <CustomTabs nav={navigation} active="RandomTab"/>,
});

const DrawerNav = DrawerNavigator({
  HomeDrawerTab: {
    screen: HomeTab,
  },
  DoctorsDrawerTab: {
    screen: DoctorsTab,
  },
  RandomDrawerTab: {
    screen: RandomTab,
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

// class AppWithFooter extends Component {
//   render() {
//     return (
//       <View style={{flex:1}}>
//         <StartStack ref={nav => { this.navigator = nav; }}/>
//         <View><Text>I R FOOTER</Text></View>
//       </View>
//     );
//   }
// }

export default StartStack;
