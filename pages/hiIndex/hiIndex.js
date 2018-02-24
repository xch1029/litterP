const app = getApp();
const api = require('../../api/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotList: [
      {
        name: '招牌菜·年卡 99元/张',
        info: '可享受1年内所有餐厅招牌菜',
        url: 'http://www.baidu.com'
      },
      {
        name: '激活码',
        info: '线上购买无需激活，可直接享用'
      }
    ],
    keyword: '',  // 餐厅搜索关键字
    shops: [
      {
        imgUrl: '',
        name: '洪崖洞老火锅',
        tag: '招牌涮肉',
        price: 48,
        average: 107,
        distance: 11.38
      },
      {
        imgUrl: '',
        name: '蒸明满福（文体路店）',
        tag: '鸭舌5串',
        price: 15,
        average: 124,
        distance: 15.48
      },
      {
        imgUrl: '',
        name: '小绵羊烧烤精良吧',
        tag: '辣炒花蛤',
        price: 30,
        average: 84,
        distance: 16.32
      }
    ],
    myUserInfo: {},  // 用户信息(非微信)
    activeToggle: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()


    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }
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
    setTimeout(() => {
      this.setData({
        shops: [...this.data.shops,
        {
          imgUrl: '',
          name: '小绵羊烧烤精良吧',
          tag: '辣炒花蛤',
          price: 30,
          average: 84,
          distance: 16.32
        }
        ]
      })
    }, 300)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  bindKeyInput(e) {
    this.setData({
      keyword: e.detail.value 
    })
  },
  // 餐厅关键字搜索
  searchHandle: function() {
    console.log(this.data.keyword)
  },
  // 获取用户信息
  getUserInfo() {
    wx.request({
      url: api.userInfo,
      success: (res) => {
        this.setData({
          myUserInfo: res.data
        })
      }
    })
  },
  // 用户头像点击事件
  avatarClickHandle() {
    wx.navigateTo({
      url: '/pages/user/user'
    })
  },
  // 点击激活按钮
  activeHandle(){
    this.setData({
      activeToggle: true
    })
  },
  cancelActive(){
    this.setData({
      activeToggle: false
    })
  }
})