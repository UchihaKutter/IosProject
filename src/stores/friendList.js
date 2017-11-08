import {observable} from 'mobx'
import JMessage from 'jmessage-react-plugin';
const Promiset = require('bluebird');

class User {
  @observable
  username  // : string,           // 用户名
  appKey  // : string,             // 用户所属应用的 appKey，可与 username 共同作为用户的唯一标识
  @observable
  nickname  // : string,           // 昵称
  @observable
  gender  // : string,             // 'male' / 'female' / 'unknown'
  @observable
  avatarThumbPath  // : string,    // 头像的缩略图地址
  birthday  // : number,           // 日期的毫秒数
  region  // : string,             // 地区
  signature  // : string,          // 个性签名
  address  // : string,            // 具体地址
  noteName  // : string,           // 备注名
  noteText  // : string,           // 备注信息
  isNoDisturb  // : boolean,       // 是否免打扰
  isInBlackList  // : boolean,     // 是否在黑名单中
  isFriend  // :boolean            // 是否为好友

  async getList() {
    const res = await Promiset.promisify(JMessage.getFriends)
    if(res) {
      this.list = res
      console.log(this.list)
    }
    return res
    // JMessage.getFriends((friendArr) => {  // 好友用户对象数组。
    //   // do something.
    //   this.list = friendArr
    //
    // }, (error) => {
    //   var code = error.code
    //   var desc = error.description
    // })
  }
}

const self = new User()
export default self
