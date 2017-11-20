import React from 'react'
import {
  StyleSheet,
  StatusBar,
  ToastAndroid,
  View,
  BackAndroid,
  Text,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Platform
} from 'react-native'
import {Form} from '../../components'
import {observer, inject} from 'mobx-react/native'
import {observable} from 'mobx'

const {FormProvider, FormItem, Submit} = Form

@inject(stores => ({
  user: stores.user
}))
@observer
export default class Page extends React.Component {

  @observable
  isNewPwdUnShow = true

  constructor(props) {
    super(props)

  }

  render() {
    const {user} = this.props
    return (
      <View style={styles.container}>
        <FormProvider form={user}>
          <View style={styles.formContainer}>
            <FormItem name="username" placeholder='手机号' propsOfTextInput={{keyboard: 'numeric'}}>Mobile</FormItem>
            <FormItem propsOfTextInput={{keyboardType: 'numeric'}} placeholder='密码'
                      name="password" showPwd={true} hasRightView={true}>Password</FormItem>
            <Submit name='login' onSubmit={this.onClickLogin}>登录</Submit>
          </View>
        </FormProvider>
      </View>
    )
  }

  onClickLogin = () => {
    // const dismissKeyboard = require('dismissKeyboard')
    // dismissKeyboard()
    this.props.user.login().then(() => {
      this.props.navigation.navigate('Home')
    })

  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  formContainer: {
    width: '80%'
  },

  bottomContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: 26,
    width: 250
    // flex: 1
  },

  bottomButton: {
    // color: '#965A63',
    margin: 10,
    fontSize: 14
  },

  inputContainer: {
    width: 250,
    height: 27,
    // marginLeft: 20,
    // marginRight: 20,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center'
    // borderRadius: 25,
    // borderWidth: 1,
    // borderColor: '#F0CAD1'
  },

  inputText: {
    flex: 1,
    fontSize: 14,
    padding: 0,
    color: '#333333',
    // height:
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dddddd'
  },

  buttonLogin: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    borderRadius: 25,
    backgroundColor: '#BF001E',
    width: Dimensions.get('window').width - 40
  },

  buttonAnim: {
    width: 250,
    height: 44,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 40,
    borderRadius: 2,
    backgroundColor: '#458bfb'
  },

  buttonRegist: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    backgroundColor: '#8E0019'
  },

  button: {
    borderRadius: 5,
    height: 50,
    color: '#fff',
    backgroundColor: '#FA8E0E'
  },

  loginButton: {
    marginTop: 40,
    height: 40,
    borderRadius: 20,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text_sheet: {
    color: '#333333',
    fontSize: 17

  }

})

