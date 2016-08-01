define(function(require) {
	var $ = require('jquery');
	var base = require('base');
	var vn = require('vn');
	var menus = require('menus');
	require('laydate');
	var template = require('artTemplate');
	var dateExtend = require('date-extend');
	var page = require('page');



	var USERACCOUNT_URL = "/dev/userFinanceSimple";
	var FINANCEDETAIL_URL = "/dev/financeDetail";
	var FINANCEDETAILREPORTDOWNLOAD_URL = "/dev/financeDetailReportDownload";


	function dateFormat(dateVal){
		return dateExtend.toString(new Date(dateVal));
	}
	template.helper("dateFormat", dateFormat);


	var startDateNode = $("#startDate"), endDateNode = $("#endDate");
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
		}
	};
	var end = {
		elem: '#endDate',
		event: 'click',
		format: 'YYYY-MM-DD',
		min: laydate.now(),
		max: '2099-06-16 23:59:59',
		istoday: false,
		choose: function (datas) {
			start.max = datas; //结束日选好后，重置开始日的最大日期
		}
	};
	startDateNode.click(function () {
		laydate(start);
	});
	endDateNode.click(function () {
		laydate(end);
	});


	// 获取个人财务信息
	$.ajax({
		url: USERACCOUNT_URL,
		success: function(data){
			if(data.status == 'SUCCESS'){
				var info = data.content;
				$("#availableAmount").text(info.availableAmount);
				$("#waitingAmount").text(info.waitingAmount);
			}else{
				alert(data.message);
			}
		}
	});



	// tab切换事件
	$("#tabs .btn").click(function(){
		if(!$(this).hasClass("active")){
			$("#tabs .btn").removeClass("active");
			$(this).addClass("active");

            $("#tabs .active").index() == 1 ? $("#searchSpan").hide() : $("#searchSpan").show();

			changeTabInfo();
		}
	});

	// 查询按钮点击事件
	$("#queryBtn").click(function(){
		changeTabInfo();
	});

	var tabArray = ['income', 'audit', 'withdrawals', 'reward'];

	var tabIndex = base.getQueryString("tab");

	if(tabIndex){
		$("#tabs .btn").eq(tabIndex).click();
	}else{
		// 初始化tab事件
		changeTabInfo();
	}

	function changeTabInfo(){

		var tabIndex = $("#tabs .active").index();

		page("page", FINANCEDETAIL_URL, {
			type: tabArray[tabIndex],
			startDate: startDateNode.val(),
			endDate: endDateNode.val(),
			page: 0,
			size: 10
		}, function(data){
			var html = template(tabArray[tabIndex]+"Tmpl", data.content);
			$("#detailTable").html(html);
		});

	}


	// 下载报告按钮点击
	(function(){
		$("#downReport").click(function(e){

			var data = {
				startDate: startDateNode.val(),
				endDate: endDateNode.val(),
                page: 0,
                size: (1 << 30),
			};

			var href = FINANCEDETAILREPORTDOWNLOAD_URL + "?" +$.param(data);

			$(this).attr("href", href);
		});
	})();
});

