/*
 *
 *  (C) Copyright 2016 Ymatou (http://www.ymatou.com/).
 *  All rights reserved.
 *
 */

package com.ymatou.restkeeper.util;


public class WapperUtil {

    public static Result success(){
        return success(null);
    }

    public static Result success(Object data){
        return newInstance(ResponseStatusEnum.SUCCESS.isSuccess(), ResponseStatusEnum.SUCCESS.getStatusInfo(), data);
    }

    public static Result error(){
        return error(null, null);
    }

    public static Result error(String message){
        return error(null, message);
    }

    public static Result error(boolean success,String message){
        return newInstance(success, message, null);
    }

    public static Result error(Object data,String message){
        return newInstance(ResponseStatusEnum.ERROR.isSuccess(),message,data);
    }

    public static Result newInstance(boolean success,String message,Object data){
        return new Result(success,message,data);
    }
}
