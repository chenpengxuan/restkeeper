define(function (require, exports, module) {

    var $ = require('jquery');
    var base = require('base');
    var vn = require('vn');
    var menus = require('menus');
    var laytpl = require('laytpl');

    var id = base.getQueryString("id");

    var letterDetailUrl = "/letter/view/"+id;
    var letterDetailUrl = "/letter/view/"+id;

    $.ajax({
        url:letterDetailUrl,
        success:function(data){

            var gettpl = document.getElementById('content').innerHTML;
            laytpl(gettpl).render(data.content, function(html){
                $(".content").html(html);
            });

        }
    })

});

