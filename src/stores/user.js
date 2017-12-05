import {observable, autorunAsync, computed, action, toJS} from 'mobx'
import JMessage from 'jmessage-react-plugin'
import Storage from '../utils/Storage'
import validate from 'mobx-form-validate'
import RNFS from 'react-native-fs'
import imgToBase64 from '../utils/ImgToBase64'

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
    this.init()
    autorunAsync(() => {
      Storage.saveText('user', JSON.stringify(this.userInfo))
    }, 500)
  }

  async init() {
    const res = await Storage.getText('user')
    this.userInfo = JSON.parse(res)
    // console.log('init: this.userInfo ', this.userInfo)
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
      this.userInfo.avatarThumbPath && (this.userInfo.avatarThumbPath = 'data:image/png;base64,'
        + await RNFS.readFile(this.userInfo.avatarThumbPath, 'base64'))
      Storage.saveText('user', JSON.stringify(res))
      // this.userInfo.avatarThumbPath = 'data:image/png;base64,'+ await RNFS.readFile(this.userInfo.avatarThumbPath,'base64')
      // console.log('user', this.userInfo.username)
    }
    return res
  }

  async isLogin() {
    const res = await Storage.getText('user')
    console.log('userInfo', res)
    if (res && res !== 'null') {
      return Promise.resolve(true)
    }
    return Promise.reject(false)
  }

  async updateMyInfo() {
    console.log('updateMyInfo begin')
    const tran = Promisify(JMessage.updateMyInfo)
    const res = await tran(toJS(this.userInfo))
    if (res) {
      console.log('updateMyInfo success')
    }
    return res
  }

  async updateMyAvatar(imgPath) {
    let res1
    const tran = Promisify(JMessage.updateMyAvatar)
    const res = await tran({imgPath})
    console.log('updateMyAvatar: ', res)
    if (res || res === 0) {
      // this.getMyInfo()
      res1 = 'data:image/png;base64,' + await imgToBase64(imgPath)
      if (res1) {
        this.userInfo.avatarThumbPath = res1
      }
    }
    return res1
  }

  async logout() {
    console.log('logout begin')
    // JMessage.logout()
    const tran = Promisify(JMessage.logout)
    tran()
    const res = await this.reset()
    // const res = await this.reset()
    // console.log('logout', res)
    return res
  }

  async updateMyPassword(oldPwd, newPwd) {
    const tran = Promisify(JMessage.updateMyPassword)
    const res = await tran({oldPwd, newPwd})
    return res
  }

  async register() {
    const tran = Promisify(JMessage.register)
    const res = await tran({username: this.username, password: this.password})
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

  async reset() {
    this.password = ''
    // this.userInfo = {
    //   password: '',
    //   username: '',// : string,           // 用户名
    //   appKey: '',// : string,             // 用户所属应用的 appKey，可与 username 共同作为用户的唯一标识
    //   nickname: '', // : string,           // 昵称
    //   gender: '', // : string,             // 'male' / 'female' / 'unknown'
    //   avatarThumbPath: '', // : string,    // 头像的缩略图地址
    //   birthday: '', // : number,           // 日期的毫秒数
    //   region: '', // : string,             // 地区
    //   signature: '', // : string,          // 个性签名
    //   address: '', // : string,            // 具体地址
    //   noteName: '',// : string,           // 备注名
    //   noteText: '', // : string,           // 备注信息
    //   isNoDisturb: '', // : boolean,       // 是否免打扰
    //   isInBlackList: '', // : boolean,     // 是否在黑名单中
    //   isFriend: '' // :boolean            // 是否为好友
    // }
    this.userInfo = undefined
    let res
    console.log('reset begin')
    try {
      res = await Storage.delete('user')
      console.log('reset', res)
    } catch (error) {
      console.log(error)
    }
    // const res = await Storage.clearValue('user')
    // console.log('reset', res)
    return res
  }
}

const self = new User()
export default self
