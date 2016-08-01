//define(function (require, exports, module) {
//
//    var $ = require('jquery');
//    var base = require('base');
//    var vn = require('vn');
//    var cookies = require('cookie');
//    var COOKIE_MENUS = 'cookie_menus';
//    cookies.delCookie(COOKIE_MENUS);
//    var menus = require('menus');
//    var _layer = require('layer');
//
//    var USERINFO_URL = "/dev/userinfo";
//    var APPCOUNT_URL = "/dev/appCount";
//
//
//    // 应用概况
//    $.ajax({
//        url: APPCOUNT_URL,
//        success: function(data){
//            if(data.status == 'SUCCESS'){
//                var content = data.content;
//                $("#putOnNum").text(content.putOnNum);
//                $("#waitAuditNum").text(content.waitAuditNum);
//                $("#unPassNum").text(content.unPassNum);
//                $("#endNum").text(content.endNum);
//            }else{
//                alert(data.message);
//            }
//        }
//    });
//
//    function domReady() {
//        // 退出
//        var $logout = $('#logout');
//        $logout.on('click', function (event) {
//            if (event) {
//                event.preventDefault();
//            }
//
//            $.ajax($.extend({
//                url: apiHost + '/logout'
//            }, jsonp)).
//                done(function (data) {
//                    data.status = isNotLogin;
//                    doneCallback.call(this, data);
//                }).
//                fail(function (jqXHR) {
//                    failCallback.call(this, jqXHR, '退出失败');
//                }).
//                always(function () {
//                    sessionStorage.clear();
//                });
//        });
//
//
//
//        // 占位符
//        if (!('placeholder' in document.createElement('input'))) {
//            require('placeholder');
//        }
//    }
//
//
//
//    $(document).ready(domReady);
//
//});
//
