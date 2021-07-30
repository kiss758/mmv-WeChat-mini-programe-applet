let App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav_select: false, // 快捷导航
    options: {}, // 当前页面参数
    address: null, // 默认收货地址
    exist_address: false, // 是否存在收货地址
    goods: {}, // 商品信息
    disabled: false,
    hasError: false,
    error: '',
    goods_id_list: '',
    integral_list: [],
    isShow: false, //  会员兑礼tooltip
    integral: 0, //会员积分
    height: 0,
    display: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 当前页面参数
    this.data.options = options;
    // 获取当前订单信息
    this.getOrderData();
    this.getinterList(); //临时BUG需要渲染两次才生效

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取当前订单信息
    this.getOrderData();
    this.getinterList(); //临时BUG需要渲染两次才生效
    // this.getinterList();  //临时BUG需要渲染两次才生效
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    //this.getinterList();  //临时BUG需要渲染两次才生效
    // this.getinterList();  //临时BUG需要渲染两次才生效
  },

  //点击积分
  itemSelected(e) {
    var that = this;
    // console.log(e.currentTarget.dataset, 15)
    var integral_list = this.data.integral_list;
    //获取选中的索引
    var index = e.currentTarget.dataset.index;
    var inchecked = e.currentTarget.dataset.inchecked
    // console.log(inchecked, 50)
    var item = this.data.integral_list[index];
    item.selected = !item.selected;
    this.setData({
      integral_list: integral_list,
    });
  },


  getinterList: function () {
    let _this = this;
    App._get('IntegralGoods/index', {}, (result) => {
      if (result.code === 1) {
        const {
          integral_list
        } = result.data;
        const existintegral = result.data.userInfo.member;

        if (existintegral === null) {
          _this.setData({
            integral: 0
          })
        } else {
          const {
            integral
          } = result.data.userInfo.member;
          _this.setData({
            integral
          })
        }
        integral_list.forEach((item, index) => {
          item['selected'] = false
        })
        _this.setData({
          integral_list
        })
      } else {
        App.showError(result.msg);
      }
    });
  },
  // 会员兑礼
  toolTip(e) {
    wx.createSelectorQuery().select('#the-id').boundingClientRect(rect => {}).exec()
    var self = this;
    var unisShow = self.data.isShow;
    self.setData({
      isShow: !unisShow
    })
  },
  /**
   * 获取当前订单信息
   */
  getOrderData: function () {
    let _this = this,
      options = _this.data.options;
    // 获取订单信息回调方法
    let callback = function (result) {
      if (result.code !== 1) {
        App.showError(result.msg);
        return false;
      }
      // 收货地址不在配送范围内
      if (result.data.address !== null && !result.data.intra_region) {
        _this.data.hasError = true;
        _this.data.error = result.data.intra_region_error;
        App.showError(_this.data.error);
      }
      _this.setData(result.data);
    };
    // 立即购买
    if (options.order_type === 'buyNow') {
      App._get(`order/buyNow`, {
        ...options
      }, res => {
        const {
          display
        } = res.data.goods_list[0];
        _this.setData({
          display
        })
        callback(res)
      }, fail => {}, comp => {})
      this.getinterList();
    }
    // 购物车结算
    else if (options.order_type === 'cart') {
      App._get(`order/cart`, {
        goods_id_list: options.goods_id_list
      }, res => {
        callback(res)
      }, fail => {}, comp => {})
      //this.getinterList();  
    }
  },
  /**
   * 选择收货地址
   */
  selectAddress: function () {
    wx.navigateTo({
      url: '../address/' + (this.data.exist_address ? 'index?from=flow' : 'create')
    });
  },

  /**
   * 提交订单
   */
  submitOrder: function () {
    let _this = this,
      options = _this.data.options;
    if (_this.data.disabled) {
      return false;
    }
    if (_this.data.hasError) {
      App.showError(_this.data.error);
      return false;
    }
    // 订单创建成功后回调--微信支付
    let callback = function (result) {
      if (result.code === -10) {
        App.showError(result.msg, function () {
          // 跳转到未付款订单
          wx.redirectTo({
            url: '../order/index?type=payment',
          });
        });
        return false;
      }
      // 发起微信支付
      wx.requestPayment({
        timeStamp: result.data.payment.timeStamp,
        nonceStr: result.data.payment.nonceStr,
        package: 'prepay_id=' + result.data.payment.prepay_id,
        signType: 'MD5',
        paySign: result.data.payment.paySign,
        success: (res) => {
          wx.redirectTo({
            url: '../order/detail?order_id=' + result.data.order_id,
          })
        },
        fail: (res) => {
          App.showError('订单未支付', function () {
            // 跳转到未付款订单
            wx.redirectTo({
              url: '../order/index?type=payment',
            });
          });
        },
        complete: (res) => {},
      })
    };
    // 按钮禁用, 防止二次提交
    _this.data.disabled = true;
    // 显示loading
    wx.showLoading({
      title: '正在处理...'
    });
    //获取积分列表数据
    let interlist = this.data.integral_list;
    let integral_goods_id_list = '';
    for (let i = 0; i < interlist.length; i++) {
      if (interlist[i].selected) {
        console.log(interlist[i].integral_goods_id, 148)
        integral_goods_id_list = integral_goods_id_list + String(interlist[i].integral_goods_id) + ','; // 拼接id
      }
    }
    // 创建订单-立即购买
    if (options.order_type === 'buyNow') {
      App._post_form(`order/buyNow`, {
        ...options,
        integral_goods_id_list
      }, res => {
        callback(res)
      }, fail => {}, comp => {
        _this.data.disabled = false
      });
    }
    // 创建订单-购物车结算
    else if (options.order_type === 'cart') {
      const {
        goods_id_list
      } = options;
      App._post_form(`order/cart`, {
        goods_id_list,
        integral_goods_id_list
      }, res => {
        callback(res)
      }, fail => {}, comp => {
        _this.data.disabled = false
      });
    }
  },
  /**
   * 快捷导航 显示/隐藏
   */
  commonNav: function () {
    this.setData({
      nav_select: !this.data.nav_select
    });
  },
  /**
   * 快捷导航跳转
   */
  nav: function (e) {
    let url = '';
    switch (e.currentTarget.dataset.index) {
      case 'home':
        url = '../index/index';
        break;
      case 'fenlei':
        url = '../category/index';
        break;
      case 'cart':
        url = '../flow/index';
        break;
      case 'profile':
        url = '../user/index';
        break;
    }
    wx.switchTab({
      url
    });
  }
});