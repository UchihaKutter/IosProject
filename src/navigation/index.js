import { StackNavigator } from 'react-navigation';
import {Provider} from 'mobx-react'
import {
  App as HomeScreen, ChatDetail as ChatDetailScreen, GiftChatDetail as GiftChatDetailScreen,
  LoginScreen
} from '../containers'
import store from '../stores'
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
  render() {
    return (
      <Provider store={store}>
        <RootNavigator/>
      </Provider>
    )
  }
}

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  ChatDetail: {
    screen: ChatDetailScreen,
  },
  GiftChatDetail: {
    screen: GiftChatDetailScreen
  },
  Login: {
    screen: LoginScreen
  }
}, {initialRouteName: store.user.isLogin() ? 'Home' : 'Login'});

export default Root
