import {observable} from 'mobx'

export default class User {

  username  // : string,           // 用户名
  appKey  // : string,             // 用户所属应用的 appKey，可与 username 共同作为用户的唯一标识

  nickname  // : string,           // 昵称

  gender  // : string,             // 'male' / 'female' / 'unknown'

  avatarThumbPath  // : string,    // 头像的缩略图地址
  birthday  // : number,           // 日期的毫秒数
  region  // : string,             // 地区
  signature  // : string,          // 个性签名
  address  // : string,            // 具体地址
  noteName  // : string,           // 备注名
  noteText  // : string,           // 备注信息
  isNoDisturb  // : boolean,       // 是否免打扰
  @observable
  isInBlackList  // : boolean,     // 是否在黑名单中
  @observable
  isFriend  // :boolean            // 是否为好友
}

