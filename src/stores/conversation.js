import {observable} from 'mobx'

export default class User {
  title  // : string,                  // 会话标题
  latestMessage  // : Message,         // 最近的一条消息对象
  unreadCount  // : number,            // 未读消息数
  conversationType  // : 'single' / 'group',
  target  // : UserInfo / GroupInfo    // 聊天对象信息
}
