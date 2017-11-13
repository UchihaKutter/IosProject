import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'

@observer
export default class InputView extends React.Component {
  @observable
  showPwd = true // true: password; false: text
  changeIcon = () => {
    this.showPwd = !this.showPwd
  }

  render() {
    let {
      img,
      containerStyle,
      onChange,
      defaultValue,
      inputType,
      rightIcon,
      placeholder
    } = this.props
    const icon = this.showPwd ? require('assets/img/login/biyan.png') : require('assets/img/login/kaiyan.png')
    const type = inputType ? inputType : this.type ? 'password' : 'text'
    let place = placeholder ? placeholder : '请输入密码'
    return (
      <div className={'input-view-container'} style={containerStyle}>
        <input className="input" type={type} placeholder={place} onChange={onChange} defaultValue={defaultValue}/>
        {rightIcon === 'pwdIcon' && <img src={icon} onClick={this.changeIcon}/>}
      </div>
    )
  }
}
