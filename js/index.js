import '../css/index.css';

const $ = require('jquery');
const util = require('./util.js');

// const jsbridge = require('meetyou.bridge');

// console.log(jsbridge);

// jsbridge.set('debug', false);

// jsbridge.listen('register/networkchange', {}, function () {
//   $('#result').html(JSON.stringify(arguments));
// });

// $('.save-album-button').bind('click', function () {

//   const src = 'http://static.seeyouyima.com/ad-activity.meiyou.com/mzc-share.aae710d410cf1825ac4370bd16cbfd36.jpg';

//   jsbridge.wait('album/save', {
//     images: [src]
//   }, function (req) {
//     $('#result1').html(JSON.stringify(arguments));
//   });

// });

// $('.appinfo-button').bind('click', function () {

//   // window.location.href = 'http://test-news-node.seeyouyima.com/news?news_id=72596&news_source=0&v=6.0.6&platform=android&bundleid=1111&sdkversion=19&imei=868190022277370&myclient=0130606111100000&ua=Mozilla/5.0%20(Linux;%20U;%20Android%204.4.4;%20zh-cn;%20HM%20NOTE%201S%20Build/KTU84P)%20AppleWebKit/534.30%20(KHTML,%20like%20Gecko)%20Version/4.0%20Safari/534.30&app_id=1&device_id=868190022277370&resolution=720,1280&tbuid=&myuid=0&mode=0&_bridge_debug=1';

//   $('#result2').html(111);
//   jsbridge.wait('appInfo/get', {
//     timestamp: +new Date(),
//   }, function (data) {
//     $('#result2').html(JSON.stringify(arguments));
//   });
// });


// $('.share-button').bind('click', function () {

//   const shareParam = {
//     type: 0,
//     title: '怀孕之后当心变成胖妈妈！',
//     content: '如何管理孕期营养和体重，生健康娃娃，专家给你支几招！一起来听听吧',
//     imageURL: 'http://static.seeyouyima.com/ad-activity.meiyou.com/mzc-share.aae710d410cf1825ac4370bd16cbfd36.jpg',
//     fromURL: 'http://www.baidu.com',
//   };

//   jsbridge.wait('share/do', shareParam, function (req) {
//     $('#result3').html(JSON.stringify(arguments));
//   });
// });


// // 手势
// $('.close-ges').bind('click', function () {
//   jsbridge.invoke('popGesture', {
//     enable: 0
//   }, function (req) {
//     // alert(req);
//   });
// });

// $('.open-ges').bind('click', function () {
//   jsbridge.invoke('popGesture', {
//     enable: 1
//   }, function (req) {
//     // alert(req);
//   });
// });

// jsbridge.listen('onRightTopLayerClick', {}, function () {
//   $('#result4').html(JSON.stringify(arguments));
// });

// $('.showrighttop-layer').bind('click', function () {

//   // const player = document.getElementById('player');

//   // player.play();

//   jsbridge.invoke('topbar/showrighttopLayer', {}, function (req) {
//     // alert(req);
//   });
// });
