import {observable} from 'mobx'
import JMessage from 'jmessage-react-plugin'
import PageList from '../utils/PageList'

class FriendList extends PageList {
  async getList(username, appKey = '') {
    const resData = {appKey, ...username}
    console.log('queryUsernameList resData   ', resData)
    const tran = Promisify(JMessage.getUserInfo)
    const res = await tran(resData)
    if (res || res === 0) {
      this.list = res
      console.log(this.list)
    }
    return res
  }

  async sendInvitationRequest(username) {
    const tran = Promisify(JMessage.sendInvitationRequest)
    const res = await tran(username)
    console.log('sendInvitationRequest  ', res)
    return res
  }
}

const self = new FriendList()
export default self
