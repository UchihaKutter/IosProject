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
  PixelRatio
} from 'react-native'
import {inject, observer} from 'mobx-react'
import {PageList} from '../../components'
import {Icon} from '../../components'
import {observable} from 'mobx'
import imgToBase64 from '../../utils/ImgToBase64'
import Badge from 'react-native-smart-badge'
import moment from 'moment'

const {FontAwesomeIcon} = Icon
@inject(stores => ({
  user: stores.user,
  conversationList: stores.conversationList
}))
@observer
export default class Page extends Component {

  // 初始化模拟数据
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    this.props.conversationList.getList().then()
  }

  gotoChatDetail = () => {
    this.props.navigation.navigate('ChatDetail')
  }

  renderItem = ({index, item}) => {
    return (<Item data={item}/>)
  }

  render() {
    return (
      <PageList
        renderItem={this.renderItem}
        store={this.props.conversationList}
      />

    )
  }
}

@observer
class Item extends Component {
  @observable
  avatarThumbPath = ''

  componentDidMount() {
    imgToBase64(this.props.data.target.avatarThumbPath).then(v => {
      this.avatarThumbPath = 'data:image/png;base64,' + v
    })
  }

  render() {
    const {
      title,                  // 会话标题
      latestMessage,         // 最近的一条消息对象
      unreadCount,            // 未读消息数
      conversationType, //'single' / 'group',
      target
    } = this.props.data
    const {avatarThumbPath, username} = target
    let {text, createTime} = latestMessage ? latestMessage : {}
    createTime = moment(createTime).format('YYYY-MM-DD HH:mm ')
    const icon = avatarThumbPath === '' ? <FontAwesomeIcon size={44} name='user-circle-o'/>
      : <Image style={[styles.image]} source={{uri: this.avatarThumbPath}}/>
    return (
      <TouchableOpacity style={styles.item} onPress={this.gotoChatDetail}>
        <View style={{padding: 5}}>
          <Badge style={{position: 'absolute', top: 2, right: 0}} minWidth={12} minHeight={12}
                 textStyle={{
                   color: '#ffffff', fontSize: 12, paddingVertical: 0,
                   paddingHorizontal: 2
                 }} extraPaddingHorizontal={Number(3)}>
            {unreadCount}
          </Badge>
          {icon}
        </View>
        <View style={styles.content_item_container}>
          <View style={styles.detail_container}>
            <Text style={styles.text_title}>{username}</Text>
            <Text style={styles.text_date}>{createTime}</Text>
          </View>
          <Text style={styles.text_content}>{text}</Text>
        </View>
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
    justifyContent: 'center',
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
    marginRight: 15

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

    // borderBottomWidth:1/PixelRatio.get(),
    // borderBottomColor:'#dddddd',
  },

  content_item_container: {
    // alignItems:'center',
    justifyContent: 'center',
    height: 65,
    width: 286,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#dddddd',
    marginLeft: 10
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
    // fontFamily:'PingFang-SC-Medium',
  },

  text_content: {
    fontSize: 13,
    color: '#999999'
    // fontFamily:'PingFang-SC-Medium',

  },

  text_date: {
    fontSize: 11,
    color: '#999999',
    // fontFamily:'PingFang-SC-Medium',
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
  }

})
