/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react'
import {
  // Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native'
import {inject, observer} from 'mobx-react'
import {ItemLineView, CustomButton, Icon} from '../../components'
import {Form} from '../../components'
import {observable} from 'mobx'

const {FormProvider, FormItem, Submit} = Form

const {FontAwesomeIcon} = Icon
import Storage from '../../utils/Storage'

@inject(stores => ({
  user: stores.user
}))
@observer
export default class App extends Component<{}> {
  constructor() {
    super()
  }

  componentDidMount() {

  }

  updateMyInfo = (info) => {
    this.props.user.updateMyInfo(info)
  }
  // <View style={styles.container}>
  // <TouchableOpacity {...this.props} style={[styles.container1, {...this.props.style}]}>
  // <TextInput underlineColorAndroid='transparent'
  // placeholder={'请输入2-12位昵称'}
  // defaultValue={this.name}
  // style={[styles.inputText]}
  // onChangeText={(text) => {
  //   this.name = text
  // }}
  // />
  // </TouchableOpacity>
  // <CustomButton style={{position: 'absolute', bottom: 0}}>保存成功</CustomButton>
  // </View>
  render() {
    const {navigation, user} = this.props
    const {name, placeholder, onSubmit} = navigation.state.params
    console.log(onSubmit)
    return (
      <View style={styles.container}>
        <FormProvider form={user}>
          <View style={styles.formContainer}>
            <FormItem name={name} placeholder={placeholder}
                      style={{backgroundColor: '#ffffff'}}></FormItem>
            <Submit onSubmit={this.updateMyInfo({`${name}`:})} style={{position: 'absolute', bottom: 0}}
                    name={name}>保存</Submit>
          </View>
        </FormProvider>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  formContainer: {
    flex: 1

  },
  container1: {
    backgroundColor: 'white',
    height: 44,
    justifyContent: 'space-between',
    alignItems: 'center',

    flexDirection: 'row',
    marginTop: 10

  },
  inputText: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    padding: 10

  }
})
