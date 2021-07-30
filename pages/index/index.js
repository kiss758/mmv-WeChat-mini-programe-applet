let App = getApp();

Page({
  data: {
    // banner轮播组件属性
    indicatorDots: true, // 是否显示面板指示点	
    autoplay: true, // 是否自动切换
    interval: 300, // 自动切换时间间隔
    duration: 1000, // 滑动动画时长
    imgHeights: {}, // 图片的高度
    imgCurrent: {}, // 当前banne所在滑块指针
    // 页面元素
    items: {},
    newest: {},
    best: {},
    i: 1,
    scrollTop: 0,

    autoplay: false,
    interval: 5000,
    duration: 1000,
    //视频路径
    // mdc_video: 'https://cloud.video.taobao.com/play/u/576446681/p/1/e/6/t/1/50140370746.mp4',
    collagenVideoList: [{
        id: 0,
        videoCover: 'https://minproceduresmmvsiteweb.mmvau.com/web/assets/video/index_video/饮用方法.jpg',
        videoUrl: 'https://minproceduresmmvsiteweb.mmvau.com/web/assets/video/index_video/饮用方法.mp4'
      },
      {
        id: 1,
        videoCover: 'https://minproceduresmmvsiteweb.mmvau.com/web/assets/video/index_video/饮用搭配.jpg',
        videoUrl: 'https://minproceduresmmvsiteweb.mmvau.com/web/assets/video/index_video/饮用搭配.mp4'
      },
      {
        id: 2,
        videoCover: 'https://minproceduresmmvsiteweb.mmvau.com/web/assets/video/index_video/代言人大片.jpg',
        videoUrl: 'https://minproceduresmmvsiteweb.mmvau.com/web/assets/video/index_video/代言人大片.mp4'
      },
      {
        id: 3,
        videoCover: 'https://minproceduresmmvsiteweb.mmvau.com/web/assets/video/index_video/产品介绍.jpg',
        videoUrl: 'https://minproceduresmmvsiteweb.mmvau.com/web/assets/video/index_video/产品介绍.mp4'
      },
    ],
    //替换视频的封面图
    mdc_videofenmian: '/images/call.png',
    // 视频的封面图显示消失的参数
    xiaoshi: false,
    // 视频显示消失的参数
    mdc_show: true,

    mustbuy_list: {},
    collagen_list: {}, //胶原蛋白肽列表
    col_itemone: {}, //A-F套装
    col_itemtwo: {},
    col_itemthree: {},
    col_itemfour: {},
    col_itemfive: {},
    col_itemsix: {},
    dj_itemone: {},
    dj_itemtwo: {},
    dj_itemthree: {},
    indicatordots: true,
    numactive: 0, //激活样式
    flag: true, //遮罩
    index: 0,
    showIndex: 0, //默认第一个项目显示
    headlist: '',
    footlist: '',
    h_image: '',
    f_image: '',
    indexCurrent: null
  },

  onLoad: function () {
    // 设置页面标题
    App.setTitle();
    // 获取首页数据
    this.getIndexData();   
  },

  clickNum: function (e) {
    console.log(e.currentTarget.dataset, 39)
    var that = this;
    that.setData({
      numactive: e.currentTarget.dataset.num
    })

  },
  shownav: function () {
    this.setData({
      flag: false
    });
  },
  closenav: function () {
    this.setData({
      flag: true
    });
  },
  /**
   * 获取首页数据
   */
  getIndexData: function () {
    App._get(`index/page`, {}, res => {
      if (res.code === 1) {
        const {
          collagen_list,
          dijutai_list,
          banner_list,
          mustbuy_list
        } = res.data;
        const collagen_banner_list = res.data.banner_list[2].image;
        const dijutai_banner_list = res.data.banner_list[3].image;
        this.setData({
          collagen_list,
          dijutai_list,
          mustbuy_list,
          h_image: banner_list[0].image,
          f_image: banner_list[1].image,
          collagen_banner_list,
          dijutai_banner_list
        })
      } else {
        App.showError(res.msg)
      }
    }, fail => {}, comp => {}, false)
  },

  /**
   * 计算图片高度
   */
  imagesHeight: function (e) {
    let imgId = e.target.dataset.id,
      itemKey = e.target.dataset.itemKey,
      ratio = e.detail.width / e.detail.height, // 宽高比
      viewHeight = 750 / ratio, // 计算的高度值
      imgHeights = this.data.imgHeights;

    // 把每一张图片的对应的高度记录到数组里
    if (typeof imgHeights[itemKey] === 'undefined') {
      imgHeights[itemKey] = {};
    }
    imgHeights[itemKey][imgId] = viewHeight;
    // 第一种方式
    let imgCurrent = this.data.imgCurrent;
    if (typeof imgCurrent[itemKey] === 'undefined') {
      imgCurrent[itemKey] = Object.keys(this.data.items[itemKey].data)[0];
    }
    this.setData({
      imgHeights,
      imgCurrent
    });
  },

  bindChange: function (e) {
    let itemKey = e.target.dataset.itemKey,
      imgCurrent = this.data.imgCurrent;
    // imgCurrent[itemKey] = e.detail.current;
    imgCurrent[itemKey] = e.detail.currentItemId;
    this.setData({
      imgCurrent
    });
  },

  goTop: function (t) {
    this.setData({
      scrollTop: 0
    });
  },

  scroll: function (t) {
    this.setData({
      indexSearch: t.detail.scrollTop
    }), t.detail.scrollTop > 300 ? this.setData({
      floorstatus: !0
    }) : this.setData({
      floorstatus: !1
    });
  },


  //跳到购物车
  jump_cart: function () {
    wx.switchTab({
      url: '/pages/flow/index',
    })
  },
  //跳到分类
  jump_category: function () {
    wx.switchTab({
      url: '/pages/category/index',
    })
  },

  returnquanping: function (e) {
    var that = this;
    that.setData({
      xiaoshi: false,
      mdc_show: true,
    })
  },
  onShareAppMessage: function () {
    return {
      title: "妈妈女性专属美容方案",
      desc: "",
      imageUrl: 'https://minproceduresmmvsiteweb.mmvau.com/web/assets/share/e9b246215702764559a8a9224e8813d.jpg',
      path: "/pages/index/index",
      success: (res) => {},
      fail: (err) => {}
    };

  },
  play(e) {
    var that = this;
    for (var i = 0; i < that.data.collagenVideoList.length; i++) {
      if (id === 'myVideo' + i) {} else {
        var videoContext = wx.createVideoContext("myVideo" + i, that);
        videoContext.pause();
      }
    }
  },

  videoPlay: function (e) {
    var that = this;
    var curIdx = e.currentTarget.dataset.index;
    // 有播放时先将prev暂停，再播放当前点击的current
    if (that.data.indexCurrent != null) {
      var videoContextPrev = wx.createVideoContext('myVideo' + that.data.indexCurrent); //当前播放的
      if (that.data.indexCurrent != curIdx) {
        videoContextPrev.pause(); //暂停
      }
      that.setData({
        indexCurrent: curIdx
      })
    } else { // 没有播放时播放视频
      that.setData({
        indexCurrent: curIdx
      })
      var videoContext = wx.createVideoContext('myVideo' + curIdx) //这里对应的视频id
      if (that.data.indexCurrent === curIdx) {
        videoContext.pause()
      }
      videoContext.play()
    }
  },
  onHide: function () {
    var that = this;
    const vTxt = wx.createVideoContext('myVideo' + that.data.indexCurrent);
    setTimeout(() => {
      vTxt.pause()
    }, 0);
  },
  onShow: function () {
    var that = this;
    const vTxt = wx.createVideoContext('myVideo' + that.data.indexCurrent);
    setTimeout(() => {
      vTxt.pause()
    }, 0);
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},
});