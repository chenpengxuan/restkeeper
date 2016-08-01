define(function(require) {
	$=jQuery=require('jquery');
	var vn=require('vn');
	vn.log('vn');
	
	seajs.use(['layer'], function(a) {
		layer.config({
			path: ['','../scripts/util/layer/'].join('')
		});
		layer.ready(function(){
			layer.open({
				title: '测试',
				content: '这是一个空白的首页'
			}); 
		});
	});
	
	seajs.use(['../scripts/util/select/jquery.select', '../scripts/util/select/sSelect.css'], function(a, b) {
	  $('#agentId').sSelect();
	});
	
	/*seajs.use(['./src/util/dropkick/jquery.dropkick-1.1', './src/util/dropkick/dropkick.css'], function(a, b) {
	  $('#agentId').dropkick();
	});*/
	
	seajs.use(['../scripts/util/checky2/Validator', '../scripts/util/checky2/Validator.css'], function(a, b) {
		var checky2=require('../scripts/util/checky2/Validator');
		var parameterForm = $('<form>'),validator,formDiv = $('#parameterForm');

		formDiv.wrap(parameterForm);

		parameterForm = formDiv.parent();

		parameterForm.attr({

			'action' : 'http://www.baidu.com',

			method : 'POST'

		});



		validator = new checky2.Validator(parameterForm, {

			acname : {

				rule : {

					required : {

						message : '请输入姓名'

					},

					maxlengthGB : {

						message : '姓名不能超过20个汉字或40个英文字符。',

						param : 40

					},

					username : {

						message : '姓名只能由中文、英文、数字、“-”及“_”组成'

					}

				},

				messageContainer : 'acname_info',

				iconContainer : 'acname_succeed',

				focus : '可输入1-40位,1个汉字两个字符，包含中文、英文、“-”及“_”'

			},

			acmobile : {

				rule : {

					telephone : {

						message : '手机格式不正确'

					}

				},

				messageContainer : 'acmobile_info',

				iconContainer : 'acmobile_succeed',

				focus : '手机'

			}

		},{

			submitOnSucceed : true,

			 onvalidate : function (event) {

			 if (event.resultList.length <= 0) { //验证成功
				vn.log('x');
			 $.post(parameterForm.attr('action'), parameterForm.serialize(), function (data) {
			 if (data.succeed !== 'ok') {

			 vn.log(data.info);

			 } else {

			 //window.location = PROCESS_URL;

			 }

			 }, 'json');

			 }

			 }

		});



		validator.addRule('ge',function(val,opt){

			return parseFloat(val)>=opt;

		});

		validator.addRule('le',function(val,opt){

			return parseFloat(val)<=opt;

		});

		validator.addRule('g0',function(val,opt){

			return parseFloat(val)>opt;

		});



		validator.addRule('scale',function(val,opt){

			var aVal=$.map([platformCentIntoScale.val(),channelCentIntoScale.val(),devCentIntoScale.val(),allyesCentIntoScale.val()],function(n){

				return n || 0;

			});

			return function(){

					var sum=0,i,l;

					//vn.log('123');

	//	      for(i=0,l=aVal.length;i<l;i++){

	//	        sum+=aVal[i];

	//	        console.log(aVal[i])

	//	      }

					function accAdd(arg1,arg2,arg3,arg4){

						var r1,r2,r3,r4,m;

						try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}

						try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}

						try{r3=arg3.toString().split(".")[1].length}catch(e){r3=0}

						try{r4=arg4.toString().split(".")[1].length}catch(e){r4=0}

						m=Math.pow(10,Math.max(r1,r2,r3,r4))

						return (arg1*m+arg2*m+arg3*m+arg4*m)/m

					}

					sum=accAdd(platformCentIntoScale.val(),channelCentIntoScale.val(),devCentIntoScale.val(),allyesCentIntoScale.val());



					return sum;

				}() ===1;



		});
	  
	});
	
	
	
	
	
});

