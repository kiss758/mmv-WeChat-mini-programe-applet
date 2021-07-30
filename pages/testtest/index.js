Page({
  /**
   * 页面的初始数据
   */
  data: {
     openid: "",
    loginstate: "0",
    openid: "",
    userEntity: null,
    terminal: "",
    osVersion: "",
     phoneNumber: "",
    showModal: false,//定义登录弹窗
  },
  //在页面加载的时候，判断缓存中是否有内容，如果有，存入到对应的字段里
  onLoad: function () {
    var that = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({ openid: res.data });
      },
      fail: function (res) {
        that.getcode();
      }
    }); 
    wx.getStorage({
      key: 'userEntity',
      success: function (res) {
        that.setData({ userEntity: res.data });
      },
      fail: function (res) {
        console.log("fail1");
      }
    });
    wx.getStorage({
      key: 'loginstate',
      success: function (res) {
        that.setData({ loginstate: res.data });
      }, fail: function (res) {
        console.log("fail2");
      }
    });
  },
  onGotUserInfo: function (e) {
    var that = this;
    if (e.detail.errMsg == "getUserInfo:ok") {
      wx.setStorage({
        key: "userinfo",
        data: e.detail.userInfo
      })
      this.setData({ userInfo: e.detail.userInfo });
      that.showDialogBtn();//调用一键获取手机号弹窗（自己写的）
    }
  },
 
  // 显示一键获取手机号弹窗
  showDialogBtn: function () {
    this.setData({
      showModal: true//修改弹窗状态为true，即显示
    })
  },
  // 隐藏一键获取手机号弹窗
  hideModal: function () {
    this.setData({
      showModal: false//修改弹窗状态为false,即隐藏
    });
  },
  onshow: function (openid, userInfo, phoneNumber) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({ terminal: res.model });
        that.setData({ osVersion: res.system });
      }
    })
    wx.request({
      url: '登录接口',
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        username: phoneNumber,
        parentuser: 'xudeihai',
        wximg: userInfo.avatarUrl,
        nickname: userInfo.nickName,
        identity: "",
        terminal: that.data.terminal,
        osVersion: that.data.system,
        logintype: "10",//微信登录
        openid: that.data.openid,
      },
      success(res) {
        if (res.data.r == "T") {
          that.setData({ userEntity: res.data.d });
          wx.setStorage({
            key: "userEntity",
            data: res.data.d
          })
          that.setData({ loginstate: "1" });
          wx.setStorage({
            key: "loginstate",
            data: "1"
          })
          wx.setStorage({
            key: 'userinfo',
            data: "1"
          })
        }
        else {
          return;
        }
      },
      fail(res) {
        console.log(res);
      }
    })
  },
   
//通过绑定手机号登录
　　getPhoneNumber: function (e) {
  var ivObj = e.detail.iv
  var telObj = e.detail.encryptedData
  var codeObj = "";
  var that = this;
  //------执行Login---------
  wx.login({
   success: res => {
    console.log('code转换', res.code);
 
　　//用code传给服务器调换session_key
    wx.request({
     url: 'https://你的接口文件路径', //接口地址
     data: {
      //appid: "你的小程序APPID",
      //secret: "你的小程序appsecret",
      code: res.code,
      encryptedData: telObj,
      iv: ivObj
     },
     success: function (res) {
      phoneObj = res.data.phoneNumber;
      console.log("手机号=", phoneObj)
      wx.setStorage({  //存储数据并准备发送给下一页使用
       key: "phoneObj",
       data: res.data.phoneNumber,
      })
     }
    })
 
    console.log(e.detail.errMsg);
    //-----------------是否授权，授权通过进入主页面，授权拒绝则停留在登陆界面
    //if (e.detail.errMsg == 'getPhoneNumber:user deny') { //用户点击拒绝
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') { 
      //用户点击拒绝
     //wx.navigateTo({url: '../index/index'})
     console.log('用户点击拒绝');
    } else { 
      //允许授权执行跳转
      //wx.navigateTo({url: '../test/test'})
      console.log('用户点击同意');
    }



   }
  });
},




})
