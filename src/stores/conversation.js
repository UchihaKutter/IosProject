import {observable} from 'mobx'
import Message from './message'
import JMessage from 'jmessage-react-plugin'

export default class User {
  title  // : string,                  // 会话标题
  latestMessage  // : Message,         // 最近的一条消息对象
  unreadCount  // : number,            // 未读消息数
  conversationType  // : 'single' / 'group',
  target  // : UserInfo / GroupInfo    // 聊天对象信息
  @observable
  list = []

  constructor(conversation) {
    console.log(conversation)
    this.title = conversation.title
    this.latestMessage = conversation.latestMessage
    unreadCount = conversation.unreadCount
    this.conversationType = conversation.conversationType
    this.target = conversation.target
  }

  async createConversation() {
    const tran = Promisify(JMessage.createConversation)
    const conversation = await tran({type: 'single', username: 'username', appKey: ''})
    if (conversation || conversation === 0) {
      this.title = conversation.title
      this.latestMessage = conversation.latestMessage
      unreadCount = conversation.unreadCount
      this.conversationType = conversation.conversationType
      this.target = conversation.target
    }
    return conversation
  }

  async getHistoryMessages() {
    const tran = Promisify(JMessage.getHistoryMessages)
    const res = await tran({
      type: 'single', username: this.username,
      appKey: '', from: 0, limit: 10
    })
    if (res || res === 0) {
      this.list = res
    }
    return res
  }

  async addTextMessage(text) {
    const message = new Message(this.target.username)
    const res = await message.createSendMessage({text})
    if (res || res === 0) {
      message.sendTextMessage({text, id: Number(res.id)}).then()
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
}
