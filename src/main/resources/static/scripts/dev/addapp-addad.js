define(function(require){
    $=jQuery=require('jquery');
    var base = require('base');
    var vn = require('vn');
    var menus = require('menus');
    require('layerCss');
    var layer = require('layer');
    vn.log('vn');
    var template = require('artTemplate');
    var action = '';
    var actionId = '';
    var actionObj;

    var CHANGE_STATUS = '/dev/adspace/changeStatus';
    var AD_SPACE_LIST = '/dev/adspace/list';
    var AD_SPACE_DETAIL = '/dev/adspace/detail';
    var ADD_AD_SPACE = '/dev/adspace/save';
    var NEXT_STEP = '/dev/addapp-upload-list.html';
    var APP_MSG = '/dev/media/detail';

    var mediaId = base.getQueryString('mediaid');


    $.ajax({
        url:APP_MSG,
        data:{id:mediaId},
        success:function(data){
            vn.log(data.content.id);
            $('#app-msg').empty().html('<li>应用名称：' + data.content.mediaName + '</li><li>发布者ID：' + data.content.publishId + '</li><li>应用类型：' + data.content.mainCategoryName + '</li><li>应用类型：' + data.content.categoryName + '</li>')
            vn.log('123');
        }
    });

    $('.addad-btn').on('click',function(){
        if($('#adname').val()==''){
            alert('请输入广告位名称');
            return;
        }else if($('#adType').val()==-1){
            alert('请选择广告类型');
            return;
        }
        var adtypeid = $('#adType').val();
        var adtype = $('#adType').find('option:selected').attr('en-name');
        $.ajax({
            url:ADD_AD_SPACE,
            data:{adspacename:$('#adname').val(),adtype:adtype,dicAdvertiseShowTypeId:adtypeid,mediaid:mediaId},
            success:function(data){
                if(data.status=='SUCCESS'){
                    alert('添加广告位成功');
                    location.reload();
                }else{
                    alert('添加广告位失败');
                }
            }
        })
    });
    $('.next-btn').on('click',function(){
        var len = $('tbody').children().length;
        if(len>0){
            location.href = NEXT_STEP + '?mediaid=' + mediaId;
        }else{
            alert('请先添加广告位');
        }
    });

    /*改变广告位运行状态*/

    $(".table").on("click",".oper", function () {
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
        }/*else if($(this).hasClass('.del')){
         action = '-3';
         changeStatus();
         }*/
    });

    $('.table').on("click",".del", function () {
        action = '-3';
        actionId = $(this).closest('tr').attr('data-id');
        changeStatus();
    });


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
    var adTypeObj = {
        banner: '通栏',
        splash: '开屏',
        instl: '插屏'
    };
    /*end*/
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
                    tr.append('<span class="status status0">●</span><label>运行</label><a  class="oper">暂停</a></td>');
                }else{
                    tr.append('<span class="status status1">●</span><label>暂停</label><a class="oper">运行</a></td>');
                }
                tr.append('<td><span>' + content[i].adspaceKey + '</span><a class="pdl5">复制</a></td><td>' + content[i].created + '</td><td class="edit120"><a class="edit">编辑 </a><a class="del">删除</a></td>');
                $('tbody').append(tr);

            }

        }
    });
    /*end*/

    $('.table').on("click",".edit", function () {


        actionId = $(this).closest('tr').attr('data-id');

        $.ajax({
            url:AD_SPACE_DETAIL,
            data:{id:actionId},
            success:function(data){

                var content = template("editTpl", data.content);
                layer.open({
                    type: 1,
                    title: "修改广告位",
                    closeBtn: 1,
                    scrollbar:true,
                    shadeClose: false,//边上不关闭
                    area: ['68%', '240px'], //宽高
                    skin: 'yourclass',
                    content: content
                });

            }
        });

    });

    $(document).on("click","#modifyAdspace",function(){


        var adname = $("input[name='adname']").val();
        var dicAdvertiseShowTypeId = $("select[name='adType']").val();
        var adtype = $("select[name='adType']").find('option:selected').attr('en-name');
        if(adname==''){
            alert('请输入广告位名称');
            return;
        }else if(dicAdvertiseShowTypeId==''){
            alert('请选择广告类型');
            return;
        }
        $.ajax({
            url:ADD_AD_SPACE,
            data:{id:$("input[name='id']").val(),adspacename:adname,adtype:adtype,dicAdvertiseShowTypeId:dicAdvertiseShowTypeId,mediaid:mediaId},
            success:function(data){
                if(data.status=='SUCCESS'){
                    alert('修改广告位成功');
                    location.reload();
                }else{
                    alert('添加广告位失败');
                }
            }
        })

    })

});

/*
* <tr>
 <td><a class="mgl40">七夕情人节</a></td>
 <td>开屏广告</td>
 <td>
 <span class="status status0">●</span>运行
 <a class="pdl5">暂停</a>
 </td>
 <td>
 <span>dsddsssgsgee</span>
 <a class="pdl5">复制</a>
 </td>
 <td>2015-06-06</td>
 <td class="edit120">
 <a class="edit">编辑</a>
 <a class="del">删除</a>
 </td>
 </tr>*/