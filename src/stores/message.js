import {observable} from 'mobx'

export default class User {
  id // : string,                     // 消息 id
  type // : 'text',                   // 消息类型
  from // : UserInfo,                 // 消息发送者对象
  target // : UserInfo / GroupInfo,   // 消息接收者对象
  createTime // : number,             // 发送消息时间
  extras // : object                  // 附带的键值对

  // 文本信息
  text // : string,                   // 消息内容

  // 图片信息
  thumbPath // : string              // 图片的缩略图路径

  // 语音信息
  path // : string,                   // 语音文件路径
  duration // : number                // 语音时长，单位秒

  // 地址信息
  address // : string,                // 详细地址
  longitude // : number,              // 经度
  latitude // : number,               // 纬度
  scale // :number                    // 地图缩放比例

  // 文件信息
  fileName // : string                // 文件名

  // 自定义信息
  customObject // : object            // 自定义键值对

  // 事件信息
  eventType // : string,       // 'group_member_added' / 'group_member_removed' / 'group_member_exit'
  usernames // : Array         // 该事件涉及到的用户 username 数组
}
