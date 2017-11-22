import {StackNavigator, TabNavigator} from 'react-navigation'
import {Provider} from 'mobx-react'
import {
  ChatDetail as ChatDetailScreen, GiftChatDetail as GiftChatDetailScreen,
  Login as LoginScreen, ChatList, Account
} from '../containers'
import store from '../stores'
import Storage from '../utils/Storage'
import React from 'react'

const {
  AccountInfo,
  AccountModify
} = Account

// const AppNavigator = StackNavigator(AppRouteConfigs);

// const navReducer = (state, action) => {
//   const nextState = AppNavigator.router.getStateForAction(action, state);
//
//   // Simply return the original `state` if `nextState` is null or undefined.
//   return nextState || state;
// };

// const appReducer = combineReducers({
//   nav: navReducer,
//   ...
// });

// const AppWithNavigationState = connect(mapStateToProps)(App);

// const store = createStore(appReducer);
// class App extends React.Component {
//   render() {
//     return (
//       <RootNavigator navigation={addNavigationHelpers({
//         dispatch: this.props.dispatch,
//         state: this.props.nav,
//       })} />
//     );
//   }
// }

class Root extends React.Component {
  constructor() {
    super()
    this.state = {
      signedIn: false,
      checkedSignIn: false
    }
  }

  componentWillMount() {
    store.user.isLogin()
      .then(res => this.setState({signedIn: res, checkedSignIn: true}), err => {
        this.setState({signedIn: err, checkedSignIn: true})
      })

  }
  render() {
    const {checkedSignIn, signedIn} = this.state
    console.log('checkedSignIn  ', checkedSignIn, 'signedIn  ', signedIn)
    if (!checkedSignIn) {
      return null
    }
    const Navigator = RootNavigator(signedIn)
    return (
      <Provider {...store}>
        <Navigator/>
      </Provider>
    )
  }
}

const MainScreenNavigator = TabNavigator({
  ConversationList: {screen: ChatList},
  FriendList: {screen: ChatList},
  AccountInfo: {screen: AccountInfo}
})

// store.user.isLogin() ? 'Home' :
const RootNavigator = (login = false) => {
  return StackNavigator({
    Home: {
      screen: MainScreenNavigator,
      navigationOptions: ({navigation}) => ({
        header: null
      })
    },
    ChatDetail: {
      screen: ChatDetailScreen
    },
    GiftChatDetail: {
      screen: GiftChatDetailScreen
    },
    Login: {
      screen: LoginScreen
    },
    AccountModify: {
      screen: AccountModify
    }
  }, {initialRouteName: login ? 'Home' : 'Login'})
}

export default Root
