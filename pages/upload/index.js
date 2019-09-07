// pages/upload.js
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
    imgSrc: '../static/images/cardbg.png',
    showDialog: false,
    name: '',
    idCard: '',
    telephone: '',
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
  nameBlur(e) {
    this.setData({
      name: e.detail.value
    })
    this.checkIdCard()
  },
  idcardBlur(e) {
    this.setData({
      idCard: e.detail.value
    })
    this.checkIdCard()
  },
  phoneBlur(e) {
    this.setData({
      telephone: e.detail.value
    })
    this.checkIdCard()
  },
  checkIdCard() {
    let that = this
    if (this.data.name && this.data.idCard && this.data.telephone) {
      wx.request({
        url: 'https://xgj.9cfcf.com/app/checkIdCard',
        method: "post",
        data: {
          name: that.data.name,
          idCard: that.data.idCard,
          telephone: that.data.telephone,
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success(res) {
          if (res.data.code == 200) {
            that.setData({
              disabled: false,
              id:res.data.data
            })
          }
        }
      })
    }
  },
  uploadImg() {
    const that = this
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        that.setData({
          imgSrc: tempFilePaths[0],
          disabled: false
        })
        wx.uploadFile({
          url: 'https://xgj.9cfcf.com/app/analysisIdCard',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'telephone': that.data.telephone
          },
          success(res) {
           
            that.setData({
              name: JSON.parse(res.data).name,
              idCard: JSON.parse(res.data).code,
            })
            //do something
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
        url: `../idPhoto/index?id=${this.data.id}`
      })
    }
  },
  /**
  * 控制 pop 的打开关闭
  * 该方法作用有2:
  * 1：点击弹窗以外的位置可消失弹窗
  * 2：用到弹出或者关闭弹窗的业务逻辑时都可调用
  */
  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog
    });

  },
  getPhoneNumber(e) {
    const that=this
    wx.checkSession({
      success: function () {
        console.log(e.detail.errMsg)
        console.log(e.detail.iv)
        console.log(e.detail.encryptedData)
        var ency = e.detail.encryptedData;
        var iv = e.detail.iv;
        var sessionk = wx.getStorageSync('sessionKey') || []
        console.log(sessionk);
        if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
          that.setData({
            modalstatus: true
          });
        } else {//同意授权
          wx.request({
            method: "GET",
            url: 'https://xxx/wx/deciphering.do',
            data: {
              encrypdata: ency,
              ivdata: iv,
              sessionkey: sessionk
            },
            header: {
              'content-type': 'application/json' // 默认值
            },

            success: (res) => {
              console.log("解密成功~~~~~~~将解密的号码保存到本地~~~~~~~~");
              console.log(res);
              var phone = res.data.phoneNumber;
              console.log(phone);

            }, fail: function (res) {
              console.log("解密失败~~~~~~~~~~~~~");
              console.log(res);
            }
          });
        }
      },
      fail: function () {
        console.log("session_key 已经失效，需要重新执行登录流程");
        // that.wxlogin(); //重新登录
      }

    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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