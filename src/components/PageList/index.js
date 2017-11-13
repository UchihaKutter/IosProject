import React from 'react'
import {FlatList, RefreshControl} from 'react-native'
import LoadMore from './LoadMore'
import {observer} from 'mobx-react/native'

@observer
class Comp extends React.Component {

  constructor(props) {
    super(props)
    if (!props.store) {
      console.error('PageList component must contain a store')
      return
    }
    this.store = this.props.store
  }

  renderRefreshControl = () => {
    return (
      <RefreshControl
        refreshing={this.store.isRefreshing}
        onRefresh={this.store.refresh}
        colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
        progressBackgroundColor="#ffffff"
      />
    )
  }

  render() {
    const list = this.store.list.slice(0)
    return (
      <View>
        <FlatList
          data={list}
          keyExtractor={(item, index) => index}
          refreshing={this.store.isRefreshing}
          removeClippedSubviews={false}
          onEndReached={this.store.fetchMore}
          refreshControl={this.renderRefreshControl()}
          {...this.props}
        />
        <LoadMore store={this.store}/>
      </View>
    )
  }

}

export default Comp
