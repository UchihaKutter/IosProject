import {observable} from 'mobx'

export default class User {
  type = 'group'
  id  // : string,                 // 群组 id
  name  // : string,               // 群组名称
  desc  // : string,               // 群组描述
  level  // : number,              // 群组等级，默认等级 4
  owner  // : string,              // 群主的 username
  ownerAppKey  // : string,        // 群主的 appKey
  maxMemberCount  // : number,     // 最大成员数
  isNoDisturb  // : boolean,       // 是否免打扰
  isBlocked  // : boolean          // 是否屏蔽群消息
}
