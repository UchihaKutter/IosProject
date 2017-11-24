import {StackNavigator, TabNavigator} from 'react-navigation'
import {Provider} from 'mobx-react'
import {
  ChatDetail as ChatDetailScreen, GiftChatDetail as GiftChatDetailScreen,
  LoginAndRes, ChatList, Account, FriendList, QueryUsernameList, OtherUserDetailInfo
} from '../containers'
import store from '../stores'
import Storage from '../utils/Storage'
import React from 'react'
import {UIManager} from 'react-native'
import JMessage from 'jmessage-react-plugin'
import EventActions from '../utils/EventActions'

const {
  AccountInfo,
  AccountModify
} = Account

const {
  Login,
  Register
} = LoginAndRes

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

  componentDidMount() {
    // UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    JMessage.addContactNotifyListener(this.listener)
    JMessage.addReceiveMessageListener(this.msgListener)
  }

  componentWillUnmount() {
    JMessage.removeContactNotifyListener(this.listener)
    JMessage.removeReceiveMessageListener(this.msgListener)
  }

  listener = (event) => {
    // 回调参数 event 为好友事件
    console.log('event ', event)
    EventActions.ContactNotifyAction(event, RootNavigator)
  }

  msgListener = (msg) => {
    console.error('msg ', msg)
    // EventActions.MsgNotifyAction(msg, RootNavigator)

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
    FriendList: {screen: FriendList},
  AccountInfo: {screen: AccountInfo}
  }, {
    tabBarOptions: {
      style: {
        paddingTop: 15
      }
    }
  }
)

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
      screen: Login,
      navigationOptions: ({navigation}) => ({
        header: null
      })
    },
    Register: {
      screen: Register
    },
    AccountModify: {
      screen: AccountModify
    },
    QueryUsernameList: {
      screen: QueryUsernameList
    },
    OtherUserDetailInfo: {
      screen: OtherUserDetailInfo
    }
  }, {
    initialRouteName: login ? 'Home' : 'Login',
    navigationOptions: navigationOptions
  })
}

const navigationOptions = ({navigation}) => ({
  headerTintColor: '#ffffff',
  headerStyle: {backgroundColor: _styles.primeColor},
  headerTitleStyle: {fontSize: 16}
})

export default Root
