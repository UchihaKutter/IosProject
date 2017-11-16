import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'

export default class Com extends Component {

  static defaultProps = {
    enable: true,
    color: _styles.primeColor,
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
    this.props.onPress && this.props.onPress()
    await this.setState({enable: false})// 防重复点击
    this.timer = setTimeout(async () => {
      await this.setState({enable: true})// 1秒后可点击
    }, 1000)
  }

  render() {
    const {color, fontSize, children, enable, textStyle} = this.props
    const clickEnable = this.state.enable
    return (
      <TouchableOpacity
        style={[styles.button, this.props.style, enable && styles.buttonUnable]}
        onPress={enable && clickEnable && this.clickFun}>
        <Text style={[styles.buttonText, {color: color, fontSize: fontSize}, textStyle]}>{children}</Text>
      </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({

  buttonText: {
    color: '#fff',
    fontSize: 18,
    paddingLeft: 15,
    paddingRight: 15
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#458bfb',
    height: 42,
    width: '80%',
    flexDirection: 'row'
  },
  buttonUnable: {
    backgroundColor: 'grey'
  }

})
