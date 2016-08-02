/*
 *
 *  (C) Copyright 2016 Ymatou (http://www.ymatou.com/).
 *  All rights reserved.
 *
 */

package com.ymatou.restkeeper.util;

import com.ymatou.restkeeper.model.pojo.User;


public class CurrentUserUtil {

    public static Long getCurrentUserId(){
        return getCurrentUser() == null ? null : getCurrentUser().getId();
    }

    public static User getCurrentUser(){

        return SessionUtil.get(SessionUtil.SESSION_KEY_USER);
    }

}
