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
import {NavigationActions} from 'react-navigation'

const {FormProvider, FormItem, Submit} = Form

@inject(stores => ({
  user: stores.user
}))
@observer
export default class Page extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: '注册'
  })

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
            <Submit name='login' onSubmit={this.onClickRegister}>注册</Submit>
          </View>
        </FormProvider>
      </View>
    )
  }

  onClickRegister = () => {
    this.props.user.register().then(() => {
      this.props.navigation.goBack()
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
  }

})
