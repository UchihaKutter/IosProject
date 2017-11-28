import { AppRegistry } from 'react-native';
import RootNavigator from './src/navigation';
import Resolution from './src/utils/Resolution'
import Promisify from './src/utils/Promisify'
import {
  StyleSheet
} from 'react-native'
// 关掉黄屏警告;
// console.disableYellowBox = true
global.Promisify = Promisify
global.Resolution = Resolution
// global.Resolution.setDesignSize()
global._styles = {
  underLine: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dddddd'
  },
  topLine: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#dddddd'
  },
  primeColor: '#198cff',
  priceText: {
    color: '#ff4d00',
    fontSize: 20
  },
  deprecatePriceText: {
    fontSize: 12,
    color: '#bbbbbb',
    textDecorationLine: 'line-through'
  }
}
AppRegistry.registerComponent('IosProject', () => RootNavigator);
