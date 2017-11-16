import {StackNavigator, TabNavigator} from 'react-navigation'
import {Provider} from 'mobx-react'
import {
  ChatDetail as ChatDetailScreen, GiftChatDetail as GiftChatDetailScreen,
  Login as LoginScreen, ChatList, Account, AccountSeting
} from '../containers'
import store from '../stores'
import Storage from '../utils/Storage'
import React from 'react'

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
  }
  render() {
    return (
      <Provider {...store}>
        <RootNavigator/>
      </Provider>
    )
  }
}

const MainScreenNavigator = TabNavigator({
  ConversationList: {screen: ChatList},
  FriendList: {screen: ChatList},
  Account: {screen: Account}
})

// store.user.isLogin() ? 'Home' :
const RootNavigator = StackNavigator({
  Home: {
    screen: MainScreenNavigator,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  ChatDetail: {
    screen: ChatDetailScreen,
  },
  GiftChatDetail: {
    screen: GiftChatDetailScreen
  },
  Login: {
    screen: LoginScreen
  },
  AccountSeting: {
    screen: AccountSeting
  }
}, {initialRouteName: 'Login'});

export default Root
