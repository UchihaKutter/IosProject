import React, {Component} from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native'
import {observer} from 'mobx-react/native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  button: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    marginVertical: 5,
    borderRadius: 5,
    marginTop: 50
  },
  active: {
    backgroundColor: '#198cff'
  }
})

@observer
export default class Submit extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    form: PropTypes.object,
    onSubmit: PropTypes.func
  }
  static contextTypes = {
    form: PropTypes.object
  }

  render() {
    const {children, onSubmit} = this.props
    const form = this.context.form || this.props.form
    return (
      <TouchableOpacity
        style={[styles.button, form.isValid && styles.active]}
        disabled={!form.isValid}
        onPress={onSubmit}
      >
        <Text style={{color: '#ffffff', fontSize: 18}}>{children}</Text>
      </TouchableOpacity>
    )
  }
}
