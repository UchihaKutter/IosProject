import React, {PureComponent} from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  LayoutAnimation,
  Keyboard
} from 'react-native'
import CustomButton from '../CustomButton'
import Icon from '../Icon'

const {FontAwesomeIcon} = Icon

export default class Com extends PureComponent {
  text = '15880133505'

  state = {
    isFocus: false
  }

  componentWillUnmount() {
    this.setState({
      isFocus: false
    })
  }

  render() {
    let {placeholder} = this.props
    placeholder = placeholder ? placeholder : '请输入关键字'
    return (
      <TouchableOpacity style={styles.topContainer} onPress={this.props.onPress}>
        <TextInput ref={(ref) => this.input = ref} style={styles.inputSearch}
                   editable={!this.props.onPress}
                   onFocus={(event) => this.onFocus(event)}
                   onEndEditing={(event) => this.onEndEditing(event)}
                   placeholder={placeholder}
                   placeholderTextColor='#cccccc'
                   defaultValue={'15880133505'}
                   onChangeText={(text) => {
                     this.text = text
                   }}
          //onSubmit={Keyboard.dismiss}
                   underlineColorAndroid='transparent' {...this.props}/>

        <FontAwesomeIcon style={styles.iconSearch} color="#ccc" name='search' size={20}/>

        <CustomButton onPress={this.onSearch}
                      style={[styles.button, {width: this.state.isFocus ? 70 : 0}]}>搜索</CustomButton>

      </TouchableOpacity>
    )
  }

  onSearch = () => {
    Keyboard.dismiss()
    this.props.onSearch && this.props.onSearch(this.text)
  }

  onFocus(event) {
    console.log('onFocus  ', this.input.isFocused())
    LayoutAnimation.easeInEaseOut()
    this.setState({
      isFocus: this.input.isFocused()
    })
  }

  onEndEditing(event) {
    console.log('onEndEditing', event.nativeEvent.text)
    // console.log('onEndEditing  ', this.input.isFocused());
    // LayoutAnimation.easeInEaseOut();
    //
    // this.setState({
    //   isFocus: this.input.isFocused()
    // });
  }

}

const styles = StyleSheet.create({

  button: {
    height: 35,
    width: 70,
    borderRadius: 5,
    marginLeft: 10
  },

  topContainer: {
    height: 50,
    padding: 7.5,
    paddingLeft: 10,
    backgroundColor: '#e8e8e8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  inputSearch: {
    flex: 1,
    height: 35,
    borderRadius: 15,
    backgroundColor: 'white',
    paddingLeft: 50,
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 16
  },

  iconSearch: {
    position: 'absolute',
    left: 10,
    margin: 14,
    backgroundColor: 'transparent'
  }

})
