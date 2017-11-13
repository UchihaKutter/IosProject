/**
 * Created by li on 17-4-26.
 */
import React, {Component} from 'react'
import {
  StyleSheet,
  View,

  Image,
  Text,

  TouchableOpacity,
  PixelRatio

} from 'react-native'

import {PageList} from '../../components'

export default class Page extends Component {

  // data={name: '打开看',date: 170502,lastMsg: 12};
  //
  //
  //
  // msgListData=[{photo:null, name:'打开看',date:170503,lastMsg:12},{photo:null,name:'打开看',date:170502,lastMsg:12},
  //   {photo:null, name:'打开看',date:170501,lastMsg:12},{photo:null, name:'打开看',date:170502,lastMsg:12}];

  // 初始化模拟数据
  constructor(props) {
    super(props)

  }

  componentDidMount() {

  }

  renderItem = ({index, item}) => {
    const {} = item
    return (
      <TouchableOpacity style={styles.item}>
        <Image style={[styles.image]} source={(rowData.photo)
          ? {uri: rowData.photo} : require('../img/pic/xitongxiaoxi.png')}/>
        <View style={styles.content_item_container}>
          <View style={styles.detail_container}>
            <Text style={styles.text_title}>{item.name}</Text>
            <Text style={styles.text_date}>{item.date}</Text>
          </View>
          <Text style={styles.text_content}>{item.lastMsg}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <PageList
        renderItem={this.renderItem}
      />

    )
  }
}

const styles = StyleSheet.create({

  systemMsg: {

    marginTop: 10,
    marginBottom: 10,
    height: 65,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white'
  },

  item: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },

  image_container: {
    marginLeft: 15,
    marginRight: 15
  },
  image: {
    width: 44,
    height: 44,
    marginLeft: 15,
    marginRight: 16

  },

  image_sys: {
    width: 45,
    height: 44,
    marginLeft: 15,
    marginRight: 16

  },

  content_container: {
    justifyContent: 'center',
    height: 65,
    width: 286
    // borderBottomWidth:1/PixelRatio.get(),
    // borderBottomColor:'#dddddd',
  },

  content_item_container: {
    // alignItems:'center',
    justifyContent: 'center',
    height: 65,
    width: 286,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#dddddd'
  },

  detail_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 286,
    marginBottom: 12
  },

  text_title: {
    fontSize: 16,
    color: '#333333'
    // fontFamily:'PingFang-SC-Medium',
  },

  text_content: {
    fontSize: 13,
    color: '#999999'
    // fontFamily:'PingFang-SC-Medium',

  },

  text_date: {
    fontSize: 11,
    color: '#999999',
    // fontFamily:'PingFang-SC-Medium',
    marginRight: 15
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    paddingLeft: 15,
    paddingRight: 15
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#DD0016',
    height: 42,
    flexDirection: 'row'
  }

})
