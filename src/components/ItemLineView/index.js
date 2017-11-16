import React from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native'

export default class ItemView extends React.Component {
  render() {
    const {left, middle, right, hasUnderLine} = this.props
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={[styles.innerContainer, hasUnderLine && _styles.underLine]}>
          <Text style={styles.left}>{left}</Text>
          <Text style={[styles.middle, this.props.middleStyle]}>{middle}</Text>
          <Text style={styles.right}>{right}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    height: 50,
    backgroundColor: '#ffffff'
  },
  innerContainer: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  left: {
    position: 'absolute',
    left: 0,
    fontSize: 16,
    color: '#333333'
  },
  middle: {
    alignSelf: 'center',
    fontSize: 16,
    color: '#333333'
  },
  right: {
    position: 'absolute',
    right: 0,
    fontSize: 14,
    color: '#666666'
  }
})
