// // pages/member/member.js
// let App = getApp();
// const date = new Date()
// const years = []
// const months = []
// const days = []
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     years: years,
//     year: date.getFullYear(),
//     months: months,
//     month: 10,
//     days: days,
//     day: 9,
//     value: [9999, 9, 8],
//     username:'',
//     defvalue:'仅可填写一次',
//     checkbox:0,
//     checkedList: '', 
//     date:'',//生日
//     phone:'',//手机
//     code:'',//验证码
//     iscode: null,//用于存放验证码接口里获取到的code
//     codename: '获取验证码',
//     userInfo:'',
//   },


//   HandelItemChange(e) {
//     // 1 获取被选中的复选框的值
//     // const checkedList = e.detail.value;
//     // // 2 进行赋值
//     // console.log(e.detail.value, 47);
//     this.setData({
//       checkbox:1
//     })
//   },
//   usereg:function()
//   {
//     wx.navigateTo({
//       url: '../member/terms_of_use',
//     })
//   },
//   pwdreg:function(e){
//     wx.navigateTo({
//       url: '../member/privacy_policy',
//     })
//   },
//   //获取用户名
//   getUsername:function(e){
//     console.log(e.detail.value,59);
//     this.setData({
//       username: e.detail.value
//     })
//   },

//   //获取生日号
//   bindDateChange: function (e) {
//     // console.log('picker发送选择改变，携带值为', e.detail.value)
//     this.setData({
//       date: e.detail.value,
//       defvalue: ''
//     })
//   },
//   //获取手机号
//   getPhoneValue: function (e) {
//     this.setData({
//       phone: e.detail.value
//     })
//   },
//   //获取验证码
//   getVerificationCode() {
//     var _this = this;
//     var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
//     if (this.data.phone == "") {
//       wx.showToast({
//         title: '手机号不能为空',
//         icon: 'none',
//         duration: 1000
//       })
//       return false;
//     } else if (!myreg.test(this.data.phone)) {
//       wx.showToast({
//         title: '请输入正确的手机号',
//         icon: 'none',
//         duration: 1000
//       })
//       return false;
//     } else {
//       App._get('Usermember/send_verification', {
//         phone: this.data.phone
//       }, function (result) {       
//         console.log(result.data,101);
//         if (result.code===1) {
//           var num = 61;
//           var timer = setInterval(function () {
//             num--;
//             if (num <= 0) {
//               clearInterval(timer);
//               _this.setData({
//                 codename:'重新发送',
//                 disabled:false
//               })
//             }
//             else {
//               _this.setData({
//                 codename:num + "s",
//               })
//             }
//           },1000)

//         }else{
//           App.showError(result.msg);
//         }
//       });
//     }
//     _this.setData({
//        disabled:true
//     })
//   },

//   getCodeValue: function (e) {
//     this.setData({
//       code: e.detail.value
//     })
//   },
//   //确认绑定
//   save: function (e) {
//     //1、获取页面的值
//     // var borndays=
//     var _this=this;
//     // console.log(this.data.date,94);//生日
//     // console.log(this.data.phone,104);//手机号
//      console.log(this.data.code,107);//验证码

//     console.log(this.data.checkbox,139);
//     var reg = /^\d{6}$/; 
//     if (_this.data.date==""){
//       wx.showToast({
//          title: '生日不能为空',
//          icon: 'none',
//          duration: 1000
//        })
//        return false;
//     } else if (_this.data.phone == '') {
//       wx.showToast({
//         title: '手机号不能为空',
//         icon: 'none',
//         duration: 1000
//       })
//       return false;
//     } 
//     else if (_this.data.code==='')
//     {
//       wx.showToast({
//         title: '验证码不能为空',
//         icon: 'none',
//         duration: 1000
//       })
//       return false;
//     } 
//     else if (!reg.test(this.data.code)){
//       wx.showToast({
//         title: '验证码必须是6位',
//         icon: 'none',
//         duration: 1000
//       })
//       return false;
//     }
//    else if (this.data.checkbox==0)
//     {
//        wx.showToast({
//          title: '请同意协议',
//          icon: 'none',
//          duration: 1000
//        })
//        return false;
//     }
//     else{
//       let date = _this.data.date;
//       let phone = _this.data.phone;
//       let code=_this.data.code;
//       App._post_form('Usermember/add', {
//         birthday:date,
//         phone: phone,
//         verification_code: code
//       }, function (result) {
//           if(result.code==1){ 
//             wx.switchTab({
//               url: '../user/index'
//             });
//           }
//           else{
//             App.showError(result.msg);

//           }
//       })

//     }
//   },


//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     let nickName = options.nickName;
//     console.log(options,205)
//     let _this=this;
//     _this.setData({
//       username: nickName
//     })

//    this.getUserDetail();

//   },
//   /**
//    * 获取当前用户信息
//    */
//   getUserDetail: function () {
//     let _this = this;
//     App._get('user.index/detail', {}, function (result) {
//       if (result.code === 1) {

//         if(result.data.userInfo.member_id!=0){
//           wx.switchTab({
//             url: '../user/index'
//           });
//         }

//         _this.setData(result.data);
//         _this.setData({
//              userInfo:result.data.userInfo //用户标识
//         })  
//       } else {
//         App.showError(result.msg);
//       }
//     });
//   },
//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },
//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },
//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },
//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },
//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   },

// })


let App = getApp();

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
    wx.login({
      success: res => {
        App._post_form('member/login_phone', {
          code: res.code,
          encryptedData: telObj,
          iv: ivObj,
          session_key: wx.getStorageSync('session_key')
        }, function (result) {
          if (result.code === 1) {
            // that.onLoad();
            App.showError('注册绑定成功');
            wx.navigateBack({
              delta: 0,
            })
          } else {
            App.showError(result.msg);
          }
        }, false, function () {});
        if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
          wx.navigateBack({
            delta: 0,
          })
        } else {
          console.log('允许授权执行');
        }
      },
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