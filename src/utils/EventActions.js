import {NavigationActions} from 'react-navigation'
import stores from '../stores'

const {waitingAcceptFriList} = stores

const ContactNotifyAction = (event, navigation) => {
  console.log('event ', event)
  const navigateAction = NavigationActions.navigate({
    routeName: 'Login',
    params: {}
  })
  const {
    type, //'invite_received' / 'invite_accepted' / 'invite_declined' / 'contact_deleted'
    reason,
    fromUsername,
    fromUserAppKey
  } = event
  switch (type) {
    case 'invite_received':
      // navigation.dispatch(navigateAction)
      waitingAcceptFriList.addItem(event)
    case 'invite_accepted':
    // navigation.navigate('')
    case 'invite_declined':
    // navigation.navigate('')
    case 'contact_deleted':
    // navigation.navigate('')
  }
}

const MsgNotifyAction = (msg, navigation) => {
  const {
    type, //'invite_received' / 'invite_accepted' / 'invite_declined' / 'contact_deleted'
    reason,
    fromUsername,
    fromUserAppKey
  } = event
  switch (type) {
    case 'invite_received':
      navigation.navigate('')
    case 'invite_accepted':
      navigation.navigate('')
    case 'invite_declined':
      navigation.navigate('')
    case 'contact_deleted':
      navigation.navigate('')
  }
}

export default {ContactNotifyAction, MsgNotifyAction}
