import {observable} from 'mobx'
import JMessage from 'jmessage-react-plugin'
import imgToBase64 from '../utils/ImgToBase64'

class OtherUser {
  @observable
  userInfo = {
    password: '',
    username: '',// : string,           // 用户名
    appKey: '',// : string,             // 用户所属应用的 appKey，可与 username 共同作为用户的唯一标识
    nickname: '', // : string,           // 昵称
    gender: '', // : string,             // 'male' / 'female' / 'unknown'
    avatarThumbPath: '', // : string,    // 头像的缩略图地址
    birthday: '', // : number,           // 日期的毫秒数
    region: '', // : string,             // 地区
    signature: '', // : string,          // 个性签名
    address: '', // : string,            // 具体地址
    noteName: '',// : string,           // 备注名
    noteText: '', // : string,           // 备注信息
    isNoDisturb: '', // : boolean,       // 是否免打扰
    isInBlackList: '', // : boolean,     // 是否在黑名单中
    isFriend: '' // :boolean            // 是否为好友
  }

  constructor() {
  }

  async getUserInfo(username, appKey = '') {
    const resData = {appKey, ...username}
    console.log('queryUserInfo resData   ', resData)
    const tran = Promisify(JMessage.getUserInfo)
    const res = await tran(resData)
    if (res || res === 0) {
      console.log('getUserInfo ', res)
      this.userInfo = res
      this.userInfo.avatarThumbPath && (this.userInfo.avatarThumbPath = 'data:image/png;base64,'
        + await imgToBase64(this.userInfo.avatarThumbPath))
    }
    return res
  }

  async sendInvitationRequest(username, appKey = '', reason = '请求添加好友') {
    console.log('sendInvitationRequest  begin')
    const tran = Promisify(JMessage.sendInvitationRequest)
    const res = await tran({username, appKey, reason})
    console.log('sendInvitationRequest  ', res)
    return res
  }

  async createConversation(username = this.userInfo.username, appKey = '', type = 'single') {
    console.log('sendInvitationRequest  begin')
    const tran = Promisify(JMessage.createConversation)
    const res = await tran({username, appKey, type})
    console.log('createConversation  ', res)
    return res
  }
}

const other = new OtherUser()
export default other

