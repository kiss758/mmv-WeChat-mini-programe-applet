let App = getApp();

Page({
  data: {
    searchColor: "rgba(0,0,0,0.4)",
    searchSize: "15",
    searchName: "搜索商品",
    curNav: true,
    curIndex: 0,
    list: [],
    showIndex: null,
    list2: [],
    listname: '',
    showclass: '',
    itemindex: ''
  },
  leftnav: function (e) {
    const {
      id,
      name
    } = e.target.dataset;
    let k = 2;
    if (id != 10008) {
      this.selectNav('', k, name, id);
    }
    let {
      index
    } = e.currentTarget.dataset;
    let showIndex = this.data.showIndex;
    index != showIndex ? this.setData({
      showIndex: index,
      showclass: e.currentTarget.dataset.id
    }) : this.setData({
      showIndex: 0
    })
  },
  onLoad: function () {
    this.getCategoryList();
    this.selectNav('', 1, '');
  },
  /**
   * 获取分类列表
   */
  getCategoryList: function () {
    App._get('category/lists', {}, res => {
      res.code === 1 ? this.setData({
        list: res.data.list,
        curNav: res.data.list[0].category_id
      }) : App.showError(res.msg)
    }, fali => {}, comp => {}, false);
  },

  /**
   * 选中分类
   */
  selectNav: function (t, k = 0, name = '', id) {
    switch (k) {
      case 0: //这个是点击
        id = parseInt(t.target.dataset.id);
        name = t.target.data.name
        this.setData({
          itemindex: id
        })
        break;
      case 1: //否则如果 默认
        id = 10014;
        name = "胶原蛋白肽"
        break;
      default: //一级栏目点击
        id = id;
        name = name
        break;
    }
    App._get(`goods/get_category_List`, {
      category_id: id
    }, res => {
      const {
        list: {
          data
        }
      } = res.data
      res.code === 1 ? this.setData({
        list2: data,
        listname: name
      }) : App.showError(res.msg)
    })
  },
  onPullDownRefresh: function () {},
});