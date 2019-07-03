// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailsArr: [],
    collect: true,
    loaclid: Number
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    var app = getApp()
    console.log(app)
    //设置导航栏文字
    wx.setNavigationBarTitle({
      title: options.mTitle,
    });
    console.log(options)
    //发起网络请求
    this.getDatailData(options.mID)
    //options数据里的id存入上面定义的变量loaclid里
    this.data.loaclid = options.id
    //判断是否是收藏过了 ,收藏过来就把文字改成已收藏
    for (let j in app.globalData.storgeArr) {
      if (options.id === app.globalData.storgeArr[j].id) {
        _this.setData({
          collect: false
        })
      }
    }
  },
  getDatailData(id) {
    let _this = this;
    wx.showLoading({
        title: '加载中...',
      }),
      wx.request({
        url: 'https://douban.uieee.com/v2/movie/subject/' + id,
        header: {
          "content-type": "json"
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          wx.hideLoading();
          console.log(res)
          _this.setData({
            detailsArr: res.data
          });
        }
      })
  },
  //点击事件
  btnClick(e) {
    // 定义一个局部的app实例
    var app = getApp();
    this.setData({
      collect: !this.data.collect
    });
    // app全局变量里的数据放入定义的data里的一个变量
    if (this.data.collect === true) {
      app.globalData.storgeArr.push(this.data.detailsArr);
      console.log(app.globalData.storgeArr)
      //储存影片信息
      wx.setStorage({
        key: 'key',
        data: app.globalData.storgeArr,
      });
    } else {
      //循环遍历判断是否收藏影片
      for (let j in app.globalData.storgeArr) {
        if (this.data.loaclid === app.globalData.storgeArr[j].loaclid) {
          app.globalData.storgeArr.splice(j, 1);
          wx.setStorage({
            key: 'key',
            data: app.globalData.storgeArr,
          })
        }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})