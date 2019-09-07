
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: true,
    plain: false,
    loading: false,
    againShow:false,
    imgSrc: '../static/images/idphoto_03.png',
  },
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {

        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },
  error(e) {
    console.log(e.detail)
  },
  uploadImg() {
    const that = this
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
           url: 'https://xgj.9cfcf.com/app/uploadImg',
           method: "POST",
           filePath: tempFilePaths[0],
           name: 'file',
          formData:{
             id:that.data.id
           },
          success(res) {
            const data = res.data
              if (JSON.parse(data).code==200){
                  that.setData({
                      imgSrc: JSON.parse(data).data,
                      disabled: false,
                      againShow: true
                  })
              }else{
                  wx.showModal({
                      title: '上传失败',
                      content: JSON.parse(data).message,
                      showCancel:false,
                      success(res) {
                          if (res.confirm) {
                              console.log('用户点击确定')
                          }
                      }
                  })
                  console.log(JSON.parse(data))
              }
              
          }
        })
      }
    })
  },
  next() {
    if (this.disabled) {
      this.toggleDialog()
    } else {
      wx.redirectTo({
        url: '../infoInput1/index?id='+this.data.id
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        id:options.id
      })
      console.log(options.id)
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