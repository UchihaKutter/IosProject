import React, {Component} from 'react'
import {
  // Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'
import {inject, observer} from 'mobx-react'
import {CustomButton, ItemLineView, Icon} from '../../components'

const {FontAwesomeIcon} = Icon

@inject(stores => ({
  user: stores.user
}))
@observer
export default class App extends Component<{}> {
  constructor() {
    super()
  }

  componentDidMount() {

  }

  updateMyInfo = () => {
    this.props.user.updateMyInfo()
  }

  logout = () => {
    this.props.user.logout()
  }

  updateMyAvatar = (imgLocalUrl) => {
    this.props.user.updateMyAvatar(imgLocalUrl)
  }

  gotoModifyUsername = () => {
    this.props.navigation.navigate('AccountModify', {
      name: 'username',
      placeholder: '请输入账号',
      onSubmit: this.updateMyInfo
    })
  }

  gotoModifyNickname = () => {
    this.props.navigation.navigate('AccountModify', {
      name: 'nickname',
      placeholder: '请输入昵称',
      onSubmit: this.updateMyInfo
    })
  }

  render() {
    const {navigation} = this.props
    const {username, nickname, gender, avatarThumbPath} = this.props.user
    const icon = avatarThumbPath === '' ? <FontAwesomeIcon size={44} name='user-circle-o'/>
      : <Image style={[styles.image]} source={{uri: avatarThumbPath}}/>
    return (
      <View style={styles.container}>
        <ItemLineView left='头像' right={icon} style={{height: 80, marginTop: 20}}
                      hasUnderLine={true} onPress={() => this.updateMyAvatar()}/>
        <ItemLineView left='账号' right={username} hasUnderLine={true} onPress={this.gotoModifyUsername}
                      callback={this.updateMyInfo}/>
        <ItemLineView left='昵称' right={nickname} hasUnderLine={true} onPress={this.gotoModifyNickname}
                      callback={this.updateMyInfo}/>
        <ItemLineView left='性别' right={gender} hasUnderLine={true} onPress={this.gotoModify}
                      callback={this.updateMyInfo}/>
        <CustomButton style={{position: 'absolute', bottom: 0}}>退出登录</CustomButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
