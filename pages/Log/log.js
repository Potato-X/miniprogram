Page({

  /**
   * 页面的初始数据
   */
  data: {
    month:['一','二','三','四','五','六','七','八','九','十','十一','十二',][new Date().getMonth()],
    avatarUrl:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(333333333)
    this.init()
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
    
  },
  getUserInfo(info){
    wx.getUserProfile({
      lang:"zh_CN",
      desc:"用于获取当前用户的收藏数据",
      success:(userInfo)=>{
        console.log('userInfo===>',userInfo)
      }
    })
    console.log(info)
  },
  init(){
    wx.getUserInfo().then(res=>{
      let avatarUrl = res.userInfo.avatarUrl
      console.log(res.userInfo)
      this.setData({
        avatarUrl
      })
    })
  },
  routerLinkHandler(){
    wx.getUserProfile({
      desc:'用于完善用户信息',
      success:(userInfo)=>{
        console.log('userInfo===>',userInfo)
        wx.setStorageSync('nickNameCollectList', [])
        wx.switchTab({
          url: '/pages/Home/home',
        })
      }
    })
    
  },
})