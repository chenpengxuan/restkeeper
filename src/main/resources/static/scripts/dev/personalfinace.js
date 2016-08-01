define(function(require) {
	var $ = require('jquery');
	var base = require('base');
	var vn = require('vn');
	var menus = require('menus');


	var USERBASICINFO_URL = "/dev/userFinanceInfo";
	var UPDATE_FINANCE_AUTHC_URL = "/dev/updateFinanceAuthc";


	// 个人信息
	$.ajax({
		url: USERBASICINFO_URL,
		success: function(data){
			if(data.status == 'SUCCESS'){
				var content = data.content;
				if(content.authcStatus == 0 || content.authcStatus == -2 || content.authcStatus == 9){
					$("#authc_form_box").show();
					$("#email").text(content.email).parent().show();
					$("#accountType").text(content.accountType).parent().show();
					$("#bankName").val(content.bankName);
					$("#accountNo").val(content.accountNo);
					$("#accountName").val(content.accountName);
					$("#bank_card img").attr("src", content.bankCardFrontImg);
					$("#authcStatus").text(content.authcStatusName).show();
					if(content.accountType == "个人"){
						$("#fullname").text(content.username).parent().show();
					}else{
						$("#companyName").text(content.username).parent().show();
					}
					if(content.authcStatus == 9){
						$("#bankName, #accountNo, #accountName").attr("disabled", true);
						$(".file-box .btn, .file-box p, .submit-btn").remove();
					}
				}else if(content.authcStatus == -4){
					$("#authcing").show();
				}
			}else{
				alert(data.message);
			}
		}
	});


	/* 验证输入start */
	seajs.use(['/scripts/util/checky2/Validator', '/scripts/util/checky2/Validator.css'], function(a, b) {
		var checky2 = require('/scripts/util/checky2/Validator');
		var parameterForm = $("#infoAuthcForm"),validator;

		validator = new checky2.Validator(parameterForm, {
			accountName : {
				rule : {
					required: {
						message: '账户姓名不能为空！'
					},
					realname : {
						message: '请填写真实的账户姓名！'
					}
				},
				messageContainer : 'accountName_info',
				iconContainer : 'accountName_succeed',
				focus : '请输入账户姓名'
			},
			accountNo : {
				rule : {
					required: {
						message: '银行账号不能为空！'
					}
				},
				messageContainer : 'accountNo_info',
				iconContainer : 'accountNo_succeed',
				focus : '请输入银行账号'
			},
			bankName : {
				rule : {
					required: {
						message: '开户行不能为空！'
					}
				},
				messageContainer : 'bankName_info',
				iconContainer : 'bankName_succeed',
				focus : '请输入开户行！'
			}
		},{
			onvalidate : function (event) {
				if (event.resultList.length <= 0) { //验证成功

					$.ajax({
						url: UPDATE_FINANCE_AUTHC_URL,
						data: parameterForm.serialize(),
						success: function(data){
							if(data.status == 'SUCCESS'){
								alert("修改成功！");
								window.location.reload();
							}else{
								alert(data.message);
							}
						}
					});
				}
			}
		});

		$(".submit-btn").click(function(e){
			validator.validate();
		});

	});
	/*验证输入end*/



	/* 银行卡上传start*/
	seajs.use(['/scripts/util/upload/jquery.iframe-transport', '/scripts/util/upload/jquery.ui.widget', '/scripts/util/upload/jquery.fileupload', '/scripts/util/upload/jquery.fileupload-process', '/scripts/util/upload/jquery.fileupload-validate'], function() {
		var oUploadPool={},oFormValidator={},UPLOAD_URL=base_path + '/uploadIdCard';

		(function(){

			var uploadFactory=function(sId,sPictype,oBtnImage,callback){
					var options,uploader,
						$errMsgContainer=$(['#',sId,'_err'].join('')),

						onUploadSucceed=function (sOutput) {//oFile

							try {
								var data=(sOutput),$dataField=$(['#',sId,'_field'].join('')),
									$previewField=$(['#',sId,'_preview'].join(''));

								if(data.status==='SUCCESS'){
									$('#type-banner .error').html('');
									oUploadPool[sId]=data.message;
									$dataField.val(data.content[1]);
									var tmpsrc = data.content[0];
									$previewField.attr('tagName')==='IMG'?$previewField.attr('src',tmpsrc):$previewField.empty().append($(['<img src="',tmpsrc,'">'].join('')));
									$errMsgContainer.empty();
									callback && callback.succeed(data.msg);
								}else{
									$errMsgContainer.html(data.msg);
									callback && callback.faild(data.msg);
								}
							} catch (ex) {
								vn.log(ex);
							}

						};
					aBox=sId.substr(7).split('x');
					window.dok=true;
					$previewField=$(['#',sId,'_preview'].join(''));
					$previewField.parent().find('.btn').html($('<input id="'+sId+'" type="file" name="uploadFile" style="cursor:pointer;-moz-transform:scale(1.5);opacity:0;filter:alpha(opacity=0);">'));
					$('#'+sId).fileupload({
						url: (UPLOAD_URL.indexOf('?') > 0 ? UPLOAD_URL + '&' : UPLOAD_URL + '?')+'uploadVersion=1&width='+aBox[0]+'&pictype='+sPictype+'&height='+aBox[1],//UPLOAD_URL,
                        dataType: "jsonp",
                        jsonp: 'jsonp_callback',
						acceptFileTypes: /(\.|\/)(jpe?g|png)$/i,
						//maxFileSize:LIMIT_SIZE[sId.split('_')[1]]*1000,
						i18n: function (message, context) {

							if(message=='acceptFileTypes')
							{
								window.dok=false;
								$errMsgContainer.html('请上传png，jpg格式的图片');
							}else if(message=='maxFileSize')
							{
								window.dok=false;
								$errMsgContainer.html('请上传大小为'+LIMIT_SIZE[sId.split('_')[1]]+'K以内的图片');
							}
						},
						done: function (e, data) {
							onUploadSucceed(data._response.result);
						}
					}).on('fileuploadadd', function (e, data) {
						window.dok=true;
					}).prop('disabled', !$.support.fileInput)
						.parent().addClass($.support.fileInput ? undefined : 'disabled');

					return sId;

				},$upfileBtns=$('#bank_card .upfile'),

				i,l,bannerCallbackMaker;

			bannerCallbackMaker=function(type){

				var ret;
				if(type==='succeed'){
					ret=function(url){
						$('#bannerPreview img').attr('src',url).show();
					};
				}else{
					ret=function(){
						$('#bannerPreview img').attr('src','').hide();
					};
				}
				return ret;
			};
			for(i=0,l=$upfileBtns.length;i<l;i++){
				oUploadPool[uploadFactory($upfileBtns[i].id,'banner',{width:123,height:29,text:'',image:'/images/btn_sel_file_sprx.gif'},{
					succeed:bannerCallbackMaker('succeed'),
					faild:bannerCallbackMaker('faild')
				})]=$(['#',$upfileBtns[i].id,'_field'].join('')).val() || '';
			}
		})();
	});
	/* 银行卡上传end*/

});

