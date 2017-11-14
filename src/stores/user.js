import {observable, autorunAsync, computed} from 'mobx'
import JMessage from 'jmessage-react-plugin'
import Storage from '../utils/Storage'
import validate from 'mobx-form-validate'

class User {
  @observable
  @validate(/^.+$/, 'Please enter any password')
  password = '123456'
  @observable
  @validate(/^.+$/, 'Please enter any password')
  username = '15880133505' // : string,           // 用户名
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

  async login() {
    const tran = Promisify(JMessage.login)
    const res = tran({username: this.username, password: this.password})
    if (res) {
      await this.getMyInfo()
    }
    return res
  }

  async getMyInfo() {
    JMessage.logout()
    const tran = Promisify(JMessage.getMyInfo)
    const res = tran()
    if (res) {
      console.log('res', res)
      this.user = res
      console.log('user', this.user.username)
      autorunAsync(() => {
        Storage.save('user', res)
      }, 500)
    }
    return res
  }

  isLogin = () => {
    const userInfo = Storage.get('user')
    console.log('userInfo', userInfo)
    if (userInfo === false) {
      return false
    }
    return true
  }

  @computed
  get isValid() {
    return true
  }
}

const self = new User()
export default self
