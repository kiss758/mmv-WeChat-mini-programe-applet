// pages/integmsg/integmsg.js
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
  goBack:function () {
    wx.navigateBack({
      delta: 1
    })
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getuserInter()
  },
  getuserInter(){
    let _this = this;
    App._get('Usermember/get_UserMemberIntegralDetails_list', {}, function (result) {
      if (result.code === 1) {
        var data = result.data;
        data.UserMemberIntegralDetails_list.forEach((item) => {
           item.create_time = item.create_time.substring(0, 10); //要截取字段的字符串
        })
        _this.setData({          
          data:data
        })
      } else {
        App.showError(result.msg);
      }
    });
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