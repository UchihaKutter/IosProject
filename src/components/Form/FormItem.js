import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import {
  View,
  TextInput,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'

@observer
export default class InputView extends React.Component {
  @observable
  showPwd = true // true: password; false: text
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
    return (
      <View style={styles.row}>
        {leftView}
        <TextInput
          // underlineColorAndroid='transparent'
          {...propsOfTextInput}
          placeholder={placeholder}
          defaultValue={form[name]}
          placeholderTextColor='#bbbbbb'
          multiline={true}
          style={[styles.input, stylesOfTextInput]}
          onChangeText={(text) => {
            form[name] = text
          }}
        />
        {rightView}
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
    padding: 0
  },
  error: {
    color: 'red'
  }
})
