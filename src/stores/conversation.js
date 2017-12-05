import {observable, autorun, computed} from 'mobx'
import Message from './message'
import JMessage from 'jmessage-react-plugin'

export default class Conversation {
  title  // : string,                  // 会话标题
  latestMessage  // : Message,         // 最近的一条消息对象
  unreadCount  // : number,            // 未读消息数
  conversationType  // : 'single' / 'group',
  target  // : UserInfo / GroupInfo    // 聊天对象信息
  @observable
  list = []

  // @observable
  // uiList = []
  constructor(username) {
    this.username = username

  }

  createConversationFromList = (conversation) => {
    const {title, latestMessage, unreadCount, conversationType, target} = conversation
    const {username, nickname} = target
    this.username = username
    this.title = title
    this.latestMessage = latestMessage
    this.unreadCount = unreadCount
    this.conversationType = conversationType
    this.target = target
  }

  @computed
  get uiList() {
    return this.list.map((d, i) => this.changeModel(d))
  }

  // constructor(conversation) {
  //   console.log(conversation)
  //   this.title = conversation.title
  //   this.latestMessage = conversation.latestMessage
  //   this.unreadCount = conversation.unreadCount
  //   this.conversationType = conversation.conversationType
  //   this.target = conversation.target
  // }

  async createConversation() {
    const tran = Promisify(JMessage.createConversation)
    const conversation = await tran({type: 'single', username: this.username, appKey: ''})
    if (conversation || conversation === 0) {
      this.title = conversation.title
      this.latestMessage = conversation.latestMessage
      this.unreadCount = conversation.unreadCount
      this.conversationType = conversation.conversationType
      this.target = conversation.target
    }
    return conversation
  }

  async getHistoryMessages() {
    const tran = Promisify(JMessage.getHistoryMessages)
    const res = await tran({
      type: 'single', username: this.username,
      appKey: '', from: 0, limit: 15
    })
    if (res || res === 0) {
      this.list = this.list.concat(res)
      console.log('getHistoryMessages list  ', res)
    }
    return res
  }

  addSysMsg(text) {
    const sysMsg = {
      id: 0,
      text,
      createTime: new Date().getTime(),
      system: true
    }
    this.list.push(sysMsg)
  }

  clearList = () => {
    this.list = []
  }

  receiveMsg = (msg) => {
    this.list.unshift(msg)
  }

  async addTextMessage(text) {
    const message = new Message(this.target.username)
    const res = await message.createSendMessage({text})
    if (res || res === 0) {
      message.sendTextMessage({text, id: Number(res.id)}).then()
      this.list.unshift(res)
    }
    return res
  }

  async sendCustomMessage(object) {
    const message = new Message(this.target.username)
    const res = await message.createSendMessage(object)
    if (res || res === 0) {
      message.sendTextMessage({text, id: Number(res.id)}).then()
    }
    return res
  }

  async sendAcceptMessage() {
    const message = new Message(this.target.username)
    const res = await this.sendCustomMessage({'acceptMsg': '对方已经加你为好友，现在你可以跟他聊天'})
    if (res || res === 0) {
      message.sendTextMessage({text, id: Number(res.id)}).then()
    }
    return res
  }

  updateLastMsg = (msg) => {
    const id = msg.extras.chatId
    if (!msg || id !== this.id) {
      return
    }
    this.latestMessage = msg
  }

  changeModel = (msg) => {
    const {
      id,
      type,
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
      eventType, // : string,       // 'group_member_added' / 'group_member_removed' / 'group_member_exit'
      usernames,
      system
    } = msg
    const {username, nickname} = from ? from : {}
    let UIMsg = {
      _id: id,
      text: text,
      createdAt: new Date(createTime),
      user: {
        _id: username,
        name: nickname,
        avatar: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png'
      },
      sent: false,
      received: false,
      image: thumbPath,
      voicePath: path,
      duration: duration,
      location: longitude ? {
        latitude: latitude,
        longitude: longitude
      } : null,
      fileName: fileName,
      extras: extras,
      customObject: customObject,
      eventType: eventType,
      system: system !== null ? system : null
    }

    return UIMsg
  }

}
