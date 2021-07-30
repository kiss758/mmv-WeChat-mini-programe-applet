// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    show_edit: "block",
    edit_name: "编辑",
    edit_show: "none",
    // list: [],               // 购物车列表
    // hasList: false,          // 列表是否有数据
    // 默认展示数据
    hasList: true,
    // 商品列表数据
    list: [{
      id: 1,
      title: '园艺大师抗皱精华露',
      image: '../../images/kefu.png',
      pro_name: "30ml",
      num: 1,
      price: 180,
      selected: true
    },
    {
      id: 2,
      title: '伊芙琳玫瑰护手霜',
      image: '../../images/kefu.png',
      pro_name: "25g",
      num: 1,
      price: 62,
      selected: true
    },
    {
      id: 2,
      title: '燕麦山羊乳舒缓护手霜',
      image: '../../images/kefu.png',
      pro_name: "75ml",
      num: 1,
      price: 175,
      selected: true
    }
    ],
    // 金额
    totalPrice: '', // 总价，初始为0
    // 全选状态
    selectAllStatus: true, // 全选状态，默认全选
  },
  selectList:function(e)
  {
    var that = this;
    // 获取选中的radio索引
    var index = e.currentTarget.dataset.index;
    // 获取到商品列表数据
    var list = that.data.list;
    // 默认全选
    that.data.selectAllStatus = true;
    // 循环数组数据，判断----选中/未选中[selected]
    list[index].selected = !list[index].selected;
    // 如果数组数据全部为selected[true],全选
    for (var i = list.length - 1; i >= 0; i--) {
      if (!list[i].selected) {
        that.data.selectAllStatus = false;
        break;
      }
    }
    // 重新渲染数据
    that.setData({
      list: list,
      selectAllStatus: that.data.selectAllStatus
    })
    // 调用计算金额方法
    that.count_price();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.count_price();
  },
  //统计价格
  count_price() {
    // 获取商品列表数据
    let list = this.data.list;
    // 声明一个变量接收数组列表price
    let total = 0;
    // 循环列表得到每个数据
    for (let i = 0; i < list.length; i++) {
      // 判断选中计算价格
      if (list[i].selected) {
        // 所有价格加起来 count_money
        total += list[i].num * list[i].price;
      }
    }
    // 最后赋值到data中渲染到页面
    this.setData({
      list: list,
      totalPrice: total.toFixed(2)
    });
  },
  //增加数量
  btn_add(e) {
    // 获取点击的索引
    const index = e.currentTarget.dataset.index;
    // 获取商品数据
    let list = this.data.list;
    // 获取商品数量
    let num = list[index].num;
    // 点击递增
    num = num + 1;
    list[index].num = num;
    // 重新渲染 ---显示新的数量
    this.setData({
      list: list
    });
    // 计算金额方法
    this.count_price();
  },
  //减少数量
  btn_minus(e) {
    //   // 获取点击的索引
    const index = e.currentTarget.dataset.index;
    // const obj = e.currentTarget.dataset.obj;
    // console.log(obj);
    // 获取商品数据
    let list = this.data.list;
    // 获取商品数量
    let num = list[index].num;
    // 判断num小于等于1  return; 点击无效
    if (num <= 1) {
      return false;
    }
    // else  num大于1  点击减按钮  数量--
    num = num - 1;
    list[index].num = num;
    // 渲染页面
    this.setData({
      list: list
    });
    // 调用计算金额方法
    this.count_price();
  },
  //删除
  deletes: function (e) {
    var that = this;
    // 获取索引
    const index = e.currentTarget.dataset.index;
    // 获取商品列表数据
    let list = this.data.list;
    wx.showModal({
      title: '提示',
      content: '确认删除吗',
      success: function (res) {
        if (res.confirm) {
          // 删除索引从1
          list.splice(index, 1);
          // 页面渲染数据
          that.setData({
            list: list
          });
          // 如果数据为空
          if (!list.length) {
            that.setData({
              hasList: false
            });
          } else {
            // 调用金额渲染数据
            that.count_price();
          }
        } else {
          console.log(res);
        }
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
  //提交订单
  btn_submit_order:function()
  {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})