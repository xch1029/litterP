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
    shops: [],
    myUserInfo: {},  // 用户信息(非微信)
    activeToggle: false,
    activeCode: '',  // 激活码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
    this.getShops()

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
          imgUrl: this.getRandomUrl(),
          name: this.getRandomName(),
          tag: this.getRandomTag(),
          price: this.getRandomNum(),
          average: this.getRandomNum(),
          distance: this.getRandomNum(),
          x: "123",
          y: "456",
          phone: "10086"
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
  // 获取餐厅list
  getShops(){
    wx.request({
      url: api.shopList,
      success: (res) => {
        this.setData({
          shops: res.data.shops.map((item) => {
            item.imgUrl = this.getRandomUrl()
            return item
          })
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
  activeCodeInput(e){
    this.setData({
      activeCode: e.detail.value
    })
  },
  cancelActive(){
    this.setData({
      activeToggle: false
    })
  },
  // 点击激活确定按钮
  activeHandleOk() {
    console.log(this.data.activeCode)
    wx.showModal({
      title: '温馨提示',
      showCancel: false,
      content: this.data.activeCode ? '激活码错误' : '请输入激活码',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  getRandomUrl() {
    const num = Math.ceil(Math.random()*8)
    return `/static/img/shop0${num}.png`
  },
  getRandomName(){
    const names = [
      '美丽一家亲',
      '海鲜烧烤',
      '串世纪烤肉吧',
      '从你的世界路过',
      '大胖子小排档',
      '半饱日式甜心',
      '金鹰尚美酒店',
      '成都串串香',
      '明国往事',
      '鱼留纯',
      '泰食寨',
    ]
    return names[Math.floor(Math.random()*names.length)]
  },
  getRandomTag(){
    const tags = [
      '台式甜心',
      '虎皮凤爪',
      '自制白珍珠奶茶',
      '烤鸭',
      '海胆山药豆腐',
      '水牛城鸡翅',
      '石锅三杯鸡',
      '招牌米糕',
      '鸡肉汤米粉',
      '招牌锅底',
      '大虾色拉',
    ]
    return tags[Math.floor(Math.random()*tags.length)]
  },
  getRandomNum(start=5,end=25){
    return Math.floor(Math.random()*(end-start)+start)
  },
  // 跳转到具体餐厅的详情页
  jumpToShop(e){
    const name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: `/pages/shopShow/shopShow?name=${name}`
    })
  }
})