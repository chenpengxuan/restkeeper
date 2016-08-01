define(function(require) {
	$=jQuery=require('jquery');
	var base = require('base');
	var vn = require('vn');
	var menus = require('menus');

	var  catesId;
	var  catesName;

	var GET_APP_TYPES = '/dev/category/bigCategory';
	var GET_APP_STYPES = '/dev/category/smallCategory';
	var Next_step = '/dev/addapp-addad.html';


	vn.log('vn');
	/*select start*/
	seajs.use(['../scripts/util/select/jquery.select', '../scripts/util/select/sSelect.css'], function(a, b) {
	  $('select').sSelect();
	});
	/*select end*/
	
	/*验证输入start*/
	seajs.use(['../scripts/util/checky2/Validator', '../scripts/util/checky2/Validator.css'], function(a, b) {
		var checky2=require('../util/checky2/Validator');
		var parameterForm = $('<form>'),validator,formDiv = $('#Form');

		formDiv.wrap(parameterForm);

		parameterForm = formDiv.parent();
		vn.log(parameterForm);
		parameterForm.attr({

			'action' : '/dev/media/save',

			method : 'post'

		});

		validator = new checky2.Validator(parameterForm, {

			keyword : {
				rule : {
					required : {
						message : '关键字不能为空'
					}
				},
				messageContainer : 'keyword_info',
				iconContainer : 'keyword_succeed',
				focus : '输入关键字'
			},
			mediaName:{
				rule:{
					required:{
						message:'应用名称不能为空'
					}
				},
				messageContainer:'mediaName_info'
			}

		},{
			submitOnSucceed : true,
			 onvalidate : function (event) {
				 if (event.resultList.length <= 0) { //验证成功
					vn.log(typeof parameterForm.serialize());
					 if(!parameterForm.locationInfo)parameterForm.locationInfo = 0;
					 $.ajax({
						 url:parameterForm.attr('action'),
						 data:parameterForm.serialize(),
						 success:function(data){
							 if(data.status=='SUCCESS'){
								 location.href = Next_step+"?mediaid="+data.content.id;
							 }else{
								 alert(data.message);
							 }
						 }
					 })
				 }
			 }
		});
		validator.addRule('equalto', function (val, opt) {
			return val <= parseFloat(opt.html());
		});
		validator.addRule('greater', function (val, opt) {
			return val > opt;
		});
		$('.submit-btn').click(function(){
			vn.log('submit');
			validator.validate();
		});
	});
	/*验证输入end*/

	$.ajax({
		url:GET_APP_TYPES,
		success:function(data){
			if(data.status=='SUCCESS'){
				var content = data.content;
				vn.log(content);
				var len = content.length;
				$('#btips').change(function(){
					getSmallCate($(this).val());
				});
				for(var i=0;i<len;i++){
					var name = content[i];
					$('#btips').append('<option value="' + name + '">' + name + '</option>');
				}
			}
		}
	})

	function getSmallCate(name){
		vn.log('change');
		$.ajax({
			url:GET_APP_STYPES,
			data:{mainCategoryName:name},
			success:function(data){
				var content = data.content;
				var len = content.length;
				$('#stips').empty().change(function(){
					if($(this).val()==-1)return;
					catesId = $(this).val();
					catesName = $(this).find('option:selected').text();
				});
				$('#stips').append('<option value="-1">选择应用小类</option>').next().find('h4').text('选择应用小类');
				for(var i=0;i<len;i++){
					$('#stips').append('<option value="' + content[i].id + '">' + content[i].categoryname + '</option>');
				}
			}
		})
	}
	
});

