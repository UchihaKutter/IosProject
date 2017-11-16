/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react'
import {
  // Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'
import {inject, observer} from 'mobx-react'
import {ItemLineView, Icon} from '../../components'

const {FontAwesomeIcon} = Icon
import Storage from '../../utils/Storage'

@inject(stores => ({
  user: stores.user
}))
@observer
export default class App extends Component<{}> {
  constructor() {
    super()
    this.init()

  }

  async init() {
    this.info = await Storage.getText('user')
    console.log('this.info', this.info)
  }

  componentDidMount() {

  }

  render() {
    const {navigation} = this.props
    const {username, nickname, gender, avatarThumbPath} = this.props.user.userInfo
    const icon = avatarThumbPath === '' ? <FontAwesomeIcon size={44} name='user-circle-o'/>
      : <Image style={[styles.image]} source={{uri: avatarThumbPath}}/>
    return (
      <View style={styles.container}>
        <ItemLineView left='头像' right={icon} style={{height: 80, marginTop: 20}} hasUnderLine={true} onPress={}/>
        <ItemLineView left='账号' right={username} hasUnderLine={true} onPress={}/>
        <ItemLineView left='昵称' right={nickname} hasUnderLine={true} onPress={}/>
        <ItemLineView left='性别' right={gender} hasUnderLine={true} onPress={}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    fontSize: 30
  }
})
