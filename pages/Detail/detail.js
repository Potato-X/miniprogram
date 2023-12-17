import {postList} from '../../data/data'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},
    iscollect:false,
    playing:true,
  },
  backgroundAudioManager:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let postId = options.postId
    let collectList = wx.getStorageSync('nickNameCollectList')||[]
    let detail = postList.find(item=>item.postId==postId)
    let musicInfo = detail.music
    console.log(detail)
    this.initBackgroundAudioManager(musicInfo)
    this.setData({
      detail,
      iscollect:collectList.includes(postId)
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
    console.log('退出页面')
    
    this.changePlayState('stop')
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
  collect(){
    let collectList = wx.getStorageSync('nickNameCollectList')||[]
    if(this.data.iscollect){
      collectList = collectList.filter(item=>item!==this.data.detail.postId)
      wx.showToast({
        title: '取消收藏',
      })
    }else{
      collectList.push(this.data.detail.postId)
      wx.showToast({
        title: '收藏成功',
      })
    }
    wx.setStorageSync('nickNameCollectList', collectList)
    this.setData({
      iscollect:!this.data.iscollect
    })
    console.log(this.data.iscollect)
  },
  playHandler(event){
    console.log(event)
    let actionType =event.currentTarget.dataset.actiontype
    
    this.changePlayState(actionType)
  },
  changePlayState(actionType){
    
    console.log(33333,actionType)
    this.setData({
      playing:actionType==='play'
    })
    if(actionType=='play'){
      this.backgroundAudioManager.play()
    }else if(actionType=='paused'){
      this.backgroundAudioManager.pause()
    }else if(actionType=='stop'){
      this.backgroundAudioManager.stop()
    }
  },
  initBackgroundAudioManager(musicInfo){
    this.backgroundAudioManager = wx.createInnerAudioContext()
    this.backgroundAudioManager.title=musicInfo.title
    this.backgroundAudioManager.coverImgUrl =musicInfo.coverImg
    this.backgroundAudioManager.src =musicInfo.url
    
    this.changePlayState('paused')
    this.backgroundAudioManager.onEnded(()=>{
      this.changePlayState('play')
    })
    this.backgroundAudioManager.onPlay(()=>{
      
      this.changePlayState('play')
    })
    this.backgroundAudioManager.onPause(()=>{
      console.log('paused callback')
      this.changePlayState('paused')
    })
  }
})