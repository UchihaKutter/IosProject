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
  Image,
  TouchableOpacity,
  TextInput
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
        <TouchableOpacity {...this.props} style={[styles.container1, {...this.props.style}]}
                          onPress={this.props.onPress}>
          <TextInput underlineColorAndroid='transparent'
                     placeholder={this.type === 1 ? '请输入2-12位昵称' : ''}
                     defaultValue={this.name}
                     style={[styles.inputText]}
                     onChangeText={(text) => {
                       this.name = text
                     }}
          />
        </TouchableOpacity>
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
