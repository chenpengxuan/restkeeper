define(function (require, exports, module) {

    var $ = require('jquery');
    var base = require('base');
    var vn = require('vn');
    var menus = require('menus');
    var _layer = require('layer');
    var laypage = require('laypage');
    var laytpl = require('laytpl');

    var letterListUrl = "/letter/list";
    var delLetterUrl = "/letter/delete";

    var renderTable = function(res){
        var gettpl = document.getElementById('content').innerHTML;
        laytpl(gettpl).render(res.content.content, function(html){
            $("#contentTable").find("tbody").html(html);
        });
    };

    $.ajax({url:letterListUrl, data:{page: 0,size:8}, success:function(res){ //从第6页开始请求。返回的json格式可以任意定义
        laypage({
            cont: 'page1', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
            pages: res.content.totalPages, //通过后台拿到的总页数
            curr: 0, //初始化当前页
            jump: function(e,first){ //触发分页后的回调
                if(!first){ //一定要加此判断，否则初始时会无限刷新
                    $.ajax({url:letterListUrl,data: {page: e.curr-1,size:8}, success:function(res){
                        e.pages = e.last = res.content.totalPages; //重新获取总页数，一般不用写

                        renderTable(res);

                    }});
                }else{
                    renderTable(res);
                }

            }
        });
    }});


    $("#contentTable").on('click','.del',function(){

        if(confirm("确定删除此条通知吗?")){

            var ids = new Array();
            ids.push($(this).parents("tr").find("input[name='delLetter']").val());

            $.ajax({
                url:delLetterUrl,
                data:{ids:ids},
                success:function(data){

                    if(data.status == 'SUCCESS'){
                        location.reload();
                    }

                }
            })
        }

    });
    $("#delBatch").click(function () {
        var $delLetters = $("input[name='delLetter']:checked");
        if($delLetters.length == 0 ){
            alert("请选择需要删除的通知!");
            return;
        }
        if(confirm("确定删除您选择的通知吗?")){

            var ids = new Array();
            $delLetters.each(function(i,item){
                ids.push($(item).val())
            });

            $.ajax({
                url:delLetterUrl,
                data:{ids:ids},
                success:function(data){

                    if(data.status == 'SUCCESS'){
                        location.reload();
                    }

                }
            })
        }

    })

});

