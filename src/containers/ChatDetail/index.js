/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  NativeModules,
  PermissionsAndroid,
  Dimensions
} from 'react-native'
import JMessage from 'jmessage-react-plugin';
import IMUI from 'aurora-imui-react-native';
const MessageList = IMUI.MessageList;
const ChatInput = IMUI.ChatInput;
const AuroraIMUIController = IMUI.AuroraIMUIController;
const IMUIMessageListDidLoad = "IMUIMessageListDidLoad";

export default class ChatDetail extends Component<{}> {
  constructor() {
    super()
    this.state = {
      // single: this.props.groupId === "",
      groupNum: '(1)',
      inputContent: '',
      recordText: '按住 说话',
      menuContainerHeight: 1000,
      chatInputStyle: {
        width: Dimensions.get('window').width,
        height: 100
      },
      isDismissMenuContainer: false,
    };
    this.onMsgClick = this.onMsgClick.bind(this);
    this.onAvatarClick = this.onAvatarClick.bind(this);
    this.onMsgLongClick = this.onMsgLongClick.bind(this);
    this.onStatusViewClick = this.onStatusViewClick.bind(this);
    this.onTouchMsgList = this.onTouchMsgList.bind(this);
    this.onSendText = this.onSendText.bind(this);
    this.onSendGalleryFiles = this.onSendGalleryFiles.bind(this);
    this.onStartRecordVideo = this.onStartRecordVideo.bind(this);
    this.onFinishRecordVideo = this.onFinishRecordVideo.bind(this);
    this.onCancelRecordVideo = this.onCancelRecordVideo.bind(this);
    this.onStartRecordVoice = this.onStartRecordVoice.bind(this);
    this.onFinishRecordVoice = this.onFinishRecordVoice.bind(this);
    this.onTakePicture = this.onTakePicture.bind(this);
    this.onCancelRecordVoice = this.onCancelRecordVoice.bind(this);
    this.onSwitchToMicrophoneMode = this.onSwitchToMicrophoneMode.bind(this);
    this.onSwitchToGalleryMode = this.onSwitchToGalleryMode.bind(this);
    this.onSwitchToCameraMode = this.onSwitchToCameraMode.bind(this);
    // this.onTouchEditText = this.onTouchEditText.bind(this);
    // this.onPullToRefresh = this.onPullToRefresh.bind(this);
    // this.onFullScreen = this.onFullScreen.bind(this);
  }

  onMsgClick (message) {
    console.log("message click! " + message);
  }

  onMsgLongClick (message) {
    console.log("message long click " + message);
  }

  onAvatarClick (fromUser) {
    console.log("Avatar click! " + fromUser);
  }

  onStatusViewClick (message) {
    console.log("on message resend! " + message);
  }

  onTouchMsgList () {
    console.log("Touch msg list, hidding soft input and dismiss menu");
    this.setState({
      isDismissMenuContainer: true,
      chatInputStyle: {
        width: Dimensions.get('window').width,
        height: 100
      },
    });
  }

  onPullToRefresh () {
    console.log("pull to refresh! Will load history messages insert to top of MessageList");
    let messages = [{
      msgId: "1",
      status: "send_succeed",
      msgType: "text",
      text: "history1",
      isOutgoing: false,
      fromUser: {
        userId: "1",
        displayName: "Ken",
        avatarPath: "ironman"
      },
      timeString: "9:00",
    }, {
      msgId: "2",
      status: "send_succeed",
      msgType: "text",
      text: "history2",
      isOutgoing: true,
      fromUser: {
        userId: "1",
        displayName: "Ken",
        avatarPath: "ironman"
      },
      timeString: "9:20",
    }, {
      msgId: "3",
      status: "send_succeed",
      msgType: "text",
      text: "history3",
      isOutgoing: false,
      fromUser: {
        userId: "1",
        displayName: "Ken",
        avatarPath: "ironman"
      },
      timeString: "9:30",
    }];
    AuroraIMUIController.insertMessagesToTop(messages);
  }

  onSendText (text) {
    console.log("will send text: " + text);
    let messages = [{
      msgId: "1",
      status: "send_going",
      msgType: "text",
      text: text,
      isOutgoing: true,
      fromUser: {
        userId: "1",
        displayName: "Ken",
        avatarPath: "ironman"
      },
      timeString: "10:00",
    }];
    AuroraIMUIController.appendMessages(messages);
    this.setState({
      menuContainerHeight: this.state.menuContainerHeight == 1000 ? 999 : 1000
    });
  }

  onSendGalleryFiles (mediaFiles) {
    console.log("will send media files: " + mediaFiles);
    AuroraIMUIController.scrollToBottom(true);
    for (let i = 0; i < mediaFiles.length; i++) {
      let mediaFile = mediaFiles[i];
      console.log("mediaFile: " + mediaFile);
      let messages;
      if (mediaFile.mediaType == "image") {
        messages = [{
          msgId: "1",
          status: "send_going",
          msgType: "image",
          isOutgoing: true,
          mediaPath: mediaFile.mediaPath,
          fromUser: {
            userId: "1",
            displayName: "ken",
            avatarPath: "ironman"
          },
          timeString: "10:00"
        }];
      } else {
        messages = [{
          msgId: "1",
          status: "send_going",
          msgType: "video",
          isOutgoing: true,
          mediaPath: mediaFile.mediaPath,
          duration: mediaFile.duration,
          fromUser: {
            userId: "1",
            displayName: "ken",
            avatarPath: "ironman"
          },
          timeString: "10:00"
        }];
      }
      AuroraIMUIController.appendMessages(messages);
    }
  }

  onStartRecordVideo() {
    console.log("start record video");
    AuroraIMUIController.scrollToBottom(true);
  }

