define(function(require) {
	var $ = require('jquery');
	var base = require('base');
	var vn = require('vn');
	var menus = require('menus');
	var template = require('artTemplate');


	var USERACCOUNT_URL = "/dev/userFinanceAccount";
	var USERFINANCE_URL = "/dev/userFinanceBasicInfo";


	// 获取账户基本信息
	$.ajax({
		url: USERACCOUNT_URL,
		success: function(data){
			if(data.status == 'SUCCESS'){
				var info = data.content;
				$("#accountName").text(info.accountName);
				$("#accountType").text(info.accountType);
				$("#availableAmount").text(info.availableAmount);
				$("#waitingAmount").text(info.waitingAmount);
				$("#incomeAmount").text(info.incomeAmount);
				$("#withdrawalAmount").text(info.withdrawalAmount);
				$("#unconfirmedAmount").text(info.unconfirmedAmount);
				$("#confirmationMonthAmount").text(info.confirmationMonthAmount);
				$("#awardAmount").text(info.awardAmount);
			}else{
				alert(data.message);
			}
		}
	});


	// 获取个人财务信息
	$.ajax({
		url: USERFINANCE_URL,
		success: function(data){
			if(data.status == 'SUCCESS'){
				var userFinanceHtml = template("userFinanceTmpl", data.content);
				$("#userFinance").html(userFinanceHtml);
			}else{
				alert(data.message);
			}
		}
	});


});

