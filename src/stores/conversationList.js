import {observable} from 'mobx'
import JMessage from 'jmessage-react-plugin'
import PageList from '../utils/PageList'
import Conversation from './conversation'
class FriendList extends PageList {

  async getList() {
    const getConversations = Promisify(JMessage.getConversations)
    const res = await getConversations()
    console.log('conversationList res  ', res)
    if (res && res.length > 0) {
      res.forEach((d) => {
        let chat = new Conversation(undefined)
        chat.createConversationFromList(d)
        this.list.push(chat)
      })
      console.log('this.list', this.list)
    }
    return res
  }

  addItem = (item) => {
    console.log('chatlist begin add item ', item)
    let chat = new Conversation(undefined)
    chat.createConversationFromList(item)
    this.list.push(chat)
  }

  removeItem = (item) => {
    const index = this.list.indexOf(item)
    if (index > -1) {
      this.list.splice(index, 1)
    }
  }
}

const self = new FriendList()
export default self
