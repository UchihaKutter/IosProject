import {observable} from 'mobx'
import JMessage from 'jmessage-react-plugin'
import PageList from '../utils/PageList'
class FriendList extends PageList {

  async getList() {
    const getConversations = Promisify(JMessage.getConversations)
    const res = await getConversations()
    if (res) {
      this.list = res
      console.log('this.list', this.list)
    }
    return res
  }
}

const self = new FriendList()
export default self
