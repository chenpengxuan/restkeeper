define(function(require) {
	var $ = require('jquery');
	var base = require('base');
	var vn = require('vn');
	var menus = require('menus');

	var USERBASICINFO_URL = "/dev/userAuthcInfo";
	var UPDATE_PERSONAL_AUTHC_URL = "/dev/updatePersonalAuthc";
	var UPDATE_CAMPANY_AUTHC_URL = "/dev/updateCampanyAuthc";

    var isPersonal = true;
	// 个人信息
	$.ajax({
		url: USERBASICINFO_URL,
        async:false,
		success: function(data){
			if(data.status == 'SUCCESS'){
				var content = data.content;
				if(content.authcStatus == 0 || content.authcStatus == -2 || content.authcStatus == 9){
					$("#authc_form_box").show();
					if(content.accountType == "个人"){
                        isPersonal = true;
						$("#fullname").text(content.username).parent().show();
						$("#idno").val(content.idno).parent().show();
						$("#type-banner").show();
						$("#upfile_id_positive_preview img").attr("src", content.idCardPositiveUrl);
						$("#upfile_id_negative_preview img").attr("src", content.idCardNegativeUrl);
					}else{
                        isPersonal = false;
						$("#companyName").text(content.username).parent().show();
                        $("#busiLicenseNo").val(content.businessLicenseNo).parent().show();
						$("#business_licence img").attr("src", content.businessLicence).parents("#business_licence").show();
						$("#organization_code img").attr("src", content.organizationCode).parents("#organization_code").show();
						$("#tax_registration_certificate img").attr("src", content.taxRegistrationCertificate).parents("#tax_registration_certificate").show();
						$("#opening_permit img").attr("src", content.openingPermit).parents("#opening_permit").show();
					}
					$("#email").text(content.email).parent().show();
					$("#accountType").text(content.accountType).parent().show();
					$("#authcStatus").text(content.authcStatusName).show();

					if(content.authcStatus == 9){
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
			idno : {
				rule : {
					required : {
						param: isPersonal,
                        message: '身份证号不能为空!'
					},
					idcard : {
						message: '身份证号格式不正确'
					}
				},
				messageContainer : 'idno_info',
				iconContainer : 'idno_succeed',
				focus : '请输入身份证号'
			},
            busiLicenseNo : {
				rule : {
					required : {
						param: !isPersonal,
                        message: '营业执照号不能为空!'
					},
                    businessLicense : {
						message: '营业执照号格式不正确'
					}
				},
				messageContainer : 'busiLicenseNo_info',
				iconContainer : 'busiLicenseNo_succeed',
				focus : '请输入营业执照号'
			}
		},{
			onvalidate : function (event) {
				if (event.resultList.length <= 0) { //验证成功

					$.ajax({
						url: $("#fullname").is(":visible") ? UPDATE_PERSONAL_AUTHC_URL : UPDATE_CAMPANY_AUTHC_URL,
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

        validator.addRule('businessLicense', function (val, opt) {
            var regex = /^\d{6}[123]\d{7}[1-9]$/;
            return regex.test(val);
        });

		$(".submit-btn").click(function(e){
			validator.validate();
		});

	});
	/*验证输入end*/

	/* 身份信息上传start*/
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

				},$upfileBtns=$('#type-banner .upfile, #business_licence .upfile, #organization_code .upfile, #tax_registration_certificate .upfile, #opening_permit .upfile'),

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
	/* 身份信息上传end*/
});

