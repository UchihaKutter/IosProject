import {observable} from 'mobx'
import User from './user'
import JMessage from 'jmessage-react-plugin'

export default class Message {
  id // : string,                     // 消息 id
  type // : 'text',                   // 消息类型
  from // : UserInfo,                 // 消息发送者对象
  target // : UserInfo / GroupInfo,   // 消息接收者对象
  createTime // : number,             // 发送消息时间
  extras // : object                  // 附带的键值对

  // 文本信息
  text // : string,                   // 消息内容

  // 图片信息
  thumbPath // : string              // 图片的缩略图路径

  // 语音信息
  path // : string,                   // 语音文件路径
  duration // : number                // 语音时长，单位秒

  // 地址信息
  address // : string,                // 详细地址
  longitude // : number,              // 经度
  latitude // : number,               // 纬度
  scale // :number                    // 地图缩放比例

  // 文件信息
  fileName // : string                // 文件名

  // 自定义信息
  customObject // : object            // 自定义键值对

  // 事件信息
  eventType // : string,       // 'group_member_added' / 'group_member_removed' / 'group_member_exit'
  usernames // : Array         // 该事件涉及到的用户 username 数组

  constructor(username) {
    this.userName = username
  }

  // messageType: 'text / image / voice / file / location / custom',
  async createSendMessage({
                            type = 'single', username = this.userName, appKey = '', messageType = 'text', text = this.text,
                            path = this.path, latitude = this.latitude, longitude = this.longitude,
                            scale = this.scale, address = this.address, customObject = this.customObject, extras = this.extras
                          }) {
    const tran = Promisify(JMessage.createSendMessage)
    const res = await tran({
      type, username, appKey, messageType, text,
      path, latitude, longitude, scale, address, customObject, extras
    })
    if (res || res === 0) {
      this.message = res
      console.log(this.message)
    }
    return res
  }

  async sendCustomMessage({type = 'single', username = this.userName, appKey = '', messageType, text}) {
    const tran = Promisify(JMessage.sendCustomMessage)
    const res = await tran(this.message)
    return res
  }

  async sendMessage({type = 'single', username = this.userName, appKey = '', messageType, text}) {
    const tran = Promisify(JMessage.sendMessage)
    const res = await tran(this.message)
    return res
  }

  async sendTextMessage({type = 'single', username = this.userName, appKey = '', text, id}) {
    const tran = Promisify(JMessage.sendMessage)
    const res = await tran({type, username, appKey, text, id})
    return res
  }

  async sendImageMessage({type = 'single', username = this.userName, appKey = '', messageType, text}) {
    const tran = Promisify(JMessage.sendImageMessage)
    const res = await tran(this.message)
    return res
  }

  async sendVoiceMessage({type = 'single', username = this.userName, appKey = '', messageType, text}) {
    const tran = Promisify(JMessage.sendVoiceMessage)
    const res = await tran(this.message)
    return res
  }

  async sendLocationMessage({type = 'single', username = this.userName, appKey = '', messageType, text}) {
    const tran = Promisify(JMessage.sendLocationMessage)
    const res = await tran(this.message)
    return res
  }

  async sendFileMessage({type = 'single', username = this.userName, appKey = '', messageType, text}) {
    const tran = Promisify(JMessage.sendFileMessage)
    const res = await tran(this.message)
    return res
  }

  async retractMessage({type = 'single', username = this.userName, appKey = '', messageType, text}) {
    const tran = Promisify(JMessage.retractMessage)
    const res = await tran({type, username, appKey, messageType, text})
    return res
  }

  async getHistoryMessages({type = 'single', username = this.userName, appKey = '', messageType, text}) {
    const tran = Promisify(JMessage.getHistoryMessages)
    const res = await tran({type, username, appKey, messageType, text})
    return res
  }

  async downloadOriginalImage({type = 'single', username = this.userName, appKey = '', messageType, text}) {
    const tran = Promisify(JMessage.downloadOriginalImage)
    const res = await tran({type, username, appKey, messageType, text})
    return res
  }


}
