define(function (require) {
    var $ = require('jquery');
    var base = require('base');
    var vn = require('vn');
    var menus = require('menus');


    var WITHDRAWALSINFO_URL = "/dev/withdrawalsInfo";
    var COUNTTAXRATE_URL = "/dev/countTaxRate";
    var APPLYWITHDRAWALS_URL = "/dev/applyWithdrawals";


    function ajax(url, param, success) {
        $.ajax({
            url: url,
            data: param,
            success: success
        });
    }

    // 获取账户基本信息
    ajax(WITHDRAWALSINFO_URL, {}, function (data) {
        if (data.status == 'SUCCESS') {
            var info = data.content;
            $("#withdrawalsType").text(info.transactionMethodName);
            $("#bankName").text(info.bankName);
            $("#accountName").text(info.accountName);
            $("#accountNo").text(info.accountNo);
            $("#availableAmount").text(info.canRaiseAmount);
        } else {
            alert(data.message);
        }
    });


    $("#withdrawalsAmount").keyup(function(){
        $(this).val($(this).val().replace(/[^0-9.]/g,''));
        if(parseFloat($(this).val()) > parseFloat($("#availableAmount").text())){
            $(this).val($("#availableAmount").text());
        }
    }).bind("paste",function(){
        $(this).val($(this).val().replace(/[^0-9.]/g,''));
        if(parseFloat($(this).val()) > parseFloat($("#availableAmount").text())){
            $(this).val($("#availableAmount").text());
        }
    }).blur(function () {
        var amount = $(this).val();
        if ($.trim(amount) != "") {
            ajax(COUNTTAXRATE_URL, {amount: amount}, function (data) {
                if (data.status == 'SUCCESS') {
                    var info = data.content;
                    $("#taxAmount").text(info.taxAmount);
                    $("#incomeAmount").text(info.incomeAmount);
                } else {
                    alert(data.message);
                }
            });
        }
    });

    function applyWithdrawals(){
        var amount = $("#withdrawalsAmount").val();
        ajax(APPLYWITHDRAWALS_URL, {amount: amount}, function (data) {
            if (data.status == 'SUCCESS') {
                location.reload(true);
            } else {
                alert(data.message);
            }
        });
    }

    $("#subForm").click(function(){
        var amount = $("#withdrawalsAmount").val();
        if ($.trim(amount) != "") {
            ajax(COUNTTAXRATE_URL, {amount: amount}, function (data) {
                if (data.status == 'SUCCESS') {
                    var info = data.content;
                    if(info.withdrawalsAmount <= 0){
                        alert("提现金额过低，不允许提现！");
                        return false;
                    }
                    if(confirm("提现金额："+info.withdrawalsAmount+", 纳税金额："+info.taxAmount+", 实际收入："+info.incomeAmount)){
                        applyWithdrawals();
                    }
                } else {
                    alert(data.message);
                }
            });
        }
    });

});

