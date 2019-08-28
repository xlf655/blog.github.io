window.onLoad  = function(){
    var map = new AMap.Map('container',{
      center:[101.761294,36.678148],
      layers: [
            // 卫星
            new AMap.TileLayer.Satellite(),
            // 路网
            new AMap.TileLayer.RoadNet()
        ],
      zoom:15
    });
    var marker = new AMap.Marker({
    position: new AMap.LngLat(101.761294,36.678148),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
    title: '家'
});
map.add(marker);
AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'],function(){
         map.addControl(new AMap.ToolBar());
         map.addControl(new AMap.Scale());
         map.addControl(new AMap.OverView({isOpen:true}));
 })




}
var url = 'https://webapi.amap.com/maps?v=1.4.15&key=92296edc84cbe3d485551bfa3ede9012&callback=onLoad';
var jsapi = document.createElement('script');
jsapi.charset = 'utf-8';
jsapi.src = url;
document.head.appendChild(jsapi);
