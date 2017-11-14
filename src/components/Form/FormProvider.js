import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class FormProvider extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    form: PropTypes.object,
    children: PropTypes.element.isRequired
  }

  static childContextTypes = {
    form: PropTypes.object
  }

  getChildContext() {
    return {
      form: this.props.form
    }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}
