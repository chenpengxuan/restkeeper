define(function(require) {
	var $ = require('jquery');
	var base = require('base');
	var vn = require('vn');
	var menus = require('menus');

	var USERBASICINFO_URL = "/dev/userBasicInfo";
	var UPDATE_USERBASICINFO_URL = "/dev/updateUserBasicInfo";

	/* 验证输入start */
	seajs.use(['/scripts/util/checky2/Validator', '/scripts/util/checky2/Validator.css'], function(a, b) {
		var checky2 = require('/scripts/util/checky2/Validator');
		var parameterForm = $("#userinfoForm"),validator;

		validator = new checky2.Validator(parameterForm, {

			mobile : {
				rule : {
					required : {
						message : '手机不能为空'
					},
					telephone: {
						message: '手机号码格式不正确'
					}
				},
				messageContainer : 'mobile_info',
				iconContainer : 'mobile_succeed',
				focus : '输入手机'
			},
			wechat : {
				rule : {
					required : {
						param: false
					}
				},
				messageContainer : 'wx_info',
				iconContainer : 'wx_succeed',
				focus : '输入微信号'
			},
			qq : {
				rule : {
					required : {
						param: false
					}
				},
				messageContainer : 'qq_info',
				iconContainer : 'qq_succeed',
				focus : '输入QQ'
			}

		},{
			 onvalidate : function (event) {
				 if (event.resultList.length <= 0) { //验证成功

					 $.ajax({
						 url: UPDATE_USERBASICINFO_URL,
						 data: parameterForm.serialize(),
						 success: function(data){
							 if(data.status == 'SUCCESS'){
								alert("已修改！");
							 }else{
								 alert(data.message);
							 }
						 }
					 });
				 }
			 }
		});

		$("#subForm").click(function(){
			validator.validate();
		});
	  
	});
	/*验证输入end*/

	// 个人信息
	$.ajax({
		url: USERBASICINFO_URL,
		success: function(data){
			if(data.status == 'SUCCESS'){
				var content = data.content;
				$("#email").text(content.email);
				$("#fullname").text(content.username);
				$("#accountType").text(content.accountType);
				$("#mobile").val(content.cellphone);
				$("#wechat").val(content.wechat);
				$("#qq").val(content.qq);
			}else{
				alert(data.message);
			}
		}
	});
});

