define(function(require) {
	$=jQuery=require('jquery');

	var base = require('base');
	var vn = require('vn');
	var menus = require('menus');
    require('layerCss');
    var layer = require('layer');
	vn.log('vn');

    var APP_MSG = '/dev/media/detail';
    var UPLOAD_PATH = '/dev/media/upload';
    var SAVE_APP_DOC = '/dev/media/saveUploadFile';
    var APP_LIST_URL = '/dev/appmanage.html';
    var mediaId = base.getQueryString('mediaid');

    $.ajax({
        url:APP_MSG,
        data:{id:mediaId},
        success:function(data){
            vn.log(data.content.id);
            $('#app-msg').empty().html('<li>应用名称：' + data.content.mediaName + '</li><li>发布者ID：' + data.content.id + '</li><li>应用类型：' + data.content.mainCategoryName + '</li><li>应用类型：' + data.content.categoryName + '</li>')
        }
    });

	/* 上传start*/
	seajs.use(['/scripts/util/upload/jquery.iframe-transport', '/scripts/util/upload/jquery.ui.widget', '/scripts/util/upload/jquery.fileupload', '/scripts/util/upload/jquery.fileupload-process', '/scripts/util/upload/jquery.fileupload-validate'], function() {

        $('#file').fileupload({
            dataType: "jsonp",
            jsonp: 'jsonp_callback',
            url:UPLOAD_PATH,
            autoUpload: true,
            maxFileSize : 5000000,
            formData:{id:mediaId},
            add: function (e, data) {
                //$('.uploadappbtn .file-btn').on('click',function () {
                    /*if($('#showFileName').val()==''){
                        alert('请选择上传文件');
                        return;
                    }else{*/
                        data.submit();
                    vn.log(data);
                    //}
                //});
            },
            done:function(e,data){
                vn.log(data.result);
                $('#fileDocPath').val(data.result.content[1]);
            }
        });

        $('#fileDoc').fileupload({
            dataType: "jsonp",
            jsonp: 'jsonp_callback',
            url:UPLOAD_PATH,
            autoUpload: true,
            maxFileSize : 5000000,
            formData:{id:mediaId},
            add: function (e, data) {

                data.submit();
                vn.log(data);

            },
            done:function(e,data){
                vn.log(data.result)
                $('#filePath').val(data.result.content[1]);
            }
        });
	});
	/* 上传end*/


    //选择路径功能
	$('.uploadapp .file-btn').on('click',function(){
        $('#file').click().change(function(){
            var src = $(this).val();
            src = src.substr(src.lastIndexOf('\\')+1);
            $('#fileName').val(src);
        });
    });
    //上传文档选择功能
    $('.uploadDoc .file-btn').on('click',function(){
        $('#fileDoc').click().change(function(){
            var src = $(this).val();
            src = src.substr(src.lastIndexOf('\\')+1);
            $('#fileDocName').val(src);
        });
    });

    $('.uploadappbtn .file-btn').on('click', function () {

        if ($('#filePath').val() == '') {
            layer.alert('请上传应用!', {
                skin: 'layui-layer-molv', //样式类名
                title: false //不显示标题
            });
            return;
        }
        if ($('#fileDocPath').val() == '') {
            layer.alert('请上传文档!', {
                skin: 'layui-layer-molv', //样式类名
                title: false //不显示标题
            });
            return;
        }

        //保存路径
        $.ajax({
            url:SAVE_APP_DOC,
            data:{
                    id:mediaId,
                    filePath:$('#filePath').val(),
                    fileName:$('#fileName').val(),
                    fileDocPath:$('#fileDocPath').val(),
                    fileDocName:$('#fileDocName').val()
            },
            success:function(data){
                if(data.status == "SUCCESS"){
                    layer.alert("上传成功!", {
                        skin: 'layui-layer-molv', //样式类名
                        title: false //不显示标题
                    });
                    location.href = APP_LIST_URL;
                }else{
                    layer.alert(data.message, {
                        skin: 'layui-layer-molv', //样式类名
                        title: false //不显示标题
                    });
                }
            }
        });

    });
});

