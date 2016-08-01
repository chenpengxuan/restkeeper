define(function(require) {
	$ = jQuery = require('jquery');
    var base = require('base');
	var vn = require('vn');
	vn.log('vn');


    var SUCCESS_URL =  base_path + "/dev/index.html";
    var LOGINCHECK_URL =  base_path + "/loginCheck";


    $(function(){

        seajs.use(['/scripts/util/checky2/Validator', '/scripts/util/checky2/Validator.css'], function(a, b) {
            var checky2 = require('/scripts/util/checky2/Validator');
            var loginForm = $("#loginForm");
            var message = $("#message");

            var validator = new checky2.Validator(loginForm, {
                username : {
                    rule : {
                        required : {
                            message : '邮箱不能为空'
                        }
                    },
                    messageContainer : 'message',
                    iconContainer : 'email_succeed'
                },
                password : {
                    rule : {
                        nullpwd: {
                            message: '密码不能为空'
                        }
                    },
                    messageContainer : 'message',
                    iconContainer : 'password_succeed'
                }
            });

            // 登录按钮点击事件
            $("#loginBtn").click(function(e){

                e.preventDefault();

                var usernameVal = $("#username").val();
                var passwordVal = $("#password").val();

                if($.trim(usernameVal) != "" && $.trim(passwordVal) != ""){
                    $.ajax({
                        url: LOGINCHECK_URL,
                        data: $.param({
                            username: usernameVal,
                            password: passwordVal,
                            workId: 2
                        }),
                        success: function(data){
                            if(data.status == 'SUCCESS'){
                                window.location = SUCCESS_URL;
                            }else if(data.status == 'ERROR'){
                                message.text(data.message);
                            }else{
                                message.text("登陆遇未知错误！");
                            }
                        }
                    });
                }else{
                    message.text("用户名或密码为空！");
                }
            });
        });
    });
});

