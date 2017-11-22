import ActionSheet from 'react-native-actionsheet'
import React from 'react'
import RootSiblings from 'react-native-root-siblings'

class Sheet extends React.PureComponent {
  static defaultProps = {
    cancelIndex: 0,
    destructiveButtonIndex: 3
  }

  componentDidMount() {
    this.ActionSheet.show()
  }

  render() {

    const options = this.props.options ? this.props.options : []
    const handlePress = this.props.handlePress
    return (
      <ActionSheet
        ref={o => this.ActionSheet = o}
        tintColor={'#333333'}
        options={options}
        cancelButtonIndex={this.props.cancelIndex}
        destructiveButtonIndex={this.props.destructiveButtonIndex}
        onPress={handlePress}
      />
    )
  }

}

export default class Com {

  static show = (options, handlePress) => {
    return new RootSiblings(<Sheet options={options} handlePress={handlePress}/>)
  }

  static close = (loading) => {
    if (loading instanceof RootSiblings) {
      loading.destroy()
    }
    else {
      console.warn(`Toast.hide expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof toast}\` instead.`)
    }
  }

}
