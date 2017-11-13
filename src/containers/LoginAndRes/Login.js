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
import Icon from 'react-native-vector-icons/FontAwesome'
import Mobx from '../mobx/User'
import CustomButton from '../components/CustomButton'
import AnimButton from '../components/AnimButton'
import ForgetPwdMobile from './ForgetPwdMobile'
import Regist from './Regist'
import ActionSheet from 'react-native-actionsheet'
import RegistSetPwd from './RegistSetPwd'
import Main from '../pages/Main'
import {observer} from 'mobx-react/native'
import {observable} from 'mobx'
import NavBar from '../components/DefaultNavBar'

@observer
class Page extends React.Component {

  @observable
  isNewPwdUnShow = true

  constructor(props) {
    super(props)
    this.renderInput = this.renderInput.bind(this)
  }

  goBack = () => {
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      BackAndroid.exitApp()// 最近2秒内按过back键，可以退出应用。
    }
    else {
      this.lastBackPressed = Date.now()
      ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT)
    }
    return true
  }

  gotoRegist = (index) => {
    console.log(index)
    if (index > 0) {
      _navigator.push({
        component: Regist,
        name: '注册',
        type: 1,
        registType: index
      })
    }

  }

  gotoForgetPwd = (index) => {

    if (index > 0) {
      _navigator.push({
        component: Regist,
        name: '忘记密码',
        type: 2,
        registType: index
      })
    }

  }

  chooseRegistType = () => {
    this.ActionSheet.show()
  }

  chooseForgetPwdType = () => {
    this.ActionSheet1.show()
  }

  sWidth = Dimensions.get('window').width

  render() {
    let bgHeight = this.sWidth * 0.84765
    return (
      <View style={styles.container}>
        {this.props.type !== 2 ? <NavBar title='登录'/> : <NavBar title='登录' leftComponent={null}/>}
        {/* <StatusBar*/}
        {/* backgroundColor='transparent'*/}
        {/* translucent={true}*/}
        {/* hidden={false}*/}
        {/* animated={true}*/}
        {/* />*/}
        {/*
                 <Image style={{width:this.sWidth, height:bgHeight}} source={require('../img/loginbg.png')}
                 resizeMode='contain'/>
                 */}

        <Image style={{width: 84, height: 84, marginTop: 65, marginBottom: 38}}
               source={require('../img/login/168-168.png')}
               resizeMode='contain'/>
        {/* <Image source={require('../img/start.png')}/> */}

        {this.renderInput('手机号/邮箱/通行证', 'account', require('../img/login/zhanghao.png'),
          {}, false)}
        {this.renderInput('请输入密码', 'password', require('../img/login/mima.png'),
          {secureTextEntry: this.isNewPwdUnShow}, true)}

        <AnimButton ref={(ref) => {
          this.btnAnim = ref
        }} style={styles.buttonAnim} onPress={this.onClickLogin}>登录</AnimButton>
        {this.renderBottom()}

        <ActionSheet
          ref={o => (this.ActionSheet = o)}
          tintColor={'#333333'}
          options={options}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={DESTRUCTIVE_INDEX}
          onPress={(index) => this.gotoRegist(index)}
        />

        <ActionSheet
          ref={o1 => (this.ActionSheet1 = o1)}
          tintColor={'#333333'}
          options={options1}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={DESTRUCTIVE_INDEX}
          onPress={(index) => this.gotoForgetPwd(index)}
        />

        <Image
          resizeMode='stretch'
          source={require('../img/navbar.png')}
          style={{position: 'absolute', top: 0, left: 0, width: '100%', height: STATUS_BAR_HEIGHT}}
        />
      </View>
    )
  }

  // <CustomButton style={styles.buttonLogin} onPress={()=>Mobx.submitLogin()}>登录</CustomButton>

  onClickLogin = () => {
    const dismissKeyboard = require('dismissKeyboard')
    dismissKeyboard()
    this.btnAnim.startAnimation()
    setTimeout(() => {
      Mobx.submitLogin().then(() => {
          _navigator.resetTo({
            component: Main,
            name: '首页'
          })
        },
        () => {
          this.btnAnim && this.btnAnim.startAnimtionReverse()
        }
      )
    }, 1500)
  }

  renderBottom() {
    return (
      <View style={styles.bottomContainer}>
        <Text style={[styles.bottomButton, {color: '#999999'}]} onPress={this.chooseForgetPwdType}>忘记密码？</Text>

        <Text style={[styles.bottomButton, {color: '#198cff'}]} onPress={this.chooseRegistType}>注册</Text>
      </View>
    )
  }

  renderInput(label, value, imgPath, params, isShowIcon) {

    return (
      <View style={[styles.inputContainer]}>
        <Image style={{width: 15, height: 15, marginRight: 10}}
               resizeMode={'contain'} source={imgPath}></Image>
        {/* <Icon style={{marginLeft: 10, paddingLeft: 15, width: 50}} name={icon} size={23} color={color}/>*/}

        <TextInput underlineColorAndroid='transparent'
                   {...params}
                   placeholder={label}
                   defaultValue={Mobx[value]}
                   placeholderTextColor='#bbbbbb'
                   multiline={true}
                   style={[styles.inputText]}
                   onChangeText={(text) => {
                     Mobx[value] = text
                   }}
        />

        {isShowIcon ? <TouchableOpacity onPress={() => (this.isNewPwdUnShow = !this.isNewPwdUnShow)}
                                        style={{position: 'absolute', right: 20}}>
          <Image style={{height: 15, width: 15}} resizeMode={'contain'}
                 source={this.isNewPwdUnShow ? require('../img/pic/biyan.png') : require('../img/pic/kaiyan.png')}/>
        </TouchableOpacity> : null}
      </View>
    )
  }
}

const STATUS_BAR_HEIGHT = Platform.OS == 'android' && Platform.Version <= 19 ? 0 : 22

const styles = StyleSheet.create({

  container: {

    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
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

const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 4

const options = [
  '取消',
  '手机号注册',
  '邮箱注册'

]

const options1 = [

  '取消',
  '手机号找回密码',
  '邮箱找回密码'

]

export default Page

