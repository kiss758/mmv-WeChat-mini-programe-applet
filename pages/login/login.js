let App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //跳到首页
  jump_index: function () {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  /**
   * 授权登录
   */
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (UserProfile_res) => {
        let _this = this;
        if (UserProfile_res.errMsg !== "getUserProfile:ok") {
          return false;
        }
        wx.showLoading({
          title: "正在登录",
          mask: true
        });
        // 执行微信登录
        wx.login({
          success: function (res) {
            console.log(res);
            // 发送用户信息
            App._post_form('user/login', {
              code: res.code,
              user_info: UserProfile_res.rawData,
              encrypted_data: UserProfile_res.encryptedData,
              iv: UserProfile_res.iv,
              signature: UserProfile_res.signature
            }, function (result) {
              if (result.code === 1) {
                wx.setStorageSync('token', result.data.token);
                wx.setStorageSync('user_id', result.data.user_id);
                wx.setStorageSync('session_key', result.data.session_key);

                _this.navigateBack()

              } else {
                App.showError(result.msg);
              }
            }, false, function () {
              wx.hideLoading();
            });
          }
        });
      }
    })
  },
  // authorLogin: function (e) {
  //   if (e.detail.errMsg !== 'getUserInfo:ok') {
  //     return false;
  //   }
  //   wx.showLoading({
  //     title: "正在登录",
  //     mask: true
  //   });
  //   // 执行微信登录
  //   wx.login({
  //     success: function (res) {
  //       console.log(res,20000);
  //       // 发送用户信息
  //       App._post_form('user/login', {
  //         code: res.code,
  //         user_info: e.detail.rawData,
  //         encrypted_data: e.detail.encryptedData,
  //         iv: e.detail.iv,
  //         signature: e.detail.signature
  //       }, function (result) {
  //         if (result.code === 1) {
  //           // 记录token user_id
  //           wx.setStorageSync('token', result.data.token);
  //           wx.setStorageSync('user_id', result.data.user_id);
  //           wx.switchTab({
  //             url: '../user/index'
  //           });
  //         } else {
  //           App.showError(result.msg);
  //         }
  //       }, false, function () {
  //         wx.hideLoading();
  //       });
  //     }
  //   });
  // },
  /**
   * 授权成功 跳转回原页面
   */
  navigateBack: function () {
    // wx.navigateBack();
    let currentPage = wx.getStorageSync('currentPage');
    if (currentPage.route == "pages/flow/index" || currentPage.route == "pages/user/index") {
      wx.switchTab({
        url: '/' + currentPage.route + '?' + App.urlEncode(currentPage.options)
      });
    } else {
      wx.redirectTo({
        url: '/' + currentPage.route + '?' + App.urlEncode(currentPage.options)
      });
    }
  },

})