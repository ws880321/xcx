// pages/infoInput1/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id:'',
        defaultSize: 'default',
        primarySize: 'default',
        warnSize: 'default',
        disabled: false,
        plain: false,
        loading: false,
        company: [],
        array2: ['健康证', '月嫂证', '护士证', '营养师证','早教证','驾驶证','教师证','家政员资格证','厨师证','育婴证'],
        items: [{
            value: '住家保姆',
            checked: false
        },
        {
            value: '非住家保姆',
            checked: false
        }
        ],
        items2: [{
            value: '月嫂',
            checked: false
        },
        {
            value: '月子护理',
            checked: false
        },
        {
            value: '母婴护理',
            checked: false
        }
        ],
        items3: [{
            value: '买菜做饭',
            checked: false
        },
        {
            value: '看孩子',
            checked: false
        },
        {
            value: '住房保洁',
            checked: false
        },
        {
            value: '陪护老人',
            checked: false
        },
        {
            value: '做家务',
            checked: false
        },
        {
            value: '代购物品',
            checked: false
        }
        ],
        items4: [{
            value: '病人陪护',
            checked: false
        },
        {
            value: '照顾老人',
            checked: false
        }
        ],
        items5: [{
            value: '病人陪护',
            checked: false
        },
        {
            value: '照顾老人',
            checked: false
        },
        {
            value: '育婴早教',
            checked: false
        },
        {
            value: '接送小孩',
            checked: false
        },
        {
            value: '月子护理',
            checked: false
        },
        {
            value: '育婴幼教',
            checked: false
        },
        {
            value: '做卫生',
            checked: false
        },
        {
            value: '做饭',
            checked: false
        },
        {
            value: '其他',
            checked: false
        }
        ], 
        items6: [{
            value: '电脑操作',
            checked: false
        },
        {
            value: '熨烫衣服',
            checked: false
        },
        {
            value: '手工编织',
            checked: false
        },
        {
            value: '照料宠物',
            checked: false
        },
        {
            value: '家庭园艺',
            checked: false
        },
        {
            value: '外语',
            checked: false
        },
        {
            value: '文艺美术',
            checked: false
        },
        {
            value: '开车(驾照)',
            checked: false
        },
        {
            value: '营养学知识',
            checked: false
        },
        ],
        items7: [{
            value: '普通话',
            checked: false
        },
        {
            value: '本地方言',
            checked: false
        },
        {
            value: '四川话',
            checked: false
        },
        {
            value: '东北话',
            checked: false
        },
        {
            value: '广东话',
            checked: false
        },
        {
            value: '客家话',
            checked: false
        },
        {
            value: '闽南语',
            checked: false
        },
        {
            value: '日语',
            checked: false
        },
        {
            value: '英语',
            checked: false
        },
        {
                value: '其他',
                checked: false
        },
        ],
        items8: [{
            value: '家常菜',
            checked: false
        }, {
                value: '川菜',
                checked: false
            }, {
                value: '鲁菜',
                checked: false
            }, {
                value: '东北菜',
                checked: false
            }, {
                value: '湘菜',
                checked: false
            }, {
                value: '粤菜',
                checked: false
            }, {
                value: '潮州菜',
                checked: false
            }, {
                value: '客家菜',
                checked: false
            }, {
                value: '上海菜',
                checked: false
            }, {
                value: '闽南菜',
                checked: false
            }],
        zsList: [],
        gs: '请选择 >',





        //上传参数

        post: {
            "advancedSkill": [ //高级技能
               
            ],
            "appCertificate": [ //所持证书
            ],
            "companyId": 0, //公司ID
            "cookingTaste": [ //煮菜口味
            ],
            "familyNanny": [ //家庭保姆
            ],
           
            "hourlyWorkers": [ //钟点工
            ],
            "id": 2, //这个需要（查询接口给你的， 你在给我返回来）
            "language": [ //语言能力
            ],
            "monthAndBaby": [ //母婴服务
            ],
            "patient": [ //病人陪护
            ],
            "workSkill": [ //工作技能
            ],
            
        }
    },
    bindPickerChange: function (e) {
        let gs = this.data.company[e.detail.value].name
        let id= this.data.company[e.detail.value].id
        this.data.post.companyId=id
        this.setData({
            gs: gs
        })
    },
    bindPickerChange2: function (e) {
        this.uploadImg(e.detail.value)
    },
    findAllCompany() {
        const that = this
        wx.request({
            url: 'https://xgj.9cfcf.com/app/findAllCompany',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                that.setData({
                    company: res.data.data
                })
            }
        })

    },
    radioChange(e) {
        this.data.post.familyNanny = e.detail.value
        this.data.items.forEach(v => {
            v.checked = false
            e.detail.value.forEach(k => {
                if (v.value == k) {
                    v.checked ? v.checked = false : ''
                    v.checked == false ? v.checked = true : ''
                }
            })
        })
        this.setData({
            items: this.data.items,
        })
    },
    radioChange2(e) {
        this.data.items2.forEach(v => {
            v.checked = false
            e.detail.value.forEach(k => {
                if (v.value == k) {
                    v.checked ? v.checked = false : ''
                    v.checked == false ? v.checked = true : ''
                }
            })
        })
        this.data.post.monthAndBaby = e.detail.value
        this.setData({
            items2: this.data.items2,
        })
    },
    radioChange3(e) {
        this.data.items3.forEach(v => {
            e.detail.value.forEach(k => {
                if (v.value == k) {
                    v.checked ? v.checked = false : ''
                    v.checked == false ? v.checked = true : ''
                }
            })
        })
        this.setData({
            items3: this.data.items3
        })
        this.data.post.hourlyWorkers = e.detail.value
    },
    radioChange4(e) {
        this.data.items4.forEach(v => {
            v.checked = false
            e.detail.value.forEach(k => {
                if (v.value == k) {
                    v.checked ? v.checked = false : ''
                    v.checked == false ? v.checked = true : ''
                }
            })
        })
        this.data.post.patient = e.detail.value
        this.setData({
            items4: this.data.items4
        })
    },
    radioChange5(e) {
        this.data.items5.forEach(v => {
            v.checked = false
            e.detail.value.forEach(k => {
                if (v.value == k) {
                    v.checked ? v.checked = false : ''
                    v.checked == false ? v.checked = true : ''
                }
            })
        })
        this.data.post.workSkill = e.detail.value
        this.setData({
            items5: this.data.items5,
        })
    },
    radioChange6(e) {
        this.data.items6.forEach(v => {
            v.checked = false
            e.detail.value.forEach(k => {
                if (v.value == k) {
                    v.checked ? v.checked = false : ''
                    v.checked == false ? v.checked = true : ''
                }
            })
        })
        this.data.post.advancedSkill = e.detail.value
        this.setData({
            items6: this.data.items6,
        })
    },
    radioChange7(e) {
        this.data.items7.forEach(v => {
            v.checked = false
            e.detail.value.forEach(k => {
                if (v.value == k) {
                    v.checked ? v.checked = false : ''
                    v.checked == false ? v.checked = true : ''
                }
            })
        })
        this.data.post.language = e.detail.value
        this.setData({
            items7: this.data.items7,
        })
    },
    radioChange8(e) {
        this.data.items8.forEach(v => {
            v.checked = false
            e.detail.value.forEach(k => {
                if (v.value == k) {
                    v.checked ? v.checked = false : ''
                    v.checked == false ? v.checked = true : ''
                }
            })
        })
        this.data.post.cookingTaste = e.detail.value
        this.setData({
            items8: this.data.items8,
        })
    },
  
    next() {
        const that=this
        let flag=Object.values(this.data.post).every((v)=>{
            return v > 0 || v.length > 0
          
        })
        if (flag) {
            wx.request({
                url: 'https://xgj.9cfcf.com/app/saveOrUpdateNannyInfo',
                method: "post",
                data: {...this.data.post},
                header: {
                    // 'Content-Type': 'application/x-www-form-urlencoded'
                },
                success(res) {
                    if (res.data.code==200) {
                        wx.redirectTo({
                            url: '../otherInfo/index?id'+that.data.id
                        })
                    }else{
                        wx.showToast({
                            title: '上传错误!',
                            icon: 'error',
                            duration: 2000
                        })

                    }

                }
            })
           
        }else{
            wx.showModal({
                title: '提示',
                showCancel:false,
                content: '请正确填写信息,所有信息都为必填项!',
            })
        }
        
    },
    uploadImg(name) {
        const that = this
        wx.chooseImage({
            success(res) {
                const tempFilePaths = res.tempFilePaths
                that.data.zsList.push({
                    imgName: that.data.array2[name],
                    imgUrl: tempFilePaths[0]
                })
                that.data.post.appCertificate.push({
                    imgName: that.data.array2[name],
                    imgUrl: tempFilePaths[0]
                })
                that.setData({
                    zsList: that.data.zsList,
                    disabled: false
                })
                wx.uploadFile({
                    url: 'https://xgj.jusfoun.com', //仅为示例，非真实的接口地址
                    filePath: tempFilePaths[0],
                    name: 'file',
                    formData: {
                        'user': 'test'
                    },
                    success(res) {
                        const data = res.data
                        //do something
                    }
                })
            }
        })
    },
    delImg(e) {
        this.data.zsList.splice(e.target.dataset.id, 1)
        this.data.post.appCertificate.splice(e.target.dataset.id, 1)
        this.setData({
            zsList: this.data.zsList
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.data.post.id = options.id
        this.setData({
            id: options.id,
            post:this.data.post
        })
        this.findAllCompany();
        const that = this
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
                const currentData = that.data.post
                currentData.companyId = data.companyId
                
                that.setCheked(data.familyNanny, that.data.items, 'familyNanny')
                that.setCheked(data.monthAndBaby, that.data.items2, 'monthAndBaby')
                that.setCheked(data.hourlyWorkers, that.data.items3, 'hourlyWorkers')
                that.setCheked(data.patient, that.data.items4, 'patient')
                that.setCheked(data.workSkill, that.data.items5, 'workSkill')
                that.setCheked(data.advancedSkill, that.data.items6,'advancedSkill')
                that.setCheked(data.language, that.data.items7, 'language')
                that.setCheked(data.cookingTaste, that.data.items8, 'cookingTaste')
                that.data.post.appCertificate = data.appCertificate
                let name 
                if (that.data.company) {
                    name= that.data.company.filter((v) => { return v.id == data.companyId })[0].name
                }else{
                    name=''
                }
                that.setData({
                    zsList: data.appCertificate,
                    gs:name,
                    items: that.data.items,
                    items2: that.data.items2,
                    items3: that.data.items3,
                    items4: that.data.items4,
                    items5: that.data.items5,
                    items6: that.data.items6,
                    items7: that.data.items7,
                    items8: that.data.items8,
                })
            }

        })
    },
    setCheked(arr, arr2, arr3) {
        this.data.post[arr3] = arr
        if (arr.length > 0) {
            arr.forEach(v => {
                arr2.forEach(k => {
                    if (v == k.value) {
                        k.checked = true
                    }
                })
            })
        }
        return arr
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