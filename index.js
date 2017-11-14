import { AppRegistry } from 'react-native';
import RootNavigator from './src/navigation';
import Resolution from './src/utils/Resolution'
import Promisify from './src/utils/Promisify'

global.Promisify = Promisify
global.Resolution = Resolution
// global.Resolution.setDesignSize()
AppRegistry.registerComponent('IosProject', () => RootNavigator);
