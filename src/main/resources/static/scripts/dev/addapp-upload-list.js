define(function(require) {
    $=jQuery=require('jquery');
    var base = require('base');
    var vn = require('vn');
    var menus = require('menus');
    require('layerCss');
    var layer = require('layer');
    vn.log('vn');
	/* 上传start*/

    var APP_MSG = '/dev/media/detail';
    var APP_LIST = '/dev/appmanage.html';
    var APP_UPLOAD = '/dev/addapp-upload.html';
    var CHANGE_STATUS = '/dev/adspace/changeStatus';
    var AD_SPACE_LIST = '/dev/adspace/list';

    var mediaId = base.getQueryString('mediaid');
    var action = '';
    var actionId = '';
    var actionObj;

    $.ajax({
        url:APP_MSG,
        data:{id:mediaId},
        success:function(data){
            vn.log(data.content.id);
            $('#app-msg').empty().html('<li>应用名称：' + data.content.mediaName + '</li><li>发布者ID：' + data.content.id + '</li><li>应用类型：' + data.content.mainCategoryName + '</li><li>应用类型：' + data.content.categoryName + '</li>')
        }
    });
    $('.upload-btn').on('click',function(){
        location.href = APP_UPLOAD + '?mediaid=' + mediaId;
    });

    $('.complete-btn').on('click',function(){
       location.href = APP_LIST;
    });

    var adTypeObj = {
        banner: '通栏',
        splash: '开屏',
        instl: '插屏'
    };

    /*获取广告位列表*/
    $.ajax({
        url:AD_SPACE_LIST,
        data:{mediaId:mediaId},
        success:function(data){
            $('tbody').empty();
            var content = data.content;
            //content = [{"id":"1",'adtype':'测试乱码',"adspacename":"算是第一次吧",status:"1",uniqueSpaceId:'sdafd234asd',created:'2015-08-26'},{"id":"2",'adtype':'通栏',"adspacename":"算是第二次吧",status:"2",uniqueSpaceId:'azxcv123asdf',created:'2015-08-26'}];
            for(var i=0;i<content.length;i++){
                var tr = $('<tr data-id="' + content[i].id + '"><td><a class="mgl40">' + content[i].adspacename + '</a></td></tr>');
                tr.append('<td>' + adTypeObj[content[i].adtype] + '</td>');
                if(content[i].status==1){
                    tr.append('<span class="status status0">●</span><label>运行</label><a class="pdl5">暂停</a></td>');
                }else{
                    tr.append('<span class="status status1">●</span><label>暂停</label><a class="pdl5">运行</a></td>');
                }
                tr.append('<td><span>' + content[i].adspaceKey + '</span><a class="pdl5">复制</a></td><td>' + content[i].created + '</td>');
                $('tbody').append(tr);

            }
            $('.pdl5').on('click',function(){

                var obj = $(this).prev().prev();
                vn.log($(this).closest('tr').attr('data-id'));
                actionObj = obj;
                if(obj.hasClass('status0')){
                    action = '2';
                    actionId = $(this).closest('tr').attr('data-id');
                    changeStatus();
                }else if(obj.hasClass('status1')){
                    action = '1';
                    actionId = $(this).closest('tr').attr('data-id');
                    changeStatus();
                }
            });
        }
    });
    /*end*/

    /*改变广告位运行状态*/
    function changeStatus(){

        layer.confirm('确定操作吗?', {
            btn: ['确定','取消'], //按钮
            //shade: true //不显示遮罩
            shade: 0.3,
            title: false //不显示标题
        }, function(){
            $.ajax({
                url:CHANGE_STATUS,
                data:{id:actionId,status:action},
                success:function(data){
                    if(data.status=='SUCCESS'){
                        /*if(actionObj.hasClass('status0')){
                         actionObj.removeClass('status0').addClass('status1').next().text('暂停').next().text('运行');
                         }else{
                         actionObj.removeClass('status1').addClass('status0').next().text('运行').next().text('暂停');
                         }*/
                        location.reload();
                    }
                }
            })
        }, function(){
            //layer.msg('奇葩么么哒', {shift: 6});
        });

    }
    /*end*/
});
/*<tr>
     <td><a class="mgl40">七夕情人节</a></td>
     <td>开屏广告</td>
     <td>
        <span class="status status1">●</span>暂停
        <a class="pdl5">运行</a>
     </td>
     <td>
        <span>dsddsssgsgee</span>
        <a class="pdl5">复制</a>
     </td>
     <td>2015-06-06</td>
 </tr>*/
