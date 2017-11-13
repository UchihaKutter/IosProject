import { AppRegistry } from 'react-native';
import RootNavigator from './src/navigation';

global.Promisify = (fn, receiver) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn.apply(receiver, [...args, res => {
        return resolve(res)
      }, err => {
        return reject(err)
      }
      ])
    })
  }
}

AppRegistry.registerComponent('IosProject', () => RootNavigator);
