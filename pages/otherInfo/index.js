// pages/otherInfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    healths: [ 
      {
        "startDate": "", // 开始时间
        "endDate": "", //结束时间
        "imgs": [],
      }
    ],
    works: [ 
      {
        "startDate": "", // 开始时间
        "endDate": "", //结束时间
        "workInfo": '',
      }
    ],
    items: [
      { name: '0', value: '1000以下/月' },
      { name: '1', value: '1000-2000/月', checked: 'true' },
      { name: '2', value: '2000-3000/月' },
      { name: '3', value: '3000-4000/月' },
      { name: '4', value: '4000-5000/月' },
      { name: '5', value: '5000-6000/月' },
      { name: '6', value: '6000-7000/月' },
      { name: '7', value: '8000以上/月' },
    ], 
    post: {
      "address": "", //详细地址
      "area": "", //区
      "city": "", //市
      "companyCount": "", //做过几家(选填)
      "expectedSalary": "", //期望薪水 （直接传框里的内容）
      "healths": [],
      "id": 0, //这个需要（查询接口给你的， 你在给我返回来）
      "introduction": "", //自我介绍
      "nativePlace": "", //籍贯
      "province": "", //省
      "trains": [],
      "workLife": "", //工作年限（选填）
      "works": []
    },
    region: [],
  },
  timeChange(e){
    this.data.post[e.target.dataset.name][e.target.dataset.index][e.target.dataset.s] = e.detail.value
    this.setData({
      post: this.data.post
    })
  },
  addhealths(){
    this.data.post.healths.push({
        "startDate": "", // 开始时间
        "endDate": "", //结束时间
        "imgs": [],
    })
    this.setData({
      post: this.data.post
    })
  },
  addworks() {
    this.data.post.works.push({
      "startDate": "", // 开始时间
      "endDate": "", //结束时间
      "workInfo": '',
    })
    this.setData({
      post: this.data.post
    })
  },
  addtrains() {
    this.data.post.trains.push({
      "startDate": "", // 开始时间
      "endDate": "", //结束时间
      "trainInfo": '',
    })
    this.setData({
      post: this.data.post
    })
  },
  delhealths(e){
    if (this.data.post.healths.length>1) {
      this.data.post.healths.splice(e.target.dataset.index,1)
    } else if (this.data.post.healths.length ==1){
      this.data.post.healths = [
        {
          "startDate": "", // 开始时间
          "endDate": "", //结束时间
          "imgs": [],
        }
      ]
    }
    this.setData({
      post: this.data.post
    })
  },
  delwork(e){
    if (this.data.post.works.length>1) {
      this.data.post.works.splice(e.target.dataset.index,1)
    } else if (this.data.post.works.length ==1){
      this.data.post.works = [
        {
          "startDate": "", // 开始时间
          "endDate": "", //结束时间
          "workInfo": '',
        }
      ]
    }
    this.setData({
      post: this.data.post
    })
  },
  deltrains(e){
    if (this.data.post.trains.length>1) {
      this.data.post.trains.splice(e.target.dataset.index,1)
    } else if (this.data.post.trains.length ==1){
      this.data.post.trains = [
        {
          "startDate": "", // 开始时间
          "endDate": "", //结束时间
          "workInfo": '',
        }
      ]
    }
    this.setData({
      post: this.data.post
    })
  },
  addImg(e){
    const that=this
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://xgj.9cfcf.com/app/uploadOtherImg',
          method: "POST",
          filePath: tempFilePaths[0],
          name: 'file',
          success(res) {
            const data = res.data
            if (JSON.parse(data).code == 200) {
              that.data.post[e.target.dataset.name][e.target.dataset.index].imgs.push({
                healthImg: JSON.parse(data).data
              })
              that.setData({
                post: that.data.post
              })
            } else {
              wx.showModal({
                title: '上传失败',
                content: JSON.parse(data).message,
                showCancel: false,
              })
            }

          }
        })
      }
    })
  },
  bindTextAreaBlur: function (e) {
    let { index, name, s } = e.target.dataset
    this.data[name][index][s] = e.detail.value
    this.data.post[name] = this.data[name]
    this.setData({
      [name]: this.data[name]
    })
  },
  bindTextAreaBlur2: function (e) {
    this.data.post.introduction = e.detail.value
    this.setData({
      post: this.data.post
    })
  },
  workLifeBlur: function (e) {
    this.data.post.workLife = e.detail.value
    this.setData({
      post: this.data.post
    })
  },
  companyCountBlur: function (e) {
    this.data.post.companyCount = e.detail.value
    this.setData({
      post: this.data.post
    })
  },
  bindDateChange(e){
    console.log(e)
    this.setData({
      data1: e.detail.value
    })
   
  }, 
  addressblur(e){
    this.data.post.address = e.detail.value
    this.setData({
      post:this.data.post
    })
  },
  next(){
    wx.request({
      url: 'https://xgj.9cfcf.com/app/saveOrUpdateNannyInfo',
      method: "post",
      data: { ...this.data.post },
      header: {
        // 'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        if (res.data.code == 200) {
          wx.redirectTo({
            url: '../success/index'
          })
        } else {
          wx.showToast({
            title: '上传错误!',
            icon: 'error',
            duration: 2000
          })

        }

      }
    })  
  },
  radioChange(e) {
    this.setData({
      items: this.data.items.map(v => {
        v.checked = false
        if (v.value == e.detail.value) {
          v.checked = true
        }
        return v
      })
    })
    this.data.post.expectedSalary = e.detail.value
  },
  bindRegionChange(e){
    this.data.post.province = e.detail.value[0]
    this.data.post.city = e.detail.value[1]
    this.data.post.area = e.detail.value[2]
    this.setData({
      region: e.detail.value,
      post: this.data.post
    })
  },
  setCheked(data) {
   this.data.items.forEach(v => {
     v.checked = false
      if (v.value==data) {
        v.checked = true
      }
   });
   this.setData({
     items:this.data.items
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that=this
    wx.request({
      url: 'https://xgj.9cfcf.com/app/findAppNannyInfo',
      method: "post",
      data: {
        id: options.id
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        const data = res.data.data
        that.data.post = data
        that.setCheked(that.data.post.expectedSalary)
        this.setData({
          post: data,
          region: [data.province, data.city, data.area]
        })
        
      }

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
    wx.request({
      url: 'https://xgj.9cfcf.com/app/findAppNannyInfo',
      method: "post",
      data: {
        id: 5
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        const data = res.data.data
        console.log(data);
      }

    })
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