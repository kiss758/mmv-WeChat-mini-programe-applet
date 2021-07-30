Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: "",
    showModal: true, //定义登录弹窗
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
          iv: ivObj
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