define(function (require) {
    var $ = require('jquery');
    var base = require('base');
    var vn = require('vn');
    require('menus');
    require('select');
    require('laydate');
    var page = require('page');
    var dateExtend = require('date-extend');
    var template = require('artTemplate');


    var APPCOUNTLIST_URL = "/dev/appReportList";
    var APPCOUNTREPORT_URL = "/dev/appReportDownload";
    var MYAPP_URL = "/dev/myApps";
    var ALLPAYMETHOD_URL = "/dev/allPayMethod";
    var ADSHOWTYPE_URL = "/dev/adShowType";


    var loadedCount = 0;
    var chartBuffData = null;
    var dateChooseEvent = function(){};


    // 所有select的处理
    $('select').sSelect();

    // 应用名称和广告位的级联
    function myappCallback(data) {
        var appIdNode = $("#appId"), adSpaceIdNode = $("#adSpaceId");
        appIdNode.html(template("appIdOptionTmpl", data)).sSelect();

        appIdNode.change(function () {
            var value = $(this).val(), adSpaceSpanNode = $("#adSpaceSpan").hide();

            if (value != "") {
                $.each(data.content, function (i, item) {
                    if (item.id == value && item.adspaceVoList.length > 0) {
                        adSpaceSpanNode.show();
                        adSpaceIdNode.html(template("adSpaceIdOptionTmpl", item)).sSelect();
                    }
                });
            }
        });
    }

    $.ajax({
        url: MYAPP_URL,
        success: function (data) {
            if (data.status == 'SUCCESS') {
                myappCallback(data);
                loadedCount++;
            } else {
                alert(data.message);
            }
        }
    });






    // 时间选择事件处理
    var startDateNode = $("#startDate"), timespan = $(".timespan"), endDateNode = $("#endDate"), dateScopeNode = $("#dateScope");

    laydate.skin('molv');
    var start = {
        elem: '#startDate',
        event: 'click',
        format: 'YYYY-MM-DD',
        min: '1900-01-01',
        max: laydate.now(), //最大日期
        istoday: false,
        choose: function (datas) {
            end.min = datas; //开始日选好后，重置结束日的最小日期
            end.start = datas //将结束日的初始值设定为开始日

            dateChooseEvent();
        }
    };
    var end = {
        elem: '#endDate',
        event: 'click',
        format: 'YYYY-MM-DD',
        min: '1900-01-01',
        max: laydate.now(),
        istoday: false,
        choose: function (datas) {
            start.max = datas; //结束日选好后，重置开始日的最大日期

            dateChooseEvent();
        }
    };
    startDateNode.click(function () {
        laydate(start);
    });
    endDateNode.click(function () {
        laydate(end);
    });

    dateScopeNode.change(function () {
        var value = $(this).val();
        var startDate = "", endDate = "";
        if (value == '1') {
            startDate = dateExtend.getToday();
            endDate = startDate;
        } else if (value == '2') {
            startDate = dateExtend.getYesterday();
            endDate = startDate;
        } else if (value == '3') {
            startDate = dateExtend.getAddDay(-6);
            endDate = dateExtend.getToday();
        } else if (value == '4') {
            startDate = dateExtend.getAddDay(-29);
            endDate = dateExtend.getToday();
        }

        startDateNode.val(startDate);
        endDateNode.val(endDate)

        if (value == '15') {
            timespan.show();
        } else {
            timespan.hide();
        }
    }).change();







    // 计费类型的加载
    $.ajax({
        url: ALLPAYMETHOD_URL,
        success: function (data) {
            if (data.status == 'SUCCESS') {
                $("#jfTypeDiv").append(template("jftypeTmpl", data));
                loadedCount++;
            } else {
                alert(data.message);
            }
        }
    });

    // 广告位类型的加载
    $.ajax({
        url: ADSHOWTYPE_URL,
        success: function (data) {
            if (data.status == 'SUCCESS') {
                $("#ggwTypeDiv").append(template("ggwtypeTmpl", data));
                loadedCount++;
            } else {
                alert(data.message);
            }
        }
    });






    // 根据搜索条件的改变触发图形、列表的响应时间
    function requestListInfo(appId, adSpaceId, startDate, endDate, payMethod, showType, pageNumber, pageSize) {

        var contentNode = $("#countList table tbody").html("");

        page("page", APPCOUNTLIST_URL, {
            appId: appId || '',
            adSpaceId: adSpaceId || '',
            startDate: startDate || '',
            endDate: endDate || '',
            payMethod: payMethod || '',
            showType: showType || '',
            page: pageNumber,
            size: pageSize
        }, function(data){
            var listHtml = template("countListTmpl", data.content);
            contentNode.html(listHtml);

            chartBuffData = data.content.content;
            changeCharts();
        });

        //$.ajax({
        //    url: APPCOUNTLIST_URL,
        //    data: {
        //        appId: appId || '',
        //        adSpaceId: adSpaceId || '',
        //        startDate: startDate || '',
        //        endDate: endDate || '',
        //        payMethod: payMethod || '',
        //        showType: showType || '',
        //        pageNumber: pageNumber || '',
        //        pageSize: pageSize || ''
        //    },
        //    success: function (data) {
        //        if (data.status == 'SUCCESS') {
        //            var listHtml = template("countListTmpl", data.content);
        //            contentNode.html(listHtml);
        //
        //            chartBuffData = data.content.content;
        //            changeCharts();
        //        } else {
        //            alert(data.message);
        //        }
        //    }
        //});
    }

    requestListInfo("", "", $("input[name=startDate]").val(), $("input[name=endDate]").val());

    function addChangeEvent(){
        if(loadedCount == 3){
            var appIdNode = $("select[name=appId]"), adSpaceIdNode = $("select[name=adSpaceId]"), dateScopeNode = $("select[name=dateScope]"),
                startDateNode = $("input[name=startDate]"), endDateNode = $("input[name=endDate]"), jftypeNode = $("input[name=jftype]"),
                ggwtypeNode = $("input[name=ggwtype]");

            function changeEvent(){
                var appId = appIdNode.val();
                var adSpaceId = adSpaceIdNode.val();
                var startDate = startDateNode.val();
                var endDate = endDateNode.val();
                var payMethod = $("input[name=jftype]:checked").val();
                var showType = $("input[name=ggwtype]:checked").val();

                if(startDate != "" && endDate != ""){
                    requestListInfo(appId, adSpaceId, startDate, endDate, payMethod, showType);
                }
            }

            appIdNode.add(adSpaceIdNode).add(dateScopeNode).add(jftypeNode).add(ggwtypeNode).change(function(){changeEvent()});
            dateChooseEvent = function(){
                changeEvent();
            }

            clearInterval(intervalAddChangeEvent);
        }
    }

    var intervalAddChangeEvent = setInterval(addChangeEvent, 100);






    // tab切换事件
    (function(){
        $("#tabs .btn").click(function(){
            $("#tabs .btn").removeClass("active");
            $(this).addClass("active");

            changeCharts();
        });
    })();







    // 更改图表方法
    function changeCharts(){

        var xData = [];
        var yData = [];

        var tabArray = ['income', 'ecpm', 'wn_cnt', 'pv_cnt', 'clk_cnt'];
        var tabIndex = $("#tabs .active").index();

        $.each(chartBuffData, function(i, item){
            xData.push(dateExtend.toString(new Date(item.index)));
            yData.push(eval('item.'+tabArray[tabIndex]));
        });

        var option = {
            tooltip : {
                trigger: 'axis'
            },
            toolbox: {
                show : false,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : false,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : xData
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'收入',
                    type:'line',
                    smooth:true,
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data: yData
                }
            ]
        };

        // 为echarts对象加载数据
        window.myChart.clear();
        window.myChart.setOption(option);
    }






    // 下载报告按钮点击
    (function(){
        $("#downReport").click(function(e){

            var data = {
                appId: $("select[name=appId]").val(),
                adSpaceId: $("select[name=adSpaceId]").val(),
                startDate: $("input[name=startDate]").val(),
                endDate: $("input[name=endDate]").val(),
                payMethod: $("input[name=jftype]:checked").val(),
                showType: $("input[name=ggwtype]:checked").val()
            };

            var href = APPCOUNTREPORT_URL + "?" +$.param(data);

            $(this).attr("href", href);
        });
    })();

});

