import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Text
} from 'react-native'
import PropTypes from 'prop-types'
import Icon from '../Icon'
import camelCase from 'camelcase'

@observer
export default class InputView extends React.Component {
  @observable
  showPwd = false // true: password; false: text
  constructor(props) {
    super(props)
    this.showPwd = props.showPwd
    this.hasRightView = props.hasRightView
  }
  changeIcon = () => {
    this.showPwd = !this.showPwd
  }
  static propTypes = {
    name: PropTypes.string.isRequired,
    form: PropTypes.object,
    children: PropTypes.string.isRequired,
    autoFocus: PropTypes.boolean,
    ...TextInput.propTypes
  }
  static contextTypes = {
    form: PropTypes.object
  }

  render() {
    const {name, placeholder, rightView, leftView, propsOfTextInput, stylesOfTextInput} = this.props
    // const { focused } = this.state;
    const form = this.context.form || this.props.form
    const icon = this.showPwd ? <Icon.FontAwesomeIcon name={'eye'} size={20} onPress={this.changeIcon}/>
      : <Icon.FontAwesomeIcon name={'eye-slash'} size={20} onPress={this.changeIcon} color={'#dddddd'}/>
    const secureTextEntry = this.showPwd
    return (
      <View style={[styles.row, _styles.underLine]}>
        {leftView}
        <TextInput
          underlineColorAndroid='transparent'
          {...propsOfTextInput}
          placeholder={placeholder}
          defaultValue={form[name]}
          placeholderTextColor='#bbbbbb'
          multiline={true}
          secureTextEntry={secureTextEntry}
          style={[styles.input, stylesOfTextInput]}
          onChangeText={(text) => {
            form[name] = text
          }}
        />
        {this.hasRightView ? rightView ? rightView : icon : null}
      </View>

    )
  }
}
// const styles = StyleSheet.create({
//   inputText: {
//     flex: 1,
//     fontSize: 14,
//     padding: 0,
//     color: '#333333',
//     // height:
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     borderBottomColor: '#dddddd'
//   },
// })

const styles = StyleSheet.create({
  container: {},
  row: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    flex: 1
  },
  inputWrapper: {
    flex: 3,
    borderWidth: 1,
    margin: 10
  },
  input: {
    flex: 1,
    fontSize: 14,
    padding: 5,
    color: '#333333',
    // height:
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dddddd',
    textAlignVertical: 'center'
  },
  error: {
    color: 'red'
  }
})
