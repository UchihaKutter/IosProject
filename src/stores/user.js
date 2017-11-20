import {observable, autorunAsync, computed} from 'mobx'
import JMessage from 'jmessage-react-plugin'
import Storage from '../utils/Storage'
import validate from 'mobx-form-validate'

class User {
  @observable
  @validate(/\d{6}$/, 'Please enter any password')
  password = '123456'
  @observable
  @validate(/\d{11}$/, 'Please enter any password')
  username = '15880133505' // : string,           // 用户名
  appKey // : string,             // 用户所属应用的 appKey，可与 username 共同作为用户的唯一标识
  @observable
  @validate(/\d{2}$/, 'Please enter any password')
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

  constructor() {
    this.init()
  }

  async init() {
    this.userInfo = await Storage.getText('user')
    console.log('init: this.userInfo ', this.userInfo)
  }

  async login() {
    const tran = Promisify(JMessage.login)
    const res = await tran({username: this.username, password: this.password})
    console.log(res)
    if (res || res === 0) {
      await this.getMyInfo()
    }
    return res
  }

  async getMyInfo() {
    const tran = Promisify(JMessage.getMyInfo)
    const res = await tran()
    if (res) {
      console.log('res', res)
      this.userInfo = res
      Storage.saveText('user', res)
      // console.log('user', this.userInfo.username)
    }
    return res
  }

  async isLogin() {
    const res = await Storage.getText('user')
    console.log('userInfo', res)
    if (res) {
      return true
    }
    return false
  }

  async updateMyInfo(info) {
    console.log('updateMyInfo begin')
    console.log(info)
    const tran = Promisify(JMessage.updateMyInfo)
    const res = await tran(info)
    if (res) {
      console.log('updateMyInfo success')
    }
    return res
  }

  async updateMyAvatar(imgPath) {
    const tran = Promisify(JMessage.updateMyAvatar)
    const res = await tran({imgPath})
    return res
  }

  async logout() {
    const tran = Promisify(JMessage.logout)
    const res = await tran()
    return res
  }

  async updateMyPassword(oldPwd, newPwd) {
    const tran = Promisify(JMessage.updateMyPassword)
    const res = await tran({oldPwd, newPwd})
    return res
  }

  @computed
  get isValid() {
    return !this.validateError
  }

  @computed
  get isvalidateErrorLogin() {
    return this.validateErrorUsername && this.validateErrorPassword
  }
}

const self = new User()
export default self
