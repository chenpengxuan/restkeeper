define(function(require) {
	var $ = require('jquery');
        var template = require('artTemplate');
	var base = require('base');
	var vn = require('vn');
	var menus = require('menus');

    var _layer = require('layer');
    var laypage = require('laypage');

	var APPCOUNT_URL = "/dev/appCount";
	var APPLIST_URL = "/dev/media/list";
	var APP_CHANGE_STATUS = '/dev/media/changeStatus';
	var AD_SPACE_CHANGE_STATUS = '/dev/adspace/changeStatus';

	
	/*select start*/
	seajs.use(['/scripts/util/select/jquery.select', '/scripts/util/select/sSelect.css'], function(a, b) {
	  $('select').sSelect();
	});
	/*select end*/


	// 应用概况
	$.ajax({
		url: APPCOUNT_URL,
		success: function(data){
			if(data.status == 'SUCCESS'){
				var content = data.content;
				$("#putOnNum").text(content.putOnNum);
				$("#waitAuditNum").text(content.waitAuditNum);
				$("#unPassNum").text(content.unPassNum);
				$("#endNum").text(content.endNum);
			}
            //else{
			//	alert(data.message);
			//}
		}
	});

    function getList(){
        // 应用列表
        var param = {};
        if($('#system').val()!=''){
            param.mediaTypeId = $('#system').val();
        }
        if($('#status').val()!=''){
            param.status = $('#status').val();
        }
        param.page = 0;
        param.size = 8;

        $.ajax({url:APPLIST_URL, data:param, success:function(res){ //从第6页开始请求。返回的json格式可以任意定义
            laypage({
                cont: 'page1', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                pages: res.content.totalPages, //通过后台拿到的总页数
                curr: 0, //初始化当前页
                jump: function(e,first){ //触发分页后的回调
                    if(!first){ //一定要加此判断，否则初始时会无限刷新
                        param.page = e.curr-1;
                        param.size = 8;
                        $.ajax({url:APPLIST_URL,data: param, success:function(res){
                            e.pages = e.last = res.content.totalPages; //重新获取总页数，一般不用写

                            renderTable(res);

                        }});
                    }else{
                        renderTable(res);
                    }

                }
            });
        }});

        var renderTable = function(res){
            $('#appListContent').empty();
            var listHtml = template("appListTmpl", res.content);
            $("#appListContent").append(listHtml);
        };
	}

    $("#appListContent").on("click",".changeType",function(){

        var id = $(this).parent().parent().attr('data-id');
        vn.log(id);
        var curType = parseInt($(this).parent().attr('data-type'));
        var tarType = curType%2+1;
        if(confirm("确定操作吗?")){
            $.ajax({
                url:AD_SPACE_CHANGE_STATUS,
                data:{id:id,status:tarType},
                success:function(data){
                    if(data.status=='SUCCESS'){
                        alert('修改运行状态成功');
                        window.location.reload();
                    }else{
                        alert('修改运行状态失败，' + data.message);
                    }
                }
            })
        }

    });


    //初始化应用列表数据
    getList();


	$('select').change(function(){
		getList();
	});


	$('#appname').change(function(){
		if($(this).is(':checked')){
			$('#appListContent input:checkbox:enabled').prop('checked',true);
		}else{
			$('#appListContent input:checkbox:enabled').prop('checked',false);
		}
	});

    //暂停应用
	$('.pause-btn').on('click',function(){
		changeStatus(2);
	});

    //运行应用
	$('.play-btn').on('click',function(){
		changeStatus(1);
	});




	function changeStatus(statuss){
		var list = $('#appListContent input:checkbox');
		var ids = '';
		for(var i=0;i<list.length;i++){
			if($(list[i]).is(':checked')){
				var obj = $(list[i]).parent().parent().find('.status');
				if(obj.hasClass('status0')||obj.hasClass('status1')){
					if(ids==''){
						ids = $(list[i]).attr('id');
					}else{
						ids+=(',' + $(list[i]).attr('id'));
					}
				}
			}
		}
		if(ids!=''){
            if(confirm("确定操作吗?")){
                $.ajax({
                    url:APP_CHANGE_STATUS,
                    data:{ids:ids,status:statuss},
                    success:function(data){
                        if(data.status=='SUCCESS'){
                            location.reload();
                        }
                    }
                })
            }
		}else{
            alert("请选择应用!");
        }
	}

});

