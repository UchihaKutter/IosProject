/**
 * Created by li on 17-4-26.
 */
import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  PixelRatio,
  FlatList
} from 'react-native'
import {inject, observer} from 'mobx-react'
import {PageList, SearchBar, CustomButton} from '../../components'
import {Icon} from '../../components'
import Conversation from '../../stores/conversation'
import imgToBase64 from '../../utils/ImgToBase64'
import Badge from 'react-native-smart-badge'

const {FontAwesomeIcon} = Icon
@inject(stores => ({
  user: stores.user,
  waitingList: stores.waitingAcceptFriList
}))
@observer
export default class Page extends Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: '新的朋友'
  })

  // 初始化模拟数据
  constructor(props) {
    super(props)

  }

  componentDidMount() {

  }

  gotoChatDetail = () => {
    this.props.navigation.navigate('ChatDetail')
  }

  gotoSearchResult = (username) => {
    this.props.navigation.navigate('OtherUserDetailInfo', {username: username})
  }

  renderItem = ({index, item}) => {
    return (
      <Item data={item} acceptInvitation={this.acceptInvitation} declineInvitation={this.declineInvitation}/>
    )
  }
  acceptInvitation = (item) => {
    const {fromUsername} = item
    this.props.waitingList.acceptInvitation(item).then(v => {
      this.conversation = new Conversation(fromUsername)
      this.conversation.createConversation().then(v => {
        this.conversation.addSysMsg('你已经加对方为好友，现在你可以跟他聊天')
        this.props.navigation.navigate('GiftChatDetail', {conversation: this.conversation})
      })
    })
  }

  declineInvitation = (item) => {
    this.props.waitingList.declineInvitation(item)
  }

  render() {
    const {navigation} = this.props
    const list = this.props.waitingList.list.slice(0)
    console.log('newFriend list  ', list)
    return (
      <FlatList
        data={list}
        keyExtractor={(item, index) => index}
        removeClippedSubviews={false}
        renderItem={this.renderItem}
      />
    )
  }
}

@observer
class Item extends Component {
  constructor(props) {
    super(props)
    this.state = {
      avatarThumbPath: ''
    }
  }

  componentDidMount() {
  }

  acceptInvitation = () => {

  }

  declineInvitation = () => {

  }

  render() {
    const {data} = this.props
    const {fromUsername} = data
    // const icon = avatarThumbPath === '' ? <FontAwesomeIcon size={44} name='user-circle-o'/>
    //   : <Image style={[styles.image]} source={{uri: this.state.avatarThumbPath}}/>
    return (
      <TouchableOpacity style={[styles.item, _styles.underLine]}>
        <FontAwesomeIcon style={[styles.image]} size={44} name='user-circle'/>
        <Text style={styles.text_title}>{fromUsername}</Text>
        <CustomButton style={styles.buttonAccept}
                      textStyle={{fontSize: 14, padding: 0}}
                      onPress={() => this.props.acceptInvitation(data)}>接受</CustomButton>
        <CustomButton style={styles.buttonDecline}
                      textStyle={{fontSize: 14, padding: 0, color: '#198cff'}}
                      onPress={() => this.props.declineInvitation(data)}>拒绝</CustomButton>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({

  systemMsg: {

    marginTop: 10,
    marginBottom: 10,
    height: 65,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white'
  },

  item: {
    height: 65,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },

  image_container: {
    marginLeft: 15,
    marginRight: 15
  },
  image: {
    width: 44,
    height: 44,
    marginLeft: 15,
    marginRight: 16

  },

  image_sys: {
    width: 45,
    height: 44,
    marginLeft: 15,
    marginRight: 16

  },

  content_container: {
    justifyContent: 'center',
    height: 65,
    width: 286
  },

  content_item_container: {
    justifyContent: 'center',
    height: 65,
    width: 286,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#dddddd'
  },

  detail_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 286,
    marginBottom: 12
  },

  text_title: {
    fontSize: 16,
    color: '#333333'
  },

  text_content: {
    fontSize: 13,
    color: '#999999'
  },

  text_date: {
    fontSize: 11,
    color: '#999999',
    marginRight: 15
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    paddingLeft: 15,
    paddingRight: 15
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#DD0016',
    height: 42,
    flexDirection: 'row'
  },

  buttonAccept: {
    width: 60, height: 30, position: 'absolute', right: 80, borderRadius: 2
  },
  buttonDecline: {
    width: 60, height: 30, position: 'absolute', right: 10, backgroundColor: 'white', borderWidth: 1, borderRadius: 2,
    borderColor: '#198cff'
  }

})
