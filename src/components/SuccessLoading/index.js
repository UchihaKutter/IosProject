import {observer} from 'mobx-react'
import React from 'react'

import {
  StyleSheet,
  Text,
  View,
  Modal,
  ActivityIndicator,
  Dimensions
} from 'react-native'
import Animation from 'lottie-react-native'
import * as Animatable from 'react-native-animatable'
import RootSiblings from 'react-native-root-siblings'
@observer
class Loading extends React.Component {

  constructor(props) {
    super(props)
    this.callback = props.callback
  }

  _show() {
    if (this.animation == null) {
      return
    }
    this.animation.play()
    // setTimeout(()=> {
    //   this.root && this.root.fadeOut(1000)
    // }, 1500);

    // const self = this;
    // setTimeout(()=> {
    //   self.setState({
    //     visiable: false
    //   });
    //   this.callback && this.callback()
    // }, 2400)
  }

  render() {
    return (
      <Animatable.View style={styles.rootContainer} ref={(ref) => {
        this.root = ref
      }}>

        <View style={styles.container}>
          <View>
            <Animation
              ref={(animation) => {
                this.animation = animation
                this._show()
              }}
              style={{
                width: 80,
                height: 80
              }}
              source={require('../../assets/json/success.json')}
              speed={6}
              //   loop={true}
            />
          </View>
          <Text style={styles.text}>{this.props.children ? this.props.children : '成功'}</Text>
        </View>
      </Animatable.View>
    )

  }

}

let loadView
export default class Com {

  static show = (callback) => {
    return loadView = new RootSiblings(<Loading callback={callback}/>)
  }

  static close = () => {
    loadView && (loadView instanceof RootSiblings) && loadView.destroy()
  }

}

const styles = StyleSheet.create({

  rootContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#00000022'
  },

  container: {
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15,
    paddingRight: 15,
    paddingLeft: 15,
    borderRadius: 10
  },

  text: {
    color: '#454545',
    fontSize: 16,
  }
});
