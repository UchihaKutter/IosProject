import {observable, autorunAsync} from 'mobx'
import JMessage from 'jmessage-react-plugin'
import PageList from '../utils/PageList'
import Storage from '../utils/Storage'
import conversation from './conversation'

class FriendList {
  @observable
  username // : string,           // 用户名
  appKey // : string,             // 用户所属应用的 appKey，可与 username 共同作为用户的唯一标识
  @observable
  nickname // : string,           // 昵称
  @observable
  gender // : string,             // 'male' / 'female' / 'unknown'
  @observable
  avatarThumbPath // : string,    // 头像的缩略图地址
  birthday // : number,           // 日期的毫秒数
  region // : string,             // 地区
  signature // : string,          // 个性签名
  address // : string,            // 具体地址
  noteName // : string,           // 备注名
  noteText // : string,           // 备注信息
  isNoDisturb // : boolean,       // 是否免打扰
  isInBlackList // : boolean,     // 是否在黑名单中
  isFriend // :boolean            // 是否为好友
  @observable
  list = []
  @observable
  hasReaded = true

  constructor() {
    this.init().then
    autorunAsync(() => {
      const cache = {
        'waitingAcceptFriendList': this.list,
        'hasReaded': this.hasReaded
      }
      Storage.saveText('waitingAcceptFriendList', JSON.stringify(cache))
    }, 500)
  }

  async init() {
    const res = await Storage.getText('waitingAcceptFriendList')
    this.list = JSON.parse(res).waitingAcceptFriendList
    this.hasReaded = JSON.parse(res).hasReaded
  }

  setHasReaded = (hasRead) => {
    this.hasReaded = hasRead
  }

  addItem = (item) => {
    console.log('waittingAcceptList add item')
    // if(this.list.include(item)){
    //   return
    // }
    this.list.push(item)
    this.hasReaded = false
  }

  removeItem = (item) => {
    this.list.remove(item)
  }

  async acceptInvitation(item) {
    const {fromUsername} = item
    const tran = Promisify(JMessage.acceptInvitation)
    const res = await tran({username: fromUsername, appKey: ''})
    console.log('acceptInvitation', res)
    if (res || res === 0) {
      this.removeItem(item)
      conversation.addTextMessage
    }
    return res
  }

  async declineInvitation(item) {
    const {fromUsername} = item
    const tran = Promisify(JMessage.acceptInvitation)
    const res = await tran({username: fromUsername, appKey: '', reason: '拒绝理由'})
    console.log(res)
    if (res || res === 0) {
      this.removeItem(item)
    }
    return res
  }
}

const self = new FriendList()
export default self
