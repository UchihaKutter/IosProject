/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  // Platform,
  StyleSheet,
  Text,
  View
  // Image
} from 'react-native'
import JMessage from 'jmessage-react-plugin';
import store from '../../stores'
import {inject, observer} from 'mobx-react'

@inject('store') @observer
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
    JMessage.login({
      username: '15880133505',
      password: '123456'
    }, () => {
      console.log('/*登录成功回调*/')
    }, (error) => {
      console.log('/*登录失败回调*/', error)
    })
  }

  componentDidMount() {
    // store.friendList.getList().then(v=>{
    //   console.log(v)
    //   console.log(store.friendList.list)
    // })
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

  gotoGiftChatDetail = (navigation) => {
    navigation.navigate('GiftChatDetail')
  }

  getFriendList = () => {
    store.friendList.getList().then(v => {
      console.log(v)
      console.log(store.friendList.list)
    })
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.instructions} onPress={this.submitRegister}>
          注册
        </Text>
        <Text style={styles.instructions} onPress={this.submitLogin}>
          登录
        </Text>
        <Text style={styles.instructions} onPress={()=>this.gotoChatDetail(navigation)}>
          聊天sss
        </Text>
        <Text style={styles.instructions} onPress={() => this.gotoGiftChatDetail(navigation)}>
          聊天giftChat
        </Text>
        <Text style={styles.instructions} onPress={() => this.getFriendList()}>
          获取朋友列表
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
