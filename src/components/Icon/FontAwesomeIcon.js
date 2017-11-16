import Icon from 'react-native-vector-icons/FontAwesome'
import React from 'react'

export default class FontAwesome extends React.Component {
  constructor(props) {
    super(props)
    if (!props.name) {
      console.error('FontAwesomeIcon: 请输入图标名字')
    }
  }

  render() {
    console.log('ldldlldld')
    const name = this.props.name
    const size = this.props.size ? this.props.size : 20
    const color = this.props.color ? this.props.color : _styles.primeColor
    return (
      <Icon name={name} size={size} color={color} {...this.props}/>
    )
  }
}
