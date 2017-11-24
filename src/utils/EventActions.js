const ContactNotifyAction = (event, navigation) => {
  console.log('event ', event)
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

const MsgNotifyAction = (event, navigation) => {
  console.log('event ', event)
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

export default {ContactNotifyAction}
