// pages/exchange/exchange.js
let App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    integral_list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getuserInter()
  },
  getuserInter(){
    let _this = this;
    App._get('Integralgoods/index', {}, function (result) {
      if (result.code === 1) {
        var integral_list = result.data.integral_list;
        var userInfo = result.data.userInfo;
        _this.setData({
          userInfo:userInfo,
          integral_list:integral_list
        })
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
    this.getuserInter()
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