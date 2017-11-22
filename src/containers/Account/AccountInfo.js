import React, {Component} from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'
import {inject, observer} from 'mobx-react'
import {CustomButton, ItemLineView, Icon, ActionSheet, SuccessLoading} from '../../components'
import ImagePicker from 'react-native-image-picker'
import RNFS from 'react-native-fs'
const {FontAwesomeIcon} = Icon

@inject(stores => ({
  user: stores.user
}))
@observer
export default class App extends Component<{}> {
  constructor() {
    super()
  }

  updateMyInfo = () => {
    this.props.user.updateMyInfo()
  }

  logout = () => {
    this.props.user.logout()
  }

  updateMyAvatar = () => {
    let options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled image picker')
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      }
      else {
        console.log('response.uri', response.uri)
        console.log('response.uri', response.path)
        SuccessLoading.show()
        this.props.user.updateMyAvatar(response.path).then(v => {
          SuccessLoading.close()
        })
      }
    })
  }

  chooseGender = () => {
    ActionSheet.show(['取消', '男', '女'], this.handleChooseGenderPress)
  }

  handleChooseGenderPress = (i) => {
    let sex
    if (i === 1) {
      sex = 'male'
    }
    if (i === 2) {
      sex = 'female'
    }
    this.props.user.gender = sex
    this.props.user.userInfo.gender = sex
    this.props.user.updateMyInfo()

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
    console.log('AccountInfo render')
    const {navigation} = this.props
    const {username, nickname, gender, avatarThumbPath} = this.props.user.userInfo
    console.log('avatarThumbPath: ', avatarThumbPath)
    const icon = avatarThumbPath === '' ? <FontAwesomeIcon size={44} name='user-circle-o'/>
      : <Image style={styles.image} resizeMode={'cover'} source={{uri: avatarThumbPath}}/>
    return (
      <View style={styles.container}>
        {/*<Text><Image style={styles.image} resizeMode={'cover'} source={{uri: this.state.headerImage}}/></Text>*/}
        <ItemLineView left='头像' right={icon} style={{height: 80, marginTop: 20}}
                      hasUnderLine={true} onPress={this.updateMyAvatar}/>
        <ItemLineView left='账号' right={username} hasUnderLine={true} onPress={this.gotoModifyUsername}
                      callback={this.updateMyInfo}/>
        <ItemLineView left='昵称' right={nickname} hasUnderLine={true} onPress={this.gotoModifyNickname}
                      callback={this.updateMyInfo}/>
        <ItemLineView left='性别' right={gender} hasUnderLine={true} onPress={this.chooseGender}
                      callback={this.updateMyInfo}/>
        <CustomButton style={{position: 'absolute', bottom: 0}} onPress={this.logout}>退出登录</CustomButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60
  }
})

const genderOptions = ['取消', '男', '女']