  onFinishRecordVideo(mediaPath, duration) {
    console.log("finish record video, Path: " + mediaPath + " duration: " + duration);
    var messages = [{
      msgId: "1",
      status: "send_going",
      msgType: "video",
      isOutgoing: true,
      mediaPath: mediaPath,
      duration: duration,
      fromUser: {
        userId: "1",
        displayName: "ken",
        avatarPath: "ironman"
      },
      timeString: "10:00"
    }];
    AuroraIMUIController.appendMessages(messages);
  }

  onCancelRecordVideo() {
    console.log("cancel record video");
  }

  onStartRecordVoice() {
    console.log("start record voice");

  }

  onFinishRecordVoice(mediaPath, duration) {
    console.log("finish record voice, mediaPath: " + mediaPath + " duration: " + duration);
    var messages = [{
      msgId: "1",
      status: "send_going",
      msgType: "voice",
      isOutgoing: true,
      mediaPath: mediaPath,
      duration: duration,
      fromUser: {
        userId: "1",
        displayName: "ken",
        avatarPath: "ironman"
      },
      timeString: "10:00"
    }];
    AuroraIMUIController.appendMessages(messages);
  }

  onCancelRecordVoice() {
    console.log("cancel record voice");
  }

  onTakePicture(mediaPath) {
    console.log("finish take picture, mediaPath: " + mediaPath);
    var messages = [{
      msgId: "1",
      status: "send_going",
      msgType: "image",
      isOutgoing: true,
      mediaPath: mediaPath,
      fromUser: {
        userId: "1",
        displayName: "ken",
        avatarPath: "ironman"
      },
      timeString: "10:00"
    }];
    AuroraIMUIController.appendMessages(messages);
  }

  async onSwitchToMicrophoneMode() {
    console.log("switch to microphone mode, set menuContainerHeight : " + this.state.menuContainerHeight);
    AuroraIMUIController.scrollToBottom(true);
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
          'title': 'IMUI needs Record Audio Permission',
          'message': 'IMUI needs record audio ' +
          'so you can send voice message.'
        });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can record audio");
      } else {
        console.log("Record Audio permission denied");
      }
    } catch (err) {
      console.warn(err)
    }
    this.setState({
      chatInputStyle: {
        width: Dimensions.get('window').width,
        height: 420
      },
      menuContainerHeight: 1000,
    });
  }

  async onSwitchToGalleryMode() {
    console.log("switch to gallery mode");
    AuroraIMUIController.scrollToBottom(true);
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
          'title': 'IMUI needs Read External Storage Permission',
          'message': 'IMUI needs access to your external storage ' +
          'so you select pictures.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can select pictures");
      } else {
        console.log("Read External Storage permission denied");
      }
    } catch (err) {
      console.warn(err)
    }
    this.setState({
      chatInputStyle: {
        width: Dimensions.get('window').width,
        height: 420
      },
      menuContainerHeight: 1000,
    });
  }

  async onSwitchToCameraMode() {
    console.log("switch to camera mode");
    AuroraIMUIController.scrollToBottom(true);
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA, {
          'title': 'IMUI needs Camera Permission',
          'message': 'IMUI needs access to your camera ' +
          'so you can take awesome pictures.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera")
      } else {
        console.log("Camera permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
    this.setState({
      chatInputStyle: {
        width: Dimensions.get('window').width,
        height: 420
      },
      menuContainerHeight: 850,
    });
  }

  onTouchEditText =()=> {
    console.log("will scroll to bottom");
    AuroraIMUIController.scrollToBottom(true);
  }

  onFullScreen =()=> {
    this.setState({
      menuContainerHeight: 1920
    });
    console.log("Set screen height to full screen");
  }

  render() {
    return (
      <View style = { styles.container }>
        <MessageList
          style = {{flex: 1}}
          {...this.props}
          ref = {(ref) => this.messageList = ref}
          onMsgClick = {this.onMsgClick}
          onMsgLongClick = {this.onMsgLongClick}
          onAvatarClick = {this.onAvatarClick}
          onStatusViewClick = {this.onStatusViewClick}
          onTouchMsgList = {this.onTouchMsgList}
          onPullToRefresh = {this.onPullToRefresh}
          sendBubble = {{imageName:"send_msg", padding: 10}}
          receiveBubbleTextColor = {'#ffffff'}
          sendBubbleTextSize = {18}
          receiveBubbleTextSize = {14}
          sendBubblePressedColor = {'#dddddd'}
          eventMsgTxtColor = {'#ffffff'}
          eventMsgTxtSize = {16}
        />
        <ChatInput
          style = {this.state.chatInputStyle}
          menuContainerHeight = {this.state.menuContainerHeight}
          isDismissMenuContainer = {this.state.isDismissMenuContainer}
          onSendText = {this.onSendText}
          onSendGalleryFiles = {this.onSendGalleryFiles}
          onTakePicture = {this.onTakePicture}
          onStartRecordVideo = {this.onStartRecordVideo}
          onFinishRecordVideo = {this.onFinishRecordVideo}
          onCancelRecordVideo = {this.onCancelRecordVideo}
          onStartRecordVoice = {this.onStartRecordVoice}
          onFinishRecordVoice = {this.onFinishRecordVoice}
          onCancelRecordVoice = {this.onCancelRecordVoice}
          onSwitchToMicrophoneMode = {this.onSwitchToMicrophoneMode}
          onSwitchToGalleryMode = {this.onSwitchToGalleryMode}
          onSwitchToCameraMode = {this.onSwitchToCameraMode}
          onTouchEditText = {this.onTouchEditText}
          onFullScreen = {this.onFullScreen}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 20,
    fontSize:30
  }
})
