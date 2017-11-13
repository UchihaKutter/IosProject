module.exports = [
  {
    _id: Math.round(Math.random() * 1000000),
    text: 'Yes, and I use Gifted Chat!',
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'Developer'
      // avatar: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png',
    },
    sent: true,
    received: true,
    location: {
      latitude: 48.864601,
      longitude: 2.398704
    }
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: 'Are you building a chat app?',
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 2,
      name: 'React Native'
      // avatar: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png',
    }
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: 'You are officially rocking GiftedChat.',
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    system: true
  }
]
