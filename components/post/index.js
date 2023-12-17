Component({
  properties:{
    res:Object
  },
  data:{

  },
  methods:{
    onTap(event){
      console.log(event.currentTarget.dataset.info)
      let info =event.currentTarget.dataset.info
      wx.navigateTo({
        url: `/pages/Detail/detail?postId=${info.postId}`,
      })
    },
  }
})