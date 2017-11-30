import {NavigationActions} from 'react-navigation'
import stores from '../stores'

const {waitingAcceptFriList, conversationList} = stores

const ContactNotifyAction = (event, navigation) => {
  console.log('event ', event)
  const navigateAction = NavigationActions.navigate({
    routeName: 'Login',
    params: {}
  })
  const {
    type, //'invite_received' / 'invite_accepted' / 'invite_declined' / 'contact_deleted'
    reason,
    fromUsername,
    fromUserAppKey
  } = event
  switch (type) {
    case 'invite_received':
      // navigation.dispatch(navigateAction)
      waitingAcceptFriList.addItem(event)
    case 'invite_accepted':
    // navigation.navigate('')
    case 'invite_declined':
    // navigation.navigate('')
    case 'contact_deleted':
    // navigation.navigate('')
  }
}

const MsgNotifyAction = (msg) => {
  console.log('MsgNotifyAction messageType', msg)
  const {
    id, // : string,                     // 消息 id
    type, // : 'text',                   // 消息类型
    from, // : UserInfo,                 // 消息发送者对象
    target, // : UserInfo / GroupInfo,   // 消息接收者对象
    createTime, // : number,             // 发送消息时间
    extras, // : object                  // 附带的键值对
    // 文本信息
    text, // : string,                   // 消息内容
    // 图片信息
    thumbPath, // : string              // 图片的缩略图路径
    // 语音信息
    path, // : string,                   // 语音文件路径
    duration, // : number                // 语音时长，单位秒
    // 地址信息
    address, // : string,                // 详细地址
    longitude, // : number,              // 经度
    latitude, // : number,               // 纬度
    scale, // :number                    // 地图缩放比例
    // 文件信息
    fileName, // : string                // 文件名
    // 自定义信息
    customObject, // : object            // 自定义键值对
    // 事件信息
    eventType // : string,       // 'group_member_added' / 'group_member_removed' / 'group_member_exit'
  } = msg
  switch (type) {
    case 'text':
      console.log('MsgNotifyAction messageType', msg)
      conversationList.addItem(msg)
    case 'image':
    // navigation.navigate('')
    case 'voice':
    // navigation.navigate('')
    case 'file':
    // navigation.navigate('')
    case 'location':
    // navigation.navigate('')
    case 'custom':
    //navigation.navigate('')
  }
}

const index = {ContactNotifyAction, MsgNotifyAction}
export default index
