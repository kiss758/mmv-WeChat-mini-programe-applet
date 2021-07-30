// pages/showmember/showmember.js
let App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.user_id,15)
    let user_id = options.user_id;
    let _this=this;
    _this.setData({
      user_id:user_id
    })
    this.getUserDetail();
  },
  getUserDetail: function () {
    let _this = this;
    App._get('user.index/detail', {}, function (result) {
      if (result.code === 1) {
        _this.setData(result.data);
        console.log(result.data.userInfo,27)
        
      } else {
        App.showError(result.msg);
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