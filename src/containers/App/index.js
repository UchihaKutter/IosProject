/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'
import JMessage from 'jmessage-react-plugin';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu'
})

export default class App extends Component<{}> {
  constructor() {
    super()
    // JMessage.init({
    //   appkey: 'c6ea313a86e699193578fd53',
    //   isOpenMessageRoaming: false, // 是否开启消息漫游，默认不开启
    //   isProduction: false, // 是否为生产模式
    //   channel: 'development-default'
    // })
    JMessage.setDebugMode({ enable: true })
  }

  componentDidMount() {
  }

  submitRegister =()=> {
    JMessage.register({
      username: '15880133505',
      password: '123456'
    }, () => {
      console.log('/*注册成功回调*/')
    }, (error) => {
      console.log('/*注册失败回调*/', error)
    })
  }

  submitLogin =()=> {
    JMessage.login({
      username: '15880133505',
      password: '123456'
    }, () => {
      console.log('/*登录成功回调*/')
    }, (error) => {
      console.log('/*登录失败回调*/', error)
    })
  }

  gotoChatDetail =(navigation)=> {
    navigation.navigate('ChatDetail')
    console.log('navigation', navigation)
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!dddddssss

        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        <Text style={styles.instructions} onPress={this.submitRegister}>
          注册
        </Text>
        <Text style={styles.instructions} onPress={this.submitLogin}>
          登录
        </Text>
        <Text style={styles.instructions} onPress={()=>this.gotoChatDetail(navigation)}>
          聊天sss
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 20,
    fontSize:30
  }
})
