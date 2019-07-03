Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 电影列表数据
    movies: [],
    start: 0,
    count: 20
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(0, this.data.count)

  },
  //网络请求函数
  getData(start, count) {
    let _this = this;
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/top250',
      data: {
        start,
        count
      },
      header: {
        "content-type" : "json"
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        wx.hideLoading();
        _this.setData({
          movies: [..._this.data.movies, ...res.data.subjects]
        })
        console.log(_this.data.movies) 
        // console.log(_this.data.movies)
      },
      fail: function (res) {},
      complete: function (res) {},
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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showLoading({
      title: '加载中...',
    });
    this.setData({
      movies: []
    });
    this.getData(0, this.data.count);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getData(this.data.movies.length, 20);

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})