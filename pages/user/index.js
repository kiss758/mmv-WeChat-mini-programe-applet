let App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    user: {},
    orderCount: {},
    provalue: 20, //积分进度条
    member_id: 0,
    addmess: '一键绑定手机成为会员',
    complete: '注册绑定成功',
    //弹窗块
    openid: "",
    loginstate: "0",
    openid: "",
    userEntity: null,
    terminal: "",
    osVersion: "",
    phoneNumber: "",
    showModal: false, //定义登录弹窗
    width:'350rpx'
    //弹窗块

  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getuserInter();
    this.getUserDetail();
    this.isRegister();
  },
  
  isRegister(){
    let _this = this
    if(_this.data.addmess === "一键绑定手机成为会员"){
      _this.setData({width:'350rpx'})
    }
    if(_this.data.complete === "注册绑定成功"){
      _this.setData({width:'400rpx'})
    }
  },

  getSystemBaseInfo() {
    wx.showNavigationBarLoading({
      success(res) {
        console.log(res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取当前用户信息
    this.getUserDetail();
    this.getuserInter()
  },
  getuserInter() {
    let _this = this;
    App._get('IntegralGoods/index', {}, function (result) {
      if (result.code === 1) {
        var integral_list = result.data.integral_list;
        var userInfo = result.data.userInfo;
        _this.setData({
          user: userInfo,
        })
      } else {
        App.showError(result.msg);
      }
    });
  },
  /**
   * 获取当前用户信息
   */
  getUserDetail: function () {
    let _this = this;
    App._get('user.index/detail', {}, function (result) {
      if (result.code === 1) {
        _this.setData(result.data);
        _this.setData({
          member_id: result.data.userInfo.member_id //用户标识
        })
      } else {
        App.showError(result.msg);
      }
    });
  },
  btnclick: function () {
    let nickName = this.data.userInfo.nickName;
    wx.navigateTo({
      // url: '../member/member?id=' + user_id,
      url: '../member/member?nickName=' + nickName,
    })
  },

  addclick: function () {
    let user_id = this.data.userInfo.user_id;
    wx.navigateTo({
      url: '../showmember/showmember?user_id=' + user_id,
    })
  },



  onGotUserInfo: function (e) {
    var that = this;
    if (e.detail.errMsg == "getUserInfo:ok") {
      wx.setStorage({
        key: "userinfo",
        data: e.detail.userInfo
      })
      this.setData({
        userInfo: e.detail.userInfo
      });
      that.showDialogBtn(); //调用一键获取手机号弹窗（自己写的）
    }
  },


  // 显示一键获取手机号弹窗
  showDialogBtn: function () {
    //修改弹窗状态为true，即显示
    this.setData({
      showModal: true
    })
  },
  // 隐藏一键获取手机号弹窗
  hideModal: function () {
    //修改弹窗状态为false,即隐藏
    this.setData({
      showModal: false
    });
  },


  //通过绑定手机号登录
  getPhoneNumber: function (e) {
    var ivObj = e.detail.iv;
    var telObj = e.detail.encryptedData;
    var codeObj = "";
    var that = this;
    //------执行Login---------
    wx.login({
      success: res => {
        console.log('code转换', res.code);
        // 发送用户信息
        App._post_form('member/login_phone', {
          code: res.code,
          encryptedData: telObj,
          iv: ivObj,
          session_key: wx.getStorageSync('session_key')
        }, function (result) {
          if (result.code === 1) {
            that.onLoad();
            App.showError('注册绑定成功');
          } else {
            App.showError(result.msg);
          }
        }, false, function () {
          //wx.hideLoading();
        });
        console.log(e.detail.errMsg);
        if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
          //用户点击拒绝
          console.log('用户点击拒绝');
        } else {
          //允许授权执行
          console.log('允许授权执行');
        }
      }
    });
  },

})