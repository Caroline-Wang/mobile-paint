/**
 * Created by HP on 2017/7/16.
 */
var currentOperation='pen'; //默认选中画笔
var paintArea=document.getElementById('paintArea'),
    context=paintArea.getContext('2d');

paintArea.width=document.documentElement.clientWidth;
paintArea.height=document.documentElement.clientHeight;
console.log(document.documentElement.clientWidth+','+document.documentElement.clientHeight);

context.beginPath();
context.strokeStyle='red';

var startPoint={
    startX:0,
    startY:0
};

//监听触屏事件
paintArea.addEventListener('touchstart',function(e){
    console.log('准备作画或擦除');
    console.log(e.touches[0]);
    startPoint.startX=e.touches[0].pageX;
    startPoint.startY=e.touches[0].pageY;
    context.moveTo(startPoint.startX,startPoint.startY);
});

//监听滑动事件
paintArea.addEventListener('touchmove',function(e){
    e.preventDefault();
    console.log(e.touches[0]);
    startPoint.startX=e.touches[0].pageX;
    startPoint.startY=e.touches[0].pageY;
    if(currentOperation==='pen'){
        console.log('作画中...');
        context.lineTo(startPoint.startX,startPoint.startY);
        context.stroke();
    }else if(currentOperation==='eraser'){
        console.log('擦除中...');
        context.rect(startPoint.startX,startPoint.startY,10,10);
        context.clearRect(startPoint.startX-5,startPoint.startY-5,10,10);
    }
});

//监听停止触屏事件
paintArea.addEventListener('touchend',function(e){
    console.log('停止作画或擦除');
    startPoint={
        startX:0,
        startY:0
    };
});

//对“画笔”进行监听
document.getElementById('pen').addEventListener('click',function (e) {
    document.getElementById(currentOperation).classList.remove('active');
    currentOperation = e.currentTarget.getAttribute('id');
    e.currentTarget.classList.add('active');
});

//对“橡皮擦”进行监听
document.getElementById('eraser').addEventListener('click',function (e) {
    document.getElementById(currentOperation).classList.remove('active');
    currentOperation = e.currentTarget.getAttribute('id');
    e.currentTarget.classList.add('active');
});

//对“主题”进行监听
document.getElementById('theme').addEventListener('click',function (e) {
    document.getElementById(currentOperation).classList.remove('active');
    currentOperation = e.currentTarget.getAttribute('id');
    e.currentTarget.classList.add('active');
});

//对“保存”进行监听
document.getElementById('save').addEventListener('click',function (e) {
    document.getElementById(currentOperation).classList.remove('active');
    currentOperation = e.currentTarget.getAttribute('id');
    e.currentTarget.classList.add('active');

    if(confirm('您想要保存保存该图片吗？')){
        var data=paintArea.toDataURL('image/png');
        var newWindow=window.open('about:blank','image from canvas');
        newWindow.document.write('<img src="'+data+'" alt="from canvas"/>');
    }

});



