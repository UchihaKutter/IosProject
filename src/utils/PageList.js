// Fetch list of data by page.
// Each item should be immutable or observable.

import {observable, computed, action, runInAction} from 'mobx'

export default class PageList {
  constructor() {
  }

  @observable
  isFetching = true // defaults to true, waiting first refresh.

  @observable
  isRefreshing = false

  @observable
  list = []

  @observable
  currentPage = 1
  @observable
  totalPages = -1

  @action
  setList(list) {
    this.list = list
  }

  @computed
  get isOver() {
    // return this.currentPage == this.totalPages;
    return this.totalPages >= 0 && this.list.length >= this.totalPages
  }

  @action
  refresh(refresh) {
    this.currentPage = 1
    this.totalPages = -1
    this.isRefreshing = true
    return this.fetch(true)
  }

  fetchMore = () => {
    return this.fetch()
  }

  @action
  async fetch(refresh = false) {
    if ((!refresh && this.isFetching) || this.isOver) {
      // this.isFetching = false;
      // this.isRefreshing = false;
      return
    }
    const skip = refresh ? 1 : this.currentPage + 1
    // alert(skip)
    this.isFetching = true
    const {currentPage, totalPages, list} = await this.fetchData(skip)

    runInAction(() => {
      this.currentPage = currentPage
      this.totalPages = totalPages
      if (refresh) {
        // 完全刷新
        this.list = []
        this.list = list
        // this.list.replace(list);
      }
      else if (skip === currentPage) {
        // 检查skip防止重入
        this.list.splice(this.list.length, 0, ...list)
      }
      this.isFetching = false
      this.isRefreshing = false
    })
  }

  async fetchData(page) {
    const body = await this.fetchList(page)
    if (body) {
      return {
        list: body.rows,
        currentPage: body.page,
        totalPages: body.total
      }
    }
    else {
      return {
        list: [],
        currentPage: 1,
        totalPages: 1
      }
    }
  }

  fetchList(page) {
    console.log('fetchData() should be overrided!')
  }

}
