import wx from 'weixin-js-sdk'
//微信分享

let wxSDk = {

  _wxSDk(_this) {
    _this.$axios.get('/remote/getWxShareParam?targetUrl=' + window.location.href)

      .then(res => {
        console.log(res.data)
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.data.data.appId, // 必填，公众号的唯一标识
          timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
          signature: res.data.data.signature,// 必填，签名
          jsApiList: [
            'onMenuShareAppMessage', 'onMenuShareTimeline',
            'onMenuShareQQ', 'onMenuShareQZone',
            'translateVoice',
          ],
        });
        wx.ready(() => {
          wx.onMenuShareAppMessage({
            title: '一个只做品牌折扣的商城',//分享标题
            link: window.location.href,//分享链接
            desc: '每日帮您精选3000余款特价品牌商品，搜索更有10W+品牌商品等着您！', // 分享描述
            imgUrl:'https://img.alicdn.com/i3/3106046367/O1CN011wu8CuI2unNK5C8_!!3106046367.jpg',//分享图片地址
            success: function () {
              alert("分享成功");
            },
            cancel: function () {
              alert('你没有分享给朋友');
            }
          });
          wx.onMenuShareTimeline({
            title: '一个只做品牌折扣的商城',//分享标题
            link: window.location.href,//分享链接
            desc: '每日帮您精选3000余款特价品牌商品，搜索更有10W+品牌商品等着您！', // 分享描述
            imgUrl:'https://img.alicdn.com/i3/3106046367/O1CN011wu8CuI2unNK5C8_!!3106046367.jpg',//分享图片地址
            success: function () {
              alert("分享成功");
            },
            cancel: function () {
              alert('你没有分享到朋友圈');
            }
          });
        })
      })
  }
}

//
export default wxSDk
