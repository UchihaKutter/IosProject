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
import {PageList, SearchBar} from '../../components'
import {Icon} from '../../components'
import imgToBase64 from '../../utils/ImgToBase64'
const {FontAwesomeIcon} = Icon
@inject(stores => ({
  user: stores.user,
  friendList: stores.friendList
}))
@observer
export default class Page extends Component {

  // 初始化模拟数据
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    this.props.friendList.getList().then()
  }

  gotoChatDetail = () => {
    this.props.navigation.navigate('ChatDetail')
  }

  gotoSearchResult = (username) => {
    this.props.navigation.navigate('OtherUserDetailInfo', {username: username})
  }


  renderItem = ({index, item}) => {
    return (
      <Item data={item}/>
    )
  }

  render() {
    return (
      <View>
        <SearchBar placeholder={'请输入好友名称'} onSearch={this.gotoSearchResult}></SearchBar>
        <PageList
          renderItem={this.renderItem}
          store={this.props.friendList}
        />
      </View>
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
    imgToBase64(this.props.data.avatarThumbPath).then(v => {
      this.setState({avatarThumbPath: 'data:image/png;base64,' + v})
    })
  }

  render() {
    const {username, nickname, gender, avatarThumbPath} = this.props.data
    const icon = avatarThumbPath === '' ? <FontAwesomeIcon size={44} name='user-circle-o'/>
      : <Image style={[styles.image]} source={{uri: this.state.avatarThumbPath}}/>
    return (
      <TouchableOpacity style={styles.item}>
        {icon}
        {/*<View style={styles.content_item_container}>*/}
        {/*<View style={styles.detail_container}>*/}
        {/*<Text style={styles.text_title}>{title}</Text>*/}
        {/*<Text style={styles.text_date}>{unreadCount}</Text>*/}
        {/*</View>*/}
        {/*<Text style={styles.text_content}>{latestMessage}</Text>*/}
        {/*</View>*/}
        <Text style={styles.text_title}>{nickname}</Text>
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
    // borderBottomWidth:1/PixelRatio.get(),
    // borderBottomColor:'#dddddd',
  },

  content_item_container: {
    // alignItems:'center',
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
