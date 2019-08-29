window.onLoad  = function(){
  //加载地图
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
    //设置自定义的home图标
    var icon=new AMap.Icon({
      size:new AMap.Size(40,50),//图标尺寸
      image:"../icon/home.png",//Icon图像
      //imageOffset:new AMap.Pixel(0,-60),//图像相对展示区域的偏移量，适用于雪碧图等
      imageSize:new AMap.Size(40,50)//很具所设置的大小拉伸或压缩图片
    });
    //将Icon实例添加到maker上；
    var markerHome = new AMap.Marker({
    position: new AMap.LngLat(101.761294,36.678148),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
    offset:new AMap.Pixel(-10,-10),
    icon:icon,//添加Icon实例
    title: '家'

});
map.add(markerHome);//添加home图标
//获得当前地点坐标经纬度
AMap.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：5s
            convert:false,          //不使用偏移
            buttonPosition:'RB',    //定位按钮的停靠位置
            buttonOffset: new AMap.Pixel(10, 150),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点

        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition(function(status,result){
            if(status=='complete'){
                onComplete(result)
            }else{
                onError(result)
            }
        });
    });
    //解析定位结果
    function onComplete(data) {
        document.getElementById('status').innerHTML='定位成功'
        var str = [];
        str.push('定位结果：' + data.position);
        str.push('定位类别：' + data.location_type);
        if(data.accuracy){
             str.push('精度：' + data.accuracy + ' 米');
        }//如为IP精确定位结果则没有精度信息
        str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
        document.getElementById('result').innerHTML = str.join('<br>');

        var p1=[101.761294,36.678148];
        var p2=data.position;
        var dis = AMap.GeometryUtil.distance(p1, p2);
        document.getElementById("distance").innerHTML="目前与家距离"+dis+"米远。";

    }
    //解析定位错误信息
    function onError(data) {
        document.getElementById('status').innerHTML='定位失败'
        document.getElementById('result').innerHTML = '失败原因排查信息:'+data.message;
    }

//加载地图工具插件
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
