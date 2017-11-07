import { StackNavigator } from 'react-navigation';
import {App as HomeScreen, ChatDetail as ChatDetailScreen} from '../containers'
const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  ChatDetail: {
    screen: ChatDetailScreen,
  },
});

export default RootNavigator;
