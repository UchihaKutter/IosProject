import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import {observer} from 'mobx-react'

@observer
export default class Com extends Component {

  static defaultProps = {
    enable: true,
    fontSize: 18
  }

  constructor(props) {
    super(props)
    this.state = {
      enable: true // 是否被禁用
    }
    this.color = props.color
    this.fontSize = props.fontSize
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
  }

  clickFun = async () => {
    console.log('clickFun begin')
    const clickEnable = this.state.enable
    const enable = this.props.enable
    enable && clickEnable && this.props.onPress && this.props.onPress()
    await this.setState({enable: false})// 防重复点击
    this.timer = setTimeout(async () => {
      await this.setState({enable: true})// 1秒后可点击
    }, 1000)
  }

  render() {
    let {color, fontSize, children, enable, textStyle} = this.props
    const clickEnable = this.state.enable
    // console.log(this.props.onPress)
    console.log('enable: ', enable, 'clickEnable: ', clickEnable)
    return (
      <TouchableOpacity
        style={[styles.button, {backgroundColor: _styles.primeColor}, this.props.style, !enable && styles.buttonUnable]}
        onPress={this.clickFun}>
        <Text style={[styles.buttonText, textStyle]}>{children}</Text>
      </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({

  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    paddingLeft: 15,
    paddingRight: 15
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // borderRadius: 20,
    height: 50,
    width: '100%',
    flexDirection: 'row'
  },
  buttonUnable: {
    backgroundColor: 'grey'
  }

})
