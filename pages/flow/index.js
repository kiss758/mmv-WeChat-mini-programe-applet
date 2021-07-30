let App = getApp();
Page({
  data: {
    goods_list: [], // 商品列表
    order_total_num: 0,
    order_total_price: 0, // 总价，初始为0
    totalPrice: '', // 总价，初始为0
    selectAllStatus: false, // 全选状态，默认全选
    listdata: [], //后台计算传回数据
    selectbutton: false //积分按钮
  },
  onLoad: function (options) {
    this.count_price();
    this.getCartList();
  },
  onShow: function () {
    this.getCartList();
    this.setData({
      totalPrice: '0.00',
      selectAllStatus: false
    })
  },
  // 单选按钮
  selectList: function (e) {
    const {index,checked} = e.currentTarget.dataset; // 获取选中的radio索引
    const GoodsList = this.data.goods_list
    this.data.selectAllStatus = true
    GoodsList[index].selected = !GoodsList[index].selected;
    for(let i = GoodsList.length - 1; i >= 0; i--){
      if(!GoodsList[i].selected){
        this.data.selectAllStatus = false;
        break;
      }
    }
    this.setData({goods_list:GoodsList,selectAllStatus:this.data.selectAllStatus})
    this.count_price()
  },

  //统计价格
  count_price() {
    const GoodsList = this.data.goods_list;let total = 0;
    GoodsList.forEach(item=>{
      if(item.selected){
        total+=item.total_num * item.goods_price
      }
      this.setData({goods_list:GoodsList,totalPrice:total.toFixed(2)})
    })

  },
  //  获取购物车列表
  getCartList: function () {
    App._get(`cart/lists`,{},res=>{
      const {goods_list} = res.data
      res.code === 1 ? this.setData({goods_list}) : App.showError(res.msg)
    })
  },
  // 递增指定的商品数量
  addCount: function (e) {
    const {index,specId} = e.currentTarget.dataset
    let goods = this.data.goods_list[index]
    const {order_total_price} = this.data
    App._post_form(`cart/add`,{goods_id:goods.goods_id,goods_num:1,goods_spec_id:specId})
    goods.total_num++;
    this.setData({
      [`goods_list[${index}]`]:goods,
      order_total_price:this.mathadd(order_total_price,goods.goods_price)
    })
    this.count_price()
  },

  //递减指定的商品数量
  minusCount: function (e) {
    let index = e.currentTarget.dataset.index,
      goodsSpecId = e.currentTarget.dataset.specId,
      goods = this.data.goods_list[index],
      order_total_price = this.data.order_total_price;
    if (goods.total_num > 1) {
      // 后端同步更新
      App._post_form('cart/sub', {
        goods_id: goods.goods_id,
        goods_spec_id: goodsSpecId
      });
      goods.total_num--;
      this.setData({
        ['goods_list[' + index + ']']: goods,
        order_total_price: this.mathsub(order_total_price, goods.goods_price)
      });
    }
    this.count_price();
  },
  // 全选
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus; // 全选ICON默认选中
    selectAllStatus = !selectAllStatus;
    let goods_list = this.data.goods_list;
    goods_list.map(item=>{ item.selected = selectAllStatus })
    this.setData({selectAllStatus,goods_list})
    this.count_price();
  },
  //删除商品
  del: function (e) {
    const {goodsId,specId} = e.currentTarget.dataset
    wx.showModal({
      title: "提示",
      content: "您确定要移除当前商品吗?",
      success: (e) => {
        e.confirm && App._post_form(`cart/delete`, {goods_id:goodsId, goods_spec_id: specId },res=> { 
          res.code === 1 ? this.getCartList() : App.showError(res.msg)
        });
      }
    });
  },
  // 去结算
  submit: function (t) {
    let list = this.data.goods_list; // 获取商品列表数据
    let goods_id_list = '';
    let selectitem = false;
    // 循环列表得到每个数据
    for (let i = 0; i < list.length; i++) {
      if (list[i].selected) {
        goods_id_list = goods_id_list + String(list[i].goods_id) + ','; // 拼接id
        selectitem = true;
      }
    }
    if (selectitem === false) {
      wx.showToast({
        title: '请选择购买商品',
      })
      return false;
    }
    wx.navigateTo({
      url: '../flow/checkout?order_type=cart&goods_id_list=' + goods_id_list
    });

  },
  //加法
  mathadd: function (arg1, arg2) {
    return (Number(arg1) + Number(arg2)).toFixed(2);
  },
  //减法
  mathsub: function (arg1, arg2) {
    return (Number(arg1) - Number(arg2)).toFixed(2);
  },
  //去购物
  goShopping: function () {
    wx.switchTab({
      url: '../index/index',
    });
  },
  onUnload: function () {
    this.data.totalPrice == '';
  }
})