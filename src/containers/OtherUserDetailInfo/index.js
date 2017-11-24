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

const {FontAwesomeIcon} = Icon

@inject(stores => ({
  otherUser: stores.otherUser
}))
@observer
export default class App extends Component<{}> {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: '详细资料'
  })

  constructor(props) {
    super()
  }

  componentDidMount() {
    const {navigation} = this.props
    const {username} = navigation.state.params
    this.props.otherUser.getUserInfo({username}).then()
  }

  sendInvitationRequest = () => {
    this.props.otherUser.sendInvitationRequest(this.props.otherUser.userInfo.username)
  }

  createConversation = () => {
    this.props.otherUser.createConversation().then(v => {
      this.props.navigation.navigate('GiftChatDetail', {conversation: v})
    })
  }

  render() {
    console.log('AccountInfo render')
    const {navigation} = this.props
    const {username, nickname, gender, avatarThumbPath} = this.props.otherUser.userInfo
    console.log('avatarThumbPath: ', avatarThumbPath)
    const icon = avatarThumbPath === '' ? <FontAwesomeIcon size={44} name='user-circle-o'/>
      : <Image style={styles.image} resizeMode={'cover'} source={{uri: avatarThumbPath}}/>
    return (
      <View style={styles.container}>
        {/*<Text><Image style={styles.image} resizeMode={'cover'} source={{uri: this.state.headerImage}}/></Text>*/}
        <ItemLineView left='头像' right={icon} style={{height: 80, marginTop: 20}}
                      hasUnderLine={true}/>
        <ItemLineView left='账号' right={username} hasUnderLine={true}
        />
        <ItemLineView left='昵称' right={nickname} hasUnderLine={true}
        />
        <ItemLineView left='性别' right={gender} hasUnderLine={true}
                      callback={this.updateMyInfo}/>
        <CustomButton style={{position: 'absolute', bottom: 80}} onPress={this.createConversation}>发消息</CustomButton>
        <CustomButton style={{position: 'absolute', bottom: 20}}
                      onPress={this.sendInvitationRequest}>发送好友申请</CustomButton>
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


