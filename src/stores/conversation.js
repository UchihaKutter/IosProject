import {observable} from 'mobx'
import Message from './message'

export default class User {
  title  // : string,                  // 会话标题
  latestMessage  // : Message,         // 最近的一条消息对象
  unreadCount  // : number,            // 未读消息数
  conversationType  // : 'single' / 'group',
  target  // : UserInfo / GroupInfo    // 聊天对象信息

  constructor(conversation) {
    console.log(conversation)
    this.title = conversation.title
    this.latestMessage = conversation.latestMessage
    unreadCount = conversation.unreadCount
    this.conversationType = conversation.conversationType
    this.target = conversation.target
  }

  async addTextMessage(text) {
    const message = new Message(this.target.username)
    const res = await message.createSendMessage({text})
    if (res || res === 0) {
      message.sendTextMessage({text, id: Number(res.id)}).then()
    }
    return res
  }
}
