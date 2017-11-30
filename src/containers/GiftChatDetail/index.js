import React from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'

import {GiftedChat, Actions, Bubble, SystemMessage} from 'react-native-gifted-chat'
import CustomActions from './CustomActions'
import CustomView from './CustomView'
import {inject, observer} from 'mobx-react'
import Conversation from '../../stores/conversation'

@inject(stores => ({
  user: stores.user
}))
@observer
export default class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false
    }

    this._isMounted = false
    this.onSend = this.onSend.bind(this)
    this.onReceive = this.onReceive.bind(this)
    this.renderCustomActions = this.renderCustomActions.bind(this)
    this.renderBubble = this.renderBubble.bind(this)
    this.renderSystemMessage = this.renderSystemMessage.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.onLoadEarlier = this.onLoadEarlier.bind(this)
    this._isAlright = null
    this.conversation = this.props.navigation.state.params.conversation
  }

  componentDidMount() {
    this.conversation.getHistoryMessages().then()
  }

  componentWillMount() {
    this._isMounted = true
    // this.setState(() => {
    //   return {
    //     messages: require('./data.js')
    //   }
    // })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true
      }
    })

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.prepend(previousState.messages, require('./old_messages.js')),
            loadEarlier: false,
            isLoadingEarlier: false
          }
        })
      }
    }, 1000) // simulating network
  }

  onSend(messages = []) {
    console.log('onSend', messages)
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages)
      }
    })
    const text = messages[0].text
    if (text) {
      this.conversation.addTextMessage(text)
    }


    // for demo purpose
    // this.answerDemo(messages)
  }

  answerDemo(messages) {
    if (messages.length > 0) {
      if ((messages[0].image || messages[0].location) || !this._isAlright) {
        this.setState((previousState) => {
          return {
            typingText: 'React Native is typing'
          }
        })
      }
    }

    setTimeout(() => {
      if (this._isMounted === true) {
        if (messages.length > 0) {
          if (messages[0].image) {
            this.onReceive('Nice picture!')
          }
          else if (messages[0].location) {
            this.onReceive('My favorite place')
          }
          else {
            // if (!this._isAlright) {
            //   this._isAlright = true;
            //   this.onReceive('Alright');
            // }
            this.onReceive('Alright')
          }
        }
      }

      this.setState((previousState) => {
        return {
          typingText: null
        }
      })
    }, 1000)
  }

  onReceive(text) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native'
            // avatar: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png',
          }
        })
      }
    })
  }

  _onReceive(msg) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native'
            // avatar: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png',
          }
        })
      }
    })
  }

  renderAvatar(props) {
    console.log('renderAvatar', props)
  }

  renderCustomActions(props) {
    if (Platform.OS === 'ios') {
      return (
        <CustomActions
          {...props}
        />
      )
    }
    const options = {
      'Action 1': (props) => {
        alert('option 1')
      },
      'Action 2': (props) => {
        alert('option 2')
      },
      'Cancel': () => {
      }
    }
    return (
      <Actions
        {...props}
        options={options}
      />
    )
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#ffffff'
          }
        }}
      />
    )
  }

  renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15
        }}
        textStyle={{
          fontSize: 14
        }}
      />
    )
  }

  renderCustomView(props) {
    return (
      <CustomView
        {...props}
      />
    )
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      )
    }
    return null
  }

  render() {
    const {username, nickname} = this.props.user.userInfo
    const list = this.conversation.uiList.slice(0)
    console.log('chat detail list', list)
    return (
      <GiftedChat
        messages={list}
        onSend={this.onSend}
        loadEarlier={this.state.loadEarlier}
        onLoadEarlier={this.onLoadEarlier}
        isLoadingEarlier={this.state.isLoadingEarlier}
        showUserAvatar={true}
        renderAvatarOnTop={true}
        keyboardShouldPersistTaps={'handled'}
        // renderAvatar = {this.renderAvatar}
        user={{
          _id: username, // sent messages should have same user._id
          name: nickname
        }}
        renderActions={this.renderCustomActions}
        renderBubble={this.renderBubble}
        renderSystemMessage={this.renderSystemMessage}
        renderCustomView={this.renderCustomView}
        renderFooter={this.renderFooter}
        // bottomOffset={100}
      />
    )
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  footerText: {
    fontSize: 14,
    color: '#aaa'
  }
})
